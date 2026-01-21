import {
  AI_CONFIG,
  PROVIDER_CONFIGS,
  MOCK_RESPONSES,
} from "../data/aiConfig";

/**
 * Sends a message to the configured AI service and gets a response
 * Uses Groq as primary provider and Gemini as backup when Groq is overloaded
 * @param {string} message - The user's message
 * @param {Array} previousMessages - Previous conversation messages
 * @returns {Promise<string>} - The AI's response
 */
export const sendMessageToAI = async (message, previousMessages = []) => {
  try {
    const { groqApiKey, geminiApiKey, systemPrompt } = AI_CONFIG;

    // Debug logging
    console.log("Groq API key available:", groqApiKey ? "Yes" : "No");
    console.log("Gemini API key available:", geminiApiKey ? "Yes" : "No");

    // Check if any API key is available
    const hasGroqKey = groqApiKey && groqApiKey.trim() !== "";
    const hasGeminiKey = geminiApiKey && geminiApiKey.trim() !== "";

    if (!hasGroqKey && !hasGeminiKey) {
      console.info("Using mock AI responses (no API keys configured)");
      return getMockResponse(message);
    }

    // Format previous messages for context
    const formattedMessages = previousMessages
      .filter((msg) => msg.role === "user" || msg.role === "assistant")
      .map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

    // Strategy: Groq first, Gemini as backup
    if (hasGroqKey) {
      try {
        console.log("🚀 Trying Groq API (primary)...");
        const messages = [
          { role: "system", content: systemPrompt },
          ...formattedMessages,
          { role: "user", content: message },
        ];
        return await sendToGroq(messages, groqApiKey);
      } catch (groqError) {
        console.warn("⚠️ Groq API error:", groqError.message);

        // Check if it's a rate limit/overload error
        if (isOverloadError(groqError) && hasGeminiKey) {
          console.log("🔄 Switching to Gemini API (backup)...");
          try {
            return await sendToGemini(
              message,
              formattedMessages,
              geminiApiKey,
              systemPrompt
            );
          } catch (geminiError) {
            console.warn("⚠️ Gemini API also failed:", geminiError.message);
            // Trả về thông báo rate limit nếu cả 2 API đều quá tải
            if (isOverloadError(geminiError)) {
              return getMockResponse(message, "rateLimit");
            }
            return getMockResponse(message, "apiError");
          }
        }

        // If not overload error or no Gemini key, fallback to mock
        if (hasGeminiKey) {
          console.log("🔄 Trying Gemini API as fallback...");
          try {
            return await sendToGemini(
              message,
              formattedMessages,
              geminiApiKey,
              systemPrompt
            );
          } catch (geminiError) {
            console.warn("⚠️ Gemini API also failed:", geminiError.message);
            if (isOverloadError(geminiError)) {
              return getMockResponse(message, "rateLimit");
            }
            return getMockResponse(message, "apiError");
          }
        }

        // Groq lỗi và không có Gemini
        if (isOverloadError(groqError)) {
          return getMockResponse(message, "rateLimit");
        }
        return getMockResponse(message, "apiError");
      }
    } else if (hasGeminiKey) {
      // Only Gemini key available
      console.log("🚀 Using Gemini API (no Groq key)...");
      try {
        return await sendToGemini(
          message,
          formattedMessages,
          geminiApiKey,
          systemPrompt
        );
      } catch (err) {
        console.warn("⚠️ Gemini API error:", err.message);
        if (isOverloadError(err)) {
          return getMockResponse(message, "rateLimit");
        }
        return getMockResponse(message, "apiError");
      }
    }

    return getMockResponse(message);
  } catch (error) {
    console.error("Error in sendMessageToAI:", error);
    return MOCK_RESPONSES.apiError;
  }
};

/**
 * Check if error is due to rate limiting or server overload
 */
const isOverloadError = (error) => {
  const message = error.message?.toLowerCase() || "";
  const overloadIndicators = [
    "rate limit",
    "rate_limit",
    "too many requests",
    "429",
    "503",
    "overloaded",
    "capacity",
    "quota",
    "exceeded",
  ];
  return overloadIndicators.some((indicator) => message.includes(indicator));
};

/**
 * Send message to Google Gemini API
 */
const sendToGemini = async (message, previousMessages, apiKey, systemPrompt) => {
  console.log("Sending request to Gemini API...");
  const config = PROVIDER_CONFIGS.gemini;

  // Build conversation history for Gemini format
  const contents = [];

  // Add previous messages
  previousMessages.forEach((msg) => {
    contents.push({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    });
  });

  // Add current user message
  contents.push({
    role: "user",
    parts: [{ text: message }],
  });

  const requestBody = {
    contents,
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    generationConfig: {
      temperature: config.temperature,
      maxOutputTokens: config.maxTokens,
      topP: 0.95,
      topK: 40,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ],
  };

  const url = `${config.baseUrl}/${config.model}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "Unknown error");
    console.error(`Gemini API error (${res.status}): ${errorText}`);
    throw new Error(`Gemini API error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  console.log("Gemini response:", data);

  // Extract text from Gemini response
  const responseText =
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Không có nội dung trả về.";

  return responseText;
};

/**
 * Send message to Groq API (backup provider)
 */
const sendToGroq = async (messages, apiKey) => {
  console.log("Sending request to Groq API...");
  const config = PROVIDER_CONFIGS.groq;

  const requestBody = {
    model: config.defaultModel,
    temperature: config.temperature ?? 0.5,
    messages,
    stream: false,
  };

  const res = await fetch(config.baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "Unknown error");
    console.error(`Groq API error (${res.status}): ${errorText}`);
    throw new Error(`Groq API error (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  console.log("Groq response:", data);
  return data.choices?.[0]?.message?.content || "Không có nội dung trả về.";
};

/**
 * Get mock response for offline/testing mode
 */
const getMockResponse = (message, errorType = null) => {
  // Nếu có lỗi cụ thể, trả về thông báo tương ứng
  if (errorType === "rateLimit") {
    return MOCK_RESPONSES.rateLimit;
  }
  if (errorType === "apiError") {
    return MOCK_RESPONSES.apiError;
  }

  const lowerMessage = message.toLowerCase();

  // Kiểm tra từ khóa và trả về mock response phù hợp
  
  // Lời chào
  if (
    lowerMessage.includes("chào") ||
    lowerMessage.includes("xin chào") ||
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi ")
  ) {
    return MOCK_RESPONSES.greeting;
  }

  // Nhà nước pháp quyền
  if (
    lowerMessage.includes("nhà nước pháp quyền") ||
    lowerMessage.includes("pháp quyền xhcn") ||
    lowerMessage.includes("đặc trưng") ||
    lowerMessage.includes("hiến pháp")
  ) {
    return MOCK_RESPONSES.nhanuoc;
  }

  // Mối quan hệ Đảng - Nhà nước - Nhân dân
  if (
    lowerMessage.includes("mối quan hệ") ||
    lowerMessage.includes("đảng lãnh đạo") ||
    lowerMessage.includes("nhân dân làm chủ") ||
    lowerMessage.includes("nhà nước quản lý") ||
    lowerMessage.includes("đảng - nhà nước")
  ) {
    return MOCK_RESPONSES.moiquanhe;
  }

  // Bộ máy nhà nước
  if (
    lowerMessage.includes("bộ máy") ||
    lowerMessage.includes("quốc hội") ||
    lowerMessage.includes("chính phủ") ||
    lowerMessage.includes("chủ tịch nước") ||
    lowerMessage.includes("tòa án") ||
    lowerMessage.includes("viện kiểm sát")
  ) {
    return MOCK_RESPONSES.bomay;
  }

  // Chủ nghĩa xã hội (chung)
  if (
    lowerMessage.includes("chủ nghĩa xã hội") ||
    lowerMessage.includes("cnxh") ||
    lowerMessage.includes("xã hội chủ nghĩa")
  ) {
    return MOCK_RESPONSES.nhanuoc;
  }

  return MOCK_RESPONSES.default;
};

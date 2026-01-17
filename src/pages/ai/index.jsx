import { Send, Bot, User, Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { sendMessageToAI } from "../../services/aiService";
import "./styles.css";

const AITalkingAvatar = () => {
  return (
    <div className="w-12 h-12 flex items-center justify-center bg-ink border border-ink/20 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.2)] rounded-xl">
      <Bot className="text-bone w-7 h-7" />
    </div>
  );
};

const AIResponse = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full flex gap-4 mb-6"
    >
      <div className="shrink-0 mt-1">
        <AITalkingAvatar />
      </div>
      <div className="bg-white p-5 border border-ink/15 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.2)] rounded-xl max-w-[85%] md:max-w-[75%] relative">
        {/* Decorative corner */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-ember"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-ember"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-ember"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-ember"></div>

        <h4 className="font-display text-ember text-sm mb-2 uppercase tracking-wide">MLN131 Bot</h4>
        <div className="ai-markdown text-graphite font-body leading-relaxed">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};

const UserPrompt = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full flex items-center justify-end gap-3 mb-6"
    >
      <div className="p-5 bg-ink text-bone border border-ink/20 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.2)] rounded-xl max-w-[80%] md:max-w-[70%] text-right relative">
        {/* Decorative corner */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-ember"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-ember"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-ember"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-ember"></div>

        <p className="break-words font-body leading-relaxed">{text}</p>
      </div>
      <div className="shrink-0 w-12 h-12 bg-white flex items-center justify-center border border-ink/10 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.15)] rounded-xl">
        <User className="text-graphite w-6 h-6" />
      </div>
    </motion.div>
  );
};

const AIPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: "ai",
      text: `Chào bạn, mình là trợ lý MLN131. Mình hỗ trợ bạn học môn Chủ nghĩa xã hội khoa học: khái niệm, phương pháp và các chủ đề liên quan. Bạn muốn bắt đầu với nội dung nào?`,
    },
  ]);
  const inputRef = useRef();
  // Use a ref callback to scroll to bottom reliably
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();

    if (!userMessage || isLoading) {
      return;
    }

    const newUserMsg = { role: "user", text: userMessage };
    setChatHistory((prev) => [...prev, newUserMsg]);

    inputRef.current.value = "";
    setIsLoading(true);

    // Initial dummy loading state
    const loadingMsg = { role: "ai", text: "...", isLoading: true };
    setChatHistory((prev) => [...prev, loadingMsg]);

    try {
      const formattedHistory = chatHistory.map((msg) => ({
        role: msg.role === "ai" ? "assistant" : "user",
        content: msg.text,
      }));

      // Append current user message
      formattedHistory.push({ role: "user", content: userMessage });

      const response = await sendMessageToAI(userMessage, formattedHistory);

      setChatHistory((prev) => {
        // Remove loading message and add real response
        const newHistory = prev.filter(msg => !msg.isLoading);
        return [...newHistory, { role: "ai", text: response }];
      });
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prev) => {
        const newHistory = prev.filter(msg => !msg.isLoading);
        return [...newHistory, {
          role: "ai",
          text: "Xin lỗi, Cộng đang gặp chút sự cố kết nối. Bạn thử lại sau nhé!",
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-10 px-4 md:px-8 bg-bone flex flex-col items-center">
      <div className="w-full max-w-5xl flex-1 flex flex-col h-[calc(100vh-160px)]">

        {/* Header Section */}
        <div className="text-center mb-8 shrink-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-ink/10 text-ember font-semibold text-sm mb-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-full">
            <Sparkles size={16} className="text-ember fill-ember" />
            <span className="font-display">Trợ lý ảo • MLN131</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display text-graphite uppercase drop-shadow-sm flex items-center justify-center gap-3 text-center">
            Hỏi đáp nhanh cùng <span className="text-ember underline decoration-4 underline-offset-4 decoration-copper">MLN131 Bot</span>
          </h1>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-white border border-ink/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col relative overflow-hidden rounded-2xl">

          {/* Decorative Header Bar */}
          <div className="h-10 bg-ink flex items-center justify-between px-4 shrink-0">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-ember/80 border border-white/20"></div>
              <div className="w-3 h-3 rounded-full bg-olive/80 border border-white/20"></div>
              <div className="w-3 h-3 rounded-full bg-copper/80 border border-white/20"></div>
            </div>
            <div className="text-white/60 text-xs font-mono">MLN131_CONSOLE</div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth custom-scrollbar bg-[radial-gradient(rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:16px_16px] [background-color:#fff]">
            <AnimatePresence>
              {chatHistory.map((msg, index) => (
                <div key={index}>
                  {msg.role === "ai" ? (
                    <AIResponse text={msg.text} />
                  ) : (
                    <UserPrompt text={msg.text} />
                  )}
                </div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-bone border-t border-ink/10 shrink-0">
            <form
              onSubmit={handleFormSubmit}
              className="relative flex items-center gap-3 max-w-4xl mx-auto"
            >
              <input
                ref={inputRef}
                type="text"
                disabled={isLoading}
                placeholder="Nhập câu hỏi của bạn tại đây..."
                className="w-full pl-6 pr-16 py-4 bg-white border border-ink/15 rounded-xl font-body text-graphite placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-ember/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-3 p-2 bg-ember text-bone border border-ink/15 rounded-lg hover:bg-copper disabled:bg-gray-300 disabled:border-gray-200 transition-colors shadow-sm"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send size={24} />
                )}
              </button>
            </form>
            <p className="text-center text-xs text-graphite/60 mt-3 font-mono">
              * AI có thể mắc lỗi. Hãy kiểm tra lại thông tin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPage;

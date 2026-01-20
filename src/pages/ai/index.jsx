import { Send, Bot, User } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { sendMessageToAI } from "../../services/aiService";

import { KineticHeading, KineticSubline } from "../../components/ui/KineticText";

const AITalkingAvatar = () => {
  return (
    <div className="w-12 h-12 flex items-center justify-center bg-ink border-2 border-ink shadow-hard-sm rounded-sm">
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
      <div className="bg-white p-5 border-2 border-ink shadow-hard rounded-sm max-w-[85%] md:max-w-[75%] relative">
        {/* Decorative corner */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-ember"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-ember"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-ember"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-ember"></div>

        <h4 className="font-display text-ember text-base mb-2 uppercase tracking-wide">MLN131 Bot</h4>
        <div className="ai-markdown text-graphite font-body text-lg leading-relaxed">
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
      <div className="p-5 bg-ink text-bone border-2 border-ink shadow-hard rounded-sm max-w-[80%] md:max-w-[70%] text-right relative">
        {/* Decorative corner */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-ember"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-ember"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-ember"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-ember"></div>

        <p className="break-words font-body leading-relaxed">{text}</p>
      </div>
      <div className="shrink-0 w-12 h-12 bg-white flex items-center justify-center border-2 border-ink shadow-hard-sm rounded-sm">
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
      <div className="w-full max-w-screen-xl flex-1 flex flex-col h-[calc(100vh-160px)] px-4 lg:px-8">

        {/* Header Section */}
        <div className="text-center mb-6 shrink-0 space-y-4">
          <KineticHeading
            align="center"
            title="Hỏi đáp cùng MLN131 Bot"
            size="lg"
          />
          <KineticSubline className="text-center max-w-3xl mx-auto">
            Đặt câu hỏi về Chủ nghĩa xã hội khoa học, lịch sử tư tưởng, thời kỳ quá độ và nhận giải thích súc tích.
          </KineticSubline>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-white border-2 border-ink shadow-hard-lg flex flex-col relative overflow-hidden rounded-sm kinetic-grid">

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
          <div
            id="chat_content"
            className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth custom-scrollbar bg-[radial-gradient(rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:16px_16px] [background-color:#fff]"
          >
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
                className="w-full pl-6 pr-16 py-4 bg-white border-2 border-ink rounded-sm font-body text-graphite placeholder:text-gray-500 focus:outline-none focus:ring-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-hard-sm"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-3 p-2 bg-ember text-bone border-2 border-ink rounded-sm hover:bg-copper disabled:bg-gray-300 disabled:border-gray-200 transition-colors shadow-hard-sm"
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

import { motion } from "framer-motion";
import "./styles.css";

const AiUsagePage = () => {
  return (
    <div className="min-h-screen bg-bone pt-24 pb-16 px-4 md:px-10 ai-usage-shell">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel rounded-2xl p-10 md:p-14 accent-grid relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_15%_25%,rgba(218,37,29,0.08),transparent_35%),radial-gradient(circle_at_85%_5%,rgba(255,205,0,0.1),transparent_30%)]"></div>
        <div className="relative z-10 space-y-6 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-ink text-bone rounded-full text-xs font-semibold tracking-wide">
            MLN131 • Công cụ AI
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-graphite leading-tight">
            Đang để trống để bạn thêm nội dung
          </h1>
          <p className="text-graphite/70 text-lg">
            Khu vực này sẽ mô tả các công cụ AI, quy trình và hướng dẫn sử dụng phục vụ môn học. Hiện tại được để trống để bạn tự điền sau.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 border border-ink/15 rounded-lg bg-white text-graphite/70 text-sm">
              Nội dung trống tạm thời
            </span>
            <a href="/ai-chatbot" className="px-5 py-3 bg-crimson text-bone rounded-lg font-semibold shadow-[0_10px_30px_rgba(218,37,29,0.25)] hover:bg-red-700 transition-colors">
              Trò chuyện với trợ lý
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AiUsagePage;

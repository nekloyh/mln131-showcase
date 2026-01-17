import "./styles.css";
import { motion } from "framer-motion";

const TransitionPeriodPage = () => {
  return (
    <div className="min-h-screen w-full transition-shell bg-bone pt-24 pb-16 px-4 md:px-10 text-graphite">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="panel rounded-2xl p-10 md:p-14 accent-grid relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_12%_18%,rgba(219,58,52,0.14),transparent_32%),radial-gradient(circle_at_88%_12%,rgba(91,117,83,0.12),transparent_30%)]" />
          <div className="relative z-10 space-y-6 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-ink text-bone rounded-full text-xs font-semibold tracking-wide">
              MLN131 • Thời kì quá độ
            </span>
            <h1 className="font-display text-4xl md:text-5xl leading-tight text-graphite">
              Nội dung đang chờ cập nhật
            </h1>
            <p className="text-graphite/70 text-lg leading-relaxed">
              Trang "Thời kì quá độ" sẽ chứa giáo trình, lược đồ và tư liệu minh họa trong phiên bản tới. Hiện tại, khu vực này được để trống để bạn tùy chỉnh.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 border border-ink/15 rounded-lg bg-white text-graphite/70 text-sm">
                Chưa có nội dung
              </span>
              <a
                className="px-5 py-3 bg-ember text-bone rounded-lg font-semibold shadow-[0_10px_30px_rgba(219,58,52,0.25)]"
                href="/ai-chatbot"
              >
                Hỏi trợ lý MLN131
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TransitionPeriodPage;

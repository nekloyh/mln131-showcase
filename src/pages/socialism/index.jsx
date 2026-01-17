import { motion } from "framer-motion";
import "./styles.css";

const SocialismPage = () => {
  return (
    <div className="page-shell min-h-screen pt-24 pb-16 px-4 md:px-10">
      <section className="panel rounded-2xl p-10 md:p-14 accent-grid relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_20%,rgba(178,34,52,0.1),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(91,117,83,0.12),transparent_30%)]"></div>
        <div className="relative z-10 space-y-6 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-ink text-bone rounded-full text-xs font-semibold tracking-wide">
            MLN131 • Chủ nghĩa xã hội khoa học
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-graphite leading-tight">
            Khung nội dung sẽ được cập nhật
          </h1>
          <p className="text-graphite/70 text-lg">
            Trang "Chủ nghĩa xã hội khoa học" đang được làm mới. Toàn bộ nội dung chi tiết sẽ được bổ sung sau. Bạn có thể dùng mục Trợ lý MLN131 để đặt câu hỏi trong lúc chờ.
          </p>
          <div className="flex flex-wrap gap-3">
            <motion.a
              whileHover={{ y: -2 }}
              href="/ai-chatbot"
              className="px-5 py-3 bg-ember text-bone font-semibold rounded-lg shadow-[0_10px_30px_rgba(219,58,52,0.25)]"
            >
              Mở Trợ lý MLN131
            </motion.a>
            <span className="px-5 py-3 border border-ink/10 rounded-lg bg-white text-graphite/70 text-sm">
              Nội dung trống tạm thời
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SocialismPage;

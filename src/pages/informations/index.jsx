import { motion } from "framer-motion";
import "./styles.css";

const InformationsPage = () => {
  return (
    <div id="informations_page" className="min-h-screen w-full pt-24 pb-16 px-4 md:px-10 info-shell">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel rounded-2xl p-10 md:p-14 accent-grid relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_20%_10%,rgba(219,58,52,0.08),transparent_35%),radial-gradient(circle_at_90%_0%,rgba(91,117,83,0.08),transparent_30%)]"></div>
        <div className="relative z-10 space-y-6 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-ink text-bone rounded-full text-xs font-semibold tracking-wide">
            MLN131 • Thông tin môn học
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-graphite leading-tight">
            Trang thông tin đang để trống
          </h1>
          <p className="text-graphite/70 text-lg">
            Bạn có thể thêm thành viên nhóm, tài liệu tham khảo và ghi chú môn học tại đây. Nội dung hiện đang được để trống theo yêu cầu.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 border border-ink/15 rounded-lg bg-white text-graphite/70 text-sm">
              Chưa có dữ liệu
            </span>
            <a href="/" className="px-5 py-3 bg-ember text-bone rounded-lg font-semibold shadow-[0_10px_30px_rgba(219,58,52,0.25)]">
              Quay lại trang chủ
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InformationsPage;

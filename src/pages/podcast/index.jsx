import { motion } from "framer-motion";

const PodcastPage = () => {
  return (
    <div className="min-h-screen w-full bg-bone pt-24 pb-16 px-4 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel rounded-2xl p-10 md:p-14 accent-grid relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_25%_10%,rgba(219,58,52,0.08),transparent_35%),radial-gradient(circle_at_85%_5%,rgba(91,117,83,0.08),transparent_30%)]"></div>
        <div className="relative z-10 space-y-6 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-ink text-bone rounded-full text-xs font-semibold tracking-wide">
            MLN131 • Podcast / Media
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-graphite leading-tight">
            Media sẽ được bổ sung sau
          </h1>
          <p className="text-graphite/70 text-lg">
            Khu vực này dành cho podcast, video hoặc tư liệu minh họa. Hiện đang để trống và sẽ được cập nhật sau khi nội dung mới sẵn sàng.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 border border-ink/15 rounded-lg bg-white text-graphite/70 text-sm">
              Chưa có media
            </span>
            <a href="/" className="px-5 py-3 bg-ember text-bone rounded-lg font-semibold shadow-[0_10px_30px_rgba(219,58,52,0.25)]">
              Về trang chủ
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PodcastPage;

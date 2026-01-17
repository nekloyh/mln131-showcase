import "./style.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const sections = [
  { title: "Khái lược CNXHKH", path: "/chu-nghia-xa-hoi" },
  { title: "Thời kì quá độ", path: "/thoi-ki-qua-do" },
  { title: "Podcast & Media", path: "/video-podcast" },
  { title: "Trợ lý học tập", path: "/ai-chatbot" },
  { title: "Công cụ AI", path: "/ai-usage" },
  { title: "Thông tin môn học", path: "/informations" },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-shell min-h-screen w-full pt-24 pb-16 px-4 md:px-10 flex flex-col gap-10">
      <section className="panel accent-grid rounded-2xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_20%_20%,rgba(219,58,52,0.14),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(91,117,83,0.12),transparent_35%)]"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-ink text-bone rounded-full shadow-lg shadow-ink/15">
              <span className="text-xs font-mono uppercase tracking-widest">MLN131</span>
              <span className="text-xs font-semibold opacity-80">Chủ nghĩa xã hội khoa học</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl leading-tight text-graphite">
              Tái thiết kế không gian học tập cho môn <span className="text-ember">MLN131</span>
            </h1>

            <p className="text-base md:text-lg text-graphite/75 max-w-2xl">
              Giao diện mới tối giản, tập trung vào trải nghiệm học tập và sẽ được cập nhật nội dung chi tiết trong các phiên bản kế tiếp. Hãy bắt đầu từ các mục dưới đây.
            </p>

            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={() => navigate("/chu-nghia-xa-hoi")}
                className="px-5 py-3 bg-ember text-bone font-semibold rounded-lg shadow-[0_10px_30px_rgba(219,58,52,0.25)]"
              >
                Khám phá ngay
              </motion.button>
              <button
                onClick={() => navigate("/ai-chatbot")}
                className="px-5 py-3 border border-ink/15 bg-white text-graphite font-semibold rounded-lg hover:bg-sand"
              >
                Trợ lý MLN131
              </button>
            </div>
          </div>

          <div className="relative w-full h-full">
            <div className="absolute -inset-6 bg-gradient-to-br from-ember/10 via-white to-olive/10 blur-3xl"></div>
            <div className="relative grid grid-cols-2 gap-4">
              {["Khái niệm", "Lộ trình", "Phương pháp", "Thực tiễn"].map((label, idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-5 rounded-xl border border-ink/10 bg-white shadow-sm"
                >
                  <div className="text-sm text-graphite/70">Chủ đề</div>
                  <div className="font-display text-lg text-graphite">{label}</div>
                  <div className="mt-3 text-xs text-graphite/50">Nội dung sẽ được cập nhật</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <motion.button
            key={section.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => navigate(section.path)}
            className="text-left p-6 rounded-2xl border border-ink/10 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-mono text-graphite/60">0{index + 1}</span>
              <ArrowRight className="text-ember" size={20} />
            </div>
            <h3 className="font-display text-xl text-graphite mb-2">{section.title}</h3>
            <p className="text-sm text-graphite/60">Nội dung đang được biên soạn cho phiên bản mới.</p>
          </motion.button>
        ))}
      </section>
    </div>
  );
};

export default HomePage;

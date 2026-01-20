import "./style.css";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Quote } from "lucide-react";
import TiltCard from "../../components/ui/TiltCard";
import { KineticHeading, KineticSubline, MarqueeStrip } from "../../components/ui/KineticText";

const HomePage = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const featurePills = [
    "Quyền lực thuộc về Nhân dân",
    "Thượng tôn Hiến pháp & Pháp luật",
    "Đảng lãnh đạo - Nhà nước quản lý",
  ];

  return (
    <div className="home-shell w-full bg-sand selection:bg-ink selection:text-gold">
      {/* FRAME 1: HERO - Introduction */}
      <section className="min-h-screen relative flex items-center justify-center px-4 md:px-10 overflow-hidden pt-24 border-b-4 border-ink">
        <div className="absolute inset-0 home-hero-overlay pointer-events-none mix-blend-multiply opacity-20" />
        <div className="absolute inset-0 opacity-[0.1] floating-words font-mono uppercase" />
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute top-24 left-4 md:left-12 text-5xl md:text-8xl font-black font-display text-ink tracking-tighter select-none pointer-events-none rotate-90 origin-top-left opacity-10"
        >
          SCIENTIFIC SOCIALISM
        </motion.div>

        <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10 relative px-4 lg:px-12">

          {/* Grids/Lines decoration */}
          <div className="absolute -left-10 top-0 bottom-0 w-[1px] bg-ink/20 hidden lg:block"></div>
          <div className="absolute -right-10 top-0 bottom-0 w-[1px] bg-ink/20 hidden lg:block"></div>

          <motion.div
            style={{ y: yHero, opacity: opacityHero }}
            className="space-y-8"
          >
            <KineticHeading
              title="Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam"
              size="xl"
            />

            <KineticSubline className="max-w-xl">
              Một nhà nước của Nhân dân, do Nhân dân, vì Nhân dân. Xây dựng nhà nước pháp quyền là yêu cầu tất yếu để bảo đảm quyền lực thuộc về nhân dân trong thời kỳ quá độ.
            </KineticSubline>

            <div className="flex flex-wrap gap-3">
              {featurePills.map((pill, idx) => (
                <motion.div
                  key={pill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  className="px-4 py-3 border-2 border-ink bg-bone text-ink font-mono text-sm md:text-base font-bold uppercase hover:bg-gold hover:translate-y-[-2px] hover:shadow-hard-sm transition-all cursor-crosshair"
                >
                  {pill}
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t-2 border-ink border-dashed w-max">
              <button
                onClick={() => document.getElementById("quote-section")?.scrollIntoView({ behavior: "smooth" })}
                className="p-3 border-2 border-ink bg-crimson text-bone shadow-hard hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all active:bg-ink"
                aria-label="Cuộn xuống"
              >
                <ChevronDown size={24} strokeWidth={3} />
              </button>
              <span className="text-base md:text-lg font-bold font-mono text-ink/70 uppercase tracking-wider">SCROLL DOWN_</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative p-2 border-2 border-ink bg-bone shadow-hard-lg"
          >
            <TiltCard className="w-full aspect-[4/3] overflow-hidden border-2 border-ink grayscale hover:grayscale-0 transition-all duration-500">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_Communist_Party_of_Vietnam.svg/1200px-Flag_of_the_Communist_Party_of_Vietnam.svg.png"
                alt="Communist Party of Vietnam Flag"
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-ink/40 flex flex-col justify-end p-6 border-t-2 border-ink">
                <p className="text-bone font-mono text-xl font-black uppercase bg-ink w-fit px-2 py-1">Thượng tôn Hiến pháp</p>
                <p className="text-gold font-mono text-sm uppercase bg-ink w-fit px-2 py-1 mt-1">& Pháp luật</p>
              </div>
            </TiltCard>

            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-8 -right-8 px-4 py-2 border-2 border-ink bg-gold text-ink font-mono font-bold text-sm shadow-hard z-20"
            >
              POWER • PEOPLE • PROGRESS
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FRAME 3: QUOTE & PRINCIPLES */}
      <section
        id="quote-section"
        className="min-h-[70vh] py-20 px-4 md:px-10 flex items-center justify-center bg-ink text-sand relative overflow-hidden border-b-4 border-bone"
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#F0F0E0 1px, transparent 1px), linear-gradient(to right, #F0F0E0 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>

        <div className="max-w-screen-lg mx-auto text-center relative z-10 space-y-12 px-4 lg:px-8">
          <div className="w-12 h-12 bg-crimson mx-auto flex items-center justify-center border-2 border-sand shadow-hard">
            <Quote className="w-6 h-6 text-sand" strokeWidth={3} />
          </div>

          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-2xl md:text-5xl font-bold leading-tight tracking-tighter uppercase border-l-8 border-crimson pl-6 text-left md:text-center md:border-l-0"
          >
            "Quyền lực nhà nước là <span className="text-crimson bg-bone px-2">thống nhất</span>, có sự phân công, phối hợp và kiểm soát giữa các cơ quan nhà nước."
          </motion.blockquote>

          <div className="border-y-2 border-sand py-4 bg-ink/50 backdrop-blur-none">
            <MarqueeStrip
              text="Lập pháp // Hành pháp // Tư pháp"
              speed={20}
              tone="dark"
              className="bg-transparent text-sand font-mono font-bold uppercase tracking-widest text-lg"
            />
          </div>
        </div>
      </section>

      {/* FRAME 4: NAVIGATION / PROBLEM STATEMENT */}
      <section className="min-h-screen py-24 px-4 md:px-10 bg-white flex flex-col justify-center">
        <div className="max-w-screen-2xl mx-auto w-full space-y-12 px-4 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <KineticHeading
                title="Nghiên cứu chi tiết"
                size="lg"
              />
              <KineticSubline>
                Để hiểu rõ cách vận hành bộ máy nhà nước và mối quan hệ giữa Đảng, Nhà nước, Nhân dân, hãy đi theo từng chặng dưới đây.
              </KineticSubline>

              <div className="space-y-4">
                {[
                  "Cơ cấu tổ chức Quốc hội, Chính phủ, Tòa án",
                  "Phương thức lãnh đạo của Đảng",
                  "Cơ chế giám sát và phản biện xã hội",
                ].map((text, idx) => (
                  <div key={text} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-crimson mt-2.5" />
                    <p className="text-graphite/80 text-lg">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <motion.div
                whileHover={{ x: 5 }}
                onClick={() => navigate("/chu-nghia-xa-hoi")}
                className="cursor-pointer group p-6 rounded-2xl bg-bone border border-ink/5 hover:border-crimson/30 hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-crimson uppercase tracking-wide">Phần II</span>
                  <ArrowRight className="text-ink/20 group-hover:text-crimson transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-ink mb-1 group-hover:text-crimson transition-colors">Cơ cấu tổ chức & Vận hành</h3>
                <p className="text-base text-graphite/60">Quốc hội, Chính phủ, Tòa án và Viện kiểm sát.</p>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                onClick={() => navigate("/thoi-ki-qua-do")}
                className="cursor-pointer group p-6 rounded-2xl bg-bone border border-ink/5 hover:border-crimson/30 hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-crimson uppercase tracking-wide">Phần III, IV, V</span>
                  <ArrowRight className="text-ink/20 group-hover:text-crimson transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-ink mb-1 group-hover:text-crimson transition-colors">Đảng lãnh đạo & Nhân dân làm chủ</h3>
                <p className="text-base text-graphite/60">Mối quan hệ biện chứng và cơ chế giải trình.</p>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                onClick={() => navigate("/tro-choi")}
                className="cursor-pointer group p-6 rounded-2xl bg-gradient-to-r from-crimson to-ember text-white shadow-lg shadow-crimson/20"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-white/80 uppercase tracking-wide">Giải trí</span>
                  <ArrowRight className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-1">Thử thách kiến thức</h3>
                <p className="text-base text-white/80">Ôn tập qua các trò chơi trắc nghiệm thú vị.</p>
              </motion.div>
            </div>
          </div>

          <MarqueeStrip text="Học - Liên hệ thực tiễn - Phản biện - Hành động" speed={26} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;

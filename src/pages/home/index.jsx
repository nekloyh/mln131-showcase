import "./style.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  ChevronDown,
  Quote,
  Users,
  Scale,
  FileText,
  Activity,
} from "lucide-react";
import TiltCard from "../../components/ui/TiltCard";
import {
  KineticHeading,
  KineticSubline,
  MarqueeStrip,
} from "../../components/ui/KineticText";
import Section from "../../components/layout/Section";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const HomePage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const featurePills = [
    "Quyền lực thuộc về Nhân dân",
    "Thượng tôn Hiến pháp & Pháp luật",
    "Đảng lãnh đạo - Nhà nước quản lý",
  ];

  return (
    <div
      ref={containerRef}
      className="home-shell w-full bg-sand selection:bg-ink selection:text-gold snap-container h-screen overflow-y-scroll"
    >
      {/* SECTION 1: HERO - Introduction */}
      <Section className="items-center justify-center pt-32 pb-20 border-b-2 border-ink bg-bone min-h-screen">
        <div className="absolute inset-0 home-hero-overlay pointer-events-none mix-blend-multiply opacity-20" />
        <div className="absolute inset-0 opacity-[0.03] floating-words font-display uppercase text-[12rem] leading-none break-all overflow-hidden pointer-events-none select-none text-crimson">
          SOCIALISMSCIENTIFIC
        </div>

        <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10 relative">
          {/* Grids/Lines decoration */}
          <div className="absolute -left-10 top-0 bottom-0 w-[2px] bg-ink/10 hidden lg:block"></div>
          <div className="absolute -right-10 top-0 bottom-0 w-[2px] bg-ink/10 hidden lg:block"></div>

          <motion.div
            style={{ y: yHero, opacity: opacityHero }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-ink text-bone border-2 border-transparent hover:border-crimson hover:text-crimson transition-colors">
              <span className="w-2 h-2 bg-current rounded-full animate-pulse"></span>
              <span className="font-mono text-xs uppercase tracking-widest">
                MLN131 Showcase
              </span>
            </div>

            <div className="relative">
              <motion.h1
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="font-display font-black text-7xl md:text-9xl uppercase text-ink leading-[0.85] tracking-tighter drop-shadow-hard"
              >
                CHỦ NGHĨA
              </motion.h1>
              <motion.h1
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
                className="font-display font-black text-7xl md:text-9xl uppercase text-transparent text-stroke-red leading-[0.85] tracking-tighter"
              >
                XÃ HỘI
              </motion.h1>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                className="font-display font-black text-7xl md:text-9xl uppercase text-ink leading-[0.85] tracking-tighter drop-shadow-hard pl-2"
              >
                KHOA HỌC
              </motion.h1>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-10 -right-10 w-24 h-24 bg-gold rounded-full flex items-center justify-center border-4 border-ink shadow-hard hidden md:flex"
              >
                <span className="font-black text-xl transform -rotate-12">
                  2026
                </span>
              </motion.div>
            </div>

            <KineticSubline className="max-w-xl text-ink/80 text-lg font-medium border-l-4 border-crimson pl-4 ml-2">
              Hệ thống tri thức lý luận về sứ mệnh lịch sử của giai cấp công
              nhân và con đường đi lên chủ nghĩa xã hội.
            </KineticSubline>

            <div className="flex flex-wrap gap-3 pt-4">
              {featurePills.map((pill, idx) => (
                <motion.div
                  key={pill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="px-4 py-2 border-2 border-ink bg-white text-ink font-mono text-xs font-bold uppercase hover:bg-gold hover:-translate-y-1 hover:shadow-hard transition-all cursor-crosshair"
                >
                  {pill}
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-8 w-max">
              <Button
                variant="danger"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("quote-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="gap-2 shadow-hard hover:shadow-hard-lg hover:translate-x-1 transition-all"
              >
                Bắt đầu khám phá <ArrowRight size={20} strokeWidth={3} />
              </Button>
            </div>
          </motion.div>

          {/* Hero Image / Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-4 bg-ink transform rotate-2 rounded-sm opacity-20"></div>
            <TiltCard className="w-full aspect-[4/3] bg-bone border-4 border-ink shadow-hard-xl p-0 relative group">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-b-4 border-r-4 border-ink bg-gold z-20"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-t-4 border-l-4 border-ink bg-crimson z-20"></div>

              <div className="w-full h-full relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_Communist_Party_of_Vietnam.svg/1200px-Flag_of_the_Communist_Party_of_Vietnam.svg.png"
                  alt="Vietnam Communist Party Flag"
                  className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-1000"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60"></div>

                {/* Text Overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <p className="text-gold font-mono text-sm uppercase tracking-widest mb-1">
                    Since 1930
                  </p>
                  <p className="text-white font-display text-4xl font-black uppercase leading-none drop-shadow-md">
                    Độc lập <br />
                    <span className="text-transparent text-stroke-white">
                      Tự do
                    </span>{" "}
                    <br />
                    Hạnh phúc
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* Floating Element */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-paper border-2 border-ink p-4 shadow-hard flex items-center gap-3 max-w-xs z-30"
            >
              <div className="w-10 h-10 bg-crimson rounded-full flex items-center justify-center text-white font-bold">
                !
              </div>
              <p className="font-mono text-xs font-bold leading-tight">
                TRIẾT HỌC MÁC - LÊNIN <br /> CHO THỜI ĐẠI MỚI
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* SECTION 2: QUOTE & PRINCIPLES */}
      <Section
        id="quote-section"
        className="items-center justify-center bg-ink text-sand border-b-2 border-bone"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#F0F0E0 1px, transparent 1px), linear-gradient(to right, #F0F0E0 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="max-w-screen-lg mx-auto text-center relative z-10 space-y-12">
          <div className="w-16 h-16 bg-crimson mx-auto flex items-center justify-center border-2 border-sand shadow-[4px_4px_0px_0px_#F0F0E0]">
            <Quote className="w-8 h-8 text-sand" strokeWidth={3} />
          </div>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight uppercase"
          >
            "Quyền lực nhà nước là{" "}
            <span className="text-ink bg-crimson px-2 box-decoration-clone">
              thống nhất
            </span>
            , có sự phân công, phối hợp và kiểm soát giữa các cơ quan nhà nước."
          </motion.blockquote>

          <div className="py-8">
            <MarqueeStrip
              text="Lập pháp // Hành pháp // Tư pháp"
              speed={30}
              tone="dark"
              className="bg-transparent text-sand/50 font-display font-bold uppercase tracking-widest text-xl border-none"
            />
          </div>
        </div>
      </Section>

      {/* SECTION 3: PEOPLE'S MASTERSHIP (Topic 4) */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-sand"
      >
        <div className="max-w-screen-2xl mx-auto w-full py-16">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-display font-black text-ink uppercase">
              QUYỀN LÀM CHỦ <br />
              <span className="text-crimson">CỦA NHÂN DÂN</span>
            </h2>
            <KineticSubline className="text-center max-w-3xl mx-auto">
              Nhà nước là công cụ thực hiện quyền làm chủ của Nhân dân.
            </KineticSubline>
          </div>

          {/* Infographic Style Layout */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card
              variant="flat"
              hoverEffect
              className="p-8 border-t-8 border-t-blue-600 flex flex-col"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6 border-2 border-blue-600 shadow-[4px_4px_0px_0px_#2563EB]">
                <Users size={32} strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 uppercase">
                Nhà nước phục vụ
              </h3>
              <p className="text-lg text-graphite/80 mb-6 flex-grow">
                Nhà nước sinh ra không phải để cai trị mà để phục vụ lợi ích của
                Nhân dân.
              </p>
              <div className="h-2 w-16 bg-blue-600"></div>
            </Card>

            <Card
              variant="flat"
              hoverEffect
              className="p-8 border-t-8 border-t-ember flex flex-col"
            >
              <div className="w-16 h-16 bg-ember/20 rounded-lg flex items-center justify-center text-ember mb-6 border-2 border-ember shadow-[4px_4px_0px_0px_#FF5500]">
                <FileText size={32} strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 uppercase">
                Nhân dân làm chủ
              </h3>
              <p className="text-lg text-graphite/80 mb-6 flex-grow">
                Nhân dân thực hiện quyền làm chủ trực tiếp và gián tiếp đối với
                Nhà nước.
              </p>
              <div className="h-2 w-16 bg-ember"></div>
            </Card>

            <Card
              variant="flat"
              hoverEffect
              className="p-8 border-t-8 border-t-purple-600 flex flex-col"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6 border-2 border-purple-600 shadow-[4px_4px_0px_0px_#9333EA]">
                <Scale size={32} strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 uppercase">
                Quyền & Nghĩa vụ
              </h3>
              <p className="text-lg text-graphite/80 mb-6 flex-grow">
                Mối quan hệ pháp lý 2 chiều: Công dân được hưởng quyền và phải
                thực hiện nghĩa vụ đối với Nhà nước.
              </p>
              <div className="h-2 w-16 bg-purple-600"></div>
            </Card>
          </div>

          <div className="mt-16">
            <MarqueeStrip
              text="MỐI LIÊN HỆ CÔNG DÂN - NHÀ NƯỚC • QUYỀN LỢI ĐI ĐÔI VỚI NGHĨA VỤ"
              speed={26}
              tone="dark"
              className="font-display font-bold uppercase tracking-widest text-xl border-2 border-ink shadow-hard"
            />
          </div>
        </div>
      </Section>

      {/* SECTION 4: STUDENT RESPONSIBILITY (Topic 5) */}
      <Section className="items-center justify-center px-4 md:px-10 bg-white">
        <div className="max-w-screen-2xl mx-auto w-full py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-black text-ink uppercase mb-6">
              Trách nhiệm <span className="text-crimson">Sinh viên</span>
            </h2>
            <p className="text-xl italic text-graphite/60 font-body">
              "Chúng ta cần làm gì?"
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Responsibility 1 */}
            <div className="bg-bone border-2 border-ink p-6 shadow-hard hover:-translate-y-1 transition-transform h-full">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="font-bold text-xl uppercase mb-3 text-ink">
                1. Hiểu đúng
              </h3>
              <p className="text-graphite">
                Tìm hiểu kỹ về Hiến pháp, pháp luật để có nhận thức đúng đắn.
              </p>
            </div>

            {/* Responsibility 2 */}
            <div className="bg-bone border-2 border-ink p-6 shadow-hard hover:-translate-y-1 transition-transform h-full">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-bold text-xl uppercase mb-3 text-ink">
                2. Làm đúng
              </h3>
              <p className="text-graphite">
                Tuân thủ nội quy nhà trường, quy định địa phương, luật giao
                thông, an ninh mạng...
              </p>
            </div>

            {/* Responsibility 3 */}
            <div className="bg-bone border-2 border-ink p-6 shadow-hard hover:-translate-y-1 transition-transform h-full">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-bold text-xl uppercase mb-3 text-ink">
                3. Phản biện đúng
              </h3>
              <p className="text-graphite">
                Góp ý xây dựng văn minh, tỉnh táo trước các luận điệu xuyên tạc
                của thế lực thù địch.
              </p>
            </div>

            {/* Responsibility 4 */}
            <div className="bg-bone border-2 border-ink p-6 shadow-hard hover:-translate-y-1 transition-transform h-full">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-bold text-xl uppercase mb-3 text-ink">
                4. Hành động
              </h3>
              <p className="text-graphite">
                Rèn luyện đạo đức, tri thức. Sinh viên là rường cột của quốc gia
                trong tương lai.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default HomePage;

import "./style.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  ChevronDown,
  Quote,
} from "lucide-react";
import TrongDong3D from "../../components/ui/TrongDong3D";
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

          {/* Hero 3D Model - Trống Đồng */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block lg:col-span-1 xl:scale-110 xl:origin-center"
          >
            {/* 3D Trống Đồng Model - No Frame */}
            <div className="w-[200%] aspect-square relative min-h-[100%] -ml-[50%] -translate-y-20 -translate-x-20">
              <TrongDong3D className="rounded-sm" />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* SECTION 2: PEOPLE'S MASTERSHIP (Topic 4) */}
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
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 border-2 border-blue-600 shadow-[4px_4px_0px_0px_#2563EB]">
                <span className="font-display font-black text-3xl text-blue-600">
                  01
                </span>
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
              <div className="w-16 h-16 bg-ember/20 rounded-lg flex items-center justify-center mb-6 border-2 border-ember shadow-[4px_4px_0px_0px_#FF5500]">
                <span className="font-display font-black text-3xl text-ember">
                  02
                </span>
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
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6 border-2 border-purple-600 shadow-[4px_4px_0px_0px_#9333EA]">
                <span className="font-display font-black text-3xl text-purple-600">
                  03
                </span>
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

      {/* SECTION 3: QUOTE & PRINCIPLES */}
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

      {/* SECTION 4: STUDENT RESPONSIBILITY (Topic 5) */}
      <Section className="items-center justify-center px-4 md:px-10 bg-sand border-t-2 border-ink">
        <div className="max-w-screen-2xl mx-auto w-full py-16">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block bg-crimson border-4 border-ink px-6 py-2 shadow-hard transform -rotate-1 mb-6"
            >
              <span className="font-mono font-bold uppercase tracking-widest text-sm md:text-base text-white">
                Trách nhiệm
              </span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-ink uppercase mb-4">
              Sinh viên <span className="text-crimson">chúng ta</span>
            </h2>
            <p className="text-xl text-graphite/70 font-body max-w-2xl mx-auto">
              "Chúng ta cần làm gì để xứng đáng là công dân tốt?"
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Responsibility 1 */}
            <Card variant="flat" hoverEffect className="p-6 border-t-8 border-t-blue-600 flex flex-col h-full">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4 border-2 border-blue-600 shadow-[4px_4px_0px_0px_#2563EB]">
                <span className="font-display font-black text-2xl text-blue-600">01</span>
              </div>
              <h3 className="font-display text-xl font-bold uppercase mb-3 text-ink">
                Hiểu đúng
              </h3>
              <p className="text-graphite/80 flex-grow">
                Tìm hiểu kỹ về Hiến pháp, pháp luật để có nhận thức đúng đắn.
              </p>
              <div className="h-1.5 w-12 bg-blue-600 mt-4"></div>
            </Card>

            {/* Responsibility 2 */}
            <Card variant="flat" hoverEffect className="p-6 border-t-8 border-t-ember flex flex-col h-full">
              <div className="w-14 h-14 bg-ember/20 rounded-lg flex items-center justify-center mb-4 border-2 border-ember shadow-[4px_4px_0px_0px_#FF5500]">
                <span className="font-display font-black text-2xl text-ember">02</span>
              </div>
              <h3 className="font-display text-xl font-bold uppercase mb-3 text-ink">
                Làm đúng
              </h3>
              <p className="text-graphite/80 flex-grow">
                Tuân thủ nội quy nhà trường, quy định địa phương, luật giao
                thông, an ninh mạng...
              </p>
              <div className="h-1.5 w-12 bg-ember mt-4"></div>
            </Card>

            {/* Responsibility 3 */}
            <Card variant="flat" hoverEffect className="p-6 border-t-8 border-t-purple-600 flex flex-col h-full">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4 border-2 border-purple-600 shadow-[4px_4px_0px_0px_#9333EA]">
                <span className="font-display font-black text-2xl text-purple-600">03</span>
              </div>
              <h3 className="font-display text-xl font-bold uppercase mb-3 text-ink">
                Phản biện đúng
              </h3>
              <p className="text-graphite/80 flex-grow">
                Góp ý xây dựng văn minh, tỉnh táo trước các luận điệu xuyên tạc
                của thế lực thù địch.
              </p>
              <div className="h-1.5 w-12 bg-purple-600 mt-4"></div>
            </Card>

            {/* Responsibility 4 */}
            <Card variant="flat" hoverEffect className="p-6 border-t-8 border-t-gold flex flex-col h-full">
              <div className="w-14 h-14 bg-gold/20 rounded-lg flex items-center justify-center mb-4 border-2 border-gold shadow-[4px_4px_0px_0px_#D4A300]">
                <span className="font-display font-black text-2xl text-gold">04</span>
              </div>
              <h3 className="font-display text-xl font-bold uppercase mb-3 text-ink">
                Hành động
              </h3>
              <p className="text-graphite/80 flex-grow">
                Rèn luyện đạo đức, tri thức. Sinh viên là rường cột của quốc gia
                trong tương lai.
              </p>
              <div className="h-1.5 w-12 bg-gold mt-4"></div>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default HomePage;

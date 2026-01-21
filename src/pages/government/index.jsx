import { motion } from "framer-motion";
import {
  KineticHeading,
  KineticSubline,
} from "../../components/ui/KineticText";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
import {
  GitGraph,
  Network,
  ShieldAlert,
  Activity,
  ArrowDown,
  CheckCircle,
  RefreshCw,
} from "lucide-react";

const BoMayNhaNuocPage = () => {
  return (
    <div className="page-shell w-full bg-bone selection:bg-ink selection:text-gold snap-container">
      {/* SECTION 1: HEADER */}
      <Section className="items-center justify-center px-4 md:px-10 border-b-2 border-ink bg-bone">
        <div className="flex flex-col items-center justify-center space-y-8 max-w-5xl mx-auto w-full relative z-10">
          {/* Top Label Box */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-ink border-4 border-ink px-6 py-2 shadow-hard transform rotate-1"
          >
            <span className="font-mono font-bold uppercase tracking-widest text-sm md:text-base text-bone">
              Communist Party of Vietnam
            </span>
          </motion.div>

          {/* Main Title Block */}
          <div className="relative text-center">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="font-display font-black text-6xl md:text-8xl uppercase text-ink leading-[0.85] tracking-tighter drop-shadow-hard"
            >
              ĐẢNG CỘNG SẢN
            </motion.h1>

            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="font-display font-black text-6xl md:text-8xl uppercase text-transparent text-stroke-black leading-[0.85] tracking-tighter"
            >
              VIỆT NAM
            </motion.h1>
          </div>

          {/* Quote Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white border-4 border-crimson p-6 md:p-8 shadow-hard-lg max-w-2xl transform -rotate-1 mt-8 relative"
          >
            <p className="font-body text-xl md:text-2xl text-ink text-center font-medium italic">
              "Đảng lãnh đạo, Nhà nước quản lý,{" "}
              <span className="bg-crimson/10 px-1 font-bold text-crimson not-italic">
                Nhân dân làm chủ
              </span>
              ."
            </p>
          </motion.div>

          {/* Decorative Arrow */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 text-ink opacity-50"
          >
            <ArrowDown size={32} />
          </motion.div>
        </div>
      </Section>

      {/* SECTION 2: PARTY LEADERSHIP (Topic 3) */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 bg-white"
      >
        <div className="max-w-screen-2xl mx-auto w-full py-16">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-crimson/20 to-gold/20 rounded-sm -rotate-2 transform scale-105"></div>
              <Card variant="default" className="p-10 rotate-1 kinetic-grid">
                <h3 className="font-display text-3xl font-bold text-crimson mb-8 uppercase border-b-2 border-crimson/20 pb-4">
                  1. Vì sao Đảng lãnh đạo?
                </h3>
                <ul className="space-y-6">
                  <li className="flex gap-4 items-start">
                    <CheckCircle
                      className="text-crimson shrink-0 mt-1"
                      size={24}
                    />
                    <div className="text-graphite font-medium text-lg">
                      <strong className="block text-ink">
                        Bản chất của Đảng:
                      </strong>
                      Là đội tiên phong của giai cấp công nhân, Nhân dân lao
                      động.
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <CheckCircle
                      className="text-crimson shrink-0 mt-1"
                      size={24}
                    />
                    <div className="text-graphite font-medium text-lg">
                      <strong className="block text-ink">
                        Đại diện cho lợi ích:
                      </strong>
                      <ul className="list-disc list-inside mt-1 ml-2 text-base text-graphite/80">
                        <li>Giai cấp công nhân</li>
                        <li>Nhân dân lao động</li>
                        <li>Dân tộc Việt Nam</li>
                      </ul>
                    </div>
                  </li>
                  <li className="bg-crimson/10 p-4 border-l-4 border-crimson text-crimson font-bold italic">
                    👉 Vai trò lãnh đạo là yêu cầu khách quan của lịch sử.
                  </li>
                </ul>
              </Card>
            </div>

            <div className="order-1 md:order-2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-display font-black text-ink uppercase leading-none">
                2. Đảng lãnh đạo{" "}
                <span className="text-crimson">như thế nào?</span>
              </h2>
              <p className="text-xl text-graphite/80 leading-relaxed font-body">
                Đảng lãnh đạo Nhà nước nhưng tôn trọng chức năng của Nhà nước và
                nguyên tắc pháp quyền.
              </p>

              <div className="bg-paper p-8 border-l-8 border-l-crimson border-y-2 border-r-2 border-ink shadow-hard-md text-base">
                <div className="space-y-6">
                  {/* Item A */}
                  <div>
                    <h4 className="font-bold text-ink mb-2 uppercase tracking-wide flex items-center gap-2">
                      <span className="w-6 h-6 bg-crimson text-white rounded-full flex items-center justify-center text-xs">
                        A
                      </span>
                      Lãnh đạo bằng đường lối
                    </h4>
                    <p className="text-graphite/90 ml-8">
                      Thông qua Cương lĩnh, Đường lối, Nghị quyết.
                    </p>
                  </div>

                  {/* Item B */}
                  <div>
                    <h4 className="font-bold text-ink mb-2 uppercase tracking-wide flex items-center gap-2">
                      <span className="w-6 h-6 bg-crimson text-white rounded-full flex items-center justify-center text-xs">
                        B
                      </span>
                      Nguyên tắc quan trọng
                    </h4>
                    <ul className="list-disc ml-12 text-graphite/90 space-y-1">
                      <li>
                        Không can thiệp trực tiếp vào hoạt động quản lý cụ thể.
                      </li>
                      <li>Tôn trọng chức năng của Nhà nước.</li>
                      <li>Hoạt động trong khuôn khổ Hiến pháp và pháp luật.</li>
                    </ul>
                  </div>

                  <div className="mt-4 pt-4 border-t border-ink/20">
                    <p className="text-lg font-bold text-ink text-center">
                      👉 "Đảng không đứng trên Nhà nước, mà lãnh đạo Nhà nước."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 3: RELATIONSHIP CYCLE */}
      <Section className="items-center justify-center px-4 md:px-10 bg-ink text-bone border-y-2 border-bone">
        <div className="max-w-screen-2xl mx-auto w-full py-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold uppercase mb-4 text-white">
              Cơ chế tổng thể
            </h2>
            <p className="font-mono text-white/60">
              Mối quan hệ biện chứng giữa 3 chủ thể
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 relative">
            {/* Card 1: Party */}
            <div className="w-64 h-64 border-2 border-crimson bg-crimson/10 rounded-full flex flex-col items-center justify-center p-6 text-center shadow-[0_0_30px_rgba(255,42,42,0.2)] md:mr-[-20px] z-10 hover:scale-110 transition-transform duration-300">
              <h3 className="font-display text-2xl font-bold mb-2 text-crimson">
                Đảng Lãnh đạo
              </h3>
              <p className="text-sm opacity-80">
                Đề ra đường lối, chủ trương, định hướng chính trị.
              </p>
            </div>

            {/* Arrow Right */}
            <div className="hidden md:block w-32 h-1 bg-gradient-to-r from-crimson to-white"></div>
            <div className="md:hidden w-1 h-16 bg-gradient-to-b from-crimson to-white"></div>

            {/* Card 2: State */}
            <div className="w-64 h-64 border-2 border-bone bg-white/10 rounded-full flex flex-col items-center justify-center p-6 text-center shadow-[0_0_30px_rgba(255,255,255,0.1)] z-20 hover:scale-110 transition-transform duration-300">
              <h3 className="font-display text-2xl font-bold mb-2 text-white">
                Nhà nước Quản lý
              </h3>
              <p className="text-sm opacity-80">
                Thể chế hóa thành pháp luật, tổ chức thực hiện.
              </p>
            </div>

            {/* Arrow Right */}
            <div className="hidden md:block w-32 h-1 bg-gradient-to-r from-white to-gold"></div>
            <div className="md:hidden w-1 h-16 bg-gradient-to-b from-white to-gold"></div>

            {/* Card 3: People */}
            <div className="w-64 h-64 border-2 border-gold bg-gold/10 rounded-full flex flex-col items-center justify-center p-6 text-center shadow-[0_0_30px_rgba(255,215,0,0.2)] md:ml-[-20px] z-10 hover:scale-110 transition-transform duration-300">
              <h3 className="font-display text-2xl font-bold mb-2 text-gold">
                Nhân dân Làm chủ
              </h3>
              <p className="text-sm opacity-80">
                Kiểm tra, giám sát, thụ hưởng thành quả.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 text-crimson font-mono font-bold uppercase border border-crimson px-4 py-2 rounded-full animate-pulse">
              <RefreshCw size={16} />
              Chu trình khép kín & liên tục
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default BoMayNhaNuocPage;

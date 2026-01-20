import { motion } from "framer-motion";
import { CheckCircle, Users, Scale, FileText, Activity, RefreshCw, ArrowDown } from "lucide-react";
import { KineticHeading, KineticSubline, MarqueeStrip } from "../../components/ui/KineticText";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";

const DangVaNhanDanPage = () => {
  return (
    <div className="transition-shell w-full bg-bone snap-container font-body">

      {/* SECTION 1: HEADER */}
      <Section className="items-center justify-center px-4 md:px-10 border-b-2 border-ink bg-bone">
        <div className="flex flex-col items-center justify-center space-y-8 max-w-5xl mx-auto w-full relative z-10">

          {/* Top Label Box */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gold border-4 border-ink px-6 py-2 shadow-hard transform -rotate-1"
          >
            <span className="font-mono font-bold uppercase tracking-widest text-sm md:text-base text-ink">
              The Party & The State
            </span>
          </motion.div>

          {/* Main Title Block */}
          <div className="relative text-center">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="font-display font-black text-6xl md:text-9xl uppercase text-crimson leading-[0.85] tracking-tighter drop-shadow-hard"
            >
              ĐẢNG VÀ
            </motion.h1>

            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="font-display font-black text-6xl md:text-9xl uppercase text-transparent text-stroke-red leading-[0.85] tracking-tighter"
            >
              NHÀ NƯỚC
            </motion.h1>
          </div>

          {/* Quote Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white border-4 border-ink p-6 md:p-8 shadow-hard-lg max-w-2xl transform rotate-1 mt-8 relative"
          >
            <p className="font-body text-xl md:text-2xl text-ink text-center font-medium italic">
              "Đảng lãnh đạo, Nhà nước quản lý, <span className="bg-gold/30 px-1 font-bold text-crimson not-italic">Nhân dân làm chủ</span>."
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

      {/* SECTION 2: PARTY LEADERSHIP */}
      <Section scrollable={true} className="items-center justify-center px-4 md:px-10 bg-white">
        <div className="max-w-screen-2xl mx-auto w-full py-16">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-crimson/20 to-gold/20 rounded-sm -rotate-2 transform scale-105"></div>
              <Card variant="default" className="p-10 rotate-1 kinetic-grid">
                <h3 className="font-display text-3xl font-bold text-crimson mb-8 uppercase border-b-2 border-crimson/20 pb-4">Đảng Cộng sản Việt Nam</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4 items-start">
                    <CheckCircle className="text-crimson shrink-0 mt-1" size={24} />
                    <span className="text-graphite font-medium text-lg">Đội tiên phong của giai cấp công nhân và nhân dân lao động.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <CheckCircle className="text-crimson shrink-0 mt-1" size={24} />
                    <span className="text-graphite font-medium text-lg">Đại biểu trung thành của lợi ích dân tộc.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <CheckCircle className="text-crimson shrink-0 mt-1" size={24} />
                    <span className="text-graphite font-medium text-lg">Lực lượng duy nhất đủ bản lĩnh lãnh đạo cách mạng.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <CheckCircle className="text-crimson shrink-0 mt-1" size={24} />
                    <span className="text-graphite font-medium text-lg">Nhân tố quyết định bản chất XHCN của Nhà nước.</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="order-1 md:order-2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-display font-black text-ink uppercase leading-none">Vai trò lãnh đạo <span className="text-crimson">tất yếu</span></h2>
              <p className="text-xl text-graphite/80 leading-relaxed font-body">
                Sự lãnh đạo của Đảng không phải là áp đặt chủ quan mà là yêu cầu khách quan của sự nghiệp xây dựng chủ nghĩa xã hội, đảm bảo nhà nước giữ vững định hướng chính trị vì lợi ích nhân dân.
              </p>

              <div className="bg-paper p-8 border-l-8 border-l-crimson border-y-2 border-r-2 border-ink shadow-hard-md">
                <h4 className="font-bold text-ink mb-6 uppercase text-base tracking-widest">Phương thức lãnh đạo</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 border-2 border-ink text-base font-bold shadow-sm hover:shadow-hard hover:-translate-y-1 transition-all">1. Bằng Cương lĩnh, chiến lược</div>
                  <div className="bg-white p-4 border-2 border-ink text-base font-bold shadow-sm hover:shadow-hard hover:-translate-y-1 transition-all">2. Qua công tác cán bộ</div>
                  <div className="bg-white p-4 border-2 border-ink text-base font-bold shadow-sm hover:shadow-hard hover:-translate-y-1 transition-all">3. Công tác kiểm tra, giám sát</div>
                  <div className="bg-white p-4 border-2 border-ink text-base font-bold shadow-sm hover:shadow-hard hover:-translate-y-1 transition-all">4. Nêu gương & Thuyết phục</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 2.5: RELATIONSHIP CYCLE */}
      <Section className="items-center justify-center px-4 md:px-10 bg-ink text-bone border-y-2 border-bone">
        <div className="max-w-screen-2xl mx-auto w-full py-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold uppercase mb-4 text-white">Cơ chế tổng thể</h2>
            <p className="font-mono text-white/60">Mối quan hệ biện chứng giữa 3 chủ thể</p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 relative">
            {/* Card 1: Party */}
            <div className="w-64 h-64 border-2 border-crimson bg-crimson/10 rounded-full flex flex-col items-center justify-center p-6 text-center shadow-[0_0_30px_rgba(255,42,42,0.2)] md:mr-[-20px] z-10 hover:scale-110 transition-transform duration-300">
              <h3 className="font-display text-2xl font-bold mb-2 text-crimson">Đảng Lãnh đạo</h3>
              <p className="text-sm opacity-80">Đề ra đường lối, chủ trương, định hướng chính trị.</p>
            </div>

            {/* Arrow Right */}
            <div className="hidden md:block w-32 h-1 bg-gradient-to-r from-crimson to-white"></div>
            <div className="md:hidden w-1 h-16 bg-gradient-to-b from-crimson to-white"></div>

            {/* Card 2: State */}
            <div className="w-64 h-64 border-2 border-bone bg-white/10 rounded-full flex flex-col items-center justify-center p-6 text-center shadow-[0_0_30px_rgba(255,255,255,0.1)] z-20 hover:scale-110 transition-transform duration-300">
              <h3 className="font-display text-2xl font-bold mb-2 text-white">Nhà nước Quản lý</h3>
              <p className="text-sm opacity-80">Thể chế hóa thành pháp luật, tổ chức thực hiện.</p>
            </div>

            {/* Arrow Right */}
            <div className="hidden md:block w-32 h-1 bg-gradient-to-r from-white to-gold"></div>
            <div className="md:hidden w-1 h-16 bg-gradient-to-b from-white to-gold"></div>

            {/* Card 3: People */}
            <div className="w-64 h-64 border-2 border-gold bg-gold/10 rounded-full flex flex-col items-center justify-center p-6 text-center shadow-[0_0_30px_rgba(255,215,0,0.2)] md:ml-[-20px] z-10 hover:scale-110 transition-transform duration-300">
              <h3 className="font-display text-2xl font-bold mb-2 text-gold">Nhân dân Làm chủ</h3>
              <p className="text-sm opacity-80">Kiểm tra, giám sát, thụ hưởng thành quả.</p>
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

      {/* SECTION 3: PEOPLE'S MASTERSHIP DETAILS */}
      <Section scrollable={true} className="items-center justify-center px-4 md:px-10 bg-sand">
        <div className="max-w-screen-2xl mx-auto w-full py-16">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-display font-black text-ink uppercase">
              Quyền lực & <br /><span className="text-crimson">Trách nhiệm giải trình</span>
            </h2>
            <KineticSubline className="text-center max-w-3xl mx-auto">
              Các cơ chế dân chủ đại diện và trực tiếp vận hành song song, tạo áp lực giải trình liên tục cho bộ máy nhà nước.
            </KineticSubline>
          </div>

          {/* Infographic Style Layout */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="flat" hoverEffect className="p-8 border-t-8 border-t-blue-600">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6 border-2 border-blue-600 shadow-[4px_4px_0px_0px_#2563EB]">
                <Users size={32} strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 uppercase">Chủ thể tối cao</h3>
              <p className="text-lg text-graphite/80 mb-6">
                Nhân dân là chủ thể tối cao của quyền lực nhà nước. Nhà nước là công cụ để thực hiện quyền làm chủ của Nhân dân.
              </p>
              <div className="h-2 w-16 bg-blue-600"></div>
            </Card>

            <Card variant="flat" hoverEffect className="p-8 border-t-8 border-t-ember">
              <div className="w-16 h-16 bg-ember/20 rounded-lg flex items-center justify-center text-ember mb-6 border-2 border-ember shadow-[4px_4px_0px_0px_#FF5500]">
                <FileText size={32} strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 uppercase">Cơ chế Đại diện</h3>
              <p className="text-lg text-graphite/80 mb-6">
                Bầu ra Quốc hội & HĐND các cấp. Người dân có quyền bãi nhiệm đại biểu nếu không còn xứng đáng với tín nhiệm.
              </p>
              <div className="h-2 w-16 bg-ember"></div>
            </Card>

            <Card variant="flat" hoverEffect className="p-8 border-t-8 border-t-purple-600">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6 border-2 border-purple-600 shadow-[4px_4px_0px_0px_#9333EA]">
                <Scale size={32} strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 uppercase">Giám sát & Phản biện</h3>
              <p className="text-lg text-graphite/80 mb-6">
                Thông qua Mặt trận Tổ quốc, quyền khiếu nại, tố cáo và yêu cầu cơ quan nhà nước giải trình minh bạch.
              </p>
              <div className="h-2 w-16 bg-purple-600"></div>
            </Card>
          </div>

          <div className="mt-16">
            <MarqueeStrip
              text="Đại diện • Giải trình • Minh bạch • Kiểm soát quyền lực"
              speed={26}
              tone="dark"
              className="font-display font-bold uppercase tracking-widest text-xl border-2 border-ink shadow-hard"
            />
          </div>
        </div>
      </Section>

      {/* SECTION 4: CONCLUSION */}
      <Section className="items-center justify-center px-4 md:px-10 bg-white">
        <div className="max-w-screen-2xl mx-auto w-full">
          <section className="bg-ink text-bone p-10 md:p-16 text-center relative overflow-hidden border-2 border-ink shadow-hard-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-crimson/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <Activity className="w-16 h-16 mx-auto mb-8 text-crimson animate-pulse" />
              <h2 className="font-display text-3xl md:text-4xl font-black mb-8 uppercase tracking-tight">Kết luận</h2>
              <p className="font-display text-xl md:text-3xl leading-snug opacity-90">
                "Nhà nước pháp quyền XHCN Việt Nam là sự thống nhất biện chứng giữa <span className="text-crimson bg-bone px-2 box-decoration-clone">Quyền lực Nhà nước</span>, <span className="text-crimson bg-bone px-2 box-decoration-clone">Sự lãnh đạo của Đảng</span> và <span className="text-crimson bg-bone px-2 box-decoration-clone">Quyền làm chủ của Nhân dân</span>. Đây là nhân tố quyết định thắng lợi của sự nghiệp đổi mới."
              </p>
            </div>
          </section>
        </div>
      </Section>
    </div>
  );
};

export default DangVaNhanDanPage;

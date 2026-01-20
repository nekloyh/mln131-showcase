import { motion } from "framer-motion";
import { KineticHeading, KineticSubline } from "../../components/ui/KineticText";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
import { GitGraph, Network, ShieldAlert, Activity, ArrowDown } from "lucide-react";

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
              Socialist Rule of Law State
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
              NHÀ NƯỚC
            </motion.h1>

            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="font-display font-black text-6xl md:text-8xl uppercase text-transparent text-stroke-black leading-[0.85] tracking-tighter"
            >
              PHÁP QUYỀN
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
              "Thượng tôn pháp luật, vì con người và <span className="bg-crimson/10 px-1 font-bold text-crimson not-italic">do Nhân dân làm chủ</span>."
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

      {/* SECTION 2: PRINCIPLE OF UNIFIED POWER */}
      <Section className="items-center justify-center px-4 md:px-10 bg-paper">
        <div className="max-w-screen-xl mx-auto w-full">
          <Card variant="default" className="p-8 relative overflow-hidden kinetic-grid border-2 border-ink shadow-hard-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-crimson/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute -left-10 -top-10 text-9xl font-black text-ink/5 -rotate-12 font-display pointer-events-none select-none">UNIFIED</div>

            <h2 className="font-display text-4xl font-bold text-ink mb-8 border-b-2 border-ink/10 pb-4">
              1. Nguyên tắc Quyền lực Thống nhất
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-graphite/90 leading-relaxed text-xl mb-8 font-body">
                  Khác với mô hình "tam quyền phân lập", Nhà nước ta hoạt động theo nguyên tắc:
                  <span className="font-bold text-ink bg-gold/30 px-1"> Quyền lực nhà nước là thống nhất</span>,
                  có sự phân công, phối hợp và kiểm soát giữa các cơ quan.
                </p>
                <div className="bg-white p-6 border-2 border-ink shadow-hard-sm hover:shadow-hard transition-shadow">
                  <h4 className="font-bold text-crimson mb-2 font-mono uppercase tracking-wide">Ý nghĩa then chốt</h4>
                  <p className="text-base text-graphite/80 mb-4">
                    Bảo đảm quyền lực nhà nước không bị phân tán, không bị tập trung tuyệt đối vào một cá nhân, thể hiện bản chất dân chủ xã hội chủ nghĩa.
                  </p>
                  <div className="flex gap-2">
                    <span className="bg-ink text-bone text-xs font-bold px-2 py-1">Tập trung dân chủ</span>
                    <span className="bg-ink text-bone text-xs font-bold px-2 py-1">Pháp chế XHCN</span>
                  </div>
                </div>
              </div>

              {/* DIAGRAM VISUALIZATION */}
              <div className="relative py-10">
                {/* Center Core */}
                <div className="bg-crimson text-white p-6 rounded-full w-48 h-48 mx-auto flex items-center justify-center text-center font-bold shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-ink z-10 relative">
                  <span className="font-display text-2xl leading-none">QUYỀN LỰC<br />NHÀ NƯỚC<br />THỐNG NHẤT</span>
                </div>

                {/* Branches */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-dashed border-ink/20 rounded-full animate-spin-slow pointer-events-none"></div>

                <div className="flex justify-between mt-12 text-center text-sm font-bold text-ink">
                  <div className="w-1/3 flex flex-col items-center group">
                    <div className="w-16 h-1 bg-ink mx-auto mb-4 group-hover:bg-crimson transition-colors"></div>
                    <span className="font-display text-xl group-hover:text-crimson transition-colors">LẬP PHÁP</span>
                    <span className="font-mono text-xs opacity-70 uppercase mt-1">Quốc hội</span>
                  </div>
                  <div className="w-1/3 flex flex-col items-center -mt-8 group">
                    <div className="w-1 h-16 bg-ink mx-auto mb-4 group-hover:bg-olive transition-colors"></div>
                    <span className="font-display text-xl text-olive group-hover:scale-110 transition-transform">TƯ PHÁP</span>
                    <span className="font-mono text-xs opacity-70 uppercase mt-1">Tòa án & VKS</span>
                  </div>
                  <div className="w-1/3 flex flex-col items-center group">
                    <div className="w-16 h-1 bg-ink mx-auto mb-4 group-hover:bg-blue-600 transition-colors"></div>
                    <span className="font-display text-xl text-blue-600 group-hover:scale-110 transition-transform">HÀNH PHÁP</span>
                    <span className="font-mono text-xs opacity-70 uppercase mt-1">Chính phủ</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* SECTION 2.5: INFOGRAPHIC / MINDMAP */}
      <Section className="items-center justify-center px-4 md:px-10 bg-white border-y-2 border-ink">
        <div className="max-w-screen-2xl mx-auto w-full py-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold uppercase mb-4">Sơ đồ tổ chức quyền lực</h2>
            <p className="font-mono text-ink/60">Mối quan hệ dọc từ Trung ương đến Địa phương</p>
          </div>

          <div className="relative">
            {/* Level 1: Quoc Hoi */}
            <div className="flex justify-center mb-16 relative z-10">
              <div className="border-2 border-ink bg-crimson text-bone p-6 w-64 text-center shadow-hard">
                <h3 className="font-display text-2xl font-bold uppercase">Quốc hội</h3>
                <p className="text-xs font-mono mt-2 opacity-90">Cơ quan quyền lực cao nhất</p>
              </div>
            </div>

            {/* Connector Lines */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[80%] h-24 border-x-2 border-t-2 border-ink rounded-t-3xl -z-0"></div>
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[40%] h-24 border-r-2 border-ink -z-0"></div>

            {/* Level 2: Tam Quyen */}
            <div className="grid grid-cols-3 gap-8 relative z-10">
              {/* Executive */}
              <div className="flex flex-col items-center">
                <div className="w-1 h-8 bg-ink mb-2"></div>
                <div className="border-2 border-ink bg-blue-50 p-6 w-full text-center shadow-hard hover:-translate-y-1 transition-transform">
                  <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-display text-xl font-bold text-blue-900 uppercase">Chính phủ</h3>
                  <p className="text-sm mt-2 text-blue-800">Cơ quan hành chính</p>
                </div>
                <div className="w-0.5 h-8 border-l-2 border-dashed border-ink my-2"></div>
                <div className="border-2 border-ink bg-white p-4 w-5/6 text-center text-sm font-bold text-graphite shadow-sm">
                  Bộ, Cơ quan ngang Bộ
                </div>
                <div className="w-0.5 h-4 border-l-2 border-dashed border-ink my-1"></div>
                <div className="border-2 border-ink bg-white p-4 w-4/6 text-center text-sm font-bold text-graphite shadow-sm">
                  UBND Các cấp
                </div>
              </div>

              {/* Legislative Support */}
              <div className="flex flex-col items-center">
                <div className="w-1 h-8 bg-ink mb-2"></div>
                <div className="border-2 border-ink bg-ember/10 p-6 w-full text-center shadow-hard hover:-translate-y-1 transition-transform">
                  <GitGraph className="w-8 h-8 text-ember mx-auto mb-2" />
                  <h3 className="font-display text-xl font-bold text-ember uppercase">UB Thường vụ</h3>
                  <p className="text-sm mt-2 text-ink/70">Cơ quan thường trực</p>
                </div>
                <div className="w-0.5 h-8 border-l-2 border-dashed border-ink my-2"></div>
                <div className="border-2 border-ink bg-white p-4 w-5/6 text-center text-sm font-bold text-graphite shadow-sm">
                  Hội đồng Dân tộc
                </div>
                <div className="w-0.5 h-4 border-l-2 border-dashed border-ink my-1"></div>
                <div className="border-2 border-ink bg-white p-4 w-5/6 text-center text-sm font-bold text-graphite shadow-sm">
                  Các Ủy ban Quốc hội
                </div>
              </div>

              {/* Judiciary */}
              <div className="flex flex-col items-center">
                <div className="w-1 h-8 bg-ink mb-2"></div>
                <div className="border-2 border-ink bg-olive/10 p-6 w-full text-center shadow-hard hover:-translate-y-1 transition-transform">
                  <ShieldAlert className="w-8 h-8 text-olive mx-auto mb-2" />
                  <h3 className="font-display text-xl font-bold text-olive uppercase">Tòa án & VKS</h3>
                  <p className="text-sm mt-2 text-ink/70">Cơ quan tư pháp</p>
                </div>
                <div className="w-0.5 h-8 border-l-2 border-dashed border-ink my-2"></div>
                <div className="border-2 border-ink bg-white p-4 w-5/6 text-center text-sm font-bold text-graphite shadow-sm">
                  TAND Tối cao
                </div>
                <div className="w-0.5 h-4 border-l-2 border-dashed border-ink my-1"></div>
                <div className="border-2 border-ink bg-white p-4 w-5/6 text-center text-sm font-bold text-graphite shadow-sm">
                  VKSND Tối cao
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 3: ORGANIZATIONAL STRUCTURE */}
      <Section scrollable={true} className="items-center justify-center px-4 md:px-10 py-10 bg-white">
        <div className="max-w-screen-2xl mx-auto w-full pt-12 pb-24">
          <div className="text-center space-y-3 mb-16">
            <KineticHeading
              align="center"
              title="2. Hệ thống Cơ quan Nhà nước"
              size="md"
            />
            <KineticSubline className="text-center max-w-3xl mx-auto">
              Những mắt xích giữ vai trò riêng nhưng gắn kết chặt chẽ trong một tổng thể quyền lực thống nhất.
            </KineticSubline>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Card 1: Parliament */}
            <Card
              hoverEffect
              className="border-t-8 border-t-ember p-8 min-h-[400px] flex flex-col"
            >
              <div className="bg-ember/10 w-16 h-16 rounded-md flex items-center justify-center mb-6 font-display font-bold text-3xl text-ember border border-ember/20">01</div>
              <h3 className="font-display text-3xl font-bold text-ink mb-2 uppercase">Lập pháp</h3>
              <div className="text-crimson font-mono font-bold text-sm mb-6 uppercase tracking-wider">QUỐC HỘI</div>
              <ul className="space-y-4 text-base text-graphite/80 list-disc list-outside ml-4 marker:text-ember">
                <li>Cơ quan đại biểu cao nhất của Nhân dân.</li>
                <li>Cơ quan quyền lực nhà nước cao nhất.</li>
                <li>Thực hiện quyền lập hiến, lập pháp.</li>
                <li>Quyết định các vấn đề quan trọng của đất nước.</li>
                <li>Giám sát tối cao.</li>
              </ul>
            </Card>

            {/* Card 2: Government */}
            <Card
              hoverEffect
              className="border-t-8 border-t-blue-500 p-8 min-h-[400px] flex flex-col"
            >
              <div className="bg-blue-50 w-16 h-16 rounded-md flex items-center justify-center mb-6 font-display font-bold text-3xl text-blue-500 border border-blue-200">02</div>
              <h3 className="font-display text-3xl font-bold text-ink mb-2 uppercase">Hành pháp</h3>
              <div className="text-blue-600 font-mono font-bold text-sm mb-6 uppercase tracking-wider">CHÍNH PHỦ & UBND</div>
              <ul className="space-y-4 text-base text-graphite/80 list-disc list-outside ml-4 marker:text-blue-500">
                <li>Cơ quan hành chính nhà nước cao nhất.</li>
                <li>Tổ chức thi hành Hiến pháp và pháp luật.</li>
                <li>Quản lý thống nhất kinh tế, văn hóa, xã hội, ANQP.</li>
                <li>Chịu trách nhiệm trước Quốc hội và Nhân dân.</li>
              </ul>
            </Card>

            {/* Card 3: Judiciary */}
            <Card
              hoverEffect
              className="border-t-8 border-t-olive p-8 min-h-[400px] flex flex-col"
            >
              <div className="bg-green-50 w-16 h-16 rounded-md flex items-center justify-center mb-6 font-display font-bold text-3xl text-olive border border-green-200">03</div>
              <h3 className="font-display text-3xl font-bold text-ink mb-2 uppercase">Tư pháp</h3>
              <div className="text-olive font-mono font-bold text-sm mb-6 uppercase tracking-wider">TÒA ÁN & VKS</div>
              <ul className="space-y-4 text-base text-graphite/80 list-disc list-outside ml-4 marker:text-olive">
                <li><strong className="text-ink font-bold">Tòa án:</strong> Thực hiện quyền tư pháp, xét xử độc lập, bảo vệ công lý.</li>
                <li><strong className="text-ink font-bold">Viện kiểm sát:</strong> Thực hiện quyền công tố, kiểm sát hoạt động tư pháp.</li>
                <li>Góp phần kiểm soát quyền lực, chống oan sai.</li>
              </ul>
            </Card>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-bone px-8 py-6 border-2 border-ink text-lg text-ink max-w-3xl shadow-hard mx-auto">
              Hệ thống các cơ quan không đối lập mà <span className="text-crimson font-black uppercase">phối hợp chặt chẽ</span> và <span className="text-crimson font-black uppercase">kiểm soát lẫn nhau</span> để phục vụ Nhân dân.
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default BoMayNhaNuocPage;

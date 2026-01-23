import { motion } from "framer-motion";
import {
  CheckCircle,
  Users,
  Scale,
  FileText,
  Activity,
  RefreshCw,
  ArrowDown,
  GitGraph,
  ShieldAlert,
  Network,
} from "lucide-react";
import {
  KineticHeading,
  KineticSubline,
  MarqueeStrip,
} from "../../components/ui/KineticText";
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
              Rule of Law & State Apparatus
            </span>
          </motion.div>

          {/* Main Title Block */}
          <div className="relative text-center">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="font-display font-black text-5xl md:text-8xl uppercase text-crimson leading-[0.85] tracking-tighter drop-shadow-hard"
            >
              NHÀ NƯỚC
            </motion.h1>

            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="font-display font-black text-5xl md:text-8xl uppercase text-transparent text-stroke-red leading-[0.85] tracking-tighter"
            >
              PHÁP QUYỀN
            </motion.h1>
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="font-display font-black text-4xl md:text-6xl uppercase text-ink leading-[0.85] tracking-tighter drop-shadow-hard mt-4"
            >
              & BỘ MÁY
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
              "Thượng tôn pháp luật, vì con người và{" "}
              <span className="bg-gold/30 px-1 font-bold text-crimson not-italic">
                do Nhân dân làm chủ
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

      {/* SECTION 1: DEFINITION (Topic 0) */}
      <Section className="items-center justify-center px-4 md:px-10 bg-white border-b-2 border-ink">
        <div className="max-w-screen-xl mx-auto w-full py-12">
          <h2 className="font-display text-4xl font-bold text-ink mb-8 text-center uppercase">
            1. Khái niệm Nhà nước pháp quyền
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-bone border-l-4 border-crimson p-6 shadow-hard">
              <h3 className="font-bold text-xl uppercase mb-3 text-crimson">
                Đặc trưng cơ bản
              </h3>
              <ul className="space-y-2 text-graphite list-disc list-inside">
                <li>
                  <strong>Nhà nước của Nhân dân:</strong> Do Nhân dân, Vì Nhân
                  dân.
                </li>
                <li>
                  <strong>Cơ sở hoạt động:</strong> Hiến pháp và pháp luật.
                </li>
                <li>
                  <strong>Mục tiêu:</strong> Bảo đảm quyền con người, quyền công
                  dân.
                </li>
                <li>
                  <strong>Nguyên tắc chính trị:</strong> Dưới sự lãnh đạo của
                  Đảng Cộng sản Việt Nam.
                </li>
              </ul>
            </div>

            <div className="bg-ink text-bone p-6 shadow-hard flex flex-col justify-center">
              <h3 className="font-bold text-xl uppercase mb-3 text-gold">
                Điểm khác biệt với Tư sản
              </h3>
              <ul className="space-y-2 list-disc list-inside marker:text-gold">
                <li>
                  Không có{" "}
                  <span className="text-crimson font-bold bg-bone px-1">
                    "Tam quyền phân lập cứng"
                  </span>
                  .
                </li>
                <li>
                  Quyền lực nhà nước là <strong>thống nhất</strong>.
                </li>
                <li>
                  Có sự <strong>phân công - phối hợp - kiểm soát</strong> giữa
                  các cơ quan.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 2: PRINCIPLE OF UNIFIED POWER (Topic 1) */}
      <Section className="items-center justify-center px-4 md:px-10 bg-paper">
        <div className="max-w-screen-xl mx-auto w-full">
          <Card
            variant="default"
            className="p-8 relative overflow-hidden kinetic-grid border-2 border-ink shadow-hard-lg"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-crimson/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute -left-10 -top-10 text-9xl font-black text-ink/5 -rotate-12 font-display pointer-events-none select-none">
              UNIFIED
            </div>

            <h2 className="font-display text-4xl font-bold text-ink mb-8 border-b-2 border-ink/10 pb-4">
              2. Nguyên tắc Quyền lực Thống nhất
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-graphite/90 leading-relaxed text-lg mb-6 font-body">
                  Khác với mô hình "tam quyền phân lập", Nhà nước ta hoạt động
                  theo nguyên tắc:
                  <span className="font-bold text-ink bg-gold/30 px-1 mx-1">
                    Quyền lực nhà nước là thống nhất
                  </span>
                  , có sự phân công, phối hợp và kiểm soát giữa các cơ quan.
                </p>

                <div className="space-y-6">
                  <div className="bg-white p-6 border-2 border-ink shadow-hard-sm hover:shadow-hard transition-shadow">
                    <h4 className="font-bold text-crimson mb-2 font-mono uppercase tracking-wide">
                      a) Quyền lực thuộc về ai?
                    </h4>
                    <p className="text-base text-graphite/80 mb-2">
                      Quyền lực nhà nước thuộc về Nhân dân. Nhân dân ủy quyền
                      cho Nhà nước thông qua:
                    </p>
                    <ul className="list-disc list-inside text-sm text-graphite/70 ml-2 space-y-1 mb-2">
                      <li>Bầu cử Quốc hội</li>
                      <li>Bầu cử Hội đồng nhân dân các cấp</li>
                    </ul>
                    <p className="text-sm italic font-medium text-ink">
                      Không có cơ quan nào đứng "trên" Nhân dân.
                    </p>
                  </div>

                  <div className="bg-white p-6 border-2 border-ink shadow-hard-sm hover:shadow-hard transition-shadow">
                    <h4 className="font-bold text-crimson mb-2 font-mono uppercase tracking-wide">
                      b) Vì sao là thống nhất?
                    </h4>
                    <p className="text-base text-graphite/80 mb-2">
                      Chỉ có một quyền lực nhà nước duy nhất, không chia thành
                      các "nhánh độc lập đối kháng".
                    </p>
                    <p className="text-sm text-ink font-medium">
                      Tất cả quyền lực vì lợi ích chung và quyền lợi của Nhân dân.
                    </p>
                  </div>
                </div>
              </div>

              {/* DIAGRAM VISUALIZATION (Updated text labels) */}
              <div className="relative py-10 mt-8 md:mt-0">
                {/* Center Core */}
                <div className="bg-crimson text-white p-6 rounded-full w-56 h-56 mx-auto flex flex-col items-center justify-center text-center font-bold shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-ink z-10 relative">
                  <span className="font-display text-2xl leading-none mb-2">
                    THỐNG NHẤT
                  </span>
                  <span className="font-mono text-xs font-normal opacity-90 px-2">
                    Phân công • Phối hợp
                    <br />
                    Kiểm soát
                  </span>
                </div>

                {/* Branches */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] border-2 border-dashed border-ink/20 rounded-full animate-spin-slow pointer-events-none"></div>

                <div className="flex justify-between mt-12 text-center text-sm font-bold text-ink w-full">
                  <div className="w-1/3 flex flex-col items-center group cursor-help">
                    <div className="w-16 h-1 bg-ink mx-auto mb-4 group-hover:bg-crimson transition-colors"></div>
                    <span className="font-display text-lg group-hover:text-crimson transition-colors">
                      LẬP PHÁP
                    </span>
                    <span className="font-mono text-xs opacity-70 uppercase mt-1">
                      Quốc hội
                    </span>
                  </div>
                  <div className="w-1/3 flex flex-col items-center -mt-12 group cursor-help">
                    <div className="w-1 h-16 bg-ink mx-auto mb-4 group-hover:bg-olive transition-colors"></div>
                    <span className="font-display text-lg text-olive group-hover:scale-110 transition-transform">
                      TƯ PHÁP
                    </span>
                    <span className="font-mono text-xs opacity-70 uppercase mt-1">
                      Tòa án & VKS
                    </span>
                  </div>
                  <div className="w-1/3 flex flex-col items-center group cursor-help">
                    <div className="w-16 h-1 bg-ink mx-auto mb-4 group-hover:bg-blue-600 transition-colors"></div>
                    <span className="font-display text-lg text-blue-600 group-hover:scale-110 transition-transform">
                      HÀNH PHÁP
                    </span>
                    <span className="font-mono text-xs opacity-70 uppercase mt-1">
                      Chính phủ
                    </span>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <div className="inline-block bg-bone px-4 py-2 border border-ink text-xs font-mono">
                    <span className="font-bold text-crimson">Phối hợp:</span> Hỗ
                    trợ, không rời rạc <br />
                    <span className="font-bold text-crimson">
                      Kiểm soát:
                    </span>{" "}
                    Tránh lạm quyền, tiêu cực
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* SECTION 3: INFOGRAPHIC / MINDMAP (Topic 2 part 1) */}
      <Section className="items-center justify-center px-4 md:px-10 bg-white border-y-2 border-ink">
        <div className="max-w-screen-2xl mx-auto w-full py-16">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold uppercase mb-4">
              Sơ đồ tổ chức quyền lực
            </h2>
            <p className="font-mono text-ink/60">
              Mối quan hệ dọc từ Trung ương đến Địa phương
            </p>
          </div>

          <div className="relative">
            {/* Level 1: Quoc Hoi */}
            <div className="flex justify-center mb-16 relative z-10">
              <div className="border-2 border-ink bg-crimson text-bone p-6 w-64 text-center shadow-hard">
                <h3 className="font-display text-2xl font-bold uppercase">
                  Quốc hội
                </h3>
                <p className="text-xs font-mono mt-2 opacity-90">
                  Cơ quan quyền lực cao nhất
                </p>
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
                  <h3 className="font-display text-xl font-bold text-blue-900 uppercase">
                    Chính phủ
                  </h3>
                  <p className="text-sm mt-2 text-blue-800">
                    Cơ quan hành chính
                  </p>
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
                  <h3 className="font-display text-xl font-bold text-ember uppercase">
                    UB Thường vụ
                  </h3>
                  <p className="text-sm mt-2 text-ink/70">
                    Cơ quan thường trực
                  </p>
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
                  <h3 className="font-display text-xl font-bold text-olive uppercase">
                    Tòa án & VKS
                  </h3>
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

      {/* SECTION 4: ORGANIZATIONAL STRUCTURE (Topic 2 part 2) */}
      <Section
        scrollable={true}
        className="items-center justify-center px-4 md:px-10 py-10 bg-white"
      >
        <div className="max-w-screen-2xl mx-auto w-full pt-12 pb-24">
          <div className="text-center space-y-3 mb-16">
            <KineticHeading
              align="center"
              title="3. Phân công thực hiện quyền lực"
              size="md"
            />
            <KineticSubline className="text-center max-w-3xl mx-auto">
              Những mắt xích giữ vai trò riêng nhưng gắn kết chặt chẽ trong một
              tổng thể quyền lực thống nhất.
            </KineticSubline>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Card 1: Parliament */}
            <Card
              hoverEffect
              className="border-t-8 border-t-ember p-8 flex flex-col h-full"
            >
              <div className="bg-ember/10 w-16 h-16 rounded-md flex items-center justify-center mb-6 font-display font-bold text-3xl text-ember border border-ember/20">
                01
              </div>
              <h3 className="font-display text-3xl font-bold text-ink mb-2 uppercase">
                Lập pháp
              </h3>
              <div className="text-crimson font-mono font-bold text-sm mb-6 uppercase tracking-wider">
                QUỐC HỘI
              </div>
              <div className="space-y-4 text-base text-graphite/80">
                <p>
                  <strong>Quốc hội là:</strong>
                </p>
                <ul className="list-disc list-outside ml-4 marker:text-ember space-y-1">
                  <li>Cơ quan đại biểu cao nhất của Nhân dân.</li>
                  <li>Cơ quan quyền lực nhà nước cao nhất.</li>
                </ul>
                <p>
                  <strong>Chức năng chính:</strong>
                </p>
                <ul className="list-disc list-outside ml-4 marker:text-ember space-y-1">
                  <li>Làm Hiến pháp, sửa đổi Hiến pháp.</li>
                  <li>Ban hành luật, nghị quyết.</li>
                  <li>
                    Quyết định vấn đề kinh tế - xã hội, an ninh - quốc phòng.
                  </li>
                  <li>Giám sát tối cao (Chính phủ, Tòa án, VKS).</li>
                </ul>
                <p className="text-sm italic text-ink/70 mt-2">
                  Ví dụ: Bỏ phiếu tín nhiệm đối với Thủ tướng, Bộ trưởng.
                </p>
              </div>
            </Card>

            {/* Card 2: Government */}
            <Card
              hoverEffect
              className="border-t-8 border-t-blue-500 p-8 flex flex-col h-full"
            >
              <div className="bg-blue-50 w-16 h-16 rounded-md flex items-center justify-center mb-6 font-display font-bold text-3xl text-blue-500 border border-blue-200">
                02
              </div>
              <h3 className="font-display text-3xl font-bold text-ink mb-2 uppercase">
                Hành pháp
              </h3>
              <div className="text-blue-600 font-mono font-bold text-sm mb-6 uppercase tracking-wider">
                CHÍNH PHỦ & UBND
              </div>
              <div className="space-y-4 text-base text-graphite/80">
                <p>
                  <strong>Chính phủ là:</strong>
                </p>
                <ul className="list-disc list-outside ml-4 marker:text-blue-500 space-y-1">
                  <li>Cơ quan hành chính nhà nước cao nhất.</li>
                  <li>Cơ quan thực hiện quyền hành pháp.</li>
                </ul>
                <p>
                  <strong>Nhiệm vụ:</strong>
                </p>
                <ul className="list-disc list-outside ml-4 marker:text-blue-500 space-y-1">
                  <li>Tổ chức thi hành Hiến pháp và luật.</li>
                  <li>Quản lý kinh tế, văn hóa, giáo dục, y tế, ANQP...</li>
                </ul>
                <p className="text-sm italic text-ink/70 mt-2">
                  Ví dụ: Ban hành Nghị định hướng dẫn luật, triển khai chính
                  sách.
                </p>
              </div>
            </Card>

            {/* Card 3: Judiciary */}
            <Card
              hoverEffect
              className="border-t-8 border-t-olive p-8 flex flex-col h-full"
            >
              <div className="bg-green-50 w-16 h-16 rounded-md flex items-center justify-center mb-6 font-display font-bold text-3xl text-olive border border-green-200">
                03
              </div>
              <h3 className="font-display text-3xl font-bold text-ink mb-2 uppercase">
                Tư pháp
              </h3>
              <div className="text-olive font-mono font-bold text-sm mb-6 uppercase tracking-wider">
                TÒA ÁN & VKS
              </div>
              <div className="space-y-4 text-base text-graphite/80">
                <p>
                  <strong className="text-olive">Tòa án nhân dân:</strong>
                </p>
                <ul className="list-disc list-outside ml-4 marker:text-olive space-y-1">
                  <li>Thực hiện quyền tư pháp, xét xử độc lập.</li>
                  <li>Bảo vệ công lý, quyền con người, công dân.</li>
                </ul>
                <p>
                  <strong className="text-olive">Viện kiểm sát:</strong>
                </p>
                <ul className="list-disc list-outside ml-4 marker:text-olive space-y-1">
                  <li>Thực hành quyền công tố, kiểm sát tư pháp.</li>
                  <li>Bảo đảm pháp luật được chấp hành nghiêm chỉnh.</li>
                </ul>
                <p className="text-sm italic text-ink/70 mt-2">
                  Ý nghĩa: Không ai đứng trên pháp luật.
                </p>
              </div>
            </Card>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <span className="inline-block bg-white px-4 py-2 border border-ink text-sm text-ink italic rounded-full shadow-sm">
                "Quyền lực nhà nước là thống nhất, có sự phân công, phối hợp,
                kiểm soát giữa các cơ quan nhà nước." (Điều 2 - Hiến pháp 2013)
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 4B: PHỐI HỢP & KIỂM SOÁT QUYỀN LỰC */}
      <Section className="items-center justify-center px-4 md:px-10 bg-ink text-bone border-y-2 border-bone">
        <div className="max-w-screen-2xl mx-auto w-full py-16">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block bg-gold border-4 border-bone px-6 py-2 shadow-hard transform rotate-1 mb-6"
            >
              <span className="font-mono font-bold uppercase tracking-widest text-sm md:text-base text-ink">
                Phần 4
              </span>
            </motion.div>
            <h2 className="font-display text-3xl md:text-5xl font-black uppercase mb-4 text-white">
              Phối hợp & Kiểm soát <span className="text-gold">Quyền lực</span>
            </h2>
            <p className="text-bone/70 max-w-3xl mx-auto text-lg">
              Mối quan hệ biện chứng giữa các cơ quan trong việc thực thi quyền lực nhà nước.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Phối hợp */}
            <div className="bg-white/5 border-2 border-bone/30 p-8 hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-gold text-ink w-10 h-10 flex items-center justify-center rounded-full text-lg font-black">
                  A
                </span>
                <h4 className="font-display text-2xl font-bold text-gold uppercase">
                  Nguyên tắc "Phối hợp"
                </h4>
              </div>
              <ul className="space-y-4 text-bone/80">
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 bg-gold rounded-full shrink-0"></span>
                  <span><strong className="text-gold">Không tách biệt tuyệt đối:</strong> Khác với "Tam quyền phân lập" tư bản chủ nghĩa, các cơ quan quyền lực Việt Nam có sự gắn kết chặt chẽ.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 bg-gold rounded-full shrink-0"></span>
                  <span><strong className="text-gold">Mục tiêu chung:</strong> Cùng hướng tới xây dựng và bảo vệ Tổ quốc, phục vụ lợi ích của Nhân dân.</span>
                </li>
              </ul>
            </div>

            {/* Kiểm soát */}
            <div className="bg-white/5 border-2 border-bone/30 p-8 hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-crimson text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-black">
                  B
                </span>
                <h4 className="font-display text-2xl font-bold text-crimson uppercase">
                  Nguyên tắc "Kiểm soát"
                </h4>
              </div>
              <p className="mb-4 text-bone/50 italic text-sm">Mục đích: Tránh lạm quyền, độc đoán.</p>
              <ul className="space-y-4 text-bone/80">
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 bg-crimson rounded-full shrink-0"></span>
                  <span><strong className="text-crimson">Kiểm soát bên trong:</strong> Mỗi cơ quan có cơ chế tự kiểm soát (Thanh tra, Kiểm toán nhà nước).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 bg-crimson rounded-full shrink-0"></span>
                  <span><strong className="text-crimson">Kiểm soát lẫn nhau:</strong> Quốc hội giám sát Chính phủ; Tòa án xét xử hành chính; VKS kiểm sát tư pháp.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 bg-crimson rounded-full shrink-0"></span>
                  <span><strong className="text-crimson">Nhân dân kiểm soát:</strong> Qua bầu cử, khiếu nại, tố cáo, tiếp cận thông tin.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 5: ACCOUNTABILITY (Topic 3 - Part III from prompt) */}
      <Section className="items-center justify-center px-4 md:px-10 bg-sand border-t-2 border-ink">
        <div className="max-w-screen-2xl mx-auto w-full py-16">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-black text-ink uppercase">
              III. Mối liên hệ & Trách nhiệm giải trình
            </h2>
            <KineticSubline className="text-center max-w-3xl mx-auto mt-4">
              "Nhà nước phải chịu trách nhiệm trước Nhân dân"
            </KineticSubline>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 1. Chủ thể quyền lực */}
            <Card
              variant="flat"
              className="p-8 border-t-8 border-t-blue-600 h-full"
            >
              <h3 className="font-display text-2xl font-bold mb-4 uppercase text-blue-800">
                1. Nhân dân là chủ thể
              </h3>
              <ul className="space-y-2 text-graphite list-disc list-outside ml-4 marker:text-blue-600">
                <li>Bầu ra Quốc hội, HĐND.</li>
                <li>Tham gia quản lý nhà nước.</li>
                <li>
                  <strong>Nhà nước chỉ là người được ủy quyền.</strong>
                </li>
              </ul>
            </Card>

            {/* 2. Trách nhiệm giải trình */}
            <Card
              variant="flat"
              className="p-8 border-t-8 border-t-ember h-full"
            >
              <h3 className="font-display text-2xl font-bold mb-4 uppercase text-ember">
                2. Trách nhiệm giải trình
              </h3>
              <ul className="space-y-2 text-graphite list-disc list-outside ml-4 marker:text-ember">
                <li>
                  Phải <strong>công khai</strong> hoạt động.
                </li>
                <li>
                  <strong>Giải thích</strong> quyết định trước Nhân dân.
                </li>
                <li>Chịu trách nhiệm khi có sai phạm.</li>
              </ul>
              <div className="mt-4 bg-ember/10 p-3 rounded text-sm italic border-l-2 border-ember">
                Ví dụ: ĐBQH tiếp xúc cử tri; Cơ quan trả lời khiếu nại.
              </div>
            </Card>

            {/* 3. Cơ chế giám sát */}
            <Card
              variant="flat"
              className="p-8 border-t-8 border-t-purple-600 h-full"
            >
              <h3 className="font-display text-2xl font-bold mb-4 uppercase text-purple-800">
                3. Cơ chế giám sát
              </h3>
              <div className="space-y-2 text-graphite">
                <p className="font-bold">Các kênh giám sát:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white border border-ink px-2 py-1 text-xs font-bold shadow-sm">
                    Bầu cử
                  </span>
                  <span className="bg-white border border-ink px-2 py-1 text-xs font-bold shadow-sm">
                    Mặt trận TQ
                  </span>
                  <span className="bg-white border border-ink px-2 py-1 text-xs font-bold shadow-sm">
                    Báo chí
                  </span>
                  <span className="bg-white border border-ink px-2 py-1 text-xs font-bold shadow-sm">
                    Khiếu nại/Tố cáo
                  </span>
                </div>
                <p className="mt-4 text-sm font-medium text-purple-900">
                  Ý nghĩa: Bảo đảm Nhà nước thực sự vì Nhân dân, củng cố niềm tin.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default DangVaNhanDanPage;

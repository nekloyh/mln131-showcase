import { motion } from "framer-motion";

import { KineticHeading, KineticSubline } from "../../components/ui/KineticText";

const SocialismPage = () => {
  return (
    <div className="page-shell min-h-screen pt-24 pb-16 px-4 md:px-10 lg:px-16 max-w-screen-2xl mx-auto">
      <div className="mb-12 text-center space-y-4">
        <KineticHeading
          align="center"
          title="Cơ cấu tổ chức & Nguyên tắc vận hành"
          size="lg"
        />
        <KineticSubline className="text-center max-w-2xl mx-auto">
          Nguyên tắc tổ chức quyền lực và chức năng của các cơ quan trong bộ máy Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam.
        </KineticSubline>
      </div>

      {/* SECTION 1: PRINCIPLE OF UNIFIED POWER */}
      <section className="mb-20">
        <div className="bg-white rounded-sm p-8 border-2 border-ink shadow-hard relative overflow-hidden kinetic-grid">
          <div className="absolute top-0 right-0 w-64 h-64 bg-crimson/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="absolute -left-10 -top-10 text-7xl font-black text-ink/5 -rotate-12">Unified</div>

          <h2 className="font-display text-2xl font-bold text-ink mb-8 border-b border-ink/5 pb-4">
            1. Nguyên tắc Quyền lực Thống nhất
          </h2>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-graphite/80 leading-relaxed text-lg mb-6">
                Khác với mô hình "tam quyền phân lập", Nhà nước ta hoạt động theo nguyên tắc:
                <span className="font-bold text-ink"> Quyền lực nhà nước là thống nhất</span>,
                có sự phân công, phối hợp và kiểm soát giữa các cơ quan.
              </p>
              <div className="bg-bone p-6 rounded-sm border-2 border-ink shadow-hard-sm">
                <h4 className="font-bold text-crimson mb-2">Ý nghĩa</h4>
                <p className="text-base text-graphite/70">
                  Bảo đảm quyền lực nhà nước không bị phân tán, không bị tập trung tuyệt đối vào một cá nhân, thể hiện bản chất dân chủ xã hội chủ nghĩa.
                </p>
              </div>
            </div>

            {/* DIAGRAM VISUALIZATION */}
            <div className="relative">
              {/* Center Core */}
              <div className="bg-crimson text-white p-6 rounded-full w-40 h-40 mx-auto flex items-center justify-center text-center font-bold shadow-xl shadow-crimson/20 z-10 relative">
                QUYỀN LỰC<br />NHÀ NƯỚC<br />THỐNG NHẤT
              </div>

              {/* Branches */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200px] border-2 border-dashed border-crimson/30 rounded-full animate-spin-slow pointer-events-none"></div>

              <div className="flex justify-between mt-8 text-center text-sm font-bold text-ink">
                <div className="w-1/3">
                  <div className="w-4 h-4 bg-ember mx-auto rounded-full mb-2"></div>
                  LẬP PHÁP<br /><span className="font-normal opacity-70">Quốc hội</span>
                </div>
                <div className="w-1/3 mt-12">
                  <div className="w-4 h-4 bg-olive mx-auto rounded-full mb-2"></div>
                  TƯ PHÁP<br /><span className="font-normal opacity-70">Tòa án & VKS</span>
                </div>
                <div className="w-1/3">
                  <div className="w-4 h-4 bg-blue-500 mx-auto rounded-full mb-2"></div>
                  HÀNH PHÁP<br /><span className="font-normal opacity-70">Chính phủ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ORGANIZATIONAL STRUCTURE */}
      <section>
        <div className="text-center space-y-3 mb-8">
          <KineticHeading
            align="center"
            title="2. Hệ thống Cơ quan Nhà nước"
            size="md"
          />
          <KineticSubline className="text-center max-w-3xl mx-auto">
            Những mắt xích giữ vai trò riêng nhưng gắn kết chặt chẽ trong một tổng thể quyền lực thống nhất.
          </KineticSubline>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Card 1: Parliament */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-sm border-2 border-ink border-t-4 border-t-ember shadow-hard"
          >
            <div className="bg-ember/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 font-bold text-ember">01</div>
            <h3 className="font-display text-2xl font-bold text-ink mb-2">Cơ quan Lập pháp</h3>
            <div className="text-crimson font-bold text-sm mb-4">QUỐC HỘI</div>
            <ul className="space-y-3 text-base text-graphite/80 list-disc list-inside marker:text-ember">
              <li>Cơ quan đại biểu cao nhất của Nhân dân.</li>
              <li>Cơ quan quyền lực nhà nước cao nhất.</li>
              <li>Thực hiện quyền lập hiến, lập pháp.</li>
              <li>Quyết định các vấn đề quan trọng của đất nước.</li>
              <li>Giám sát tối cao.</li>
            </ul>
          </motion.div>

          {/* Card 2: Government */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-sm border-2 border-ink border-t-4 border-t-blue-500 shadow-hard"
          >
            <div className="bg-blue-50/50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 font-bold text-blue-500">02</div>
            <h3 className="font-display text-xl font-bold text-ink mb-2">Cơ quan Hành pháp</h3>
            <div className="text-blue-600 font-bold text-sm mb-4">CHÍNH PHỦ & UBND CÁC CẤP</div>
            <ul className="space-y-3 text-sm text-graphite/80 list-disc list-inside marker:text-blue-500">
              <li>Cơ quan hành chính nhà nước cao nhất.</li>
              <li>Tổ chức thi hành Hiến pháp và pháp luật.</li>
              <li>Quản lý thống nhất kinh tế, văn hóa, xã hội, ANQP.</li>
              <li>Chịu trách nhiệm trước Quốc hội và Nhân dân.</li>
            </ul>
          </motion.div>

          {/* Card 3: Judiciary */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-sm border-2 border-ink border-t-4 border-t-olive shadow-hard"
          >
            <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 font-bold text-olive">03</div>
            <h3 className="font-display text-xl font-bold text-ink mb-2">Cơ quan Tư pháp</h3>
            <div className="text-olive font-bold text-sm mb-4">TÒA ÁN & VIỆN KIỂM SÁT</div>
            <ul className="space-y-3 text-sm text-graphite/80 list-disc list-inside marker:text-olive">
              <li><strong className="text-ink">Tòa án:</strong> Thực hiện quyền tư pháp, xét xử độc lập, bảo vệ công lý.</li>
              <li><strong className="text-ink">Viện kiểm sát:</strong> Thực hiện quyền công tố, kiểm sát hoạt động tư pháp.</li>
              <li>Góp phần kiểm soát quyền lực, chống oan sai.</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <div className="mt-16 text-center">
        <div className="inline-block bg-bone px-6 py-4 rounded-sm border-2 border-ink text-sm text-ink max-w-2xl shadow-hard">
          Hệ thống các cơ quan không đối lập mà <span className="text-crimson font-bold">phối hợp chặt chẽ</span> và <span className="text-crimson font-bold">kiểm soát lẫn nhau</span> để phục vụ Nhân dân.
        </div>
      </div>
    </div>
  );
};

export default SocialismPage;

import { motion } from "framer-motion";

import { KineticHeading, KineticSubline } from "../../components/ui/KineticText";

const InformationsPage = () => {
  return (
    <div id="informations_page" className="min-h-screen w-full pt-24 pb-16 px-4 md:px-10 info-shell">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel rounded-sm border-2 border-ink shadow-hard-lg p-10 md:p-14 accent-grid relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_20%_10%,rgba(218,37,29,0.08),transparent_35%),radial-gradient(circle_at_90%_0%,rgba(255,205,0,0.1),transparent_30%)]"></div>
        <div className="relative z-10 space-y-6">
          <KineticHeading
            title="Tổng quan & tài liệu tham khảo"
            size="lg"
          />
          <KineticSubline className="max-w-3xl">
            Tổng hợp các mảng kiến thức chính, tài liệu bắt buộc và gợi ý làm việc nhóm cho môn Chủ nghĩa xã hội khoa học.
          </KineticSubline>
        </div>

        <div className="relative z-10 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-sm bg-white border-2 border-ink shadow-hard kinetic-grid">
            <h3 className="font-display text-2xl font-bold text-ink mb-3">Trọng tâm kiến thức</h3>
            <ul className="space-y-3 text-base text-graphite/80">
              <li>• Bản chất, mục tiêu, động lực của CNXH theo tư tưởng Hồ Chí Minh.</li>
              <li>• Nhà nước pháp quyền XHCN: tổ chức quyền lực, phân công – phối hợp – kiểm soát.</li>
              <li>• Mối quan hệ Đảng - Nhà nước - Nhân dân và cơ chế giải trình.</li>
            </ul>
          </div>

          <div className="p-6 rounded-sm bg-white border-2 border-ink shadow-hard kinetic-grid">
            <h3 className="font-display text-2xl font-bold text-ink mb-3">Tài liệu tham khảo</h3>
            <ul className="space-y-3 text-base text-graphite/80">
              <li>• Giáo trình Chủ nghĩa xã hội khoa học (NXB CTQG Sự thật, bản mới nhất).</li>
              <li>• Văn kiện Đại hội XIII, Hiến pháp 2013, các nghị quyết về xây dựng Nhà nước pháp quyền.</li>
              <li>• Báo cáo thực tiễn: phát triển kinh tế thị trường định hướng XHCN, cải cách tư pháp.</li>
            </ul>
          </div>

          <div className="p-6 rounded-sm bg-white border-2 border-ink shadow-hard kinetic-grid">
            <h3 className="font-display text-2xl font-bold text-ink mb-3">Gợi ý làm việc nhóm</h3>
            <ul className="space-y-3 text-base text-graphite/80">
              <li>• Phân vai: tìm văn bản pháp lý, tổng hợp lý thuyết, đối chiếu thực tiễn.</li>
              <li>• Tạo slide theo mô-đun, chèn trích dẫn chuẩn và nguồn dẫn.</li>
              <li>• Sử dụng MLN131 Bot để kiểm tra sự rõ ràng và thêm ví dụ minh họa.</li>
            </ul>
          </div>
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 rounded-sm border-2 border-ink bg-ink text-bone shadow-hard">
            <h3 className="font-display text-xl font-bold mb-3 kinetic-title">Mốc học tập gợi ý</h3>
            <ul className="space-y-3 text-sm opacity-90">
              <li>• Tuần 1-2: Ôn cơ sở lý luận, khái niệm CNXH và thời kỳ quá độ.</li>
              <li>• Tuần 3-4: Nhà nước pháp quyền XHCN, bộ máy và nguyên tắc vận hành.</li>
              <li>• Tuần 5-6: Đảng lãnh đạo, Nhân dân làm chủ, cơ chế giám sát.</li>
            </ul>
          </div>
          <div className="p-6 rounded-sm bg-white border-2 border-ink shadow-hard flex flex-col gap-3">
            <h3 className="font-display text-xl font-bold text-ink">Liên kết nhanh</h3>
            <p className="text-base text-graphite/70">Khám phá các trang nội dung đã hoàn thiện.</p>
            <div className="flex flex-wrap gap-3">
              <a href="/trang-chu" className="px-4 py-2 rounded-sm border-2 border-ink bg-crimson text-bone font-semibold shadow-hard">
                Trang chủ
              </a>
              <a href="/chu-nghia-xa-hoi" className="px-4 py-2 rounded-sm border-2 border-ink text-ink hover:bg-gold transition-colors">
                Cơ cấu & vận hành
              </a>
              <a href="/thoi-ki-qua-do" className="px-4 py-2 rounded-sm border-2 border-ink text-ink hover:bg-gold transition-colors">
                Đảng & Nhân dân
              </a>
              <a href="/ai-chatbot" className="px-4 py-2 rounded-sm border-2 border-ink text-ink hover:bg-gold transition-colors">
                MLN131 Bot
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InformationsPage;

import { motion } from "framer-motion";

import { KineticHeading, KineticSubline } from "../../components/ui/KineticText";

const AiUsagePage = () => {
  return (
    <div className="min-h-screen bg-bone pt-24 pb-16 px-4 md:px-10 ai-usage-shell">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel rounded-sm border-2 border-ink shadow-hard-lg p-10 md:p-14 accent-grid relative overflow-hidden space-y-8"
      >
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_15%_25%,rgba(218,37,29,0.08),transparent_35%),radial-gradient(circle_at_85%_5%,rgba(255,205,0,0.1),transparent_30%)]"></div>
        <div className="relative z-10 space-y-6">
          <KineticHeading
            title="Ứng dụng AI trong môn học"
            size="lg"
          />
          <KineticSubline className="max-w-3xl">
            Tận dụng AI để tóm tắt bài, gợi ý kế hoạch thảo luận và kiểm tra mức độ hiểu.
          </KineticSubline>
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-sm bg-white border-2 border-ink shadow-hard kinetic-grid">
            <h3 className="font-display text-2xl font-bold text-ink mb-3">Tác vụ gợi ý</h3>
            <ul className="space-y-3 text-base text-graphite/80">
              <li>• Tóm tắt nhanh từng mục trong giáo trình hoặc slide.</li>
              <li>• Soạn 5-7 câu hỏi thảo luận cho chủ đề được giao.</li>
              <li>• Biến khái niệm khô khan thành ví dụ thời sự gắn với Việt Nam.</li>
              <li>• Kiểm tra hiểu biết: yêu cầu giải thích lại bằng ngôn ngữ của bạn.</li>
            </ul>
          </div>

          <div className="p-6 rounded-sm bg-white border-2 border-ink shadow-hard kinetic-grid">
            <h3 className="font-display text-2xl font-bold text-ink mb-3">Quy tắc & lưu ý</h3>
            <ul className="space-y-3 text-base text-graphite/80">
              <li>• Nói rõ bối cảnh: môn MLN131, nội dung khoa học chính trị.</li>
              <li>• Xin nguồn tham khảo hoặc điều khoản trích dẫn khi cần.</li>
              <li>• Kiểm tra chéo thông tin quan trọng với giáo trình và văn kiện Đảng.</li>
              <li>• Luôn đặt giới hạn: trả lời ngắn gọn (150-200 từ) hoặc dạng bullet.</li>
            </ul>
          </div>
        </div>

        <div className="relative z-10 grid md:grid-cols-3 gap-4">
          {[
            "Tóm tắt mục 'Nhà nước pháp quyền' trong 180 từ, thêm 2 ví dụ thực tiễn VN.",
            "Đề xuất 5 câu hỏi mở cho thảo luận về vai trò Mặt trận Tổ quốc trong giám sát.",
            "Kiểm tra hiểu biết: hỏi lại mình 4 câu trắc nghiệm về thời kỳ quá độ.",
          ].map((prompt) => (
            <div key={prompt} className="p-4 rounded-sm border-2 border-bone bg-ink text-bone text-base font-semibold shadow-hard">
              {prompt}
            </div>
          ))}
        </div>

        <div className="relative z-10 flex flex-wrap gap-3">
          <a
            href="/ai-chatbot"
            className="px-5 py-3 bg-crimson text-bone border-2 border-ink rounded-sm font-semibold shadow-hard hover:bg-red-700 transition-colors"
          >
            Trò chuyện với trợ lý
          </a>
          <span className="px-4 py-2 border-2 border-ink rounded-sm bg-white text-graphite/70 text-sm">
            Định dạng gợi ý rõ ràng • Hạn chế nhiễu
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default AiUsagePage;

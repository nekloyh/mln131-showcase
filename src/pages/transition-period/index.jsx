
import { motion } from "framer-motion";
import { CheckCircle, Users, Scale, FileText, Activity } from "lucide-react";
import { KineticHeading, KineticSubline, MarqueeStrip } from "../../components/ui/KineticText";

const TransitionPeriodPage = () => {
  return (
    <div className="transition-shell min-h-screen w-full bg-bone pt-24 pb-16 px-4 md:px-10 text-graphite font-body">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-12">

        {/* HEADER */}
        <div className="text-center mb-12 space-y-4">
          <KineticHeading
            align="center"
            title="Đảng lãnh đạo & Quan hệ với Nhân dân"
            size="lg"
          />
          <KineticSubline className="text-center max-w-3xl mx-auto">
            Bản chất lãnh đạo của Đảng, quyền làm chủ của Nhân dân và cơ chế giải trình trong Nhà nước pháp quyền XHCN.
          </KineticSubline>
        </div>

        {/* PART 1: PARTY LEADERSHIP */}
        <section className="mb-20 relative">

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-crimson/10 to-gold/10 rounded-3xl -rotate-2"></div>
              <div className="bg-white p-8 rounded-sm shadow-hard relative rotate-1 border-2 border-ink kinetic-grid">
                <h3 className="font-display text-2xl font-bold text-crimson mb-6">Đảng Cộng sản Việt Nam</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <CheckCircle className="text-crimson shrink-0" size={20} />
                    <span className="text-graphite/80">Đội tiên phong của giai cấp công nhân và nhân dân lao động.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="text-crimson shrink-0" size={20} />
                    <span className="text-graphite/80">Đại biểu trung thành của lợi ích dân tộc.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="text-crimson shrink-0" size={20} />
                    <span className="text-graphite/80">Lực lượng duy nhất đủ bản lĩnh lãnh đạo cách mạng.</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="text-crimson shrink-0" size={20} />
                    <span className="text-graphite/80">Nhân tố quyết định bản chất XHCN của Nhà nước.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl font-display font-bold text-ink">Vai trò lãnh đạo tất yếu</h2>
              <p className="text-lg text-graphite/70 leading-relaxed">
                Sự lãnh đạo của Đảng không phải là áp đặt chủ quan mà là yêu cầu khách quan của sự nghiệp xây dựng chủ nghĩa xã hội, đảm bảo nhà nước giữ vững định hướng chính trị vì lợi ích nhân dân.
              </p>

              <div className="bg-white rounded-sm p-6 border-2 border-ink border-l-4 border-l-crimson shadow-hard">
                <h4 className="font-bold text-ink mb-3 uppercase text-sm tracking-wide">Phương thức lãnh đạo</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-bone p-3 rounded-sm border-2 border-ink text-sm font-medium">1. Bằng Cương lĩnh, chiến lược</div>
                  <div className="bg-bone p-3 rounded-sm border-2 border-ink text-sm font-medium">2. Qua công tác cán bộ</div>
                  <div className="bg-bone p-3 rounded-sm border-2 border-ink text-sm font-medium">3. Công tác kiểm tra, giám sát</div>
                  <div className="bg-bone p-3 rounded-sm border-2 border-ink text-sm font-medium">4. Nêu gương & Thuyết phục</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PART 2: PEOPLE'S MASTERSHIP */}
        <section className="mb-20">
          <h2 className="text-3xl font-display font-bold text-ink text-center mb-10">
            Nhân dân làm chủ & Trách nhiệm giải trình
          </h2>
          <KineticSubline className="text-center max-w-3xl mx-auto mb-8">
            Các cơ chế dân chủ đại diện và trực tiếp vận hành song song, tạo áp lực giải trình liên tục cho bộ máy nhà nước.
          </KineticSubline>

          {/* Infographic Style Layout */}
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-sm shadow-hard border-2 border-ink">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <Users size={24} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Chủ thể quyền lực</h3>
              <p className="text-base text-graphite/70 mb-4">
                Nhân dân là chủ thể tối cao. Nhà nước là công cụ để thực hiện quyền làm chủ.
              </p>
              <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-sm shadow-hard border-2 border-ink">
              <div className="w-12 h-12 bg-ember/20 rounded-full flex items-center justify-center text-ember mb-4">
                <FileText size={24} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Cơ chế Bầu cử</h3>
              <p className="text-base text-graphite/70 mb-4">
                Bầu ra Quốc hội & HĐND. Có quyền bãi nhiệm đại biểu không còn xứng đáng.
              </p>
              <div className="h-1 w-12 bg-ember rounded-full"></div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-sm shadow-hard border-2 border-ink">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                <Scale size={24} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Giám sát & Phản biện</h3>
              <p className="text-base text-graphite/70 mb-4">
                Thông qua MTTQ, khiếu nại, tố cáo và yêu cầu giải trình minh bạch.
              </p>
              <div className="h-1 w-12 bg-purple-500 rounded-full"></div>
            </motion.div>
          </div>
          <MarqueeStrip
            text="Đại diện • Giải trình • Minh bạch • Kiểm soát quyền lực"
            speed={26}
            className="mt-10"
          />
        </section>

        {/* PART 3: CONCLUSION */}
        <section className="bg-ink text-bone rounded-sm p-8 md:p-12 text-center relative overflow-hidden border-2 border-ink shadow-hard-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-crimson/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <Activity className="w-12 h-12 mx-auto mb-6 text-crimson" />
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Kết luận</h2>
            <p className="text-lg md:text-xl leading-relaxed opacity-90">
              "Nhà nước pháp quyền XHCN Việt Nam là sự thống nhất biện chứng giữa <span className="text-crimson font-bold">Quyền lực Nhà nước</span>, <span className="text-crimson font-bold">Sự lãnh đạo của Đảng</span> và <span className="text-crimson font-bold">Quyền làm chủ của Nhân dân</span>. Đây là nhân tố quyết định thắng lợi của sự nghiệp đổi mới."
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default TransitionPeriodPage;

import "./style.css";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, Quote, ChevronDown } from "lucide-react";
import TiltCard from "../../components/ui/TiltCard";

const HomePage = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="home-shell w-full bg-bone selection:bg-crimson selection:text-white">
      {/* FRAME 1: HERO - Introduction */}
      <section className="min-h-screen relative flex items-center justify-center px-4 md:px-10 overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(218,37,29,0.05),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          <motion.div 
            style={{ y: yHero, opacity: opacityHero }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-crimson/10 text-crimson rounded-full border border-crimson/20">
              <Star size={14} fill="currentColor" />
              <span className="text-xs font-bold tracking-wider uppercase">Chương 4 • Giáo trình CNXHKH</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] text-ink">
              Nhà nước pháp quyền <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-ember">
                Xã hội chủ nghĩa
              </span> <br/>
              Việt Nam
            </h1>

            <p className="text-lg text-graphite/70 max-w-xl leading-relaxed">
              Một nhà nước của Nhân dân, do Nhân dân, vì Nhân dân. Xây dựng nhà nước pháp quyền là yêu cầu tất yếu để bảo đảm quyền lực thuộc về nhân dân trong thời kỳ quá độ.
            </p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <button onClick={() => document.getElementById('frame2').scrollIntoView({ behavior: 'smooth' })} className="animate-bounce p-3 rounded-full bg-white border border-ink/10 shadow-lg text-crimson">
                <ChevronDown size={24} />
              </button>
              <span className="text-sm font-medium text-graphite/50">Cuộn để khám phá</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <TiltCard className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
               <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_Communist_Party_of_Vietnam.svg/1200px-Flag_of_the_Communist_Party_of_Vietnam.svg.png" 
                alt="Communist Party of Vietnam Flag"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                <p className="text-white/90 font-display text-xl font-bold">Thượng tôn Hiến pháp & Pháp luật</p>
                <p className="text-white/70 text-sm mt-1">Nền tảng của chế độ xã hội chủ nghĩa</p>
              </div>
            </TiltCard>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-crimson/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* FRAME 2: CORE CHARACTERISTICS */}
      <section id="frame2" className="min-h-screen py-24 px-4 md:px-10 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-4">Đặc trưng cơ bản</h2>
            <div className="w-20 h-1 bg-crimson mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Nhà nước của dân, do dân, vì dân", desc: "Quyền lực nhà nước thuộc về Nhân dân, phục vụ lợi ích của Nhân dân." },
              { title: "Quyền lực thống nhất", desc: "Được thực hiện thông qua các cơ quan đại diện do dân bầu ra." },
              { title: "Thượng tôn Pháp luật", desc: "Quản lý xã hội bằng Hiến pháp và pháp luật. Mọi người đều bình đẳng." },
              { title: "Đảng lãnh đạo", desc: "Đặt dưới sự lãnh đạo toàn diện của Đảng Cộng sản Việt Nam." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-xl border border-ink/5 bg-bone hover:bg-white hover:border-crimson/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-crimson/10 flex items-center justify-center text-crimson font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                  0{idx + 1}
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-3">{item.title}</h3>
                <p className="text-graphite/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FRAME 3: QUOTE & PRINCIPLES */}
      <section className="min-h-[80vh] py-24 px-4 md:px-10 flex items-center justify-center bg-ink/5 relative overflow-hidden">
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#b22234 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <Quote className="w-16 h-16 text-crimson/20 mx-auto mb-8" />
           <motion.blockquote 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-medium text-ink leading-tight mb-10"
           >
             "Quyền lực nhà nước là thống nhất, có sự phân công, phối hợp và kiểm soát giữa các cơ quan nhà nước."
           </motion.blockquote>
           
           <div className="flex justify-center gap-8 text-sm font-bold tracking-widest text-graphite/40 uppercase">
              <span>Lập pháp</span>
              <span className="text-crimson">•</span>
              <span>Hành pháp</span>
              <span className="text-crimson">•</span>
              <span>Tư pháp</span>
           </div>
        </div>
      </section>

      {/* FRAME 4: NAVIGATION / PROBLEM STATEMENT */}
      <section className="min-h-screen py-24 px-4 md:px-10 bg-white flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-display text-4xl font-bold text-ink mb-6">Nghiên cứu chi tiết</h2>
                <p className="text-lg text-graphite/70 mb-8">
                  Để hiểu rõ hơn về cách thức vận hành của bộ máy nhà nước cũng như mối quan hệ mật thiết giữa Đảng, Nhà nước và Nhân dân, hãy khám phá các nội dung chuyên sâu dưới đây.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                     <div className="w-2 h-2 rounded-full bg-crimson mt-2.5" />
                     <p className="text-graphite/80">Cơ cấu tổ chức Quốc hội, Chính phủ, Tòa án</p>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="w-2 h-2 rounded-full bg-crimson mt-2.5" />
                     <p className="text-graphite/80">Phương thức lãnh đạo của Đảng</p>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="w-2 h-2 rounded-full bg-crimson mt-2.5" />
                     <p className="text-graphite/80">Cơ chế giám sát và phản biện xã hội</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <motion.div 
                   whileHover={{ x: 5 }}
                   onClick={() => navigate('/chu-nghia-xa-hoi')}
                   className="cursor-pointer group p-6 rounded-2xl bg-bone border border-ink/5 hover:border-crimson/30 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-crimson uppercase tracking-wide">Phần II</span>
                    <ArrowRight className="text-ink/20 group-hover:text-crimson transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-1 group-hover:text-crimson transition-colors">Cơ cấu tổ chức & Vận hành</h3>
                  <p className="text-sm text-graphite/60">Quốc hội, Chính phủ, Tòa án và Viện kiểm sát.</p>
                </motion.div>

                <motion.div 
                   whileHover={{ x: 5 }}
                   onClick={() => navigate('/thoi-ki-qua-do')}
                   className="cursor-pointer group p-6 rounded-2xl bg-bone border border-ink/5 hover:border-crimson/30 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-crimson uppercase tracking-wide">Phần III, IV, V</span>
                    <ArrowRight className="text-ink/20 group-hover:text-crimson transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-1 group-hover:text-crimson transition-colors">Đảng lãnh đạo & Nhân dân làm chủ</h3>
                  <p className="text-sm text-graphite/60">Mối quan hệ biện chứng và cơ chế giải trình.</p>
                </motion.div>

                <motion.div 
                   whileHover={{ x: 5 }}
                   onClick={() => navigate('/tro-choi')}
                   className="cursor-pointer group p-6 rounded-2xl bg-gradient-to-r from-crimson to-ember text-white shadow-lg shadow-crimson/20"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-white/80 uppercase tracking-wide">Giải trí</span>
                    <ArrowRight className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Thử thách kiến thức</h3>
                  <p className="text-sm text-white/80">Ôn tập qua các trò chơi trắc nghiệm thú vị.</p>
                </motion.div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

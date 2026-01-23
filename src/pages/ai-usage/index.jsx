import { motion } from "framer-motion";
import {
  Search,
  Cpu,
  Layout,
  ArrowRight,
  Terminal,
  Sparkles,
  FileText,
  ShieldAlert
} from "lucide-react";
import {
  KineticHeading,
  KineticSubline,
} from "../../components/ui/KineticText";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";

const tools = [
  {
    category: "RESEARCH & DATA",
    name: "Nghiên cứu & Tổng hợp",
    tools: ["ChatGPT 5", "NotebookLM"],
    icon: Search,
    description: [
      "Phân tích, đối chiếu quan điểm giáo trình & văn kiện Đảng.",
      "Tóm tắt video bài giảng, trích xuất luận điểm cốt lõi.",
      "Kiểm tra chéo (Cross-check) kiến thức lịch sử."
    ],
    images: [
      "/images/ai-usage/gpt.jpg",
      "/images/ai-usage/notebooklm1.jpg",
      "/images/ai-usage/notebooklm2.jpg"
    ],
    color: "bg-green-100",
    border: "border-green-800",
    iconColor: "text-green-800",
    status: "OPERATIONAL"
  },
  {
    category: "CHATBOT OPERATION",
    name: "Vận hành Chatbot Cộng",
    tools: ["Google AI Studio", "Groq Cloud"],
    icon: Cpu,
    description: [
      "Fine-tune Gemini 1.5 Flash với dữ liệu Tư tưởng HCM.",
      "Tối ưu độ trễ phản hồi (<1s) với Groq LPU.",
      "Xây dựng Persona 'Cộng' gần gũi, học thuật."
    ],
    images: [
      "/images/ai-usage/googlestudio.png",
      "/images/ai-usage/groq.png"
    ],
    color: "bg-orange-100",
    border: "border-orange-800",
    iconColor: "text-orange-800",
    status: "OPTIMIZED"
  },
  {
    category: "WEB DEVELOPMENT",
    name: "Xây dựng Website",
    tools: ["Gemini Advanced"],
    icon: Layout,
    description: [
      "Generate code UI React/Tailwind chuẩn Neo-Brutalist.",
      "Tối ưu Responsive & Animation (Framer Motion).",
      "Debug logic & Refactor code base."
    ],
    images: [
      "/images/ai-usage/gemini_1.png",
      "/images/ai-usage/gemini_2.png"
    ],
    color: "bg-blue-100",
    border: "border-blue-800",
    iconColor: "text-blue-800",
    status: "ACTIVE"
  }
];

const ToolCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <Card
      variant="default"
      hoverEffect
      className="h-full flex flex-col p-6 md:p-8 bg-white border-4 border-ink shadow-hard"
      hasDecorativeCorners={false}
    >
      <div className="flex-1">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className={`inline-block border-2 border-ink px-3 py-1 font-bold font-mono text-xs mb-3 uppercase shadow-sm ${item.color}`}>
              {item.category}
            </span>
            <h3 className="font-display text-4xl text-ink leading-[0.9] uppercase font-black">
              {item.name}
            </h3>
          </div>

          <div className="shrink-0 p-3 border-4 border-ink bg-white shadow-sm">
            <Icon size={32} strokeWidth={1.5} className="text-ink" />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="mb-6">
          <h4 className="font-bold font-mono text-xs text-ink/60 uppercase mb-2 tracking-widest">Tools Used:</h4>
          <div className="flex flex-wrap gap-2">
            {item.tools.map(t => (
              <span key={t} className="px-3 py-1 border-2 border-ink bg-bone font-bold text-sm">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Description Process */}
        <ul className="space-y-3 mb-6">
          {item.description.map((desc, i) => (
            <li key={i} className="flex items-start gap-3 text-base text-ink leading-snug">
              <ArrowRight size={20} className="text-crimson shrink-0 mt-0.5" />
              <span>{desc}</span>
            </li>
          ))}
        </ul>

        {/* Images Gallery */}
        {item.images && item.images.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold font-mono text-xs text-ink/60 uppercase mb-3 tracking-widest">Screenshots:</h4>
            <div className={`grid gap-3 ${item.images.length === 1 ? 'grid-cols-1' : item.images.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
              {item.images.map((img, i) => (
                <a 
                  key={i} 
                  href={img} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block border-2 border-ink overflow-hidden hover:shadow-hard transition-shadow duration-200 bg-ink/5"
                >
                  <img 
                    src={img} 
                    alt={`${item.name} screenshot ${i + 1}`}
                    className="w-full h-32 object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Status */}
      <div className="mt-auto pt-4 border-t-2 border-dashed border-ink flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-ink/70">
          <div className={`w-2 h-2 rounded-full ${item.status === 'OPERATIONAL' ? 'bg-green-500' : item.status === 'OPTIMIZED' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
          {item.status}
        </div>
      </div>
    </Card>
  );
};

const AiUsagePage = () => {
  return (
    <div className="w-full bg-bone min-h-screen page-shell selection:bg-crimson selection:text-white">
      <Section autoHeight={true} className="pt-32 pb-24 px-4 md:px-8">

        {/* Header Section */}
        <div className="flex flex-col items-center justify-center space-y-8 max-w-5xl mx-auto w-full relative z-10 mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-600 border-4 border-ink px-6 py-2 shadow-hard transform rotate-1"
          >
            <span className="font-mono font-bold uppercase tracking-widest text-sm md:text-base text-white">
              Transparency Report
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
              AI TOOLS
            </motion.h1>

            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="font-display font-black text-6xl md:text-8xl uppercase text-transparent text-stroke-black leading-[0.85] tracking-tighter"
            >
              USAGE
            </motion.h1>
          </div>

          <KineticSubline className="max-w-3xl mx-auto text-xl md:text-2xl text-center leading-relaxed">
            Báo cáo chi tiết về việc ứng dụng Trí tuệ nhân tạo trong quá trình phát triển dự án, đảm bảo tính minh bạch và liêm chính học thuật.
          </KineticSubline>
        </div>

        {/* Tools Section */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {tools.map((item, index) => (
            <div key={item.name} className={index === 2 ? "lg:col-span-2 lg:w-2/3 lg:mx-auto" : ""}>
              <ToolCard item={item} index={index} />
            </div>
          ))}
        </div>

        {/* Footer Disclaimer - Academic Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white border-4 border-ink p-8 md:p-12 text-center relative shadow-hard-lg">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-crimson text-white px-6 py-2 font-bold font-mono uppercase text-sm border-2 border-ink shadow-sm">
              Academic Integrity
            </div>

            <ShieldAlert size={64} className="text-crimson mx-auto mb-6" />

            <h3 className="font-display text-4xl text-ink uppercase mb-4">
              Cam kết học thuật
            </h3>

            <div className="space-y-4 text-ink/80 text-lg leading-relaxed max-w-2xl mx-auto">
              <p>
                AI chỉ đóng vai trò là <strong>công cụ hỗ trợ</strong> (tra cứu, gợi ý, tối ưu mã nguồn),
                <span className="text-crimson font-bold"> KHÔNG</span> thay thế tư duy.
              </p>
              <p>
                Mọi nội dung chuyên môn đều được đối chiếu với <strong>Giáo trình Tư tưởng Hồ Chí Minh</strong> & Văn kiện Đảng.
              </p>
            </div>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default AiUsagePage;

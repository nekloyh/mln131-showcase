import { motion } from "framer-motion";
import { Gamepad2, BrainCircuit, Users, Trophy } from "lucide-react";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { KineticHeading, KineticSubline } from "../../components/ui/KineticText";

const GamesPage = () => {
    const games = [
        {
            id: 1,
            title: "Chinh phục Lý luận",
            description: "Trò chơi trắc nghiệm kiến thức về Triết học Mác - Lênin và CNXH Khoa học. Thử thách bản thân với các cấp độ từ cơ bản đến nâng cao.",
            icon: <BrainCircuit size={40} className="text-crimson" />,
            status: "Sắp ra mắt",
            action: "Chơi ngay",
            color: "border-crimson"
        },
        {
            id: 2,
            title: "Xây dựng Xã hội",
            description: "Mô phỏng quy trình ra quyết định chính sách trong môi trường giả lập. Đóng vai người lãnh đạo để giải quyết các vấn đề xã hội.",
            icon: <Users size={40} className="text-blue-600" />,
            status: "Đang phát triển",
            action: "Đăng ký sớm",
            color: "border-blue-600"
        },
        {
            id: 3,
            title: "Bảo vệ Nền tảng",
            description: "Trò chơi tranh biện và nhận diện các quan điểm sai trái. Rèn luyện tư duy phản biện sắc bén dựa trên thế giới quan duy vật biện chứng.",
            icon: <ShieldGame size={40} className="text-ember" />,
            status: "Sắp ra mắt",
            action: "Tìm hiểu",
            color: "border-ember"
        }
    ];

    return (
        <div className="page-shell w-full bg-bone min-h-screen">
            {/* SECTION 1: HEADER */}
            <Section autoHeight={true} className="items-center justify-center pt-32 px-4 md:px-10 border-b-2 border-ink bg-bone">
                <div className="space-y-4 max-w-4xl text-center">
                    <KineticHeading
                        align="center"
                        title="Khu vực Trò chơi & Tương tác"
                        size="lg"
                    />
                    <KineticSubline className="max-w-3xl mx-auto">
                        Học tập qua giải trí. Tiếp cận kiến thức lý luận thông qua các trò chơi mô phỏng và thử thách tư duy.
                    </KineticSubline>
                </div>
            </Section>

            {/* SECTION 2: GAME LIST */}
            <Section autoHeight={true} className="items-center justify-center px-4 md:px-10 py-16 bg-paper">
                <div className="max-w-screen-2xl mx-auto w-full">
                    <div className="grid md:grid-cols-3 gap-8">
                        {games.map((game, index) => (
                            <Card
                                key={game.id}
                                variant="default"
                                hoverEffect
                                className={`p-8 flex flex-col h-full border-t-8 ${game.color}`}
                            >
                                <div className="mb-6 flex justify-between items-start">
                                    <div className="p-4 bg-bone rounded-full border-2 border-ink shadow-sm">
                                        {game.icon}
                                    </div>
                                    <span className="text-xs font-mono uppercase font-bold bg-ink/10 px-2 py-1 rounded text-ink/70">
                                        {game.status}
                                    </span>
                                </div>

                                <h3 className="font-display text-2xl font-bold mb-3 uppercase tracking-tight">{game.title}</h3>
                                <p className="text-graphite/80 mb-8 flex-grow leading-relaxed">
                                    {game.description}
                                </p>

                                <div className="mt-auto">
                                    <Button variant={index === 0 ? "primary" : "outline"} className="w-full justify-center group">
                                        {game.action}
                                        {index === 0 && <Gamepad2 className="ml-2 group-hover:rotate-12 transition-transform" size={18} />}
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* LEADERBOARD TEASER */}
                    <div className="mt-20">
                        <Card variant="flat" className="p-8 md:p-12 bg-ink text-bone border-2 border-bone shadow-hard-lg relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                                        <Trophy className="text-gold animate-bounce" size={40} />
                                        <h3 className="font-display text-3xl font-bold text-gold uppercase">Bảng Xếp Hạng</h3>
                                    </div>
                                    <p className="text-bone/80 max-w-xl text-lg">
                                        Thi đua học tập và rèn luyện. Tích lũy điểm số để nhận các phần quà và huy hiệu tri thức danh giá.
                                    </p>
                                </div>
                                <Button variant="outline" className="text-gold border-gold hover:bg-gold hover:text-ink">
                                    Xem Xếp Hạng
                                </Button>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-crimson/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                        </Card>
                    </div>
                </div>
            </Section>
        </div>
    );
};

// Helper component for Icon (since lucide icons are components)
const ShieldGame = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" opacity="0.2" fill="currentColor" />
    </svg>
);

export default GamesPage;

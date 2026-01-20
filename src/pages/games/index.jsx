import { useState } from "react";
import { Gamepad2, BrainCircuit, Users, Trophy, Zap } from "lucide-react";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { KineticHeading, KineticSubline } from "../../components/ui/KineticText";
import RunnerQuizGame from "./runner-quiz/RunnerQuizGame";

const GamesPage = () => {
    const [showRunnerQuiz, setShowRunnerQuiz] = useState(false);

    const games = [
        {
            id: 1,
            title: "Runner Quiz",
            description: "Trò chơi endless runner kết hợp giải đố. Nhảy qua chướng ngại vật, trả lời câu hỏi nhanh để ghi điểm. Sai 3 lần là thua!",
            icon: <Zap size={40} className="text-crimson" />,
            status: "Chơi được",
            action: "Chơi ngay",
            color: "border-crimson",
            playable: true,
            onClick: () => setShowRunnerQuiz(true)
        },
        {
            id: 2,
            title: "Chinh phục Lý luận",
            description: "Trò chơi trắc nghiệm kiến thức về Triết học Mác - Lênin và CNXH Khoa học. Thử thách bản thân với các cấp độ từ cơ bản đến nâng cao.",
            icon: <BrainCircuit size={40} className="text-gold" />,
            status: "Sắp ra mắt",
            action: "Đăng ký sớm",
            color: "border-gold",
            playable: false
        },
        {
            id: 3,
            title: "Xây dựng Xã hội",
            description: "Mô phỏng quy trình ra quyết định chính sách trong môi trường giả lập. Đóng vai người lãnh đạo để giải quyết các vấn đề xã hội.",
            icon: <Users size={40} className="text-blue-600" />,
            status: "Đang phát triển",
            action: "Tìm hiểu",
            color: "border-blue-600",
            playable: false
        }
    ];

    return (
        <div className="page-shell w-full bg-bone min-h-screen">
            {/* Runner Quiz Game Modal */}
            {showRunnerQuiz && (
                <RunnerQuizGame onClose={() => setShowRunnerQuiz(false)} />
            )}

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
                                    <Button 
                                        variant={game.playable ? "primary" : "outline"} 
                                        className="w-full justify-center group"
                                        onClick={game.onClick}
                                        disabled={!game.playable && !game.onClick}
                                    >
                                        {game.action}
                                        {game.playable && <Gamepad2 className="ml-2 group-hover:rotate-12 transition-transform" size={18} />}
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

export default GamesPage;

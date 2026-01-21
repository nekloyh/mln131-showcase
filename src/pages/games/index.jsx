import { useState } from "react";
import { Gamepad2, ScrollText, Trophy, Zap } from "lucide-react";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { KineticHeading, KineticSubline } from "../../components/ui/KineticText";
import RunnerQuizGame from "./runner-quiz/RunnerQuizGame";
import CrosswordGame from "./crossword/CrosswordGame";

const GamesPage = () => {
    const [showRunnerQuiz, setShowRunnerQuiz] = useState(false);
    const [showCrossword, setShowCrossword] = useState(false);

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
            title: "Ô Chữ Pháp Quyền",
            description: "Sân khấu MC chính luận: giải 8 hàng ngang, lộ diện từ khóa PHÁP LUẬT. Đáp án đúng sẽ làm chữ dọc bừng sáng.",
            icon: <ScrollText size={40} className="text-gold" />,
            status: "Chơi được",
            action: "Bắt đầu",
            color: "border-gold",
            playable: true,
            onClick: () => setShowCrossword(true)
        }
    ];

    return (
        <div className="page-shell w-full bg-bone min-h-screen">
            {/* Runner Quiz Game Modal */}
            {showRunnerQuiz && (
                <RunnerQuizGame onClose={() => setShowRunnerQuiz(false)} />
            )}

            {/* Crossword Game Modal */}
            {showCrossword && (
                <CrosswordGame onClose={() => setShowCrossword(false)} />
            )}

            {/* SECTION 1: HEADER & GAME LIST COMBINED FOR BETTER FLOW */}
            <Section autoHeight={true} className="items-center justify-center pt-24 px-4 md:px-10 border-b-2 border-ink bg-bone relative overflow-hidden">
                 {/* Decorative Background Elements */}
                <div className="absolute top-20 left-10 opacity-10 pointer-events-none animate-pulse">
                    <Gamepad2 size={120} />
                </div>
                <div className="absolute bottom-20 right-10 opacity-10 pointer-events-none animate-bounce" style={{ animationDuration: '3s' }}>
                    <Zap size={100} />
                </div>

                <div className="space-y-6 max-w-4xl mx-auto text-center mb-16 relative z-10">
                    <div className="inline-block p-3 bg-ink text-gold font-mono font-bold uppercase tracking-widest text-sm mb-4 border-2 border-gold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                        Gamification Learning
                    </div>
                    <KineticHeading
                        align="center"
                        title="Arena Trí Tuệ"
                        size="xl"
                    />
                    <KineticSubline className="max-w-2xl mx-auto text-xl">
                        Vừa chơi vừa học. Thử thách bản thân với các trò chơi tương tác, ghi điểm và leo lên bảng xếp hạng cao thủ.
                    </KineticSubline>
                </div>

                <div className="max-w-5xl mx-auto w-full relative z-10">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {games.map((game, index) => (
                            <Card
                                key={game.id}
                                variant="default"
                                hoverEffect
                                className={`p-8 flex flex-col h-full border-t-8 ${game.color} transform transition-all duration-300 hover:scale-105`}
                            >
                                <div className="mb-6 flex justify-between items-start">
                                    <div className="p-4 bg-bone rounded-full border-2 border-ink shadow-sm group-hover:bg-gold transition-colors">
                                        {game.icon}
                                    </div>
                                    <span className="text-xs font-mono uppercase font-bold bg-ink/5 px-3 py-1.5 rounded border border-ink/20 text-ink/70">
                                        {game.status}
                                    </span>
                                </div>

                                <div className="flex-grow">
                                    <h3 className="font-display text-3xl font-bold mb-4 uppercase tracking-tight">{game.title}</h3>
                                    <p className="text-graphite/80 text-lg leading-relaxed mb-6">
                                        {game.description}
                                    </p>
                                </div>

                                <div className="mt-4 pt-6 border-t-2 border-dashed border-ink/20">
                                    <Button 
                                        variant="primary"
                                        className="w-full justify-center group text-lg py-6 shadow-hard hover:shadow-hard-lg hover:translate-y-[-2px]"
                                        onClick={game.onClick}
                                        disabled={!game.playable && !game.onClick}
                                    >
                                        {game.action}
                                        {game.playable && <Gamepad2 className="ml-3 group-hover:rotate-12 transition-transform" size={20} />}
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* LEADERBOARD TEASER INTEGRATED */}
                    <div className="mt-24 mb-12">
                        <div className="relative overflow-hidden rounded-xl border-4 border-ink bg-ink text-bone shadow-hard-xl p-8 md:p-12">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-80 h-80 bg-crimson rounded-full mix-blend-screen filter blur-3xl opacity-20 translate-y-1/3 -translate-x-1/3"></div>
                            
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                                        <Trophy className="text-gold" size={48} />
                                        <h3 className="font-display text-4xl font-bold text-gold uppercase tracking-wider">Hall of Fame</h3>
                                    </div>
                                    <p className="text-bone/90 text-xl font-light mt-4 max-w-2xl">
                                        Nơi vinh danh những "Nhà lý luận trẻ" xuất sắc nhất. Hãy ghi tên mình vào bảng vàng thành tích!
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <Button variant="outline" className="text-gold border-2 border-gold hover:bg-gold hover:text-ink text-lg px-8 py-4 uppercase font-bold tracking-wider">
                                        Xem Bảng Xếp Hạng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default GamesPage;

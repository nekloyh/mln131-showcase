import { useState } from "react";
import { Gamepad2, ScrollText, Trophy, Zap, BookOpen, X, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../../components/layout/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { KineticHeading, KineticSubline } from "../../components/ui/KineticText";
import RunnerQuizGame from "./runner-quiz/RunnerQuizGame";
import CrosswordGame from "./crossword/CrosswordGame";

const GuideModal = ({ onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div className="w-full max-w-2xl h-[60vh] bg-bone border-4 border-ink shadow-hard-xl flex flex-col relative">
            <div className="h-12 bg-ink text-bone flex items-center justify-between px-4 border-b-4 border-ink select-none">
                <div className="flex items-center gap-2">
                    <Info size={20} />
                    <span className="font-mono font-bold uppercase">GUIDE.TXT</span>
                </div>
                <button onClick={onClose} className="hover:text-crimson transition-colors">
                    <X size={24} />
                </button>
            </div>
            <div className="flex-1 p-8 flex items-center justify-center text-ink/40 font-mono text-xl uppercase tracking-widest">
                [ Nội dung hướng dẫn trống ]
            </div>
        </div>
    </div>
);

const LeaderboardModal = ({ onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 backdrop-blur-sm p-4 animate-in zoom-in-95 duration-200">
        <div className="w-full max-w-3xl bg-[#FFDEE2] border-4 border-black shadow-[12px_12px_0px_0px_#000] flex flex-col relative">
            
            {/* Retro Mac/Windows Title Bar */}
            <div className="h-12 bg-[#FF4757] border-b-4 border-black flex items-center justify-between px-4 select-none">
                <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-black bg-white"></div>
                    <div className="w-4 h-4 rounded-full border-2 border-black bg-black"></div>
                </div>
                <div className="font-black font-mono text-lg uppercase tracking-widest text-white">
                    LEADERBOARD.EXE
                </div>
                <button onClick={onClose} className="hover:bg-black hover:text-white p-1 border-2 border-transparent hover:border-white transition-all">
                    <X size={20} className="text-black hover:text-white" strokeWidth={3} />
                </button>
            </div>

            {/* Arcade Header */}
            <div className="bg-black text-[#FFD700] p-8 text-center border-b-4 border-black relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black font-display uppercase tracking-tighter leading-none mb-2 [text-shadow:4px_4px_0px_#000]">
                        TOP RUNNERS
                    </h2>
                    <p className="font-mono text-xs md:text-sm text-white/80 uppercase tracking-[0.3em]">
                        Runner Quiz Championship • Season 1
                    </p>
                </div>
                {/* Decorative grid or lines */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
            </div>

            {/* Table Area */}
            <div className="p-6 md:p-8 bg-[#FFDEE2] overflow-y-auto max-h-[50vh] custom-scrollbar">
                
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 mb-4 text-xs font-black font-mono uppercase tracking-widest text-black/50 border-b-2 border-black/10 pb-2">
                    <div className="col-span-2 text-center">#</div>
                    <div className="col-span-5">Agent</div>
                    <div className="col-span-3 text-right">Score</div>
                    <div className="col-span-2 text-right">Dist.</div>
                </div>

                {/* Top 1 Highlight */}
                <div className="relative mb-6 group">
                     <div className="absolute inset-0 bg-yellow-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] translate-x-1 translate-y-1"></div>
                     <div className="relative bg-white border-4 border-black p-4 grid grid-cols-12 gap-4 items-center hover:-translate-y-1 hover:-translate-x-1 transition-transform cursor-default">
                        <div className="col-span-2 flex justify-center">
                             <Trophy size={32} className="text-yellow-500 fill-yellow-500" strokeWidth={2.5} />
                        </div>
                        <div className="col-span-5">
                            <div className="font-black text-xl uppercase truncate">MasterMind</div>
                            <div className="text-xs font-mono bg-black text-white inline-block px-1">LEGEND</div>
                        </div>
                        <div className="col-span-3 text-right font-black text-2xl text-[#FF4757]">9999</div>
                        <div className="col-span-2 text-right font-mono text-sm opacity-60">∞m</div>
                     </div>
                </div>

                {/* List */}
                <div className="space-y-3">
                    {[
                        { rank: 2, name: "SpeedDemon", score: 8540, dist: "4500m" },
                        { rank: 3, name: "QuizWiz", score: 7200, dist: "3800m" },
                        { rank: 4, name: "Newbie_01", score: 6100, dist: "2100m" },
                        { rank: 5, name: "Runner_X", score: 5400, dist: "1500m" },
                    ].map((player) => (
                        <div key={player.rank} className="grid grid-cols-12 gap-4 items-center p-3 border-b-2 border-dashed border-black/20 hover:bg-white hover:border-solid hover:border-black transition-all font-mono">
                            <div className="col-span-2 text-center font-black text-lg text-black/40">0{player.rank}</div>
                            <div className="col-span-5 font-bold uppercase">{player.name}</div>
                            <div className="col-span-3 text-right font-bold">{player.score}</div>
                            <div className="col-span-2 text-right text-sm opacity-60">{player.dist}</div>
                        </div>
                    ))}
                </div>

            </div>
            
            {/* Footer */}
            <div className="bg-black p-4 flex justify-between items-center text-white font-mono text-xs uppercase">
                <span>Status: ONLINE</span>
                <span className="animate-pulse">Waiting for challenger...</span>
            </div>
        </div>
    </div>
);

const GamesPage = () => {
    const [showRunnerQuiz, setShowRunnerQuiz] = useState(false);
    const [showCrossword, setShowCrossword] = useState(false);
    const [activeGuide, setActiveGuide] = useState(null);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

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
            {/* Guide Modal */}
            <AnimatePresence>
                {activeGuide && <GuideModal onClose={() => setActiveGuide(null)} />}
            </AnimatePresence>

            {/* Leaderboard Modal */}
            <AnimatePresence>
                {showLeaderboard && <LeaderboardModal onClose={() => setShowLeaderboard(false)} />}
            </AnimatePresence>

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

                                <div className="mt-4 pt-6 border-t-2 border-dashed border-ink/20 space-y-3">
                                    <Button 
                                        variant="primary"
                                        className="w-full justify-center group text-lg py-4 shadow-hard hover:shadow-hard-lg hover:translate-y-[-2px]"
                                        onClick={game.onClick}
                                        disabled={!game.playable && !game.onClick}
                                    >
                                        {game.action}
                                        {game.playable && <Gamepad2 className="ml-3 group-hover:rotate-12 transition-transform" size={20} />}
                                    </Button>
                                    
                                    <Button
                                        variant="outline"
                                        className="w-full justify-center text-sm font-bold border-2 border-dashed border-ink/40 hover:border-ink hover:bg-ink/5 hover:text-ink py-3 transition-all"
                                        onClick={() => setActiveGuide(game.id)}
                                    >
                                        <BookOpen size={16} className="mr-2" />
                                        Hướng dẫn
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* LEADERBOARD TEASER INTEGRATED */}
                    <div className="mt-24 mb-12">
                        <div className="relative overflow-hidden rounded-xl border-4 border-black bg-black text-white shadow-[12px_12px_0px_0px_#FF4757] p-8 md:p-12">
                            {/* Animated Background */}
                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
                            
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                                        <Trophy className="text-[#FFD700]" size={48} strokeWidth={2.5} />
                                        <h3 className="font-black text-4xl md:text-5xl text-[#FFD700] uppercase tracking-tighter [text-shadow:4px_4px_0px_#000]">
                                            Runner Quiz<br/>Rankings
                                        </h3>
                                    </div>
                                    <p className="text-white/80 text-lg font-mono mt-4 max-w-2xl bg-black/50 inline-block px-2">
                                        Vượt chướng ngại vật - Trả lời câu hỏi - Ghi danh lịch sử.
                                    </p>
                                </div>
                                <div className="flex-shrink-0 relative group">
                                    <div className="absolute inset-0 bg-[#FF4757] translate-x-2 translate-y-2 border-2 border-black"></div>
                                    <Button 
                                        onClick={() => setShowLeaderboard(true)}
                                        variant="outline" 
                                        className="relative bg-white text-black border-2 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-lg px-8 py-4 uppercase font-black tracking-wider"
                                    >
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

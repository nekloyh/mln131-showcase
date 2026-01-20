import { motion } from "framer-motion";
import { KineticHeading, KineticSubline } from "../../components/ui/KineticText";

const games = [
    {
        id: 1,
        title: "Trắc nghiệm CNXH",
        description: "Kiểm tra kiến thức của bạn về Chủ nghĩa xã hội khoa học qua bộ câu hỏi trắc nghiệm.",
        image: "https://placehold.co/600x400/da251d/ffffff?text=Quiz",
        comingSoon: true
    },
    {
        id: 2,
        title: "Ô chữ bí mật",
        description: "Giải mã các ô chữ liên quan đến các khái niệm trong MLN131.",
        image: "https://placehold.co/600x400/e0ac00/000000?text=Puzzle",
        comingSoon: true
    }
];

export default function GamesPage() {
    return (
        <div className="pt-24 pb-20 min-h-screen px-4 md:px-10 lg:px-16 max-w-screen-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10 space-y-4"
            >
                <KineticHeading
                    align="center"
                    title="Góc Giải Trí & Học Tập"
                    size="lg"
                />
                <KineticSubline className="text-center max-w-2xl mx-auto">
                    Vừa học vừa chơi với các minigame, thử thách để ghi nhớ các khái niệm Chủ nghĩa xã hội khoa học.
                </KineticSubline>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {games.map((game, index) => (
                    <motion.div
                        key={game.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white border border-ink/10 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group kinetic-grid"
                    >
                        <div className="aspect-video bg-gray-100 relative overflow-hidden">
                            <img
                                src={game.image}
                                alt={game.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {game.comingSoon && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                                    <span className="bg-ember text-ink px-4 py-2 rounded-full font-bold font-display -rotate-6 shadow-lg border-2 border-white">
                                        Sắp ra mắt
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-display font-bold text-crimson mb-2">{game.title}</h3>
                            <p className="text-base text-graphite/70 mb-4">{game.description}</p>
                            <button
                                disabled={game.comingSoon}
                                className={`w-full py-2 px-4 rounded-lg font-bold transition-colors ${game.comingSoon
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-crimson text-white hover:bg-red-700'
                                    }`}
                            >
                                {game.comingSoon ? 'Đang phát triển' : 'Chơi ngay'}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

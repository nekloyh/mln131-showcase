import React, { useMemo, useState, useEffect, useRef } from "react";
import { Mic2, ScrollText, X, HelpCircle, Send, Check, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../../components/ui/Button";

const VERTICAL_WORD = "ĐOÀN KẾT";

// Vertical word alignment:
// 1. Đ Ả N G C Ộ N G S Ả N  -> Đ (index 0)
// 2. K I Ể M S O Á T       -> O (index 5)  
// 3. P H Á P L U Ậ T       -> A (index 2, but Á)
// 4. N H Â N D Â N         -> N (index 3)
// 5. K I Ể M T R A         -> K (index 0)
// 6. H I Ế N P H Á P       -> Ế (index 2)
// 7. T H Ố N G N H Ấ T     -> T (index 0)

const CROSSWORD_ROWS = [
    {
        id: 1,
        answer: "ĐẢNG CỘNG SẢN",
        hint1: "Định hướng cho Nhà nước đi lên chủ nghĩa xã hội.",
        hint2: "Đây là tổ chức chính trị mang bản chất giai cấp công nhân.",
        clue: "Tổ chức chính trị nào đóng vai trò lãnh đạo đối với Nhà nước pháp quyền XHCN Việt Nam, phù hợp với Điều 4 Hiến pháp năm 2013? (11 chữ cái)",
        verticalIndex: 0,
        anchor: "Chữ Đ ở vị trí 1"
    },
    {
        id: 2,
        answer: "KIỂM SOÁT",
        hint1: "Giữa các cơ quan lập pháp, hành pháp và tư pháp cần phải có sự tác động qua lại này.",
        hint2: "Đảm bảo quyền lực nhà nước được thực thi đúng đắn và hiệu quả.",
        clue: "Theo quan niệm về Nhà nước pháp quyền XHCN ở Việt Nam, giữa các cơ quan lập pháp, hành pháp và tư pháp phải có sự phân công, phối hợp và hành động này lẫn nhau. (8 chữ cái)",
        verticalIndex: 5,
        anchor: "Chữ O ở vị trí 6"
    },
    {
      id: 3,
      answer: "NHÀ NƯỚC",
      hint1: "Thiết chế quyền lực công đặc biệt, đại diện cho quyền lực của nhân dân, được sử dụng để tổ chức và quản lý xã hội.",
      hint2: "Trong Nhà nước pháp quyền XHCN Việt Nam, công cụ quản lý xã hội gắn liền với bộ máy quyền lực công này.",
      clue: "Trong Nhà nước pháp quyền XHCN Việt Nam, chủ thể nào giữ vai trò trung tâm trong việc tổ chức, quản lý xã hội theo Hiến pháp và pháp luật? (7 chữ cái)",
      verticalIndex: 2,
      anchor: "Chữ À ở vị trí 3"
    },
    {
        id: 4,
        answer: "NHÂN DÂN",
        hint1: "Theo quan điểm của Hồ Chí Minh và Đảng ta, trong chế độ xã hội chủ nghĩa, bao nhiêu quyền hạn đều là của đối tượng này.",
        hint2: "Đây là chủ thể tối cao của quyền lực nhà nước; Nhà nước pháp quyền XHCN Việt Nam được xây dựng là nhà nước của ai, do ai và vì ai?",
        clue: "Trong đặc điểm của Nhà nước pháp quyền XHCN Việt Nam, đây là chủ thể làm chủ đất nước; Nhà nước được xây dựng là của chủ thể này, do chủ thể này và vì chủ thể này. (7 chữ cái)",
        verticalIndex: 3,
        anchor: "Chữ N ở vị trí 4"
    },
    {
        id: 5,
        answer: "KIỂM TRA",
        hint1: "Đây là hoạt động mà công dân có thể thực hiện (cùng với giám sát) thông qua các tổ chức hoặc Ban thanh tra nhân dân để phòng, chống tham nhũng.",
        hint2: "Phương châm \"Dân biết, dân bàn, dân làm, dân ...\" thể hiện quyền giám sát của nhân dân.",
        clue: "Phương châm để nhân dân thực hiện quyền giám sát hoạt động của Nhà nước là: \"Dân biết, dân bàn, dân làm, dân ...\". (7 chữ cái)",
        verticalIndex: 0,
        anchor: "Chữ K ở vị trí 1"
    },
    {
        id: 6,
        answer: "HIẾN PHÁP",
        hint1: "Nhà nước và các tổ chức phải hoạt động dựa trên cơ sở của pháp luật và văn bản đạo luật cơ bản này.",
        hint2: "Mọi cơ quan, tổ chức, cán bộ, công chức và công dân đều có nghĩa vụ chấp hành nghiêm chỉnh pháp luật và văn bản này.",
        clue: "Trong Nhà nước pháp quyền, văn bản pháp lý nào được đặt ở vị trí tối thượng để điều chỉnh các quan hệ xã hội? (8 chữ cái)",
        verticalIndex: 2,
        anchor: "Chữ Ế ở vị trí 3"
    },
    {
        id: 7,
        answer: "THỐNG NHẤT",
        hint1: "Đây là đặc điểm cơ bản nhất về tính chất của quyền lực nhà nước ở Việt Nam: Quyền lực nhà nước là..., có sự phân công, phối hợp và kiểm soát giữa các cơ quan nhà nước.",
        hint2: "Nguyên tắc tổ chức quyền lực này đảm bảo sự chỉ đạo xuyên suốt của Nhà nước, khác biệt với cơ chế \"tam quyền phân lập\" của các nhà nước tư sản.",
        clue: "Đây là tính chất cơ bản của quyền lực nhà nước trong Nhà nước pháp quyền XHCN Việt Nam. Dù có sự phân công, phối hợp nhưng quyền lực nhà nước phải luôn đảm bảo yếu tố này. (8 chữ cái)",
        verticalIndex: 0,
        anchor: "Chữ T ở vị trí 1"
    }
];

const normalizeAnswer = (text) =>
    text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Z0-9]/gi, "")
        .toUpperCase();

const getSpacedIndex = (answer, verticalIndex) => {
    let cursor = 0;
    for (let i = 0; i < answer.length; i += 1) {
        if (answer[i] === " ") continue;
        if (cursor === verticalIndex) return i;
        cursor += 1;
    }
    return -1;
};

// Utility: Determine padding to align the vertical word
const getMaxLeftOffset = () => {
    return Math.max(...CROSSWORD_ROWS.map(r => getSpacedIndex(r.answer, r.verticalIndex)));
};

const CrosswordGame = ({ onClose }) => {
    const [activeRow, setActiveRow] = useState(null);
    const [guess, setGuess] = useState("");
    const [openedRows, setOpenedRows] = useState([]);
    const [hostLine, setHostLine] = useState("Chào mừng đến với Ô CHỮ PHÁP QUYỀN XHCN!");
    const [, setFeedback] = useState(null); // Used for triggering re-renders
    const [gameState, setGameState] = useState('playing'); // playing, won
    const [hintLevel, setHintLevel] = useState({}); // Track which hint level each row is on (1 or 2)
    
    // Board logic
    const maxOffset = useMemo(getMaxLeftOffset, []);
    const inputRef = useRef(null);

    // Focus input on selection
    useEffect(() => {
        if (activeRow && inputRef.current) {
            inputRef.current.focus();
        }
    }, [activeRow]);

    // Get current hint for a row based on hint level
    const getCurrentHint = (row) => {
        const level = hintLevel[row.id] || 1;
        return level === 1 ? row.hint1 : row.hint2;
    };

    const handleRowSelect = (row) => {
        if (openedRows.includes(row.id)) return;
        setActiveRow(row);
        setGuess("");
        setFeedback(null);
        const currentHint = getCurrentHint(row);
        setHostLine(`Gợi ý Hàng ${row.id}: ${row.clue}\n\n💡 ${currentHint}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!activeRow) return;

        const expected = normalizeAnswer(activeRow.answer);
        const candidate = normalizeAnswer(guess);

        if (!candidate) return;

        if (candidate === expected) {
            const newOpened = [...openedRows, activeRow.id];
            setOpenedRows(newOpened);
            setFeedback({ type: "success", text: "CHÍNH XÁC!" });
            setHostLine(`Tuyệt vời! Hàng ${activeRow.id} đã mở.`);
            
            if (newOpened.length === CROSSWORD_ROWS.length) {
                setGameState('won');
                setHostLine("CHÚC MỪNG! BẠN ĐÃ GIẢI MÃ THÀNH CÔNG TỪ KHÓA: " + VERTICAL_WORD);
                setActiveRow(null);
            } else {
                 setTimeout(() => setActiveRow(null), 800);
            }
        } else {
            setFeedback({ type: "error", text: "SAI RỒI!" });
            
            // Check current hint level and upgrade to hint 2 if on hint 1
            const currentLevel = hintLevel[activeRow.id] || 1;
            if (currentLevel === 1) {
                // Show hint 2
                setHintLevel(prev => ({ ...prev, [activeRow.id]: 2 }));
                setHostLine(`Sai rồi! Đây là gợi ý thứ 2:\n\n💡 ${activeRow.hint2}`);
            } else {
                // Already on hint 2, just show error
                setHostLine(`Sai rồi! Hãy thử lại.\n\n💡 ${activeRow.hint2}`);
            }
            
            // Clear the input
            setGuess("");
            
            // Shake effect logic
            const form = document.getElementById('answer-form');
            if(form) {
                form.classList.add('animate-shake');
                setTimeout(() => form.classList.remove('animate-shake'), 500);
            }
        }
    };

    const handleGiveUp = () => {
        if (!activeRow) return;
        setOpenedRows(prev => [...prev, activeRow.id]);
        setActiveRow(null);
        setHostLine(`Bạn đã bỏ qua hàng này. Tiếp tục nào!`);
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/20 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        {/* Main Window */}
        <div className="w-full max-w-[80vw] h-[90vh] bg-[#FFF8E7] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col relative overflow-hidden">
          {/* Title Bar */}
          <div className="h-14 bg-[#FF6B6B] border-b-4 border-black flex items-center justify-between px-4 select-none">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-black bg-white" />
              <div className="w-4 h-4 rounded-full border-2 border-black bg-black" />
              <h2 className="font-display font-black text-xl text-black ml-2 uppercase tracking-wide">
                GAME.EXE: Ô CHỮ - MÔ HÌNH NHÀ NƯỚC PHÁP QUYỀN
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <X size={24} strokeWidth={3} />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
            {/* Left Panel: The Board */}
            <div className="flex-1 overflow-auto bg-[#F0E6D2] relative custom-scrollbar flex flex-col">
              {/* Background Grid Pattern */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none sticky top-0 left-0 w-full h-full"
                style={{
                  backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              ></div>

              {/* Centered Scrollable Container */}
              <div className="min-w-full min-h-full w-max p-10 flex flex-col items-center justify-center">
                <div className="relative z-10">
                  {/* Vertical Highlight Column */}
                  <div
                    className="absolute top-0 bottom-8 w-[52px] bg-[#FFD700]/20 border-x-2 border-dashed border-black/20 pointer-events-none z-0 left-[calc(48px+16px+(var(--offset)*60px))]"
                    style={{ "--offset": maxOffset }}
                  />

                  <div className="flex flex-col gap-4 pb-8">
                    {CROSSWORD_ROWS.map((row) => {
                      const revealed = openedRows.includes(row.id);
                      const isActive = activeRow?.id === row.id;
                      const spacedIdx = getSpacedIndex(
                        row.answer,
                        row.verticalIndex,
                      );
                      const emptyCellsCount = maxOffset - spacedIdx;

                      return (
                        <div
                          key={row.id}
                          className="flex items-center gap-4 group w-max"
                        >
                          {/* Number Button */}
                          <button
                            onClick={() => handleRowSelect(row)}
                            disabled={revealed}
                            className={`w-12 h-12 flex-shrink-0 flex items-center justify-center font-black font-mono text-lg border-4 border-black transition-all relative z-20
                                                        ${
                                                          revealed
                                                            ? "bg-black text-white cursor-default"
                                                            : isActive
                                                              ? "bg-[#FF6B6B] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                                                              : "bg-white text-black hover:bg-[#FFD700] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                                                        }`}
                          >
                            {row.id}
                          </button>

                          {/* Row Cells - Ensure W-MAX to prevent wrapping/crushing */}
                          <div className="flex items-center gap-2">
                            {/* Hidden Spacers */}
                            {Array.from({ length: emptyCellsCount }).map(
                              (_, i) => (
                                <div
                                  key={`empty-${i}`}
                                  className="w-[52px] h-[52px] flex-shrink-0"
                                />
                              ),
                            )}

                            {row.answer
                              .toUpperCase()
                              .split("")
                              .map((char, idx) => {
                                const isSpace = char === " ";
                                const isVerticalKey = idx === spacedIdx;

                                // Always render the box, even if empty/hidden
                                let cellContent =
                                  !isSpace && revealed ? char : "";
                                let cellStyle =
                                  "bg-[#E5E5E5] border-2 border-dashed border-black/30 text-transparent"; // Default hidden

                                if (isSpace) {
                                  // Space is invisible but takes up layout space
                                  cellStyle = "opacity-0 border-none";
                                } else if (revealed) {
                                  cellStyle = isVerticalKey
                                    ? "bg-[#FFD700] border-4 border-black text-black z-10"
                                    : "bg-white border-2 border-black text-black";
                                } else if (isActive) {
                                  cellStyle =
                                    "bg-[#FF6B6B]/20 border-2 border-black/50 text-transparent animate-pulse";
                                }

                                return (
                                  <div
                                    key={idx}
                                    className={`w-[52px] h-[52px] flex-shrink-0 flex items-center justify-center text-2xl font-black select-none transition-all duration-300 ${cellStyle}`}
                                  >
                                    {cellContent}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Controls */}
            <div className="w-full lg:w-[420px] bg-white border-l-4 border-black flex flex-col overflow-hidden relative z-20">
              {/* MC / Info Section */}
              <div className="p-6 bg-[#A78BFA] border-b-4 border-black relative overflow-hidden">
                {/* Retro Pattern */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)",
                    backgroundSize: "10px 10px",
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3 bg-black text-white px-3 py-1 inline-block border-2 border-white transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                    <Mic2 size={16} />
                    <span className="font-mono text-sm font-bold uppercase">
                      LIVE FEED
                    </span>
                  </div>
                  <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-bold text-lg leading-tight first-letter:text-4xl first-letter:font-black first-letter:float-left first-letter:mr-2">
                      {hostLine}
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Zone */}
              <div className="flex-1 p-6 flex flex-col gap-6 bg-[#FFF]">
                {/* Stats */}
                <div className="flex gap-4">
                  <div className="flex-1 bg-[#4ADE80] border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-xs font-black uppercase mb-1">
                      Tiến trình
                    </div>
                    <div className="text-3xl font-black">
                      {openedRows.length}/7
                    </div>
                  </div>
                  <div className="flex-1 bg-[#FACC15] border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-xs font-black uppercase mb-1">
                      Key Word
                    </div>
                    <div className="text-xl font-black truncate tracking-tighter">
                      {gameState === "won" ? VERTICAL_WORD : "???"}
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div
                  id="answer-form"
                  className={`border-4 border-black p-6 relative flex-grow flex flex-col justify-center transition-all ${activeRow ? "bg-[#FF6B6B] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" : "bg-gray-100 border-dashed"}`}
                >
                  {activeRow ? (
                    <form
                      onSubmit={handleSubmit}
                      className="h-full flex flex-col"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <span className="bg-black text-white px-2 py-1 font-mono text-sm font-bold transform -rotate-1">
                          HÀNG {activeRow.id}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs font-bold border-2 border-black ${(hintLevel[activeRow.id] || 1) === 2 ? 'bg-[#FACC15]' : 'bg-white'}`}>
                            <Lightbulb size={12} className="inline mr-1" />
                            Gợi ý {hintLevel[activeRow.id] || 1}/2
                          </span>
                          <button
                            type="button"
                            onClick={() => setActiveRow(null)}
                            className="p-1 hover:bg-black hover:text-white rounded-full border-2 border-black transition-colors bg-white"
                          >
                            <X size={16} strokeWidth={3} />
                          </button>
                        </div>
                      </div>

                      <p className="font-bold text-base mb-3 leading-snug bg-white/50 p-2 border-2 border-black/20 rounded">
                        {activeRow.clue}
                      </p>
                      
                      <div className="bg-[#FACC15] border-2 border-black p-2 mb-4 rounded">
                        <p className="font-medium text-sm">
                          <Lightbulb size={14} className="inline mr-1" />
                          {getCurrentHint(activeRow)}
                        </p>
                      </div>

                      <div className="relative mb-4">
                        <input
                          ref={inputRef}
                          type="text"
                          value={guess}
                          onChange={(e) => setGuess(e.target.value)}
                          className="w-full h-14 border-4 border-black px-4 font-black text-2xl uppercase focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow placeholder:text-black/30"
                          placeholder="NHẬP..."
                        />
                        {guess && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <Send size={20} />
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="flex-1 h-12 bg-black text-white font-black uppercase tracking-wider border-2 border-black hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                        >
                          ENTER
                        </button>
                        <button
                          type="button"
                          onClick={handleGiveUp}
                          title="Bỏ qua"
                          className="w-12 h-12 flex items-center justify-center bg-white border-4 border-black hover:bg-gray-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                        >
                          <HelpCircle size={24} strokeWidth={3} />
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center opacity-40">
                      <div className="text-6xl font-black mb-2 select-none">
                        ?
                      </div>
                      <p className="font-bold uppercase">
                        Chọn hàng để mở khóa
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-black text-white px-4 py-1 text-xs font-mono flex justify-between uppercase">
            <span>SYSTEM_READY</span>
            <span>MLN131-SHOWCASE v2.0</span>
          </div>
        </div>
      </div>
    );
};

export default CrosswordGame;

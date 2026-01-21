import React, { useMemo, useState, useEffect, useRef } from "react";
import { Mic2, ScrollText, X, HelpCircle, Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../../components/ui/Button";

const VERTICAL_WORD = "PHÁP LUẬT";

const CROSSWORD_ROWS = [
    {
        id: 1,
        answer: "PHÁP QUYỀN",
        clue: "Điền vào chỗ trống: \"Nhà nước Cộng hòa XHCN Việt Nam là nhà nước ... xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân\".",
        verticalIndex: 0,
        anchor: "Chữ P ở vị trí 1"
    },
    {
        id: 2,
        answer: "HIẾN PHÁP",
        clue: "Văn bản pháp luật có hiệu lực pháp lý cao nhất trong hệ thống pháp luật Việt Nam.",
        verticalIndex: 0,
        anchor: "Chữ H ở vị trí 1"
    },
    {
        id: 3,
        answer: "TÒA ÁN",
        clue: "Cơ quan xét xử của nước ta, thực hiện quyền tư pháp, bảo vệ công lý.",
        verticalIndex: 3,
        anchor: "Chữ Á ở vị trí 4"
    },
    {
        id: 4,
        answer: "TIÊN PHONG",
        clue: "Đảng Cộng sản Việt Nam là đội ... của giai cấp công nhân và nhân dân lao động.",
        verticalIndex: 4,
        anchor: "Chữ P ở vị trí 5"
    },
    {
        id: 5,
        answer: "LÃNH ĐẠO",
        clue: "Đây là vai trò của Đảng Cộng sản Việt Nam đối với Nhà nước và xã hội, được quy định tại Điều 4 Hiến pháp.",
        verticalIndex: 0,
        anchor: "Chữ L ở vị trí 1"
    },
    {
        id: 6,
        answer: "QUỐC HỘI",
        clue: "Cơ quan đại biểu cao nhất của Nhân dân, cơ quan quyền lực nhà nước cao nhất.",
        verticalIndex: 1,
        anchor: "Chữ U ở vị trí 2"
    },
    {
        id: 7,
        answer: "ĐỘC LẬP",
        clue: "Giá trị thiêng liêng của dân tộc, thường đi liền với cụm từ \"Tự do - Hạnh phúc\".",
        verticalIndex: 4,
        anchor: "Chữ Ậ ở vị trí 5"
    },
    {
        id: 8,
        answer: "TỰ DO",
        clue: "Một trong những quyền cơ bản của con người và công dân được Hiến pháp bảo vệ.",
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
    const [hostLine, setHostLine] = useState("Chào mừng đến với Ô CHỮ PHÁP QUYỀN!");
    const [, setFeedback] = useState(null); // Used for triggering re-renders
    const [gameState, setGameState] = useState('playing'); // playing, won
    
    // Board logic
    const maxOffset = useMemo(getMaxLeftOffset, []);
    const inputRef = useRef(null);

    // Focus input on selection
    useEffect(() => {
        if (activeRow && inputRef.current) {
            inputRef.current.focus();
        }
    }, [activeRow]);

    const handleRowSelect = (row) => {
        if (openedRows.includes(row.id)) return;
        setActiveRow(row);
        setGuess("");
        setFeedback(null);
        setHostLine(`Gợi ý Hàng ${row.id}: ${row.clue}`);
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
            setHostLine(`Sai rồi! Hãy thử lại: ${activeRow.clue}`);
            
            // Shake effect logic could be added here
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
        <div className="w-full max-w-[65vw] h-[90vh] bg-[#FFF8E7] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col relative overflow-hidden">
          {/* Title Bar */}
          <div className="h-14 bg-[#FF6B6B] border-b-4 border-black flex items-center justify-between px-4 select-none">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-black bg-white" />
              <div className="w-4 h-4 rounded-full border-2 border-black bg-black" />
              <h2 className="font-display font-black text-xl text-black ml-2 uppercase tracking-wide">
                GAME.EXE: Ô CHỮ PHÁP QUYỀN
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
                      {openedRows.length}/8
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
                        <button
                          type="button"
                          onClick={() => setActiveRow(null)}
                          className="p-1 hover:bg-black hover:text-white rounded-full border-2 border-black transition-colors bg-white"
                        >
                          <X size={16} strokeWidth={3} />
                        </button>
                      </div>

                      <p className="font-bold text-lg mb-6 flex-grow leading-snug bg-white/50 p-2 border-2 border-black/20 rounded">
                        {activeRow.clue}
                      </p>

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

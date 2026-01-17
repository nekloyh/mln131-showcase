import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll for header animation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Trang chủ", path: "/" },
    { name: "Bộ máy Nhà nước", path: "/chu-nghia-xa-hoi" },
    { name: "Đảng & Nhân dân", path: "/thoi-ki-qua-do" },
    { name: "Trò chơi", path: "/tro-choi" },
    { name: "Trợ lý MLN131", path: "/ai-chatbot" },
    { name: "Công cụ AI", path: "/ai-usage" },
    { name: "Thông tin", path: "/informations" },
  ];

  const handleNavigate = (href) => {
    navigate(href);
    setMobileMenuOpen(false);
  };

  const isHomePage = location.pathname === "/" || location.pathname === "/trang-chu";

  const headerBgClass = "backdrop-blur-md bg-bone/90 border-b border-ink/10";
  const headerShadowClass = scrolled ? "shadow-lg shadow-ink/5" : "";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBgClass} ${headerShadowClass}`}
      >
        <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto px-4 md:px-6">

          {/* Logo / Brand */}
          <div
            onClick={() => handleNavigate("/")}
            className="font-display text-2xl text-ink cursor-pointer select-none hover:scale-105 transition-transform"
          >
            MLN131
            <span className="text-graphite text-sm font-body ml-2 tracking-tight">Scientific Socialism</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              let isActive = location.pathname === item.path;
              if (location.pathname === "/" && item.path === "/trang-chu") {
                isActive = true;
              }
              return (
                <motion.button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  whileHover={{ y: -2, x: -2, boxShadow: "4px 4px 0px 0px rgba(15,23,42,0.2)" }}
                  whileTap={{ y: 0, x: 0, boxShadow: "0px 0px 0px 0px rgba(15,23,42,0.2)" }}
                  className={`
                    px-4 py-2 rounded-md font-display text-xs transition-all duration-150 border border-ink/15
                    ${isActive
                      ? "bg-ember text-bone shadow-[3px_3px_0px_0px_rgba(15,23,42,0.25)]"
                      : "bg-bone text-graphite hover:bg-white"
                    }
                  `}
                >
                  {item.name}
                </motion.button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-ink text-bone border border-ink/20 rounded-md shadow-[3px_3px_0px_0px_rgba(15,23,42,0.25)]"
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-charcoal/80 backdrop-grayscale"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Content - Drawer Style */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-bone border-l border-ink/10 shadow-2xl p-6 pt-24"
            >
              <div className="flex flex-col gap-4">
                <div className="border-b border-ink/10 pb-4 mb-4">
                  <h3 className="font-display text-xl text-ink">Điều hướng</h3>
                </div>

                {navItems.map((item, index) => {
                  let isActive = location.pathname === item.path;
                  if (location.pathname === "/" && item.path === "/trang-chu") {
                    isActive = true;
                  }
                  return (
                    <motion.button
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavigate(item.path)}
                      className={`
                        w-full px-4 py-4 font-body font-semibold text-left text-sm border border-ink/15 transition-all
                        ${isActive
                          ? "bg-ember text-bone shadow-[4px_4px_0px_0px_rgba(15,23,42,0.25)] translate-x-[-2px] translate-y-[-2px]"
                          : "bg-white text-graphite shadow-[2px_2px_0px_0px_rgba(15,23,42,0.15)] hover:bg-sand"
                        }
                      `}
                    >
                      {item.name}
                    </motion.button>
                  );
                })}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


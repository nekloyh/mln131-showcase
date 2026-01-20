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

  const headerBgClass = "bg-bone border-b-2 border-ink";
  const headerShadowClass = scrolled ? "shadow-hard" : "";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-100 ${headerBgClass} ${headerShadowClass}`}
      >
        <nav className="flex justify-between items-center h-20 max-w-screen-2xl mx-auto px-4 md:px-10 lg:px-16">
          {/* Logo / Brand */}
          <div
            onClick={() => handleNavigate("/")}
            className="font-kinetic text-2xl text-ink cursor-pointer select-none hover:translate-x-1 transition-transform tracking-tight leading-none uppercase border-2 border-transparent hover:border-ink hover:bg-gold p-1"
          >
            MLN<span className="font-bold text-crimson">131</span>
            <span className="text-ink text-xs font-mono ml-2 tracking-tighter block md:inline md:tracking-wide">
              SCIENTIFIC SOCIALISM
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            {navItems.map((item) => {
              let isActive = location.pathname === item.path;
              if (location.pathname === "/" && item.path === "/trang-chu") {
                isActive = true;
              }
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`
                    px-4 py-2 font-mono text-sm uppercase font-bold border-2 border-ink transition-all duration-75
                    ${
                      isActive
                        ? "bg-crimson text-bone shadow-hard translate-x-[-1px] translate-y-[-1px]"
                        : "bg-bone text-ink hover:bg-gold hover:shadow-hard hover:-translate-y-1 hover:-translate-x-1"
                    }
                  `}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-bone text-ink border-2 border-ink shadow-hard active:shadow-none active:translate-y-1 active:translate-x-1"
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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
                        ${
                          isActive
                            ? "bg-ember text-bone shadow-hard translate-x-[-2px] translate-y-[-2px]"
                            : "bg-white text-graphite shadow-hard-sm hover:bg-sand"
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

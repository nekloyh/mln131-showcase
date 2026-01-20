import { motion } from "framer-motion";

export const KineticHeading = ({ title, size = "lg", align = "left" }) => {
    const textAlign = align === "center" ? "text-center" : "text-left";
    const alignClass = align === "center" ? "items-center" : "items-start";
    const fontSize = size === "xl" ? "text-5xl md:text-7xl lg:text-8xl" : size === "lg" ? "text-4xl md:text-5xl lg:text-6xl" : "text-3xl md:text-4xl";

    return (
        <div className={`flex flex-col ${alignClass} ${textAlign}`}>
            <h1 className={`font-black text-ink leading-tight tracking-tight ${fontSize}`}>
                {title}
            </h1>
        </div>
    );
};

export const KineticSubline = ({ children, className = "" }) => {
    return (
        <p className={`text-xl md:text-2xl text-graphite leading-relaxed ${className}`}>
            {children}
        </p>
    );
};

export const MarqueeStrip = ({ text, speed = 20, tone = "light", className = "" }) => {
    return (
        <div className={`overflow-hidden whitespace-nowrap py-3 border-y-2 border-ink ${tone === "dark" ? "bg-ink text-bone" : "bg-gold text-ink"} ${className}`}>
            <motion.div
                className="inline-block"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
            >
                <span className="text-2xl font-black uppercase tracking-widest mx-4">{text} • {text} • {text} • {text}</span>
            </motion.div>
        </div>
    );
};

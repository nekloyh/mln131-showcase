import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Card = ({
    children,
    className = "",
    variant = "default",
    hoverEffect = false,
    ...props
}) => {
    const baseStyles = "border-2 border-ink overflow-hidden p-6 relative";

    const variants = {
        default: "bg-bone shadow-hard",
        flat: "bg-white",
        highlight: "bg-gold shadow-hard",
        paper: "bg-paper shadow-hard-lg",
    };

    const hoverStyles = hoverEffect
        ? "hover:-translate-y-1 hover:shadow-hard-lg transition-transform duration-200"
        : "";

    return (
        <motion.div
            className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    variant: PropTypes.oneOf(["default", "flat", "highlight", "paper"]),
    hoverEffect: PropTypes.bool,
};

export default Card;

import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Button = ({
    children,
    variant = "primary",
    className = "",
    onClick,
    disabled = false,
    type = "button",
    ...props
}) => {
    const baseStyles =
        "inline-flex items-center justify-center font-bold uppercase tracking-wider border-2 border-ink transition-all duration-75 select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variants = {
        primary:
            "bg-bone text-ink shadow-hard hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-md active:translate-x-0 active:translate-y-0 active:shadow-hard-sm",
        outline:
            "bg-transparent text-ink hover:bg-ink hover:text-bone",
        ghost:
            "bg-transparent border-transparent hover:bg-ink/5",
        danger:
            "bg-crimson text-bone shadow-hard hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-md active:translate-x-0 active:translate-y-0 active:shadow-hard-sm",
    };

    const sizes = {
        sm: "text-xs px-3 py-1.5",
        md: "text-sm px-6 py-3",
        lg: "text-base px-8 py-4",
    };

    const sizeClass = sizes[props.size] || sizes.md;

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${sizeClass} ${className}`}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </motion.button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(["primary", "outline", "ghost", "danger"]),
    size: PropTypes.oneOf(["sm", "md", "lg"]),
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Button;

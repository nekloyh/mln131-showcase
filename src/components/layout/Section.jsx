import PropTypes from "prop-types";

const Section = ({
    children,
    className = "",
    scrollable = false,
    autoHeight = false,
    containerClass = "",
    id = "",
    ...props
}) => {
    // If autoHeight is true, we don't apply the snap-section classes which enforce 100vh
    // Instead we rely on min-h-screen or just natural height
    let baseClass = scrollable ? "snap-section-scrollable" : "snap-section";

    if (autoHeight) {
        baseClass = "relative w-full overflow-hidden min-h-screen py-20";
    }

    return (
        <section
            id={id}
            className={`${!autoHeight ? 'relative w-full overflow-hidden' : ''} ${baseClass} ${className}`}
            {...props}
        >
            <div className={`max-w-screen-2xl mx-auto w-full px-4 md:px-10 lg:px-16 flex flex-col justify-center ${autoHeight ? 'min-h-full' : 'min-h-full pt-20'} ${containerClass}`}>
                {children}
            </div>
        </section>
    );
};

Section.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    scrollable: PropTypes.bool,
    autoHeight: PropTypes.bool,
    containerClass: PropTypes.string,
    id: PropTypes.string,
};

export default Section;

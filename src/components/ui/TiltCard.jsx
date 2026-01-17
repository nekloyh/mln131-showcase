/**
 * TiltCard Component - Custom 3D Tilt Effect
 * Thay thế react-tilt với implementation tự viết cho React 19
 *
 * Effort: S (1-2h)
 * Features:
 * - 3D perspective tilt on mouse move
 * - Glare effect
 * - Smooth transitions
 * - Touch support
 */

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const TiltCard = ({
  children,
  className = "",
  tiltMaxAngle = 15,
  scale = 1.05,
  perspective = 1000,
  transitionSpeed = 400,
  glare = true,
  glareMaxOpacity = 0.3,
  ...props
}) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Calculate tilt angles
      const tiltX = (mouseY / (rect.height / 2)) * -tiltMaxAngle;
      const tiltY = (mouseX / (rect.width / 2)) * tiltMaxAngle;

      // Calculate glare position (percentage)
      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;

      setTilt({ x: tiltX, y: tiltY });
      setGlarePos({ x: glareX, y: glareY });
    },
    [tiltMaxAngle]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlarePos({ x: 50, y: 50 });
  }, []);

  // Touch support
  const handleTouchMove = useCallback(
    (e) => {
      if (!cardRef.current || !e.touches[0]) return;
      const touch = e.touches[0];

      const mockEvent = {
        clientX: touch.clientX,
        clientY: touch.clientY,
      };
      handleMouseMove(mockEvent);
    },
    [handleMouseMove]
  );

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: isHovered ? scale : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      {children}

      {/* Glare Effect */}
      {glare && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-inherit overflow-hidden"
          style={{
            background: `radial-gradient(
              circle at ${glarePos.x}% ${glarePos.y}%,
              rgba(255, 255, 255, ${glareMaxOpacity}) 0%,
              transparent 60%
            )`,
            transition: `opacity ${transitionSpeed}ms ease`,
          }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;

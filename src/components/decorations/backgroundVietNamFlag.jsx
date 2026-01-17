import "./styles.css";
import React, { useState, useEffect } from "react";

const BackgroundVietNamFlag = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(0);
  const [isInside, setIsInside] = useState(false);
  const flagSize = 556;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Calculate distance from edge
      const distanceFromEdge = Math.min(
        e.clientX,
        e.clientY,
        window.innerWidth - e.clientX,
        window.innerHeight - e.clientY
      );

      // Calculate scale based on distance from edge (0-100px range)
      const edgeThreshold = 100;
      let newScale = 1;

      if (distanceFromEdge < edgeThreshold) {
        newScale = distanceFromEdge / edgeThreshold;
      }

      setScale(newScale);
      setIsInside(true);
    };

    const handleMouseEnter = () => {
      setIsInside(true);
    };

    const handleMouseLeave = () => {
      setIsInside(false);
      setScale(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isInside && scale === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: mousePos.x - flagSize / 2,
        top: mousePos.y - flagSize / 2,
        width: flagSize,
        height: flagSize,
        filter: "blur(15px)",
        pointerEvents: "none",
        zIndex: 1,
        transform: `scale(${scale})`,
        transition: "transform 1s ease-out",
        transformOrigin: "center center",
      }}
    >
      <svg
        width={flagSize}
        height={flagSize}
        viewBox="0 0 556 556"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <circle cx="278" cy="278" r="278" fill="#F42A2A" /> */}
        <circle cx="278" cy="278" r="278" fill="url(#gradient)" />
        <defs>
          <radialGradient
            id="gradient"
            cx="50%"
            cy="50%"
            r="50%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#F42A2A" />
            <stop offset="50%" stopColor="#F42A2A" />
            <stop offset="75%" stopColor="#F42A2A" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <path
          d="M278,98 L323,225 L456,225 L348,302 L389,430 L278,352 L167,430 L208,302 L100,225 L233,225 Z"
          fill="#F4B82A"
        />
      </svg>
    </div>
  );
};

export default BackgroundVietNamFlag;

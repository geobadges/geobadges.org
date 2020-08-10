import React from "react";
import PropTypes from "prop-types";

const CornerRibbon = ({
  fill = "blue",
  hoverColor,
  position = "absolute",
  text = "Corner Ribbon",
  textFill = "white",
  zIndex = 55,
} = {}) => {
  return (
    <svg
      className="corner_ribbon"
      version="1.2"
      baseProfile="full"
      width="250px"
      height="250px"
      style={{ position, top: 0, right: 0, zIndex }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="blur-shadow">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1"></feGaussianBlur>
      </filter>

      <rect
        width="200%"
        height="33"
        y="-100"
        style={{
          fill,
          transform: "rotate(45deg)",
          filter: "url(#blur-shadow)",
        }}
      />

      <line
        xmlns="http://www.w3.org/2000/svg"
        x1="0"
        x2="1000%"
        y1="-97"
        y2="-97"
        style={{
          stroke: "white",
          strokeWidth: 2,
          transform: "rotate(45deg)",
          opacity: 0.6,
        }}
        strokeDasharray="3, 2"
      ></line>

      <line
        xmlns="http://www.w3.org/2000/svg"
        x1="0"
        x2="1000%"
        y1="-70"
        y2="-70"
        style={{
          stroke: "white",
          strokeWidth: 2,
          transform: "rotate(45deg)",
          opacity: 0.6,
        }}
        strokeDasharray="3, 2"
      ></line>

      <text
        xmlns="http://www.w3.org/2000/svg"
        x="55%"
        y="-77"
        fontFamily="Kanit"
        fontSize="15"
        fill={textFill}
        transform="rotate(45)"
      >
        {text}
      </text>
    </svg>
  );
};

export default CornerRibbon;

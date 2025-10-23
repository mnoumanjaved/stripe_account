"use client"
import React from "react";

const MovingText: React.FC<{ position: "top" | "bottom"; text: string }> = ({
  position,
  text,
}) => (
  <div className={`des-text-moving-${position} moving-text`}>
    <div className="des-text-item wrapper-text d-flex align-items-center">
      <span className="text-4xl font-bold">{text}</span>
      <span className="text-4xl font-bold">{text}</span>
    </div>
  </div>
);

const DesignStudioTextArea: React.FC = () => {
  const text = "Digital Experience";

  return (
    <div className="des-text-moving-area black-bg-4 pt-100 pb-160">
      <MovingText position="top" text={text} />
      <MovingText position="bottom" text={text} />
    </div>
  );
};

export default DesignStudioTextArea;

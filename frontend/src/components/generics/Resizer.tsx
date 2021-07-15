import React, { useState, useEffect } from "react";

interface IProps {
  onResize: (deltaX: number, deltaY: number) => void;
  onClick?: (e?: React.MouseEvent) => void;
  className?: string;
  children: React.ReactNode;
}

export default function Resizer({
  onResize,
  onClick,
  className,
  children,
}: IProps): React.ReactElement {
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Used to track the total movement before a 'mouseup' event is fired.
  const [totalMovement, setTotalMovement] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Call `onClick()` if `totalMovement` is less than 1 pixel.
    if (onClick && Math.abs(totalMovement) < 1) onClick(e);

    setTotalMovement(0);
  };

  const handleMouseMove = ({ movementX, movementY }: MouseEvent) => {
    onResize(movementX, movementY);

    // Accumulate the total movement.
    setTotalMovement(totalMovement + movementX + movementY);
  };

  const handleMouseDown = () => setIsMouseDown(true);

  const handleMouseUp = () => setIsMouseDown(false);

  useEffect(() => {
    if (isMouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      // Will clean-up every time before the callback of `useEffect()` is called
      // again (e.g. when a dependency changed) or when component is destroyed.
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMouseDown, onResize]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <button
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      type="button"
      className={className}
    >
      {children}
    </button>
  );
}

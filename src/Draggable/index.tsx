import React, { FC, ReactNode, useRef, forwardRef } from "react";
import { styled } from "goober";

import useDrag from "./useDrag";
import { useTheme } from "../utils/ThemeProvider";

const Container = styled("div", forwardRef)`
  display: flex;
  align-items: stretch;
`;

interface IProps {
  className?: string;
  leftChild: (width: number) => ReactNode;
  rightChild: (width: number) => ReactNode;
}

const Draggable: FC<IProps> = ({ className = "", leftChild, rightChild }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const themeContext = useTheme();

  const { leftWidth, rightWidth } = useDrag({
    containerRef,
    dividerRef,
    dividerWidth: themeContext.divider.width,
  });

  return (
    <Container className={className} ref={containerRef}>
      {leftChild(leftWidth)}
      {rightChild(rightWidth)}
    </Container>
  );
};

export default Draggable;

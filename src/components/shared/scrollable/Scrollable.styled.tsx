import "../../../global.scss";
import styled, { css, keyframes } from 'styled-components';

interface ContainerModel {
  $tagName?: string;
  $thumbColor?: string;
  $scrollWidth?: number;
  $isScrollable?: boolean;
  $isScrollingEnabled?: boolean;
}

const glassSlideEffect = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 0% 100%; }
`;

const scrollbarStyles = css<ContainerModel>`
${({ $isScrollingEnabled }) => $isScrollingEnabled ? 'overflow-y: auto;' : 'overflow-y: hidden;'}
  overflow-x: hidden;

  &::-webkit-scrollbar {
    ${({ $scrollWidth }) => `width:${$scrollWidth}rem;`}
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.5rem;
    box-shadow: inset 0.1rem -0.1rem 0.3rem ${({ $thumbColor }) => $thumbColor ? $thumbColor : 'var(--scrollbar-thumb-color)'};
  }
    
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const Container = styled.div<ContainerModel>`
${scrollbarStyles}
background: ${({ $isScrollingEnabled, $isScrollable, $scrollWidth  }) => $isScrollable ? `
  linear-gradient(to right,
    var(--app-bg-color) 0%,
    var(--app-bg-color) calc(100% - ${$isScrollingEnabled ? $scrollWidth: 0}rem),
    transparent calc(100% - ${$isScrollingEnabled ? $scrollWidth: 0}rem),
    transparent 100%),
  linear-gradient(120deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.197) 50%, rgba(255, 255, 255, 0) 70%)
` : 'var(--app-bg-color)'};
    background-size:  ${({ $isScrollable }) => $isScrollable ? `100% 100%, 200% 200%` : '100%'};
    background-position: ${({ $isScrollable }) => $isScrollable ? `0 0, 0 0` : '0 0'};
  ${({ $isScrollable, $isScrollingEnabled }) => $isScrollingEnabled && $isScrollable && css`animation: ${glassSlideEffect} 2s linear infinite;`}
  `;

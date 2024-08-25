import "../../../global.scss";
import styled, { createGlobalStyle, css, keyframes } from 'styled-components';

interface ContainerModel {
  $isScrollingEnabled?: boolean;
  $scrollWidth?: number;
  $isAnimated?: boolean;
  $isScrolling?: boolean;
}

const glassSlideEffect = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 0% 100%;
  }
`;

export const glassSlideEffectMixin = css`
  background: linear-gradient(120deg, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0.197) 50%, rgba(255, 255, 255, 0) 70%);
  background-size: 200% 200%;
  animation: ${glassSlideEffect} 2s linear infinite;
`;


const sharedStyles = css<{ $isScrollingEnabled?: boolean; $scrollWidth?: number; $isAnimated?: boolean }>`
  ${({ $isScrollingEnabled }) => $isScrollingEnabled ? 'overflow-y: auto;' : 'overflow-y: hidden;'}
  border: solid var(--border-color-list-container);
  border-radius: 0.5rem;

  ${({ $isAnimated }) => $isAnimated && glassSlideEffectMixin}

  &::-webkit-scrollbar {
    ${({ $scrollWidth }) => `width:${$scrollWidth}rem;`}
  }

  &::-webkit-scrollbar-thumb {
    border-radius: inherit;
    box-shadow: inset 0.1rem -0.1rem 0.3rem var(--scrollbar-thumb-color);
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const Container = styled.div<ContainerModel>`
display: flex;
overflow-x: hidden;
${sharedStyles}
`;

export const Content = styled.div`
  height: fit-content;
  background: var(--app-bg-color);
`;

export const Tbody = styled.tbody<ContainerModel>`
   ${sharedStyles}

    height: 100%;
    background: ${({ $isScrolling, $scrollWidth }) => $isScrolling ?
    `linear-gradient(to right,
      var(--app-bg-color) 0%,
      var(--app-bg-color) calc(100% - ${$scrollWidth}rem),
      transparent calc(100% - ${$scrollWidth}rem),
      transparent 100%);
      }`:
    'var(--app-bg-color)'
  }`

export const GlobalStyles = createGlobalStyle<{ $isAnimated: boolean }>`
  .base-table {
       ${({ $isAnimated }) => $isAnimated && glassSlideEffectMixin}
  }
  `;
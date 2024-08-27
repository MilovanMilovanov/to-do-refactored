import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { Container } from "./Scrollable.styled";

type HTMLTags = 
  | "div"
  | "section"
  | "article"
  | "aside"
  | "main"
  | "nav"
  | "table"
  | "tbody"
  | "ul"
  | "ol";

interface ScrollableModel extends HTMLAttributes<HTMLElement> {
    scrollWidth?: number;
    isScrollingEnabled?: boolean;
    isChildrenTableElement?: boolean;
    thumbColor?: string;
    tagName: HTMLTags;
}

const isValidColor = (color: string) => CSS.supports("color", color);

function Scrollable({
    tagName,
    className = '',
    thumbColor = '',
    scrollWidth = 1,
    isScrollingEnabled = true,
    isChildrenTableElement = false,
    children }: ScrollableModel) {
    const [isScrollable, setIsScrollable] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const checkIfScrollable = (element: HTMLElement | null) => {
        if (!element) return;
        setIsScrollable(element.scrollHeight > element.clientHeight);
    };

    useEffect(() => {
        const targetElement = containerRef.current;

        if (targetElement) {
            checkIfScrollable(targetElement);

            const resizeObserver = new ResizeObserver(() => checkIfScrollable(targetElement));
            resizeObserver.observe(targetElement);

            return () => resizeObserver.disconnect();
        }
    }, [children, isChildrenTableElement]);

    return (
        <Container
            as={tagName}
            ref={containerRef}
            className={className}
            $scrollWidth={scrollWidth}
            $isScrollable={isScrollable}
            $isScrollingEnabled={isScrollingEnabled}
            $thumbColor={isValidColor(thumbColor) ? thumbColor : ''}
        >
            {children}
        </Container>
    );
};

export default Scrollable;



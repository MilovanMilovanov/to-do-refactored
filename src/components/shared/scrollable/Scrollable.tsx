import { HTMLAttributes, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollableContainer } from "./Scrollable.styled";

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
    children }: ScrollableModel) {
    const [isScrollable, setIsScrollable] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const checkIfScrollable = useCallback((element: HTMLElement) => {
        const isElementScrollable = element.scrollHeight > element.clientHeight;

        if (isElementScrollable !== isScrollable || !isElementScrollable) {
            setIsScrollable(isElementScrollable);
        }
    }, [isScrollable]);

    useEffect(() => {
        const targetElement = containerRef.current;

        if (targetElement) {
            checkIfScrollable(targetElement);

            const resizeObserver = new ResizeObserver(() => checkIfScrollable(targetElement));
            resizeObserver.observe(targetElement);

            return () => resizeObserver.disconnect();
        }
    }, [checkIfScrollable]);

    const containerProps = useMemo(() => ({
        className,
        as: tagName,
        ref: containerRef,
        $scrollWidth: scrollWidth,
        $isScrollable: isScrollable,
        $isScrollingEnabled: isScrollingEnabled,
        $thumbColor: isValidColor(thumbColor) ? thumbColor : ''
    }), [tagName, className, scrollWidth, isScrollable, isScrollingEnabled, thumbColor]);

    return (
        <ScrollableContainer
            {...containerProps}
        >
            {children}
        </ScrollableContainer>
    );
};

export default Scrollable;



import { HTMLAttributes, useEffect, forwardRef, useRef, useState, Ref } from "react";
import { Container, Content, TableStyles, Tbody } from "./Scrollable.styled";

interface ScrollableModel extends HTMLAttributes<HTMLDivElement> {
    scrollWidth?: number;
    isScrollingEnabled?: boolean;
    isChildrenTableElement?: boolean;
    className?: string;
    thumbColor?: string;
}

const isValidColor = (color: string) => CSS.supports("color", color) ? color : '';

function Scrollable({
    className = '',
    thumbColor = '',
    scrollWidth = 1,
    isScrollingEnabled = true,
    isChildrenTableElement = false,
    children }: ScrollableModel,
    ref: Ref<HTMLElement>) {
    const [isScrollable, setIsScrollable] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const checkIfScrollable = (element: HTMLElement | null) => {
        if (!element) return;

        const isScrollable = element.scrollHeight > element.clientHeight;
        setIsScrollable(isScrollable);
    };

    useEffect(() => {
        const childRef = ref && 'current' in ref && ref.current;

        const targetElement = isChildrenTableElement ? childRef : containerRef.current;

        if (targetElement) {
            checkIfScrollable(targetElement);

            const resizeObserver = new ResizeObserver(() => checkIfScrollable(targetElement));
            resizeObserver.observe(targetElement);

            return () => resizeObserver.disconnect();
        }
    }, [children, isChildrenTableElement, ref]);

    return (
        <>
            {isChildrenTableElement ?
                <>
                    <TableStyles $isAnimated={isScrollable} />
                    <Tbody
                        $thumbColor={thumbColor && isValidColor(thumbColor)}
                        $isScrollingEnabled={isScrollingEnabled}
                        $isScrolling={isScrollable}
                        $scrollWidth={scrollWidth}
                        className={className}
                        ref={ref as Ref<HTMLTableSectionElement>}
                    >
                        {children}
                    </Tbody>
                </>
                :
                <Container
                    $thumbColor={thumbColor && isValidColor(thumbColor)}
                    $isScrollingEnabled={isScrollingEnabled}
                    $isAnimated={isScrollable}
                    $scrollWidth={scrollWidth}
                    ref={containerRef}
                >
                    <Content>
                        {children}
                    </Content>
                </Container>
            }
        </>
    );
};

export default forwardRef<HTMLElement, ScrollableModel>(Scrollable);





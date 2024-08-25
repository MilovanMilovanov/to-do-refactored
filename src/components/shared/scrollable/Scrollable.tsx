import { HTMLAttributes, useEffect, useRef, useState, Ref } from "react";
import { Container, Content, TableStyles, Tbody } from "./Scrollable.styled";

interface ScrollableModel extends HTMLAttributes<HTMLDivElement> {
    scrollWidth?: number;
    isScrollingEnabled?: boolean;
    isChildrenTableElement?: boolean;
    className?: string;
    thumbColor?: string;
}

const isValidColor = (color: string) => CSS.supports("color", color);

function Scrollable({
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
        <>
            {isChildrenTableElement ?
                <>
                    <TableStyles $isAnimated={isScrollable} />
                    <Tbody
                        $thumbColor={isValidColor(thumbColor) ? thumbColor : ''}
                        $isScrollingEnabled={isScrollingEnabled}
                        $isScrolling={isScrollable}
                        $scrollWidth={scrollWidth}
                        className={className}
                        ref={containerRef as Ref<HTMLTableSectionElement>}
                    >
                        {children}
                    </Tbody>
                </>
                :
                <Container
                    $thumbColor={isValidColor(thumbColor) ? thumbColor : ''}
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

export default Scrollable;





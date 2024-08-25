import { HTMLAttributes, useEffect, forwardRef, useRef, useState, Ref, LegacyRef } from "react";
import { Container, Content, GlobalStyles, Tbody } from "./Scrollable.styled";

interface ScrollableModel extends HTMLAttributes<HTMLDivElement> {
    scrollWidth?: number;
    isScrollingEnabled?: boolean;
    isChildrenTableElement?: boolean;
    className?: string;
}

function Scrollable({ isScrollingEnabled = true, scrollWidth = 1, className = '', isChildrenTableElement = false, children }: ScrollableModel, ref: Ref<HTMLElement>) {
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
                    <GlobalStyles $isAnimated={isScrollable} />
                    <Tbody
                        $isScrollingEnabled={isScrollingEnabled}
                        $isScrolling={isScrollable}
                        $scrollWidth={scrollWidth}
                        className={className}
                        ref={ref as LegacyRef<HTMLTableSectionElement>}
                    >
                        {children}
                    </Tbody>
                </>
                :
                <Container
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





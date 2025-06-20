import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";

interface AccordionContextType {
    isActive: boolean;
    index: number;
    onChangeIndex: (index: number) => void;
}

const AccordionContext = createContext<AccordionContextType>({
    isActive: false,
    index: -1,
    onChangeIndex: () => {},
});

const useAccordion = () => useContext(AccordionContext);

interface AccordionProps {
    children: ReactNode;
    multiple?: boolean;
    defaultIndex: number | number[];
}

export function Accordion({
    children,
    multiple = false,
    defaultIndex,
}: AccordionProps) {
    const [activeIndex, setActiveIndex] = useState<number | number[]>(
        multiple
            ? Array.isArray(defaultIndex)
                ? defaultIndex
                : [defaultIndex]
            : defaultIndex
    );

    function onChangeIndex(index: number) {
        setActiveIndex((currentActiveIndex: number | number[]) => {
            if (!multiple) {
                return index === currentActiveIndex ? -1 : index;
            }

            const current = currentActiveIndex as number[];
            if (current.includes(index)) {
                return current.filter((i: number) => i !== index);
            }

            return current.concat(index);
        });
    }

    return React.Children.map(children, (child, index) => {
        const isActive =
            multiple && Array.isArray(activeIndex)
                ? activeIndex.includes(index)
                : activeIndex === index;

        return (
            <AccordionContext.Provider
                value={{ isActive, index, onChangeIndex }}
            >
                {child}
            </AccordionContext.Provider>
        );
    });
}

interface AccordionItemProps {
    children: ReactNode;
}

export function AccordionItem({ children }: AccordionItemProps) {
    const { index, onChangeIndex, isActive } = useAccordion();

    return (
        <div className="relative w-full rounded-3xl mb-10 flex items-center justify-between bg-[#FBF6FF] ">
            <div className="w-full fle items-center justify-between rounded-2xl overflow-hidden">
                {children}
            </div>

            <motion.div
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={twMerge(
                    "w-12 h-12 rounded-xl flex items-center justify-center will-change-auto"
                )}
                onClick={() => onChangeIndex(index)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-plus w-6 h-6 cursor-pointer"
                >
                    <motion.line
                        animate={{ rotate: isActive ? 90 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        x1={10}
                        y1={5}
                        x2={10}
                        y2={15}
                    />
                    <line x1={5} y1={10} x2={15} y2={10} />
                </svg>
            </motion.div>
        </div>
    );
}

interface AccordionHeaderProps {
    children: ReactNode;
}

export function AccordionHeader({ children }: AccordionHeaderProps) {
    const { index, onChangeIndex, isActive } = useAccordion();

    return (
        <motion.div
            className={`w-full p-5 text-lg md:text-lg lg:text-lg font-semibold cursor-pointer transition-colors duration-150 ease-in-out text-[#3A3A3A] tracking-tight ${
                isActive
                    ? "text-black font-semobold text-lg"
                    : "text-black font-semobold text-lg"
            }`}
            onClick={() => onChangeIndex(index)}
        >
            {children}
        </motion.div>
    );
}

interface AccordionPanelProps {
    children: ReactNode;
}

export function AccordionPanel({ children }: AccordionPanelProps) {
    const { isActive } = useAccordion();

    return (
        <AnimatePresence initial={false}>
            {isActive && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                    className="text-[#636363] text-sm md:text-base lg:text-lg font-medium tracking-tight"
                >
                    <div className="px-5 pb-5">{children}</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

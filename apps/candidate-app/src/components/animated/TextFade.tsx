import { useInView } from "framer-motion";
import React, { useRef } from "react";
import { type Variants, motion } from "framer-motion";

export function TextFade({
    direction = "up",
    children,
    className = "",
    delay = 0.2,
    staggerChildren = 0.1,
}: {
    direction?: "up" | "down";
    children: React.ReactNode;
    className?: string;
    delay?: number;
    staggerChildren?: number;
}) {
    const FADE_DOWN: Variants = {
        show: { opacity: 1, y: 0, transition: { type: "spring" } },
        hidden: { opacity: 0, y: direction === "down" ? -18 : 18 },
    };
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "show" : ""}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        delayChildren: delay,
                        staggerChildren: staggerChildren,
                    },
                },
            }}
            className={className}
        >
            {React.Children.map(children, (child) =>
                React.isValidElement(child) ? (
                    <motion.div variants={FADE_DOWN}>{child}</motion.div>
                ) : (
                    child
                )
            )}
        </motion.div>
    );
}

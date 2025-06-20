import { motion, Variants } from "framer-motion";
import React, { ReactNode } from "react";

interface WordPullUpProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

const WordPullUp: React.FC<WordPullUpProps> = ({
    children,
    className = "",
    delay = 0.8,
}) => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: delay,
            },
        },
    };

    const wordVariants: Variants = {
        hidden: {
            y: 20,
            opacity: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
    };

    const wrapWordsInMotion = (text: string, inheritedClassName?: string) => {
        // Split by spaces but preserve them
        const parts = text.split(/(\s+)/);

        return parts.map((part, index) => {
            // If it's just whitespace, return it directly
            if (/^\s+$/.test(part)) {
                return part;
            }

            // Otherwise, wrap the word in motion.span
            return (
                <motion.span
                    key={index}
                    className={`inline-block ${inheritedClassName || ""}`}
                    variants={wordVariants}
                >
                    {part}
                </motion.span>
            );
        });
    };

    const processChildren = (children: ReactNode): ReactNode => {
        if (typeof children === "string") {
            return wrapWordsInMotion(children);
        }

        if (React.isValidElement(children)) {
            const childProps = children.props as {
                className?: string;
                children?: ReactNode;
            };

            // If it's a span with className, preserve the className for each word
            if (children.type === "span" && childProps.className) {
                return wrapWordsInMotion(
                    childProps.children as string,
                    childProps.className
                );
            }

            // For other elements, process their children
            const processedChildren = processChildren(childProps.children);
            return React.cloneElement(children, childProps, processedChildren);
        }

        if (Array.isArray(children)) {
            return children.map((child, index) => (
                <React.Fragment key={index}>
                    {processChildren(child)}
                </React.Fragment>
            ));
        }

        return children;
    };

    return (
        <motion.div
            className={`inline-block ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {processChildren(children)}
        </motion.div>
    );
};

export default WordPullUp;

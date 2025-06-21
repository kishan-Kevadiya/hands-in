import type { Variants } from "framer-motion";

const hideNavItemsVariant : Variants= {
    opened: {
        opacity: 0,
        y: "-100%",
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
    closed: {
        opacity: 1,
        y: "0%",
        transition: {
            delay: 1.1,
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

const mobileMenuVariant: Variants = {
    opened: {
        y: "0%",
        transition: {
            delay: 0.15,
            duration: 1.1,
            ease: [0.74, 0, 0.19, 1.02],
        },
    },
    closed: {
        y: "-100%",
        transition: {
            delay: 0.35,
            duration: 0.63,
            ease: [0.74, 0, 0.19, 1.02],
        },
    },
};

const fadeInVariant = {
    opened: {
        opacity: 1,
        transition: {
            delay: 1.2,
        },
    },
    closed: { opacity: 0 },
};

const ulVariant = {
    opened: {
        transition: {
            delayChildren: 1,
            staggerChildren: 0.18,
        },
    },
    closed: {
        transition: {
            staggerChildren: 0.06,
            staggerDirection: -1,
        },
    },
};

const liVariant: Variants = {
    opened: {
        opacity: 1,
        y: "0%",
        transition: {
            duration: 0.65,
            ease: "easeOut",
        },
    },
    closed: {
        opacity: 0,
        y: "100%",
        transition: {
            duration: 0.25,
            ease: "easeInOut",
        },
    },
};

const slideInVariant = {
    initial: {
        opacity: 0,
        x: "100%",
        transition: {
            duration: 0.6,
            ease: [0.74, 0, 0.19, 1.02],
        },
    },
    animate: {
        opacity: 1,
        x: "0%",
        transition: {
            duration: 0.6,
            ease: [0.74, 0, 0.19, 1.02],
        },
    },
    exit: {
        opacity: 0,
        x: "-100%",
        transition: {
            duration: 0.6,
            ease: [0.74, 0, 0.19, 1.02],
        },
    }
};

export {
    hideNavItemsVariant,
    mobileMenuVariant,
    fadeInVariant,
    ulVariant,
    liVariant,
    slideInVariant,
};

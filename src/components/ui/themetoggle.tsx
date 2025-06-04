"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Themetoggle() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("theme");
            return stored ? stored === "dark" : true;
        }
        return true;
    });

    const circleSize = 24; // Fixed circle diameter
    const toggleX = 36; // Fixed slide distance

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    return (
        <motion.button
            onClick={() => setIsDark((prev) => !prev)}
            className="relative w-[68px] flex-shrink-0 h-8 rounded-full shadow-lg overflow-hidden flex items-center p-1"
            animate={{
                background: isDark
                    ? "linear-gradient(to bottom, #4f46e5, #818cf8)"
                    : "linear-gradient(to bottom, #3b82f6, #7dd3fc)",
            }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="rounded-full overflow-hidden shadow-lg absolute top-1 left-1"
                style={{ width: circleSize, height: circleSize }}
                animate={{ x: isDark ? 0 : toggleX }}
                transition={{ type: "spring", duration: 0.4, bounce: 0.5, damping: 15 }}
            >
                <AnimatePresence mode="wait">
                    {isDark ? (
                        <motion.div
                            key="moon"
                            className="absolute inset-0"
                            transition={{ type: "spring", bounce: 0.5, duration: 0.4 }}
                        >
                            <div className="absolute inset-0 bg-slate-100" />
                            <motion.div
                                className="w-1.5 h-1.5 rounded-full bg-slate-300 absolute right-1.5 bottom-0.75"
                                initial={{ x: 6, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ type: "spring", bounce: 0.6, damping: 12, delay: 0.1 }}
                            />
                            <motion.div
                                className="w-1.5 h-1.5 rounded-full bg-slate-300 absolute left-0.75 bottom-2"
                                initial={{ x: 6, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ type: "spring", bounce: 0.6, damping: 12, delay: 0.15 }}
                            />
                            <motion.div
                                className="w-1 h-1 rounded-full bg-slate-300 absolute right-1 top-1.5"
                                initial={{ x: 6, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ type: "spring", bounce: 0.6, damping: 12, delay: 0.2 }}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            className="absolute inset-0"
                            transition={{ type: "spring", bounce: 0.5, duration: 0.4 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-tr from-amber-300 to-yellow-500 rounded-full"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                            <div className="absolute inset-1 rounded-full bg-amber-300" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {isDark ? (
                    <>
                        <motion.span
                            key="star-1"
                            className="text-amber-300 absolute right-6 top-0 hidden sm:block"
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: [0.5, 1, 0.5], scale: [0.5, 0.6, 0.5] }}
                            exit={{ opacity: 0 }}
                            transition={{ repeat: Infinity, duration: 2.5 }}
                        >
                            <StarSVG />
                        </motion.span>

                        <motion.span
                            key="star-2"
                            className="text-amber-300 text-base absolute right-2 top-1.5 rotate-[-45deg] hidden sm:block"
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: [0.5, 1, 0.5], scale: [0.7, 1, 0.7] }}
                            exit={{ opacity: 0 }}
                            transition={{ repeat: Infinity, duration: 2.3 }}
                        >
                            <StarSVG />
                        </motion.span>

                        <motion.span
                            key="star-3"
                            className="text-amber-300 absolute right-6 bottom-0 rotate-[45deg] hidden sm:block"
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: [0.5, 1, 0.5], scale: [0.7, 0.8, 0.7] }}
                            exit={{ opacity: 0 }}
                            transition={{ repeat: Infinity, duration: 2.5 }}
                        >
                            <StarSVG />
                        </motion.span>
                    </>
                ) : (
                    <>
                        {[
                            { leftClass: "left-7", topClass: "top-1" },
                            { leftClass: "left-4", topClass: "top-2.5" },
                            { leftClass: "left-5.5", topClass: "top-5" },
                            { leftClass: "left-[2.25rem]", topClass: "top-3" },
                        ].map((pos, i) => (
                            <motion.span
                                key={i}
                                className={`text-white absolute ${pos.topClass} ${pos.leftClass} hidden sm:block`}
                                initial={{ x: -15, opacity: 0 }}
                                animate={{ x: 15, opacity: [0, 1, 0] }}
                                exit={{ opacity: 0 }}
                                transition={{ repeat: Infinity, duration: 4 + i }}
                            >
                                <CloudSVG />
                            </motion.span>
                        ))}
                    </>
                )}
            </AnimatePresence>
        </motion.button>
    );
}

function StarSVG() {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            width="10pt"
        >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173
               6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927
               0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522
               3.356.83 4.73c.078.443-.36.79-.746.592L8
               13.187l-4.389 2.256z" />
        </svg>
    );
}

function CloudSVG() {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            width="8pt"
        >
            <path d="M13.405 7.027a5.001 5.001 0 0 0-9.499-1.004A3.5
               3.5 0 1 0 3.5 13H13a3 3 0 0 0 .405-5.973z" />
        </svg>
    );
}
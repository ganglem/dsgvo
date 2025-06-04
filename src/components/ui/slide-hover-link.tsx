"use client";

import React from "react";

type SlideHoverLinkProps = {
    text: string;
};
export default function SlideHoverLink({ text }: SlideHoverLinkProps) {
    return (
        <div className="w-fit px-1">
            {/* Added height-constrained container with overflow hidden */}
            <div className="overflow-hidden h-[1.5em] flex items-center">
                <span
                    className="
                        relative
                        overflow-hidden
                        group
                        inline-block
                    "
                >
                    <span
                        className="
                            absolute inset-0
                            flex items-center justify-center
                            transition-transform
                            duration-300 ease-in-out
                            translate-y-0
                            group-hover:translate-y-full
                        "
                    >
                        {text}
                    </span>
                    <span
                        className="
                            absolute inset-0
                            flex items-center justify-center
                            text-accent
                            transition-transform
                            duration-300 ease-in-out
                            -translate-y-full
                            group-hover:translate-y-0
                        "
                    >
                        {text}
                    </span>
                    {/* Invisible text to maintain proper sizing */}
                    <span className="invisible">{text}</span>
                </span>
            </div>
        </div>
    );
}
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

export function Themetoggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";

    return (
        <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">🌞</span>
            <Switch
                checked={isDark}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                className="data-[state=checked]:bg-accent transition"
                aria-label="Toggle dark mode"
            />
            <span className="text-xl" aria-hidden="true">🌙</span>
        </div>
    );
}

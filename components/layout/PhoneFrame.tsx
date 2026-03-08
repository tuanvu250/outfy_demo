"use client";

import React from "react";

/**
 * MobileContainer — on desktop, centers content in a phone-width column
 * with a neutral background. On mobile (<md), renders full-screen as normal.
 * No phone bezel/frame decorations.
 */
export function PhoneFrame({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* Mobile: full screen */}
            <div className="md:hidden min-h-screen w-full">{children}</div>

            {/* Desktop: narrow centered column simulating phone width */}
            <div className="hidden md:flex fixed inset-0 w-full items-start justify-center bg-[#f0f0f0] overflow-hidden">
                <div
                    className="relative w-full bg-background h-full overflow-y-auto phone-frame-scroll shadow-2xl"
                    style={{ maxWidth: 430 }}
                >
                    {children}
                </div>
            </div>
        </>
    );
}

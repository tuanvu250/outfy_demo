"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <nav className="sticky top-0 z-50 w-full border-b border-border-secondary bg-noise backdrop-blur-md px-6 py-4 lg:px-12 flex justify-between items-center transition-all">
                {/* Logo */}
                <Link className="flex items-center gap-2 group" href="/start">
                    <div className="w-10 h-10 md:w-12 md:h-12 text-black group-hover:rotate-12 transition-transform duration-300">
                        <Image src="/images/Logo ko-01.png" alt="Logo" width={100} height={100} />
                    </div>
                    <span className="font-display font-bold text-2xl tracking-tighter uppercase hidden md:block border-b-2 border-transparent hover:border-accent transition-colors text-text-primary">OutFy</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 font-medium text-lg">
                    <a className="relative cursor-pointer hover:text-accent after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" onClick={(e) => scrollToSection(e, 'sticky-tech')}>Tính năng</a>
                    <a className="relative cursor-pointer hover:text-accent after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" onClick={(e) => scrollToSection(e, 'community')}>Cộng đồng</a>
                    <Link className="px-6 py-2 bg-primary text-white rounded-full font-bold transition-opacity hover:bg-accent shadow-sm" href="/start">Dùng thử ngay</Link>
                </div>

                {/* Mobile Menu Icon */}
                <button className="md:hidden p-2" onClick={() => setIsMenuOpen(true)}>
                    <span className="material-symbols-outlined text-4xl text-text-secondary">menu</span>
                </button>
            </nav>

            {/* Mobile Sheet Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-100 md:hidden backdrop-blur-sm"
                        />

                        {/* Sheet */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-surface bg-noise border-l border-border-light z-101 shadow-2xl md:hidden flex flex-col"
                        >
                            <div className="flex justify-end p-6 border-b border-border-light">
                                <button className="p-2 bg-background border border-border-light rounded-full shadow-sm hover:bg-surface transition-all text-text-primary" onClick={() => setIsMenuOpen(false)}>
                                    <span className="material-symbols-outlined text-3xl block">close</span>
                                </button>
                            </div>

                            <div className="flex flex-col p-8 gap-8 text-2xl font-display font-bold tracking-tight text-text-primary">
                                <a className="text-accent transition-colors cursor-pointer flex items-center gap-4 border-b border-dashed border-border-light pb-4" onClick={(e) => scrollToSection(e, 'sticky-tech')}>
                                    <span className="material-symbols-outlined text-4xl">bolt</span>
                                    Tính năng
                                </a>
                                <a className="text-accent transition-colors cursor-pointer flex items-center gap-4 border-b border-dashed border-border-light pb-4" onClick={(e) => scrollToSection(e, 'community')}>
                                    <span className="material-symbols-outlined text-4xl">groups</span>
                                    Cộng đồng
                                </a>
                                <Link className="mt-8 px-6 py-4 bg-primary text-white text-center rounded-full font-bold shadow-sm hover:bg-accent transition-colors flex items-center justify-center gap-2" href="/start" onClick={() => setIsMenuOpen(false)}>
                                    Dùng thử ngay
                                    <span className="material-symbols-outlined font-bold block">arrow_forward</span>
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

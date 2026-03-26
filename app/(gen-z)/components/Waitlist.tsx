"use client";

import React from 'react';

export function Waitlist() {
    return (
        <section className="relative w-full  bg-noise min-h-[80vh] flex flex-col items-center justify-center overflow-hidden py-10 px-4 border-t-[3px] border-ink">
            {/* Background Decor: Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] pointer-events-none opacity-20"></div>
            {/* Background Decor: Abstract Shapes */}
            <div className="absolute top-10 left-10 w-24 h-24 md:w-40 md:h-40 bg-primary rounded-full blur-[60px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 md:w-56 md:h-56 bg-accent rounded-full blur-[80px] opacity-20"></div>

            {/* Floating Sticker 1 */}
            <div className="absolute top-[15%] right-[5%] md:right-[15%] rotate-12 hidden md:block">
                <div className="bg-secondary px-4 py-2 border-2 border-ink shadow-hard-sm transform hover:scale-110 transition-transform cursor-pointer">
                    <span className="font-marker text-ink text-xl uppercase tracking-wider">Coming Soon!</span>
                </div>
            </div>

            {/* Floating Sticker 2 */}
            {/* <div className="absolute bottom-[25%] left-[5%] md:left-[10%] -rotate-6 hidden md:block">
                <div className="bg-accent px-4 py-2 border-2 border-ink shadow-hard-white transform hover:scale-110 transition-transform cursor-pointer">
                    <span className="font-marker text-white text-lg uppercase">Sắp đổ bộ</span>
                </div>
            </div> */}

            <div className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center gap-12">
                {/* Headline Group */}
                <div className="flex flex-col gap-4">
                    <div className="inline-flex items-center justify-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-secondary text-5xl animate-bounce">rocket_launch</span>
                    </div>
                    <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.85] text-ink tracking-tighter uppercase drop-shadow-[5px_5px_0_#FFF]">
                        Outfy<br />
                        <span className="text-primary italic">Sắp ra mắt</span>
                    </h1>
                    <p className="text-ink/70 text-lg md:text-xl max-w-2xl mx-auto mt-6 font-medium leading-relaxed">
                        Để lại email để nhận thông báo sớm nhất từ tụi mình nhé!
                    </p>
                </div>

                {/* Email Signup Form (The Waitlist Part) */}
                <div className="w-full max-w-xl relative group">
                    {/* Handwritten Arrow (SVG) Left */}
                    <div className="absolute -left-32 top-1/2 -translate-y-1/2 hidden lg:block w-24">
                        <svg className="w-full h-auto fill-accent -rotate-12 transform group-hover:scale-110 transition-transform" viewBox="0 0 100 50">
                            <path d="M10,10 Q40,40 90,10 L80,20 M90,10 L70,5" fill="none" stroke="#FD7123" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                            <text className="font-bold text-xs" fill="#FD7123" style={{ fontSize: '14px' }} x="0" y="45">Cọc chỗ ngay!</text>
                        </svg>
                    </div>

                    <form className="flex flex-col sm:flex-row gap-0 sm:gap-0 border-[3px] border-ink shadow-hard bg-white p-1 rounded-sm overflow-hidden" onSubmit={(e) => e.preventDefault()}>
                        <input
                            className="flex-1 px-6 py-4 text-ink font-body focus:outline-none placeholder:text-ink/30 text-lg"
                            placeholder="Email của bạn nè..."
                            type="email"
                        />
                        <button className="bg-primary text-white font-display font-bold text-lg uppercase px-8 py-4 sm:border-l-[3px] border-ink hover:bg-accent transition-colors">
                            Gửi Ngay!
                        </button>
                    </form>
                    <p className="mt-4 text-ink/50 text-sm font-bold uppercase tracking-tight">Hứa khum spam, chỉ toàn tin chất lượng!</p>
                </div>
            </div>
            {/* Bottom Marquee (Visual Separation) */}
            {/* <div className="absolute bottom-0 left-0 w-full bg-secondary border-t-[3px] border-ink py-2 overflow-hidden rotate-1 scale-105 origin-bottom-left">
                <div className="marquee-container">
                    <div className="marquee-content font-display font-bold text-ink text-sm uppercase tracking-widest">
                        DOWNLOAD NOW • TẢI NGAY ĐI CHỜ CHI • VIBECHECK • DOWNLOAD NOW • TẢI NGAY ĐI CHỜ CHI • VIBECHECK • DOWNLOAD NOW • TẢI NGAY ĐI CHỜ CHI • VIBECHECK •
                        DOWNLOAD NOW • TẢI NGAY ĐI CHỜ CHI • VIBECHECK • DOWNLOAD NOW • TẢI NGAY ĐI CHỜ CHI • VIBECHECK • DOWNLOAD NOW • TẢI NGAY ĐI CHỜ CHI • VIBECHECK •
                    </div>
                </div>
            </div> */}
        </section>
    );
}

import React from 'react';
import Link from 'next/link';

export function Waitlist() {
    return (
        <section className="relative w-full bg-background-dark min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-4 md:px-8 border-t-[3px] border-ink">
            {/* Background Decor: Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] pointer-events-none opacity-20"></div>
            {/* Background Decor: Abstract Shapes */}
            <div className="absolute top-10 left-10 w-24 h-24 md:w-40 md:h-40 bg-primary rounded-full blur-[60px] opacity-30 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 md:w-56 md:h-56 bg-accent rounded-full blur-[80px] opacity-20"></div>
            {/* Floating Sticker 1 */}
            <div className="absolute top-[10%] right-[5%] md:right-[15%] rotate-12 hidden md:block">
                <div className="bg-secondary px-4 py-2 border-2 border-ink shadow-hard-sm transform hover:scale-110 transition-transform cursor-pointer">
                    <span className="font-marker text-ink text-xl">100% FREE!</span>
                </div>
            </div>
            {/* Floating Sticker 2 */}
            <div className="absolute bottom-[20%] left-[5%] md:left-[10%] -rotate-6 hidden md:block">
                <div className="bg-accent px-4 py-2 border-2 border-ink shadow-hard-white transform hover:scale-110 transition-transform cursor-pointer">
                    <span className="font-marker text-white text-lg">NO ADS</span>
                </div>
            </div>
            <div className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center gap-12">
                {/* Headline Group */}
                <div className="flex flex-col gap-4">
                    <div className="inline-flex items-center justify-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-secondary text-4xl animate-bounce">stat_3</span>
                    </div>
                    <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] text-white tracking-tighter uppercase drop-shadow-[4px_4px_0_#000]">
                        Sẵn sàng<br />
                        <span className="text-secondary">lên đồ</span> chưa?
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-lg mx-auto mt-4 font-medium">
                        Quét mã để tải app ngay và luôn. <br /> Đừng để outfit của bạn chờ đợi!
                    </p>
                </div>
                {/* QR Code & Arrows Section */}
                <div className="relative group">
                    {/* Handwritten Arrow (SVG) Left */}
                    <div className="absolute -left-24 top-1/2 -translate-y-1/2 hidden md:block w-20">
                        <svg className="w-full h-auto fill-accent -rotate-12 transform group-hover:scale-110 transition-transform" viewBox="0 0 100 50">
                            <path d="M10,25 Q40,5 90,25 L80,15 M90,25 L80,35" fill="none" stroke="#FD7123" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                            <text className="font-marker text-xs" fill="#FD7123" style={{ fontSize: '14px' }} x="0" y="45">Scan nè!</text>
                        </svg>
                    </div>
                    {/* Handwritten Arrow (SVG) Right */}
                    <div className="absolute -right-28 top-0 hidden md:block w-24">
                        <svg className="w-full h-auto fill-accent rotate-12 transform group-hover:scale-110 transition-transform" viewBox="0 0 120 80">
                            <path d="M100,10 Q60,60 10,40 L20,30 M10,40 L25,50" fill="none" stroke="#FD7123" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                            <text className="font-marker text-xs" fill="#FD7123" style={{ fontSize: '16px' }} x="50" y="20">Nhanh đi má</text>
                        </svg>
                    </div>
                    {/* QR Code Card */}
                    <div className="bg-white p-4 border-[3px] border-ink shadow-hard-white rotate-2 transition-transform duration-300 hover:rotate-0 hover:scale-105">
                        <div className="w-48 h-48 md:w-64 md:h-64 bg-ink flex items-center justify-center relative overflow-hidden">
                            {/* Abstract placeholder for QR */}
                            <div className="absolute inset-0 bg-white m-2 flex flex-wrap content-center justify-center p-2">
                                <img alt="Mã QR để tải ứng dụng VibeCheck với các mẫu pixel trừu tượng" className="w-full h-full object-contain mix-blend-multiply opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABbhqINllj5kcoyP4iyA4qKOV1o16-42NU_9IzD7EsqYSntb4HAaRLaDAXl7dRji9-6dAbPzt9Q844HEyAua2mhF_eCALTQdReGI4AOdD3Dy0NPyI0hzDTtL84rnypzux4CgJb6MWd7TqkrfW2XFu3K1wlwgBSqvT-6z2iDgZZHVEoMiQTtYAu251ZDsrngG5PVCizrLYzWixenypZfnf-rHLdvYBeFkGljZVpkNw5ZvpUbevrJTNksozh_55cjmUKJtAgnr7FnkM4" />
                            </div>
                            {/* Center Logo Overlay */}
                            <div className="absolute bg-primary p-2 border-2 border-ink rounded-full shadow-sm">
                                <span className="material-symbols-outlined text-white text-2xl">checkroom</span>
                            </div>
                        </div>
                        <div className="mt-3 text-center">
                            <p className="font-bold text-ink uppercase tracking-wider text-sm">VibeCheck App</p>
                        </div>
                    </div>
                </div>
                {/* Store Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center mt-4">
                    <button className="flex-1 flex items-center justify-center gap-3 bg-white text-ink border-[3px] border-ink shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all px-6 py-4 rounded-sm group">
                        <span className="material-symbols-outlined text-3xl group-hover:text-primary transition-colors">ios</span>
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] uppercase font-bold leading-tight">Download on the</span>
                            <span className="text-lg font-display font-bold leading-tight group-hover:text-primary transition-colors">App Store</span>
                        </div>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-3 bg-white text-ink border-[3px] border-ink shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all px-6 py-4 rounded-sm group">
                        <span className="material-symbols-outlined text-3xl group-hover:text-primary transition-colors">play_arrow</span>
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] uppercase font-bold leading-tight">Get it on</span>
                            <span className="text-lg font-display font-bold leading-tight group-hover:text-primary transition-colors">Google Play</span>
                        </div>
                    </button>
                </div>
                {/* Social Links & Footer Info */}
                <div className="mt-12 flex flex-col items-center gap-8 w-full border-t border-white/20 pt-10">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <Link className="font-display font-bold text-white uppercase tracking-[0.2em] hover:text-accent hover:underline decoration-wavy underline-offset-8 transition-all text-sm md:text-base" href="/start">TikTok</Link>
                        <Link className="font-display font-bold text-white uppercase tracking-[0.2em] hover:text-accent hover:underline decoration-wavy underline-offset-8 transition-all text-sm md:text-base" href="/start">Instagram</Link>
                        <Link className="font-display font-bold text-white uppercase tracking-[0.2em] hover:text-accent hover:underline decoration-wavy underline-offset-8 transition-all text-sm md:text-base" href="/start">Facebook</Link>
                        <Link className="font-display font-bold text-white uppercase tracking-[0.2em] hover:text-accent hover:underline decoration-wavy underline-offset-8 transition-all text-sm md:text-base" href="/start">Discord</Link>
                    </div>
                    <div className="text-white/40 text-xs font-body tracking-wide flex flex-col md:flex-row items-center gap-2">
                        <span>© 2024 VibeCheck Inc.</span>
                        <span className="hidden md:inline">•</span>
                        <span>All rights reserved.</span>
                        <span className="hidden md:inline">•</span>
                        <Link className="hover:text-white transition-colors" href="/start">Privacy Policy</Link>
                    </div>
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

import React from 'react';

export function StickyTech() {
    return (
        <section id="sticky-tech" className="relative w-full min-h-screen flex flex-col items-center justify-center py-16 px-4 md:px-8 overflow-hidden">
            {/* Decorative Floating Elements (Background) */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-accent rounded-full border-[3px] border-ink opacity-20 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-lime-pop rounded-full border-[3px] border-ink opacity-30 blur-3xl"></div>
            {/* Section Header */}
            <div className="relative z-10 mb-12 text-center max-w-4xl mx-auto">
                <div className="inline-block transform -rotate-2 mb-4">
                    <span className="bg-primary px-4 py-1.5 rounded-full text-white font-bold tracking-wider text-sm shadow-sm">Sticky Tech</span>
                </div>
                <h2 className="text-[42px] md:text-[64px] font-bold leading-[0.9] tracking-tight uppercase text-text-primary">
                    Công nghệ <br /> <span className="text-secondary">cực chuẩn</span>
                </h2>
            </div>
            {/* Bento Grid Layout */}
            <div className="relative z-10 w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-[minmax(250px,auto)] mb-12">
                {/* Card 1: Quét 3D (Vertical - Left) */}
                <div className="group relative col-span-1 md:col-span-5 row-span-2 bg-primary border border-border-light shadow-sm rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col">
                    {/* Sticker */}
                    <div className="absolute top-4 right-4 z-20 bg-[#E6FF99] text-text-primary font-bold text-xs px-3 py-1.5 rounded-full shadow-sm group-hover:scale-105 transition-transform">
                        100% Fit
                    </div>
                    {/* Content Top */}
                    <div className="p-6 md:p-8 flex-1 relative z-10">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 text-white">
                            <span className="material-symbols-outlined text-2xl">qr_code_scanner</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2 leading-none">Quét 3D</h3>
                        <p className="text-white/90 text-lg leading-snug font-medium">Scan body 360 độ chỉ trong 10s. Chuẩn từng milimet.</p>
                    </div>
                    {/* Visual Bottom (Image/GIF placeholder) */}
                    <div className="relative h-[300px] md:h-[400px] w-full bg-black/10 mt-auto border-t border-white/10">
                        <img alt="3D wireframe mesh of a human figure rotating in a green digital space" className="w-full h-full object-cover mix-blend-overlay opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBexQI3RKAzC3a8QtGuAerz4z-6eihEc3Rj7FawH3XLVBG9xu5RatOU8adbE1M1fdSzJOzdfIWJ5zR4Brf9B0sbgu2bOaP7OnMSgig4AnvteX_bxWkCljdH_dd5BzPMVLfrMEXK-kJnW0UbztPsufupTCmNh695q94HI0u_xdVIjS0dOyGBktRYBobM8ghqP__N0B1F_phKteco0raqXv-HNswNB3AGsG1x12wChgr_e5OdxdgDmXAtYN-oO3vSkXhKFlrjKjcutmiE" />
                        {/* Overlay Grid UI */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-48 h-48 border-2 border-dashed border-lime-pop rounded-full animate-[spin_10s_linear_infinite] opacity-70"></div>
                            <div className="absolute w-40 h-40 border border-white rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-5xl text-lime-pop animate-pulse">accessibility_new</span>
                            </div>
                        </div>
                        {/* Scanning Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_15px_#FD7123] animate-[scan_2s_ease-in-out_infinite]"></div>
                    </div>
                </div>
                {/* Card 2: AI Stylist (Wide - Top Right) */}
                <div className="group relative col-span-1 md:col-span-7 bg-surface border border-border-light shadow-sm rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col md:flex-row">
                    {/* Content Left */}
                    <div className="p-6 md:p-8 flex flex-col justify-center md:w-1/2 border-b md:border-b-0 md:border-r border-border-light bg-background">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-primary">auto_awesome</span>
                        </div>
                        <h3 className="text-2xl font-bold text-text-primary mb-2">AI Stylist</h3>
                        <p className="text-text-secondary font-medium">Stylist riêng hiểu gu bạn hơn người yêu cũ.</p>
                    </div>
                    {/* Visual Right (Chat Interface) */}
                    <div className="p-6 md:p-8 md:w-1/2 relative flex flex-col justify-center space-y-3 bg-surface">
                        {/* Chat Bubble 1 (AI) */}
                        <div className="self-start max-w-[90%] bg-[#E6FF99] rounded-2xl rounded-tl-sm p-3 shadow-sm transform group-hover:scale-[1.02] transition-transform">
                            <p className="text-sm font-medium text-text-primary">Outfit này hợp vibe đi cafe nè! ☕️</p>
                        </div>
                        {/* Chat Bubble 2 (User) */}
                        <div className="self-end max-w-[80%] bg-primary rounded-2xl rounded-br-sm p-3 shadow-sm transform group-hover:scale-[1.02] transition-transform">
                            <p className="text-sm font-medium text-white">Chốt đơn liền! 🔥</p>
                        </div>
                    </div>
                </div>
                {/* Card 3: Mix & Match (Square - Bottom Right) */}
                <div className="group relative col-span-1 md:col-span-7 bg-[#E6FF99] border border-border-light shadow-sm rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col md:flex-row">
                    {/* Visual Left (Drag & Drop UI) */}
                    <div className="h-48 md:h-auto md:w-1/2 bg-white/50 border-b md:border-b-0 md:border-r border-border-light relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(#0D0D0D_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03]"></div>
                        {/* Draggable Items Mockup */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full p-4 flex items-center justify-center">
                            <div className="relative w-24 h-32 bg-primary rounded-xl rotate-[-6deg] group-hover:rotate-[-12deg] transition-transform z-10 shadow-sm flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-4xl">checkroom</span>
                                <div className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">Top</div>
                            </div>
                            <div className="relative w-24 h-32 bg-white rounded-xl rotate-[12deg] group-hover:rotate-[6deg] transition-transform -ml-8 z-20 shadow-sm flex items-center justify-center border border-border-light">
                                <span className="material-symbols-outlined text-text-primary text-4xl">styler</span>
                                <div className="absolute -bottom-2 -left-2 bg-text-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">Pant</div>
                            </div>
                            {/* Cursor */}
                            <div className="absolute bottom-10 right-10 z-30 pointer-events-none group-hover:translate-x-[-10px] group-hover:translate-y-[-10px] transition-transform duration-500">
                                <svg fill="none" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19177L14.8088 16.8829H5.65376Z" fill="#0D0D0D" stroke="white" strokeWidth="2" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    {/* Content Right */}
                    <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-text-primary">Mix &amp; Match</h3>
                            <span className="bg-white border border-border-light rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-text-secondary">Beta</span>
                        </div>
                        <p className="text-text-secondary font-medium mb-4">Kéo thả phối đồ, 1 chạm là lên đồ ngay.</p>
                        <button className="self-start bg-text-primary text-white font-bold py-2 px-5 rounded-full hover:bg-primary transition-colors shadow-sm text-sm">
                            Thử ngay →
                        </button>
                    </div>
                </div>
            </div>
            {/* Marquee Strip Bottom (Decorative) */}
            <div className="w-full absolute bottom-0 left-0 border-t border-border-light bg-primary overflow-hidden whitespace-nowrap py-2 shadow-sm">
                <div className="inline-block animate-[marquee_20s_linear_infinite]">
                    <span className="text-white font-bold text-sm mx-4 uppercase tracking-widest">• Quét 3D • Mix Đồ Cực Cháy • Không Cần Ra Shop • Quét 3D • Mix Đồ Cực Cháy • Không Cần Ra Shop</span>
                    <span className="text-white font-bold text-sm mx-4 uppercase tracking-widest">• Quét 3D • Mix Đồ Cực Cháy • Không Cần Ra Shop • Quét 3D • Mix Đồ Cực Cháy • Không Cần Ra Shop</span>
                </div>
            </div>
        </section>
    );
}

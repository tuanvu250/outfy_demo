'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Community() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    // Parallax translations for individual cards
    const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);   // Linh Chi - top left
    const y2 = useTransform(scrollYProgress, [0, 1], [200, -200]); // Minh Hieu - top right
    const y3 = useTransform(scrollYProgress, [0, 1], [120, -120]); // Bao Ngoc - center left
    const y4 = useTransform(scrollYProgress, [0, 1], [160, -160]); // Tuan Anh - bottom right
    const y5 = useTransform(scrollYProgress, [0, 1], [40, -40]);   // Quynh Nhu - bottom left

    // Stamp animations
    const stampRotate = useTransform(scrollYProgress, [0, 1], [-20, -5]);
    const stampScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.9]);

    return (
        <section
            ref={containerRef}
            id="community"
            className="relative w-full min-h-screen flex flex-col items-center py-10 bg-noise overflow-hidden border-t-[3px] border-ink"
        >
            {/* Header */}
            <div className="z-20 text-center mb-0 relative">
                <div className="inline-flex items-center justify-center px-4 py-1.5 border-2 border-ink bg-white shadow-hard-sm mb-4">
                    <span className="text-sm font-bold uppercase tracking-widest text-ink">Community</span>
                </div>
                <h2 className="font-display text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-ink">
                    The OutFy
                </h2>
                <p className="mt-4 text-lg md:text-xl font-medium max-w-lg mx-auto text-ink opacity-80">
                    Xem mọi người nói gì về outfit ảo ma canada này nha! 👇
                </p>
            </div>

            {/* Scattered Cards Container */}
            <div className="relative w-full max-w-6xl mx-auto h-[900px] lg:h-[780px]">

                {/* STAMP - center, prominent */}
                <motion.div
                    style={{ rotate: stampRotate, scale: stampScale }}
                    className="absolute left-[50%] top-[20%] lg:top-[10%] transform -translate-x-1/2 mix-blend-multiply opacity-95 z-20 origin-center"
                >
                    <svg className="w-[220px] h-[220px] md:w-[300px] md:h-[300px]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <mask id="grunge-mask">
                                <rect fill="white" height="100%" width="100%" />
                                <circle cx="20" cy="50" fill="black" r="2" />
                                <circle cx="180" cy="120" fill="black" r="3" />
                                <circle cx="80" cy="20" fill="black" r="1.5" />
                                <circle cx="120" cy="40" fill="black" r="2.5" />
                                <circle cx="40" cy="140" fill="black" r="1" />
                                <path d="M0,0 L200,200" stroke="black" strokeDasharray="5,15" strokeWidth="1" />
                            </mask>
                        </defs>
                        <g mask="url(#grunge-mask)" transform="translate(10, 50)">
                            <rect fill="none" height="100" rx="10" stroke="#E37239" strokeWidth="8" width="180" x="0" y="0" />
                            <rect fill="none" height="84" rx="6" stroke="#E37239" strokeWidth="2" width="164" x="8" y="8" />
                            <path d="M20 50 L30 40 L30 60 Z" fill="#E37239" />
                            <path d="M160 50 L150 40 L150 60 Z" fill="#E37239" />
                            <text
                                dominantBaseline="middle"
                                fill="#E37239"
                                fontFamily="Permanent Marker"
                                fontSize="38"
                                fontWeight="bold"
                                letterSpacing="4"
                                textAnchor="middle"
                                x="90"
                                y="52"
                            >
                                CHECK
                            </text>
                        </g>
                    </svg>
                </motion.div>

                {/* Card 1 - Linh Chi (Top Left) */}
                <motion.div
                    style={{ y: y1 }}
                    className="absolute left-[2%] lg:left-[4%] top-[22%] w-[85%] sm:w-[310px] z-30 bg-white border-[3px] border-ink p-5 shadow-hard hover:shadow-hard-hover transition-shadow cursor-pointer -rotate-6"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-ink bg-blue-100 flex-shrink-0">
                            <img alt="Linh Chi avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_fl71UqEL4D9MRZqkrfGi-b_cSyMgIHdd0TD3bu7uO_Fs_KGuMmV6_flthks5ENQwT0iO2Mcx5R_44sU2oAooM7rLoN6WpsRAhCx9foUAkQY97I6Lw98czFNg5efMKh2HU_8PtfgJmdeTh_BY9GmMqVKdeeXkl8ID1DX-rU6xy3tbgNk3Ob8CsAUWeHVLS1FzRPsHjWdHYEjNzodxyShmlHIJxNrHOmRX5SL8zDlO9aioKuZ_49SgNFFnlDHKyxBqLsWS73v7RXVi" />
                        </div>
                        <div className="min-w-0">
                            <h4 className="font-bold leading-tight text-ink">Linh Chi 🎀</h4>
                            <span className="text-xs text-gray-500 font-medium">@linhchicheck • 2h trước</span>
                        </div>
                        <span className="material-symbols-outlined ml-auto text-primary text-xl flex-shrink-0">verified</span>
                    </div>
                    <p className="text-base font-bold leading-snug mb-4 text-ink">
                        &quot;Cứu tinh cho đứa lười đi mall như tui 😭🤟 App mượt, thử đồ không cần cởi ra mặc vào mệt nghỉ.&quot;
                    </p>
                    <div className="flex items-center gap-4 text-gray-500 text-sm font-bold">
                        <div className="flex items-center gap-1 hover:text-red-500 transition-colors">
                            <span className="material-symbols-outlined text-[18px]">favorite</span> 1.2k
                        </div>
                        <div className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                            <span className="material-symbols-outlined text-[18px]">chat_bubble</span> 42
                        </div>
                        <div className="flex items-center gap-1 hover:text-green-500 transition-colors">
                            <span className="material-symbols-outlined text-[18px]">repeat</span> 15
                        </div>
                    </div>
                </motion.div>

                {/* Card 2 - Minh Hieu (Top Right) */}
                <motion.div
                    style={{ y: y2 }}
                    className="absolute right-[2%] lg:right-[4%] top-[4%] lg:top-[8%] w-[85%] sm:w-[340px] z-10 bg-white border-[3px] border-ink p-5 shadow-hard hover:shadow-hard-hover transition-shadow cursor-pointer rotate-2"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-ink bg-yellow-100 flex-shrink-0">
                            <img alt="Minh Hieu avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKsk9mXGO5Ym2tZJ4fTTcMAemTLGXVWt1q7NRYmSQTR0i6sVf4gFJ2wHGz8EDcLfMfPgef4hHiJ-uoLta_hkP6fzWm3OCJnIXADxqEjLPIfbBn6k8Ped941WfPeVxCGMFf1kxMNyQaVyQXxc8TbplPiHrzKctb1GovvoodXoZaJg7lbYOVETTtAZlouvBPGFASiTRZftcVHWe0nu8TM9VenxYCLgcwwFY4iA1Ch-cX6RSY4ifi8cjZx4ziIM-daZAJEK-bg0is1iVH" />
                        </div>
                        <div className="min-w-0">
                            <h4 className="font-bold leading-tight text-ink">Minh Hiếu 🛹</h4>
                            <span className="text-xs text-gray-500 font-medium">@hieuskater • 5h trước</span>
                        </div>
                    </div>
                    <p className="text-[15px] font-bold leading-snug text-ink mb-4">
                        &quot;Fit chuẩn 9/10 nha mí bà <span className="font-bold text-ink">#OutFy</span>. Cái tính năng AI mix đồ đỉnh vãi chưởng, đỡ phải nghĩ nay mặc gì.&quot;
                    </p>
                    {/* Image */}
                    <div className="w-full h-28 rounded-sm border-2 border-ink mb-3 bg-gray-100 overflow-hidden relative">
                        <div
                            className="absolute inset-0 bg-cover bg-center grayscale"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB8VMTVRO82B8H7QZIeKUyttRsgtUaZ69sTTF3HTBkgEDOpe6_evUhvy9Sa1T2gGhG1_NNz-H-9zGnTJjdrJzv-C-9c7BJgCh-oliZTj7LdeCFGdC7_mMXkqgcodEJ_MOQ16VBvqkriWWmmzc-3meRwAsR6ib-yjtu_F3hM-uW8lCMOe2NX3sGjSbZ13WgstBRMMXXcgmjIGT8dyrAnocEqQX060zrfXK0pJA0TG_frLbZfBQ1W2aQYu5lJfF_r_VoVi7OwlZ0Jajmh')" }}
                        />
                        <div className="absolute bottom-2 right-2 bg-ink text-white text-[10px] px-1.5 py-0.5 font-bold uppercase tracking-wider rounded-sm">GIF</div>
                    </div>
                </motion.div>

                {/* Card 3 - Bao Ngoc (Center Left — TRENDING) */}
                <motion.div
                    style={{ y: y3 }}
                    className="absolute left-[12%] lg:left-[28%] top-[48%] lg:top-[45%] w-[85%] sm:w-[310px] z-30 bg-[#FFF5E6] border-[3px] border-ink p-5 shadow-hard hover:shadow-hard-hover transition-shadow cursor-pointer rotate-3"
                >
                    <div className="absolute -top-4 right-3 bg-secondary text-white text-[11px] font-bold px-3 py-1.5 rotate-12 border-2 border-ink shadow-sm z-20">
                        TRENDING 🔥
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-ink bg-pink-100 flex-shrink-0">
                            <img alt="Bao Ngoc avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWsnwAzAC-EvLC5jGLU1OLm7ERhKoADfH_i1ZWVFko3BmywvlzkNEnnozYzrWWvQ07nXoP7qlwXecDIyFTeXPNIhHU1wSQYtM-KEyhoTJaZPp7nQQbBOL7t-p1_ricdLuUtI0oKx2y1XJNEwA5nrh-YpcsVeXDa0-ux-UBHVa42Gk6okr8aSGBHIqfn2bgd-wxHA6Lxw68baIT7snUhP91AkFKKboHXQayvEM8BHLNk4DLvu9RGh8k50EjqdV4Dhv6_9fjeRDdMHmB" />
                        </div>
                        <div className="min-w-0">
                            <h4 className="font-bold leading-tight text-ink">Bảo Ngọc ✨</h4>
                            <span className="text-xs text-gray-500 font-medium">@baongoc_blink • 1d trước</span>
                        </div>
                    </div>
                    <p className="text-lg font-bold leading-snug mb-4 text-ink">
                        &quot;Đỉnh của chóp! 💯 Mới tải về test thử mà ghiền lun á. Mấy cái filter quần áo nhìn real xỉu.&quot;
                    </p>
                    <div className="flex items-center gap-6 text-gray-500 text-sm font-bold">
                        <div className="flex items-center gap-1 hover:text-red-500 transition-colors">
                            <span className="material-symbols-outlined text-[18px]">favorite</span> 2.4k
                        </div>
                        <div className="flex items-center gap-1 hover:text-blue-500 transition-colors text-xs font-semibold tracking-wide">
                            <span className="material-symbols-outlined text-[18px]">share</span> Share
                        </div>
                    </div>
                </motion.div>

                {/* Card 4 - Quynh Nhu (Bottom Left) */}
                <motion.div
                    style={{ y: y5 }}
                    className="absolute left-[2%] lg:left-[2%] top-[82%] lg:top-[60%] w-[85%] sm:w-[310px] z-40 bg-white border-[3px] border-ink p-5 shadow-hard hover:shadow-hard-hover transition-shadow cursor-pointer -rotate-2"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-ink bg-purple-100 flex-shrink-0">
                            <img alt="Quynh Nhu avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqX3zE2d9ci-MO3Cwuzz6GcvLm9uyi3Y2uaw9-_MaCOdXMGFCVQnJ7P7jzpvHAun22dD7i_5Hy8LwXrXfF5t_XlZX6orfpVAe211tQFXBqT_Q0BUF79KREGq8940CefP7LIkM1i3jNctFfhUkSV4a7YVi1DIqrfLJJlzSp7NWcfWt9ocZvx5-OGRiTWDx4iQzzBSuXziMVnMeDEh-VSECJsL_5Z4vTh6J9QV7GqzPNWfVJE8TYsxNQGB3d5dqFY8TZCBaQUp_yP3Xb" />
                        </div>
                        <div className="min-w-0">
                            <h4 className="font-bold leading-tight text-ink">Quỳnh Như 💅</h4>
                            <span className="text-xs text-gray-500 font-medium">@nhunhu_slay • 30m trước</span>
                        </div>
                    </div>
                    <p className="text-base font-bold leading-snug mb-5 text-ink">
                        &quot;Ai chưa tải thì tải lẹ điiii. Săn sale online mà có cái này đỡ hớ hẳn =)))&quot;
                    </p>
                    <div className="flex items-center gap-4 text-gray-500 text-sm font-bold">
                        <div className="flex items-center gap-1 text-red-500">
                            <span className="material-symbols-outlined text-[18px] fill-current">favorite</span> 156
                        </div>
                        <div className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                            <span className="material-symbols-outlined text-[18px]">chat_bubble</span> 12
                        </div>
                    </div>
                </motion.div>

                {/* Card 5 - Tuan Anh (Bottom Center-Right) */}
                <motion.div
                    style={{ y: y4 }}
                    className="absolute right-[2%] lg:right-[18%] top-[67%] lg:top-[55%] w-[85%] sm:w-[290px] z-30 bg-white border-[3px] border-ink p-5 shadow-hard hover:shadow-hard-hover transition-shadow cursor-pointer -rotate-5"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-ink bg-green-100 flex-shrink-0">
                            <img alt="Tuan Anh avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjY-OnKSUSdT7PF1fZydwgWmvvylVpCxilL0AzY2dBHBphTldzb5zDw-qLVXIWw9g41HOF2O_ZPvKbKNX0rlJftvuMQYgXAcfC1yPRmgsKBCmJaClu4egkgBRioy5dlC_F7vrSrUINfxXLrnAJA2BOiRx7aOOhRaU_CI6vJCYjWT6v54a6QTRfoANSa1G2PXp3ik8WY3c7Pd9rLyeSb1Les3BGQ8_h4GPAwYby8GGd5rC0iqOFXNMM-ykTw2tjY1gToBV0Cw5CgG32" />
                        </div>
                        <div className="min-w-0">
                            <h4 className="font-bold leading-tight text-ink">Tuấn Anh 🧢</h4>
                            <span className="text-xs text-gray-500 font-medium">@tuananh99 • 3h trước</span>
                        </div>
                    </div>
                    <p className="text-base font-bold leading-snug mb-4 text-ink">
                        &quot;Scan 3D nhanh gọn lẹ. Recommend cho anh em nào lười thử đồ nha.&quot;
                    </p>
                    <div className="flex items-center gap-4 text-gray-500 text-sm font-bold">
                        <div className="flex items-center gap-1 hover:text-red-500 transition-colors">
                            <span className="material-symbols-outlined text-[18px]">favorite</span> 56
                        </div>
                    </div>
                </motion.div>

                {/* Decorative hashtag - bottom right */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="absolute bottom-[2%] right-[2%] lg:right-[2%]"
                >
                    <div className="text-4xl md:text-6xl font-sticker text-[#E37239] opacity-35 rotate-[5deg] select-none">
                        #OUTFY
                    </div>
                </motion.div>

                {/* Decorative Star (Top Left) */}
                <div className="absolute top-[5%] left-[0%] hidden md:block opacity-50">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-secondary">
                        <path d="M12 0L14.645 9.355L24 12L14.645 14.645L12 24L9.355 14.645L0 12L9.355 9.355L12 0Z" fill="currentColor" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
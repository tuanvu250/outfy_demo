"use client";

import React from 'react';

export function Hero() {
    return (
        <>
            <main className="flex-grow flex flex-col lg:flex-row relative bg-noise">
                {/* Left Side: Typography & CTA */}
                <div className="w-full lg:w-1/2 px-6 py-12 lg:pl-20 lg:pr-10 flex flex-col justify-center items-start z-10">
                    <div className="mb-4 inline-block transform -rotate-2">
                        <span className="bg-secondary border border-border-light rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-sm text-text-primary">First 3D Try On App</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8 text-text-primary">
                        Thử đồ <span className="text-outline-secondary italic">3D</span><br />
                        Định hình<br />
                        chất riêng
                    </h1>
                    <p className="text-xl md:text-2xl text-text-secondary mb-10 max-w-md font-medium leading-relaxed">
                        Digital fashion without the anxiety. Scan body 360 độ, mix đồ cực cháy, chốt đơn liền tay.
                    </p>
                    <div className="relative group">
                        <button onClick={() => window.location.href = '/start'} className="bg-primary text-white font-display font-bold text-xl px-10 py-5 rounded-full border-[3px] transition-all duration-200 glitch-hover flex items-center gap-3">
                            Thử ngay
                            <span className="material-symbols-outlined font-bold">arrow_forward</span>
                        </button>
                    </div>
                    {/* Trust signals / Mini social proof */}
                    <div className="mt-12 flex items-center gap-4 opacity-80">
                        <div className="flex -space-x-3">
                            <img alt="User avatar 1" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" data-alt="Portrait of a young woman with sunglasses" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUH9CPo5Vlvi7HYo0izL-TwO3W2HIxJCw33yVojnvhuhzGh2MGqJzMRluXsTizARoS_U233YiVHqMJMivh-a724oboT5eH4pqa7ZzKAk7zPeRe5gJwS4bgSmt7hZgTT6ntXlRjb0E6gQm6pO0jo3v0M9G-n7S76DnaAyG3dafKCcOGlSpIDs4W3OfAQ1qf6gGcLlT87ThAl4buBPGtmIYmBO_kPFS98ke0ixt4DtZyMd-zR34SyeWpZ8GF9E1DoyAYiTOaWou1OEwH" />
                            <img alt="User avatar 2" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" data-alt="Portrait of a young man smiling" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsCUXTSpHrVTEuJUR-aVNsmZhti1gaeRtfIyGi3JNMQQXJ4W_lQSuri2VtoM4AF3NLNRO7jXtXvYZEfeZDpvVQG6ufkjOsdCjhfejHtutURvhiodULy2s1hTbk-nIcteCzcs5oeq6FxYJil3R1m4drwUjl8H9-TKVxVuV1GoHWrxaKR_J0qvyAcNv2O3TErBaSSa6_vfUbUeOQaUByHUphE3kwLsP15gdQ10iMt5tob2gBu3NEFQf8MKHfho1dKapdLzQV3bCqwAQQ" />
                            <img alt="User avatar 3" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" data-alt="Portrait of a young woman with braided hair" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc1u5G4J1avkz2rTyNUOtqnN9S3zRWVRmQnXYOwtZiVChkX5BShbDq1Y-Dx1Hljs1uqcXj2AFAzTD_O1GyZsxGEHgkGmUfwtNUbrfipqUQa8DGNRENDDuE0y6Fa_1V_kfDMH8dp-zdFhFa7Y-gmqfnpVf1d3-s3ubKkYqa8JJkarLyboYQWwWjXE-0ACu19kdFpfm8nMqRzOr1XMyKuWS3vpZbGUrxMW510gC9MyX-C5m2Kivd6DCwdFISK_fCAdBCY_JUY8quN-9J" />
                        </div>
                        <div className="text-sm font-bold text-text-primary">
                            <span className="text-primary">10k+</span> Gen Z đã tham gia
                        </div>
                    </div>
                </div>
                {/* Right Side: Visual & Stickers */}
                <div className="w-full lg:w-1/2 h-[500px] lg:h-auto relative flex items-center justify-center overflow-hidden lg:overflow-visible">
                    {/* Abstract Background Shape behind video */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                        <div className="w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(48,123,117,0.4)_0%,rgba(243,240,230,0)_70%)]"></div>
                    </div>
                    {/* Rotating Starburst Container */}
                    <div className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] flex items-center justify-center">
                        {/* Video/Image Mask */}
                        <div className="w-full h-full starburst-mask animate-spin-slow bg-black p-1">
                            <div className="w-full h-full bg-primary overflow-hidden relative">
                                <img alt="Gen Z model wearing colorful streetwear fashion" className="w-full h-full object-cover transform scale-150 animate-[spin_12s_linear_infinite_reverse]" data-alt="Gen Z model in colorful streetwear fashion posing dynamically" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjFRT5VtfY7HX5e3jJ5IWILPMMvVCRqXJPvxixL0byB7MQdy4vNgASdZpKOUHMXj8FBgQLOhY5O_3h-pIZwRWzMIyCVosPaAu4mleAMa0ZnhpnnhIB3MxCedTqqsGdwLu_WnKI_8fd7GPy3i1hoBhnuZO1eGzmNto9rieU8oRSyjsOs6VKbfLOtkmg7QN1ufb7dgkhAuS3ZqUQZ2afBtQq-CyJPBVtnFW5XLQYt_giT5DCK3MQM7Z4Rpd9SmbIbwP8es7BFnr605oF" />
                            </div>
                        </div>
                        {/* Floating Sticker 1 */}
                        <div className="absolute top-10 right-10 lg:right-20 lg:top-20 z-20 animate-float rotate-12">
                            <div className="bg-white border border-border-light rounded-2xl px-5 py-3 shadow-md transform rotate-3">
                                <span className="font-bold text-primary text-xl">100% Free</span>
                            </div>
                        </div>
                        {/* Floating Sticker 2 */}
                        <div className="absolute bottom-20 left-4 lg:left-10 z-20 animate-float-delayed -rotate-6">
                            <div className="bg-primary/10 backdrop-blur-sm border border-border-light rounded-2xl px-6 py-4 shadow-md">
                                <span className="font-bold text-primary text-2xl">AI Magic ✨</span>
                            </div>
                        </div>
                        {/* Floating Sticker 3 (Small decoration) */}
                        <div className="absolute top-1/2 left-0 lg:-left-10 z-10 animate-pulse">
                            <span className="material-symbols-outlined text-6xl text-secondary drop-shadow-md">star</span>
                        </div>
                    </div>
                </div>
            </main>
            {/* Hero Marquee */}
            <div className="relative w-full overflow-hidden bg-primary border-y border-border-light py-3 shadow-sm">
                <div className="whitespace-nowrap flex animate-marquee">
                    <span className="mx-4 text-sm font-bold text-white uppercase tracking-wider flex items-center gap-4">
                        QUÉT 3D <span className="text-secondary/50 text-xl">&bull;</span> MIX ĐỒ CỰC CHÁY <span className="text-secondary/50 text-xl">&bull;</span> KHÔNG CẦN RA SHOP <span className="text-secondary/50 text-xl">&bull;</span> QUÉT 3D <span className="text-secondary/50 text-xl">&bull;</span> ĐỊNH HÌNH PHONG CÁCH <span className="text-secondary/50 text-xl">&bull;</span>
                    </span>
                    <span className="mx-4 text-sm font-bold text-white uppercase tracking-wider flex items-center gap-4">
                        QUÉT 3D <span className="text-secondary/50 text-xl">&bull;</span> MIX ĐỒ CỰC CHÁY <span className="text-secondary/50 text-xl">&bull;</span> KHÔNG CẦN RA SHOP <span className="text-secondary/50 text-xl">&bull;</span> QUÉT 3D <span className="text-secondary/50 text-xl">&bull;</span> ĐỊNH HÌNH PHONG CÁCH <span className="text-secondary/50 text-xl">&bull;</span>
                    </span>
                </div>
            </div>
        </>
    );
}

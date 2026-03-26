import React from 'react';

export function AboutUs() {
    return (
        <section id="about-us" className="relative w-full bg-background min-h-screen py-24 px-4 md:px-8 overflow-hidden border-t-[3px] border-ink">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute inset-0 bg-grid-pattern bg-size-[30px_30px] opacity-10 pointer-events-none"></div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="mb-20">
                    <div className="inline-block bg-accent px-4 py-1 border-2 border-ink shadow-hard-sm mb-6 -rotate-1">
                        <span className="font-marker text-white text-xl uppercase tracking-widest">About Us</span>
                    </div>
                    <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-ink uppercase leading-[0.85] tracking-tighter mb-8 drop-shadow-[4px_4px_0_#FFF]">
                        Chúng tôi là<br />
                        <span className="text-primary italic">Outfy</span>
                    </h2>
                    <p className="text-ink/80 text-xl md:text-2xl font-medium max-w-3xl leading-relaxed border-l-4 border-primary pl-6">
                        Outfy là nền tảng AI Stylist kết hợp công nghệ 3D virtual try-on, giúp bạn biết chính xác nên mặc gì, phối đồ hiệu quả và tự tin mua sắm online.
                    </p>
                </div>

                {/* Problems & Solutions Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
                    <div className="bg-white border-[3px] border-ink p-8 shadow-hard hover:-translate-y-1 transition-transform">
                        <h3 className="font-display font-bold text-3xl text-ink uppercase mb-6 flex items-center gap-3">
                            <span className="material-symbols-outlined text-accent text-4xl">warning</span>
                            Vấn đề nan giải
                        </h3>
                        <ul className="space-y-4 text-lg text-ink/70 font-medium">
                            <li className="flex items-start gap-3">
                                <span className="text-accent font-bold">01.</span>
                                <span>Không chắc món đồ có phù hợp với vóc dáng mình không.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-accent font-bold">02.</span>
                                <span>Khó phối đồ mới với những gì đã có trong tủ.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-accent font-bold">03.</span>
                                <span>Tốn quá nhiều thời gian để lựa chọn mỗi ngày.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-primary text-white border-[3px] border-ink p-8 shadow-hard-white hover:-translate-y-1 transition-transform rotate-1">
                        <h3 className="font-display font-bold text-3xl text-white uppercase mb-6 flex items-center gap-3">
                            <span className="material-symbols-outlined text-white text-4xl">auto_fix_high</span>
                            Giải pháp từ Outfy
                        </h3>
                        <p className="mb-6 text-lg opacity-90 leading-relaxed font-body">
                            Chúng tôi kết hợp AI Stylist và công nghệ 3D để trao quyền cho bạn:
                        </p>
                        <div className="grid grid-cols-1 gap-4 font-display font-bold uppercase tracking-tight">
                            <div className="bg-white/20 p-4 border-2 border-white/40 flex items-center gap-3 rounded-sm">
                                <span className="material-symbols-outlined">person_add</span>
                                Tạo avatar theo cơ thể thật
                            </div>
                            <div className="bg-white/20 p-4 border-2 border-white/40 flex items-center gap-3 rounded-sm">
                                <span className="material-symbols-outlined">checkroom</span>
                                Xây dựng tủ đồ số cá nhân
                            </div>
                            <div className="bg-white/20 p-4 border-2 border-white/40 flex items-center gap-3 rounded-sm">
                                <span className="material-symbols-outlined">style</span>
                                Thử đồ & phối outfit ảo
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vision / Mission / Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    <div className="flex flex-col gap-6 p-8 border-2 border-ink bg-secondary/10 rotate-1">
                        <span className="material-symbols-outlined text-5xl text-primary">visibility</span>
                        <h4 className="font-display font-bold text-2xl uppercase text-ink">Tầm nhìn</h4>
                        <p className="text-ink/70 leading-relaxed font-body">
                            Trở thành nền tảng &ldquo;AI wardrobe agent&rdquo; hàng đầu, nơi mỗi người có một stylist cá nhân thông minh.
                        </p>
                    </div>
                    <div className="flex flex-col gap-6 p-8 border-2 border-ink bg-accent/10 -rotate-1">
                        <span className="material-symbols-outlined text-5xl text-accent">flag</span>
                        <h4 className="font-display font-bold text-2xl uppercase text-ink">Sứ mệnh</h4>
                        <p className="text-ink/70 leading-relaxed font-body">
                            Giúp tiết kiệm thời gian, tự tin hơn với phong cách cá nhân và mua sắm đúng ngay từ lần đầu.
                        </p>
                    </div>
                    <div className="flex flex-col gap-6 p-8 border-2 border-ink bg-primary/10 rotate-1">
                        <span className="material-symbols-outlined text-5xl text-secondary">verified_user</span>
                        <h4 className="font-display font-bold text-2xl uppercase text-ink">Giá trị cốt lõi</h4>
                        <ul className="text-sm font-bold uppercase tracking-tighter space-y-1">
                            <li className="flex justify-between border-b border-ink/10 pb-1"><span>Cá nhân hóa</span> <span className="text-primary">Personalization</span></li>
                            <li className="flex justify-between border-b border-ink/10 pb-1"><span>Đơn giản</span> <span className="text-primary">Simplicity</span></li>
                            <li className="flex justify-between border-b border-ink/10 pb-1"><span>Tin cậy</span> <span className="text-primary">Trust</span></li>
                            <li className="flex justify-between border-b border-ink/10 pb-1"><span>Hiệu quả</span> <span className="text-primary">Efficiency</span></li>
                        </ul>
                    </div>
                </div>

                {/* What we are building */}
                <div className="bg-white text-ink p-12 border-4 border-ink shadow-hard mb-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <span className="material-symbols-outlined text-[150px]">architecture</span>
                    </div>
                    <div className="relative z-10 max-w-3xl">
                        <h3 className="font-display font-bold text-4xl uppercase mb-8 leading-tight">
                            Chúng tôi đang xây dựng điều gì?
                        </h3>
                        <p className="text-ink/60 text-xl font-body mb-10 leading-relaxed font-medium">
                            Outfy không chỉ là một ứng dụng thử đồ. Chúng tôi đang xây dựng nền móng cho một hệ thống ra quyết định thời trang tối ưu.
                        </p>
                        <div className="space-y-4">
                            {[
                                "Bạn không còn phải đoán",
                                "Bạn không còn phải thử sai",
                                "Bạn luôn biết điều gì phù hợp với mình"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 bg-ink/5 px-6 py-4 border-2 border-ink hover:bg-secondary transition-all cursor-default">
                                    <span className="text-primary text-2xl">👉</span>
                                    <span className="font-display font-bold text-lg uppercase">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

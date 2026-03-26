import React from 'react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="w-full bg-background-dark py-10 px-4 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start text-left">
                    {/* Left Side: Brand & Socials */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="font-display font-bold text-4xl text-white uppercase mb-4 tracking-tighter">Outfy</h3>
                            <p className="text-gray-400 max-w-md font-medium leading-relaxed">
                                Nền tảng AI Stylist kết hợp công nghệ 3D virtual try-on đầu tiên tại Việt Nam.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                            <Link className="font-display font-bold text-white uppercase tracking-widest hover:text-accent transition-all text-sm border-b border-transparent hover:border-accent" href="/">TikTok</Link>
                            <Link className="font-display font-bold text-white uppercase tracking-widest hover:text-accent transition-all text-sm border-b border-transparent hover:border-accent" href="/">Instagram</Link>
                            <Link className="font-display font-bold text-white uppercase tracking-widest hover:text-accent transition-all text-sm border-b border-transparent hover:border-accent" href="/">Facebook</Link>
                            <Link className="font-display font-bold text-white uppercase tracking-widest hover:text-accent transition-all text-sm border-b border-transparent hover:border-accent" href="/">Discord</Link>
                        </div>
                        <div className="pt-8 border-t border-white/10 mt-4">
                            <h4 className="font-display font-bold text-xl uppercase mb-4 text-white">Công ty TNHH Outfy</h4>
                            <p className="text-gray-500 text-sm leading-relaxed font-medium">
                                © 2026 Bản quyền thuộc Công ty TNHH Outfy. <br />
                                Cấm sao chép dưới mọi hình thức.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Contact Info */}
                    <div className="bg-white/5 border-2 border-white/10 p-8 md:p-10 transition-colors hover:bg-white/10">
                        <h3 className="font-display font-bold text-3xl text-white uppercase mb-8 tracking-tight text-left">Liên hệ</h3>
                        <div className="space-y-8">
                            <div className="flex items-start gap-5">
                                <span className="material-symbols-outlined p-3 bg-secondary border-2 border-ink text-ink shadow-hard-sm">location_on</span>
                                <div>
                                    <p className="font-display font-bold uppercase text-white/40 text-[10px] tracking-widest mb-1">Địa chỉ</p>
                                    <p className="font-bold text-white md:text-lg">S1.07, Vinhomes Grand Park, TP. Thủ Đức, TP. Hồ Chí Minh</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-5">
                                <span className="material-symbols-outlined p-3 bg-primary border-2 border-ink text-white shadow-hard-sm">mail</span>
                                <div>
                                    <p className="font-display font-bold uppercase text-white/40 text-[10px] tracking-widest mb-1">Email</p>
                                    <p className="font-bold text-white md:text-lg">outfyappstylist@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-5">
                                <span className="material-symbols-outlined p-3 bg-accent border-2 border-ink text-white shadow-hard-sm">call</span>
                                <div>
                                    <p className="font-display font-bold uppercase text-white/40 text-[10px] tracking-widest mb-1">Điện thoại</p>
                                    <p className="font-bold text-white md:text-lg">0783 493 991</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

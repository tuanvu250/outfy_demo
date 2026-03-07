import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StickyTech } from './components/StickyTech';
import { Community } from './components/Community';
import { Waitlist } from './components/Waitlist';

export default function GenZLandingPage() {
    return (
        <div className="bg-[#F3F0E6] text-[#0D0D0D] font-body min-h-screen flex flex-col overflow-x-clip selection:bg-[#FD7123] selection:text-white bg-noise">
            <Navbar />
            <Hero />
            <StickyTech />
            <Community />
            <Waitlist />
        </div>
    );
}

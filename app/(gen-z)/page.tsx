import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StickyTech } from './components/StickyTech';
import { Community } from './components/Community';
import { Waitlist } from './components/Waitlist';

export default function GenZLandingPage() {
    return (
        <div className="bg-background text-text-primary font-body min-h-screen flex flex-col overflow-x-clip">
            <Navbar />
            <Hero />
            <StickyTech />
            <Community />
            <Waitlist />
        </div>
    );
}

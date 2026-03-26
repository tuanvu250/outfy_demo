import React from 'react';
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { StickyTech } from "./components/StickyTech";
import { Community } from "./components/Community";
import { Waitlist } from "./components/Waitlist";
import { AboutUs } from "./components/AboutUs";
import { Footer } from "./components/Footer";

export default function GenZLandingPage() {
    return (
        <div className="bg-background text-ink selection:bg-accent selection:text-white font-body selection:shadow-hard-sm">
            <Navbar />
            <Hero />
            <StickyTech />
            <AboutUs />
            <Waitlist />
            <Footer />
        </div>
    );
}

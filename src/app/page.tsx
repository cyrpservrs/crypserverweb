"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HowItWorks from "@/components/sections/HowItWorks";
import Servers from "@/components/sections/Servers";
import Features from "@/components/sections/Features";
import RoadmapTokenomics from "@/components/sections/RoadmapTokenomics";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <Servers />
        <Features />
        <RoadmapTokenomics />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

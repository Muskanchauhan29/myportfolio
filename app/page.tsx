"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useState } from "react";
import GlassToggle from "@/components/GlassToggle";

export default function Home() {
  const [glass, setGlass] = useState(false);
  return (
    <main style={{ background: "#0a0805" }}>
      <Navbar />
      <Hero />
      <About />
        <Skills glass={glass} />
      <Projects glass={glass} />
      <Experience />
      <Certifications />
       <Contact glass={glass} />
       <GlassToggle onToggle={setGlass} />
      <Footer />
    </main>
  );
}
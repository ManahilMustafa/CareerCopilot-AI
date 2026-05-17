"use client";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Features from "@/components/features";
import HowItWorks from "@/components/how-it-works";
import Testimonials from "@/components/testimonials";
import Footer from "@/components/footer";
import ResumeUpload from "@/components/resume-upload";
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Features />
         <HowItWorks />
         <Testimonials />
         <Footer />
    </main>
  );
}
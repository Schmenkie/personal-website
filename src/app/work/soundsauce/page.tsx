import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { CaseTopBar, CaseNextUp } from "@/components/case-nav";
import { Footer } from "@/components/footer";
import { SoundSauceCase } from "@/components/soundsauce-case";

export const metadata: Metadata = {
  title: "SoundSauce · Case Study · Spencer Curnow",
  description:
    "How I built SoundSauce, a full-stack SaaS that turns any audio clip into a Vital synth preset: stem separation, AI instrument detection, Web Audio analysis, and Stripe billing.",
};

export default function SoundSauceCasePage() {
  return (
    <>
      <Navbar />
      <main>
        <CaseTopBar />
        <SoundSauceCase />
        <CaseNextUp current="soundsauce" />
      </main>
      <Footer />
    </>
  );
}

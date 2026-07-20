import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { WorkIndex } from "@/components/work-index";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Work · Spencer Curnow",
  description:
    "Shipped products, client design, and automation: Sleeve, Dogleg, SoundSauce, Yurr Magazine, and the tools behind them. All real, all built by Spencer Curnow.",
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main>
        <WorkIndex />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

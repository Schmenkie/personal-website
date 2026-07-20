import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { Stats } from "@/components/stats";
import { About } from "@/components/about";
import { Approach } from "@/components/approach";
import { Journey } from "@/components/journey";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SelectedWork />
        <Stats />
        <About />
        <Approach />
        <Journey />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

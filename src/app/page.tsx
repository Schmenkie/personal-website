import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { About } from "@/components/about";
import { FeaturedSleeve } from "@/components/featured-sleeve";
import { Magazine } from "@/components/magazine";
import { FeaturedProject } from "@/components/featured-project";
import { Projects } from "@/components/projects";
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
        <FeaturedSleeve />
        <Magazine />
        <FeaturedProject />
        <Stats />
        <Projects />
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

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { About } from "@/components/about";
import { FeaturedProject } from "@/components/featured-project";
import { Projects } from "@/components/projects";
import { Approach } from "@/components/approach";
import { Skills } from "@/components/skills";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <FeaturedProject />
        <Projects />
        <Approach />
        <Skills />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

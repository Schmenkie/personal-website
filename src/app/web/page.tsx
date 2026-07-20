import type { Metadata } from "next";
import { WebLanding } from "@/components/web-landing";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Websites for Local Businesses · Spencer Curnow",
  description:
    "Fast, mobile-first websites for local businesses that turn Google searches into phone calls. Free mockup, live in about a week, one clear price.",
  openGraph: {
    title: "Websites for Local Businesses · Spencer Curnow",
    description:
      "Fast, mobile-first websites that turn searches into phone calls. Free mockup, no obligation.",
    type: "website",
  },
};

export default function WebServicesPage() {
  return (
    <>
      <WebLanding />
      <Footer />
    </>
  );
}

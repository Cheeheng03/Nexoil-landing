import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import WhoWeAre from "@/components/sections/WhoWeAre";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Industries from "@/components/sections/Industries";
import ContactCTA from "@/components/sections/ContactCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <div className="relative z-10 bg-white" style={{ marginBottom: "var(--footer-height, 380px)" }}>
        <Navbar />
        <Hero />
        <WhoWeAre />
        <Industries />
        <Stats />
        <Services />
        <ContactCTA />
      </div>

      <Footer />
    </>
  );
}

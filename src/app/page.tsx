import Hero from "@/components/Hero";
import FeaturesList from "@/components/FeaturesList";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <Hero />
      <FeaturesList />
      <Testimonials />
      <FAQ />
      <CallToAction />
    </div>
  );
}






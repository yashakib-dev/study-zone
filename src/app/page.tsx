import Hero from "@/components/homepage/Hero";
import FeaturesList from "@/components/homepage/FeaturesList";
import Testimonials from "@/components/homepage/Testimonials";
import FAQ from "@/components/homepage/FAQ";
import CallToAction from "@/components/homepage/CallToAction";

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






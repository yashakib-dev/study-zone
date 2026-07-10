import Hero from "@/components/Hero";
import FeaturesList from "@/components/FeaturesList";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <Hero />
      <FeaturesList />
      <Testimonials />
    </div>
  );
}




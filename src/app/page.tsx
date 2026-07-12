import Hero from "@/components/homepage/Hero";
import FeaturesList from "@/components/homepage/FeaturesList";
import FeaturedResources from "@/components/homepage/FeaturedResources";
import StatisticsChart from "@/components/homepage/StatisticsChart";
import RecentAuthors from "@/components/homepage/RecentAuthors";
import Testimonials from "@/components/homepage/Testimonials";
import FAQ from "@/components/homepage/FAQ";
import CallToAction from "@/components/homepage/CallToAction";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <Hero />
      <FeaturedResources />
      <StatisticsChart />
      <RecentAuthors />
      <FeaturesList />
      <Testimonials />
      <FAQ />
      <CallToAction />
    </div>
  );
}






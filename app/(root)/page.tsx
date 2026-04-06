import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";

export default function HomePage() {
  return (
    <main className="bg-white dark:bg-[#0b1120]">
      <HeroSection />
      <CategorySection />
      <FeaturedProductsSection />
      <WhyChooseUsSection />
    </main>
  );
}
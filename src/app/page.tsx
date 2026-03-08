import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedBooks from "@/components/FeaturedBooks";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import { getCarouselItems, getFeaturedBooks } from "@/lib/actions";

export default async function Home() {
  const carouselItems = await getCarouselItems();
  const featuredBooks = await getFeaturedBooks();

  return (
    <main className="relative min-h-screen bg-[#0a191f]">
      <Navbar />
      <Hero items={carouselItems} />
      <FeaturedBooks books={featuredBooks} />
      <QuoteSection />
      <Footer />
    </main>
  );
}

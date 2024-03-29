import AllDives from "@/components/AllDives";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HighlightedDestinations from "@/components/HighlightedDestinations";
import HomeHero from "@/components/HomeHero";

export default function Home() {
  return (
    <main>
      <Header />
      <HomeHero />
      <HighlightedDestinations />
      <AllDives />
      <Footer />
    </main>
  );
}

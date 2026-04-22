import { GamesCatalog } from "@/components/GamesCatalog/GamesCatalog";
import { Header } from "@/components/Header/Header";
import { HeroCarousel } from "@/components/HeroCarousel/HeroCarousel";
import { NewTrending } from "@/components/NewTrending/NewTrending";
import { getAllGames, getFeaturedGames, getPageSize } from "@/lib/gameRepository";
import styles from "./page.module.css";

export const dynamic = "force-static";

export default function Home() {
  const allGames = getAllGames();
  const featuredGames = getFeaturedGames();
  const pageSize = getPageSize();

  return (
    <main className={styles.home}>
      <div className={styles["home__shell"]}>
        <Header />
        <HeroCarousel games={featuredGames} />
        <NewTrending />
        <GamesCatalog allGames={allGames} pageSize={pageSize} />
      </div>
    </main>
  );
}

import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.logo}>
        <Image src="/logo.svg" width={250} height={250} alt="Star Wars logo" />
      </div>

      <Link
        href="/characters"
        className={styles.peopleSide}
        aria-label="Search Star Wars Characters"
      >
        <p className={styles.title}>Characters</p>
      </Link>

      <Link
        href="/movies"
        className={styles.moviesSide}
        aria-label="Search Star Wars Movies"
      >
        <p className={styles.title}>Movies</p>
      </Link>
    </main>
  );
}

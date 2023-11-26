"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./pageToggle.module.css";

export default function PageToggle() {
  const pathname = usePathname();

  return (
    <nav className={styles.toggle}>
      <Link
        href="/characters"
        className={`link ${
          pathname === "/characters" ? styles.active : styles.toggle
        }`}
      >
        Characters
      </Link>
      <span> | </span>
      <Link
        href="/movies"
        className={`${styles.toggle} ${
          pathname === "/movies" && styles.active
        }`}
      >
        Movies
      </Link>
    </nav>
  );
}

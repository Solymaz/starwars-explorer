import styles from "./card.module.css";

export default function Card({ title }) {
  return (
    <article className={styles.card}>
      <h2 className={styles.cardTitle}>{title}</h2>
    </article>
  );
}

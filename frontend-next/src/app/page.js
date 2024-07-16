'use client'
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
      <main className={styles.main}>
        <div className="App">
          <Link href="/groups">link</Link>

          <p>ben</p>

          <Link href={"/pages/login"}>link</Link>
        </div>
      </main>
  );
}

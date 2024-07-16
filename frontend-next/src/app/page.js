'use client'
import "./globals.css";
import Link from "next/link";

export default function Home() {
  return (
      <main >
        <div className="App">
          <Link href="/groups">link</Link>
        </div>
      </main>
  );
}

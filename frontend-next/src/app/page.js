'use client'
import Link from "next/link";
import "./globals.css";
import style from './page.module.css'

export default function Home() {
  return (
    <main >
      <div className={style.outter}>
        <h5 className={style.subtitle}>ERSTELLE DEIN KOCHBUCH</h5>
        <h1 className={style.title}>Bibliothek der Geschmäcker</h1>
        
        <div className={style.text}>
          <p>Möchtest du deine Kochbücher bequem auf dem Sofa verwalten?</p>
          <p>Regestriere dich <Link className="link" href={"/register"}>hier</Link> um damit zu starten.</p>
        </div>
        <div className={style.image}>
          <img src="https://cdn-icons-png.flaticon.com/512/3839/3839530.png" />
        </div>
      </div>
      
    </main>
  );
}

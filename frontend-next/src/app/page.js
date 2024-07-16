'use client'
import Link from "next/link";
import "./globals.css";
import style from './page.module.css'

export default function Home() {
  return (
    <main >
      <div className="App">
        <h1 className={style.title}>Bibliothek der Geschmäker</h1>
        <h5 className={style.subtitle}>ERSTELLE DEIN KOCHBUCH</h5>
        <div className={style.text}>
          <p>Möchtest du deine Kochbücher bequem auf dem Sofa verwalten?</p>
          <p>Regestriere dich <Link className={style.link} href={"/register"}>hier</Link> um damit zu starten.</p>
        </div>
        <div className={style.image}>
          <img src="https://cdn-icons-png.flaticon.com/512/3839/3839530.png" />
        </div>
        <h5 className={style.subtitle2}>Fühle dich wie ein Chefkoch mit der Bibliothek der Geschmäker</h5>
      </div>
      
    </main>
  );
}

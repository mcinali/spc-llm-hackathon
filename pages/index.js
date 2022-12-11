import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>SPC LLM Hackathon</title>
        <link rel="icon" href="/code_logo.png" />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.left}>
            <h3>Home</h3>
          </div>
          <div className={styles.right}>
            <img src="/upload.png" className={styles.icon} />
            <img src="/notification.png" className={styles.icon} />
            <img src="/user.png" className={styles.icon} />
          </div>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}

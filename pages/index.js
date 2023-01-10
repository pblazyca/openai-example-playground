import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [promptInput, setPromptInput] = useState("");
  const [tempInput, setTempInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: promptInput, temp: tempInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setPromptInput("");
      setTempInput(0.9);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>OpenAI prompt playground</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="Enter a prompt"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <input
            type="text"
            name="temp"
            placeholder="Enter a prompt temp"
            value={tempInput}
            onChange={(e) => setTempInput(e.target.value)}
          />
          <input type="submit" value="Generate completion" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}

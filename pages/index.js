import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { interview1, interview2 } from "../data/userInterview";
import { stringToMultiLineHTML } from "../utilities";

class Message {
  constructor(prompter, message) {
    this.prompter = prompter;
    this.message = message;
  }
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    setMessages(messages + [new Message(true, prompt)]);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });
    const data = await response.json();
    setMessages(messages + [new Message(false, data.result)]);
    setPrompt("");
  }

  return (
    <div>
      <Head>
        <title>SPC LLM Hackathon</title>
        {/* <link rel="icon" href="/code_logo.png" /> */}
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.left}>
            <h3>Recap</h3>
          </div>
          <div className={styles.right}>
            <img src="/upload.png" className={styles.icon} />
            <img src="/notification.png" className={styles.icon} />
            <img src="/user.png" className={styles.icon} />
          </div>
        </header>

        <div className={styles.panelBody}>
          <div className={styles.panel}>
            <h4>Transcript</h4>
            <div className={styles.scrollable}>
              {stringToMultiLineHTML(interview1)}
            </div>
          </div>
          <div className={styles.panel}>
            <h4 style={{ "textAlign": "center" }}>Chat</h4>
            <div className={styles.scrollable}>
              <div className={styles.messages}>
                {/* {messages.map((x, index) => <div key={index.toString()}>x.message</div>)} */}
              </div>
            </div>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="animal"
                placeholder="Ask a question here"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <input type="submit" value=">" />
            </form>
          </div>
        </div>
      </main >
    </div >
  );
}

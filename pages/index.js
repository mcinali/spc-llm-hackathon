import Head from "next/head";
import { useEffect, useState, useRef } from "react";
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
  const [promptSubmitted, setPromptSubmitted] = useState(false);
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);
  const prompt1 = "What were some key insights from the interview?";
  const prompt2 = "How can we improve the app moving forward?";
  const prompt3 = "What is the overall sentiment?";

  async function submitPrefilledPrompt(value) {
    setMessages(prevMessages => [...prevMessages, new Message(true, value)]);
    setPrompt(value);
    setPromptSubmitted(true);
  }

  async function onSubmit(event) {
    event.preventDefault();
    setMessages(prevMessages => [...prevMessages, new Message(true, prompt)]);
    setPromptSubmitted(true);
  }

  useEffect(async () => {
    if (promptSubmitted) {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });
      const data = await response.json();
      setMessages(prevMessages => [...prevMessages, new Message(false, data.result)]);
      setPromptSubmitted(false);
      setPrompt("");
    }
  }, [promptSubmitted, prompt])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
              <div className={styles.messagePromptContainer}>
                <div className={styles.messagePrompt}>Ask anything to get insights. Here are some suggested questions to get started:</div>
                <button className={styles.messagePromptButton} onClick={function () { submitPrefilledPrompt(prompt1) }}>{prompt1}</button>
                <button className={styles.messagePromptButton} onClick={function () { submitPrefilledPrompt(prompt2) }}>{prompt2}</button>
                <button className={styles.messagePromptButton} onClick={function () { submitPrefilledPrompt(prompt3) }}>{prompt3}</button>
              </div>
              {messages.map((x, index) =>
                <div className={styles.messageContainer} key={index.toString()}>
                  {x.prompter ? <div className={styles.messageIcon} style={{ "backgroundColor": "#f7dee9" }}>K</div> : <div className={styles.messageIcon}></div>}
                  <div className={styles.message}>{x.message}</div>
                </div>)}
              <div ref={bottomRef} />
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

import { useEffect, useState, useRef } from "react";
import styles from "./App.module.css";
import axios from "axios";

const App = () => {
  const [backendData, setData] = useState();
  const [link, setLink] = useState("");
  const [copyClicked, setClicked] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const shortUrlRef = useRef(null);

  useEffect(() => {
    const newLink = { link: link };

    axios
      .post("http://localhost:3000/api", newLink)
      .then((response) => {
        console.log("Reponse pulled successfully...");
        console.log(response.data);
        setData(response.data);
        shortUrlRef.current.value = response.data;
      })
      .catch((error) => {
        inputRef.current.value = "";
        console.log(error.message);
        setError(error.message);
        setTimeout(() => setError(""), 2000);
      });
  }, [link]);

  const handleCopy = () => {
    navigator.clipboard.writeText(backendData);
    shortUrlRef.current.value = "";
    inputRef.current.value = "";
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLink(inputRef.current.value);
            }}
          >
            <div className={styles.urlContainer}>
              <input type="text" ref={inputRef} />
              <button type="submit" className={styles["submit-btn"]}>
                Shorten URL
              </button>
              {error && <p>Please enter a valid url</p>}
            </div>
          </form>
          <div className={styles.copyContainer}>
            <input type="text" ref={shortUrlRef} />
            <button className={styles["copy-btn"]} onClick={handleCopy}>
              {copyClicked ? "✅ copied" : "copy"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

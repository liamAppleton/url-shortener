import { useEffect, useState, useRef } from "react";
import styles from "./App.module.css";
import axios from "axios";

const App = () => {
  const [backendData, setData] = useState();
  const [link, setLink] = useState("");
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
        shortUrlRef.current.value = response.data.shortUrl;
      })
      .catch((error) => console.log(error.message));
  }, [link]);

  return (
    <>
      {backendData && <p key={backendData._id}>{backendData.shortUrl}</p>}
      <div className={styles.container}>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLink(inputRef.current.value);
            }}
          >
            <input type="text" ref={inputRef} />
            <button type="submit" className={styles["submit-btn"]}>
              Shorten URL
            </button>
            <input type="text" ref={shortUrlRef} />
          </form>
        </div>
        <button className={styles["copy-btn"]}>copy</button>
      </div>
    </>
  );
};

export default App;

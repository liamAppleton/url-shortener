import { useEffect, useState, useRef } from "react";
import styles from "./App.module.css";
import axios from "axios";

const App = () => {
  const [backendData, setData] = useState();
  const [link, setLink] = useState("");
  const inputRef = useRef(null);

  // placeholder, needs amending to pass correct data
  // useEffect(() => {
  //   fetch(`http://localhost:3000/api/${_id}`)
  //     .then((response) => response.json())
  //     .then((response) => setData(response))
  //     .catch((error) => console.log("Error", error));
  // }, []);

  useEffect(() => {
    const newLink = { link: link };

    axios
      .post("http://localhost:3000/api", newLink)
      .then((response) => {
        console.log("Reponse pulled successfully...");
        console.log(response.data);
        setData(response.data);
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
          </form>
        </div>
        <button className={styles["copy-btn"]}>copy</button>
      </div>
    </>
  );
};

export default App;

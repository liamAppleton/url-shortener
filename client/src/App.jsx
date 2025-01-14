import { useState } from "react";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.container}>
      <div>
        <form>
          <input type="text" />
        </form>
        <button type="submit" className={styles["submit-btn"]}>
          Shorten URL
        </button>
      </div>
      <button className={styles["copy-btn"]}>copy</button>
    </div>
  );
};

export default App;

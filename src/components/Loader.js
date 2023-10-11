import React from "react";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles["modal hide"]}>
      <div className={styles["loader-dual-ring"]}></div>
    </div>
  );
}

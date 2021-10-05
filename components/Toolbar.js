import React from "react";
import styles from "../styles/Toolbar.module.css";

function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <div className={styles.buttongroup}>
        <button>Edit (2)</button>
        <button>Clear (10)</button>
        <button>Move (30)</button>
      </div>
      <div className={styles.bpmrange}>
        <input type="range" min="50" max="180" />
        <span>search song by bpm:</span>
      </div>
      <div className={styles.searchform}>
        <input type="text" placeholder="search...." />
      </div>
    </div>
  );
}

export { Toolbar };

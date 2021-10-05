import { Fragment } from "react";
import styles from "../styles/Card.module.css";
import { AudioPlayer } from "./AudioPlayer";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiPlay } from "react-icons/fi";

function Artist({ artist }) {
  return (
    <Fragment>
      <div className={styles.card}>
        <div className={styles.image_info}>
          <img src="/album-cover.jpeg" />
          <div className={styles.ratings}>
            <BsStar size="2em" color="#9b4347" />
          </div>
          <div className={styles.playbutton}>
            {<FiPlay color="#fff" size="5em" />}
          </div>
        </div>
        <div className={styles.artist_info}>
          <h3 className={styles.title}>{artist.title}</h3>
          <p className={styles.features}>
            Feat: <a href="#">Nas</a>, <a href="#">DMX</a>,{" "}
            <a href="#">Beyonce</a>
          </p>
          <p className={styles.year}>{artist.year}</p>
          <h4 className={styles.artist}>{artist.artist}</h4>
          <p className={styles.bpm}>
            <span>bpm</span>
            {artist.bpm}
          </p>
          <div className={styles.genre}>genre: {artist.genre}</div>
          <div className={styles.tags}>
            <span>tags:</span>
            <span>{artist.tags}</span>
          </div>
          <div className={styles.path_info}>
            Current Path: <a href="">{artist.path}</a>
          </div>

          <div className={styles.buttons}>
            <button>Edit</button>
            <button>Remove</button>
            <button>Move File</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export { Artist };

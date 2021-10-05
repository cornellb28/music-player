import React, { Fragment } from "react";
import artists from "../artistDB.json";
import { Artist } from "./Artist";
import styles from "../styles/Card.module.css";

function ArtistList() {
  return (
    <Fragment>
      <div className={styles.list_container}>
        {artists.map((artist) => (
          <Artist key={artist._id} artist={artist} />
        ))}
      </div>
    </Fragment>
  );
}

export { ArtistList };

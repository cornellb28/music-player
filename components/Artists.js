import React, { Fragment } from "react";
import { ArtistList } from "./ArtistList";
import { Toolbar } from "./Toolbar";

export default function Artists() {
  return (
    <Fragment>
      <Toolbar />
      <ArtistList />
    </Fragment>
  );
}

import React, { Fragment } from "react";
import Artists from "./Artists";
import Layout from "./Layout";

export default function App() {
  return (
    <Layout startingTheme="light">
      <Artists />
    </Layout>
  );
}

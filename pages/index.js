import { Fragment } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import App from "../components/App";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </Fragment>
  );
}
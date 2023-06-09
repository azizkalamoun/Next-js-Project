import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";

export default function Home({ pizzaList, admin }) {
 
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best pizza shop in town" />
      
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500&family=Montserrat:wght@300&display=swap" rel="stylesheet"></link>
      </Head>
      <Featured />
      <PizzaList pizzaList={pizzaList} />
      
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};

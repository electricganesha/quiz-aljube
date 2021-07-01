import  React from 'react';
import Head from "next/head";
import Footer from '../components/Footer';
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <React.Fragment>
    <Head>
        <title>Quem Quer Ter Liberdade</title>
        <meta name="description" content="Quem Quer Ter Liberdade - Quiz" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
    <Footer />
    </React.Fragment>;
}

export default MyApp;

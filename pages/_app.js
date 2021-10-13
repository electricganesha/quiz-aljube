import React, { useState } from 'react';
import Router from 'next/router'
import Head from "next/head";
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {

  const [isLoading, setIsLoading] = useState(false);

  Router.events.on('routeChangeStart', () => {
    setIsLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setIsLoading(false);
  });

  return <React.Fragment>
    <Head>
      <title>A Liberdade N&atilde;o &Eacute; Um Quiz</title>
      <meta name="description" content="A Liberdade N&atilde;o &Eacute; Um Quiz" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {isLoading ? <Spinner /> :
      <Component {...pageProps} />
    }
    <Footer />
  </React.Fragment>;
}

export default MyApp;

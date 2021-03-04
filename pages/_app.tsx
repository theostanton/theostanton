import { AppProps } from "next/app"
import Head from "next/head"
import React from "react"
import { theme } from "../styles/theme"

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Theo Stanton</title>
      <script async defer data-domain="staging.theo.dev" src="https://plausible.io/js/plausible.js"/>
    </Head>
    <style global jsx>{`
      html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div {
        height: 100%;
        margin: 0;
        background-color:${theme.beige};
      }
    `}</style>

    <Component {...pageProps} />
  </>
}

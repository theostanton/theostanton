import { AppProps } from "next/app"
import Head from "next/head"
import React from "react"
import { theme } from "../styles/theme"

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Theo Stanton</title>
      <script async defer data-domain="staging.theo.dev" src="https://plausible.io/js/plausible.js" />
      <meta property="title" content="Theo Stanton" key="title" />
      <meta name="title" content="Meta Tags — Preview, Edit and Generate" />
      <meta name="description" content="Engineer" />
      <meta name="og:description" content="Engineer" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Theo Stanton" key="title" />
    </Head>
    <style global jsx>{`
      html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div {
        height: 100%;
        margin: 0;
        background-color: ${theme.beige};
      }
    `}</style>

    <Component {...pageProps} />
  </>
}

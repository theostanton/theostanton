import { AppProps } from "next/app"
import Head from "next/head"
import React from "react"
import { theme } from "../styles/theme"

export default function App({ Component, pageProps }: AppProps) {
  return <html lang={"en"}>
  <Head>
    <title>Theo Stanton</title>
    <link rel="shortcut icon" href="/static/favicon.png" />
    <meta property="title" content="Theo Stanton" key="title" />
    <meta name="title" content="Meta Tags — Preview, Edit and Generate" />
    <meta name="description" content="Engineer" />
    <meta name="og:description" content="Engineer" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Theo Stanton" key="title" />
  </Head>
  <style>{`
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
  </html>
}

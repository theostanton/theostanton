import { AppProps } from "next/app"
import React from "react"

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <style global jsx>{`
      html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div {
        height: 100%;
        margin: 0;
        background-color: #f7f1e0;
      }
    `}</style>
    <Component {...pageProps} />
  </>
}

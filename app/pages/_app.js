import "../styles/globals.css";
import '/styles/normalize.css'
import '/styles/moov.scss'
import Block from '/components/Common/Element/Block'
import styled from "styled-components";
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Tracking from '/components/Tracking'
import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig();
const { APP_URL } = publicRuntimeConfig;

const StyledContainer = styled(Block)`
  &.noanimation * {
    animation: none !important;
  }
`

function MyApp(ctx) {
  const { Component, pageProps } = ctx
  const [h, setH] = useState(0)


  useEffect(() => {
    setH(window.innerHeight)
    addEventListener("resize", () => setH(window.innerHeight));
  }, [])
  return (
    <>
      <Head>
        <title>2022 MOOV 音樂之旅</title>
        <meta property="og:title"  content="2022 MOOV 音樂之旅"/>
        <meta property="og:image"  content={`${APP_URL}/assets/jpg/og.jpeg`} />
        <meta property="og:site_name"  content="MOOV"/>
        <meta property="og:description"  content="立即與小粉團一起展開2022 MOOV音樂之旅，並與好友分享你的年度音樂報告吧！"/>
      </Head>
      <Tracking />
      <StyledContainer className="web-container">
        <Component {...pageProps} h={h} />
      </StyledContainer>
    </>
  );
}

export default MyApp;

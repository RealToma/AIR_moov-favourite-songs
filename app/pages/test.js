import Block from "/components/Common/Element/Block";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import imgBackData from "./assets/images/Back/back01.png";
import imgBack03 from "./assets/images/Back/imgBack02.png";
import imgTrainInside01 from "./assets/images/Back/trainInsideText.png";
import imgCharacter01 from "./assets/images/Back/Character01.png";
import imgCharacter02 from "./assets/images/Back/Character02.png";
import imgChair01 from "./assets/images/Back/chair01.png";
import imgBack01 from "./assets/images/Back/northern.png";
// import imgTrees01 from "./assets/images/Stop04/trees.png";
// import imgAdvertising01 from "./assets/images/Stop04/Adversiting01.png";
import { BsFacebook } from "react-icons/bs";
import find from "lodash/find";
import map from "lodash/map";
import get from "lodash/get";
import getConfig from "next/config";
import Image from "next/image";

const { publicRuntimeConfig } = getConfig();
const { APP_URL } = publicRuntimeConfig;

const Test = (props) => {
  return (
    <Block>
      
    </Block>
  )
}

export default Test

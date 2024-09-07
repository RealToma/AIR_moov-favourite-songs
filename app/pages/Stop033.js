import Block from "/components/Common/Element/Block";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import imgCharacterGood01 from "./assets/images/Back/CharacterGood01.png";
import imgBackData from "./assets/images/Back/back01.png";
import imgSheep01 from "./assets/images/Stop03/sheep01.png";
import imgSheep02 from "./assets/images/Stop03/sheep02.png";
import { FiArrowRight } from "react-icons/fi";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import imgBack02 from "./assets/images/Stop03/back01.png";
import imgBack03 from "./assets/images/Stop03/back02.png";
import find from "lodash/find";
import get from "lodash/get";
import getConfig from "next/config";
import Image from "next/image";

const { publicRuntimeConfig } = getConfig();
const { APP_URL } = publicRuntimeConfig;

const Stop033 = (props) => {
  const { stopData, next, query, updateImage, shareCallback } = props;
  const uid = get(query, "uid");
  const data = find(stopData, (data) => data.key === "mdl_4_2");
  const [displayImage, setDisplayImage] = useState(data?.refactorData?.image);

  return (
    <StyledComponent>
      <BoxMain01>
        {/* <ImgBack02>
          <img src={imgBack02.src} width={"100%"} height={"100%"} alt="" />
        </ImgBack02>
        <ImgBack03>
          <img src={imgBack03.src} width={"100%"} height={"100%"} alt="" />
        </ImgBack03>
        <ImgSheep01>
          <img src={imgSheep01.src} width={"100%"} height={"100%"} alt="" />
        </ImgSheep01>
        <ImgSheep02>
          <img src={imgSheep02.src} width={"100%"} height={"100%"} alt="" />
        </ImgSheep02> */}

        <ImgMascot className="mascot">
          <img
            src={imgCharacterGood01.src}
            width={"100%"}
            height={"100%"}
            alt=""
          />
        </ImgMascot>

        <BoxUp01>
          <TextUp01>
            <Text02>
              喺今年中秋節，
              <br />
              你係咪同屋企人一齊成日聽...
            </Text02>
          </TextUp01>
          <ImgCenter02>
            <Block width="100%" height="100%">
              <Image
                src={displayImage}
                priority={true}
                alt=""
                layout="responsive"
                width="500"
                height="500"
                onError={() => {
                  setDisplayImage(
                    "/fansreport/2022/assets/png/placeholder-cover.png"
                  );
                }}
              />
            </Block>
          </ImgCenter02>
          <TextGroup01>
            <TextTitle01>{data?.refactorData?.label || ""}</TextTitle01>
          </TextGroup01>
        </BoxUp01>
        <ButtonGroup01>
          <LinkButtonGroup01>
            <ButtonGroupSocial01>
              {/* <ButtonSocial01 mr={"20px"}>
                <BsInstagram />
              </ButtonSocial01> */}
              <ButtonSocial01>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `${APP_URL}?uid=${uid}`
                  )}`}
                  target="_blank"
                >
                  <BsFacebook onClick={() => shareCallback("share")} />
                </a>
              </ButtonSocial01>
            </ButtonGroupSocial01>
            <TextShare01>Share</TextShare01>
            <Block bg="black" color="white" onClick={updateImage}>
              download
            </Block>
          </LinkButtonGroup01>
          <ButtonNext01
            onClick={() => {
              // router.push("/Stop041");
              next();
            }}
          >
            <FiArrowRight />
            <TextButton01>下一站</TextButton01>
          </ButtonNext01>
        </ButtonGroup01>
      </BoxMain01>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 428px;
  max-width: 428px;
  height: 100%;
  justify-content: center;
  /* background: #a5e4d0; */
`;

const BoxMain01 = styled(Box)`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* background-image: url(${imgBackData.src});
  background-size: 120% 120%;
  background-position: center;
  background-repeat: no-repeat; */
  background-color: #84C1BA;
  opacity: 1;
  background-image: linear-gradient(0deg, #84C1BA 50%, #76B0B3 50%);
  background-size: 15px 15px;
  /* background: #baaf1b; */
  animation: secondEventAnimation01 1s;
  @keyframes secondEventAnimation01 {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`;

const ImgSheep02 = styled(Box)`
  display: flex;
  position: absolute;
  width: 165px;
  right: 105px;
  bottom: 0px;
  animation: eventImgSheep02 2s;
  @keyframes eventImgSheep02 {
    0% {
      opacity: 0;
    }
    70% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ImgCenter02 = styled(Box)`
  display: flex;
  position: relative;
  width: 220px;
  margin-top: 20px;
  > img {
    z-index: 22;
    animation: eventCenterImage01 3s;
    @keyframes eventCenterImage01 {
      0% {
        opacity: 0;
      }
      70% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
  transition: 0.5s;
  @media (max-width: 420px) {
    width: 200px;
  }
  @media (max-width: 390px) {
    width: 190px;
  }
  @media (max-width: 350px) {
    width: 180px;
  }
  @media (max-width: 320px) {
    width: 170px;
  }
`;

const TextTitle01 = styled(Box)`
  display: flex;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  letter-spacing: 0.04em;

  color: #2d1d26;
  display: flex;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  line-height: 36px;
  text-align: center;
  letter-spacing: 0.04em;

  color: #1f344f;

  transition: 0.5s;
  @media (max-width: 420px) {
    font-size: 28px;
  }
  @media (max-width: 390px) {
    font-size: 26px;
  }
  @media (max-width: 350px) {
    font-size: 24px;
  }
  @media (max-width: 320px) {
    font-size: 22px;
  }
`;

const TextGroup01 = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;

  animation: eventTextGroup01 3.5s;
  @keyframes eventTextGroup01 {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Text02 = styled(Box)`
  display: flex;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.04em;

  /* White */

  color: #ffffff;
  white-space: nowrap;
  margin-top: 20px;
  transition: 0.5s;
  @media (max-width: 420px) {
    font-size: 17px;
  }
  @media (max-width: 390px) {
    font-size: 16px;
    margin-top: 10px;
  }
  @media (max-width: 350px) {
    font-size: 15px;
  }
  @media (max-width: 320px) {
    font-size: 14px;
  }
`;

const ImgSheep01 = styled(Box)`
  display: flex;
  position: absolute;
  width: 145px;
  left: 35px;
  bottom: 130px;
  animation: eventImgSheep01 2s;
  @keyframes eventImgSheep01 {
    0% {
      opacity: 0;
    }
    70% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ButtonGroup01 = styled(Box)`
  display: flex;
  width: 100%;
  padding: 20px 35px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 25;
  animation: eventButtonGroup01 4s;
  @keyframes eventButtonGroup01 {
    0% {
      opacity: 0;
    }
    70% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const LinkButtonGroup01 = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const ButtonNext01 = styled(Box)`
  display: flex;
  position: relative;
  width: 46px;
  height: 46px;
  border-radius: 100%;
  background-color: white;
  color: black;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 2rem;
`;

const TextButton01 = styled(Box)`
  display: flex;
  position: absolute;
  bottom: -30px;
  white-space: nowrap;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */
  text-align: center;
  color: #ffffff;
`;

const ButtonGroupSocial01 = styled(Box)`
  display: flex;
  align-items: center;
`;

const ButtonSocial01 = styled(Box)`
  display: flex;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
`;

const TextShare01 = styled(Box)`
  display: flex;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;

  color: #ffffff;
  margin-top: 10px;
`;

const TextUp01 = styled(Box)`
  display: flex;
  animation: eventTextUp01 2s;
  @keyframes eventTextUp01 {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ImgBack02 = styled(Box)`
  display: flex;
  position: absolute;
  left: 0px;
  bottom: 0px;
  animation: eventImgBack02 1.5s;
  @keyframes eventImgBack02 {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`;

const ImgBack03 = styled(Box)`
  display: flex;
  position: absolute;
  left: 0px;
  bottom: 0px;
  animation: eventImgBack03 1.5s;
  @keyframes eventImgBack03 {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`;

const BoxUp01 = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 23;
`;

const ImgMascot = styled(Box)`
  display: flex;
  position: absolute;
  width: 200px;
  left: 50%;
  transform: translateX(-50%);
  bottom: -20px;

  transition: 0.5s;
  @media (max-width: 420px) {
    width: 180px;
  }
  @media (max-width: 390px) {
    width: 160px;
  }
  @media (max-width: 350px) {
    width: 140px;
  }
  @media (max-width: 320px) {
    width: 120px;
  }

  animation: eventCharacterGood01 4s;
  @keyframes eventCharacterGood01 {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
export default Stop033;

import Block from "/components/Common/Element/Block";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import imgBackData from "./assets/images/Back/back01.png";
import imgTrainInside01 from "./assets/images/Back/trainInside.png";
import imgCharacter01 from "./assets/images/Back/Character01.png";
import imgCharacter02 from "./assets/images/Back/Character02.png";
import imgCharacterGood01 from "./assets/images/Back/CharacterGood01.png";
import imgBack01 from "./assets/images/Back/Mountains.png";
import imgTrees01 from "./assets/images/Stop04/trees.png";
import imgAdvertising01 from "./assets/images/Stop04/Adversiting01.png";
import imgChair01 from "./assets/images/Back/chair01.png";
import imgStamp01 from "./assets/images/Stop04/stamp01.png";
import imgBack02 from "./assets/images/Stop04/back01.png";
import { FiArrowRight } from "react-icons/fi";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import find from "lodash/find";
import get from "lodash/get";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { APP_URL } = publicRuntimeConfig;

const Stop041 = (props) => {
  const { stopData, next, query, updateImage } = props;
  const uid = get(query, "uid");
  const [flagmovingevent, setFlagMovingEvent] = useState(false);
  const [flagNextEvent, setFlagNextEvent] = useState(false);
  const data = find(stopData, (data) => data.key === "mdl_7");

  useEffect(() => {
    setTimeout(() => {
      setFlagMovingEvent(true);
      setTimeout(() => {
        setFlagNextEvent(true);
      }, 8000);
    }, 4000);
  }, []);

  return (
    <StyledComponent>
      <BoxFirstEvent
        flagNextEvent={flagNextEvent ? true : false}
        onClick={() => {
          // setFlagMovingEvent(true);
          // setTimeout(() => {
          //   setFlagNextEvent(true);
          // }, 6000);
        }}
      >
        <ImgBack01 flagmovingevent={flagmovingevent ? true : false}>
          <img src={imgBack01.src} width={"100%"} height={"100%"} alt="" />
          {/* <ImgAdversiting01
            flagmovingevent={flagmovingevent ? true : false}
            h={h}
          >
            <img
              src={imgAdvertising01.src}
              width={"100%"}
              height={"100%"}
              alt=""
            />
          </ImgAdversiting01> */}
          <ImgTrees01 flagmovingevent={flagmovingevent ? true : false}>
            <img src={imgTrees01.src} width={"100%"} height={"100%"} alt="" />
          </ImgTrees01>
        </ImgBack01>
        <ImgTrainInside01>
          <img
            src={imgTrainInside01.src}
            width={"100%"}
            height={"100%"}
            alt=""
          />
        </ImgTrainInside01>
        <ImgChair01>
          <img src={imgChair01.src} width={"100%"} height={"100%"} alt="" />
        </ImgChair01>
        {flagmovingevent === false ? (
          <ImgCharacter01>
            <img
              src={imgCharacter01.src}
              width={"100%"}
              height={"100%"}
              alt=""
            />
          </ImgCharacter01>
        ) : (
          <ImgCharacter02>
            <img
              src={imgCharacter02.src}
              width={"100%"}
              height={"100%"}
              alt=""
            />
          </ImgCharacter02>
        )}
      </BoxFirstEvent>

      <BoxSecondEvent flagNextEvent={flagNextEvent ? true : false}>
        {/* <ImgBack02>
          <img src={imgBack02.src} width={"100%"} height={"100%"} alt="" />
        </ImgBack02> */}
        <ImgMascot>
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
              感謝你同 MOOV 一齊度過 2022
              <br />
              今年
            </Text02>
          </TextUp01>
          <ImgCenter02>
            <img src={imgStamp01.src} width={"100%"} height={"100%"} alt="" />
          </ImgCenter02>
          <TextGroup01>
            <TextTitle01>
              {Math.round(((data?.mdlData?.total_time_sec || 0) / 3600) * 10) /
                10}
              小時
            </TextTitle01>
            <Text02>約定下年都要繼續一齊好嗎？</Text02>
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
                  <BsFacebook />
                </a>
              </ButtonSocial01>
            </ButtonGroupSocial01>
            <Block bg="black" color="white" onClick={updateImage}>
              download
            </Block>
            {/* <TextShare01>Share</TextShare01> */}
          </LinkButtonGroup01>
          <ButtonNext01
            onClick={() => {
              // router.push("/Stop042");
              next();
            }}
          >
            <FiArrowRight />
            <TextButton01>下一站</TextButton01>
          </ButtonNext01>
        </ButtonGroup01>
      </BoxSecondEvent>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 428px;
  max-width: 428px;
  height: 100%;
  justify-content: center;
  background: #a5e4d0;
`;

const BoxFirstEvent = styled(Box)`
  display: ${({ flagNextEvent }) => (!flagNextEvent ? "flex" : "none")};
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  overflow: hidden;
`;

const BoxSecondEvent = styled(Box)`
  display: ${({ flagNextEvent }) => (!flagNextEvent ? "none" : "flex")};
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
  background-color: #84c1ba;
  opacity: 1;
  background-image: linear-gradient(0deg, #84c1ba 50%, #76b0b3 50%);
  background-size: 15px 15px;
  /* background: #60b9f7; */
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

const ImgTrainInside01 = styled(Box)`
  display: flex;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
`;
const ImgCharacter01 = styled(Box)`
  display: flex;
  position: absolute;
  width: 140px;
  bottom: 43px;
  left: 32px;
  transition: 0.5s;
  @media (max-width: 420px) {
    width: 135px;
  }
  @media (max-width: 390px) {
    width: 130px;
  }
  @media (max-width: 350px) {
    width: 120px;
  }
  @media (max-width: 320px) {
    width: 115px;
  }
`;

const ImgCharacter02 = styled(Box)`
  display: flex;
  position: absolute;
  width: 170px;
  bottom: 27px;
  left: 32px;

  transition: 0.5s;
  @media (max-width: 420px) {
    width: 160px;
  }
  @media (max-width: 390px) {
    width: 150px;
  }
  @media (max-width: 350px) {
    width: 140px;
  }
  @media (max-width: 320px) {
    width: 130px;
  }
`;

const ImgBack01 = styled(Box)`
  display: flex;
  position: absolute;
  width: 1300px;
  height: 70%;
  left: ${({ flagmovingevent }) =>
    flagmovingevent === false ? "0px" : "-800px"};
  top: 48%;
  transform: translateY(-50%);
  transition-delay: 500ms;
  transition-duration: 4s;
  transition-timing-function: ease-out;
  @media (max-width: 420px) {
    width: 1200px;
    left: ${({ flagmovingevent }) =>
      flagmovingevent === false ? "0px" : "-700px"};
  }
  @media (max-width: 390px) {
    width: 1100px;
    left: ${({ flagmovingevent }) =>
      flagmovingevent === false ? "0px" : "-700px"};
  }
  @media (max-width: 350px) {
    width: 1100px;
    left: ${({ flagmovingevent }) =>
      flagmovingevent === false ? "0px" : "-650px"};
  }
  @media (max-width: 320px) {
    width: 1000px;
    left: ${({ flagmovingevent }) =>
      flagmovingevent === false ? "0px" : "-600px"};
  }
`;

const ImgTrees01 = styled(Box)`
  display: ${({ flagmovingevent }) =>
    flagmovingevent === false ? "flex" : "none"};
  position: absolute;
  width: 300px;
  height: 550px;
  bottom: -20px;
  left: 600px;

  animation: ${({ flagmovingevent }) =>
    true ? "treeAnimation01 2.5s infinite" : "none"};
  @keyframes treeAnimation01 {
    0% {
      left: 600px;
    }
    30% {
      left: -300px;
    }
    100% {
      left: -300px;
    }
  }
`;

const ImgAdversiting01 = styled(Box)`
  display: flex;
  width: 21%;

  position: absolute;
  left: ${({ flagmovingevent }) =>
    flagmovingevent === false ? "600px" : "500px"};
  top: calc(
    ${(props) => (props.h >= 654 ? "355px" : `355px * ${props.h / 654}`)}
  );
  transition-delay: 500ms;
  transition-duration: 4s;
  transition-timing-function: ease-out;

  transition: 0.5s;
  // @media (max-width: 420px) {
  //   width: 320px;
  //   bottom: 20px;
  // }
  // @media (max-width: 390px) {
  //   width: 300px;
  //   bottom: 40px;
  // }
  // @media (max-width: 350px) {
  //   width: 280px;
  //   bottom: 60px;
  // }
  // @media (max-width: 320px) {
  //   width: 260px;
  //   bottom: 80px;
  // }
`;

const ImgCenter02 = styled(Box)`
  display: flex;
  width: 270px;
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
    width: 250px;
  }
  @media (max-width: 390px) {
    width: 230px;
  }
  @media (max-width: 350px) {
    width: 210px;
  }
  @media (max-width: 320px) {
    width: 200px;
  }
`;

const TextTitle01 = styled(Box)`
  display: flex;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 39px;
  text-align: center;
  letter-spacing: 0.04em;
  color: #1f344f;

  transition: 0.5s;
  @media (max-width: 420px) {
    font-size: 30px;
  }
  @media (max-width: 390px) {
    font-size: 28px;
  }
  @media (max-width: 350px) {
    font-size: 26px;
  }
  @media (max-width: 320px) {
    font-size: 24px;
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
  align-items: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.04em;

  /* White */
  margin-top: 20px;
  color: #ffffff;

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

const ImgBack02 = styled(Box)`
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

const ButtonGroup01 = styled(Box)`
  display: flex;
  width: 100%;
  padding: 20px 35px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 27;
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
const ImgChair01 = styled(Box)`
  display: flex;
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 220px;
`;

export default Stop041;

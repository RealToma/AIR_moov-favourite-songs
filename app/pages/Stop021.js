import Block from "/components/Common/Element/Block";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import imgBackData from "./assets/images/Back/back01.png";
import imgTrainInside01 from "./assets/images/Back/trainInside.png";
import imgCharacter01 from "./assets/images/Back/Character01.png";
import imgCharacter02 from "./assets/images/Back/Character02.png";
import imgCharacterGood01 from "./assets/images/Back/CharacterGood01.png";
import imgBack01 from "./assets/images/Back/Island.png";
import imgIsland01 from "./assets/images/Stop02/island.png";
import imgAdvertising01 from "./assets/images/Stop02/Adversiting01.png";
import imgStamp01 from "./assets/images/Stop02/stamp01.png";
import imgChair01 from "./assets/images/Back/chair01.png";
import imgIslandShadow01 from "./assets/images/Stop02/IslandShadow.png";
import imgCloud01 from "./assets/images/Stop02/Cloud.png";
import { FiArrowRight } from "react-icons/fi";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import find from "lodash/find";
import get from "lodash/get";
import getConfig from "next/config";
import Image from "next/image";

const { publicRuntimeConfig } = getConfig();
const { APP_URL } = publicRuntimeConfig;

const Stop021 = (props) => {
  const { stopData, next, query, h, updateImage, shareCallback } = props;
  const uid = get(query, "uid");
  const [flagmovingevent, setFlagMovingEvent] = useState(false);
  const [flagNextEvent, setFlagNextEvent] = useState(false);
  const data = find(stopData, (data) => data.key === "mdl_1");
  const [displayImage, setDisplayImage] = useState(data?.refactorData?.image);
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
          <ImgIsland01 flagmovingevent={flagmovingevent ? true : false}>
            <img src={imgIsland01.src} width={"100%"} height={"100%"} alt="" />
          </ImgIsland01>
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
        {/* <ImgCloud01>
          <img src={imgCloud01.src} width={"100%"} height={"100%"} alt="" />
        </ImgCloud01>
        <ImgIslandShadow01>
          <img
            src={imgIslandShadow01.src}
            width={"100%"}
            height={"100%"}
            alt=""
          />
        </ImgIslandShadow01> */}

        <ImgMascot className="mascot">
          <img
            src={imgCharacterGood01.src}
            width={"100%"}
            height={"100%"}
            alt=""
          />
        </ImgMascot>

        <BoxUp01>
          <ImgCenter02>
            <ImgStamp01>
              <img src={imgStamp01.src} width={"100%"} height={"100%"} alt="" />
            </ImgStamp01>
            <Block width="100%" height="100%">
              <Image
                src={displayImage}
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
            <Text02>
              鍾意到聽咗佢
              <TextInside01>
                {"\u00a0"}
                {data?.refactorData?.num || ""}
                {"\u00a0"}
              </TextInside01>
              次
            </Text02>
            <Text02 mt={"15px"}>咁鍾意一定有特別原因喇～</Text02>
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
              // router.push("/Stop022");
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
  flex-direction: column;
  width: 100%;
  height: 100%;
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
  /* background: #89d1fd; */
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

const ImgIsland01 = styled(Box)`
  display: ${({ flagmovingevent }) =>
    flagmovingevent === false ? "flex" : "none"};
  position: absolute;
  width: 330px;
  height: 330px;
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
    ${(props) => (props.h >= 654 ? "375px" : `375px * ${props.h / 654}`)}
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

const ImgCloud01 = styled(Box)`
  display: flex;
  position: absolute;
  width: 270px;
  height: 158px;
  left: 0px;
  bottom: 128px;
`;

const ImgStamp01 = styled(Box)`
  display: flex;
  position: absolute;
  width: 230px;
  left: -100px;
  top: -190px;

  animation: eventStamp01 2s;
  @keyframes eventStamp01 {
    0% {
      opacity: 0;
      transform: rotate(-15deg);
    }
    80% {
      opacity: 0;
      transform: rotate(-15deg);
    }
    100% {
      opacity: 1;
      transform: rotate(0deg);
    }
  }

  transition: 0.5s;
  @media (max-width: 420px) {
    width: 210px;
    left: -110px;
    top: -150px;
  }
  @media (max-width: 390px) {
    width: 190px;
    left: -100px;
    top: -130px;
  }
  @media (max-width: 350px) {
    width: 170px;
    left: -80px;
    top: -110px;
  }
  @media (max-width: 320px) {
    width: 150px;
    left: -70px;
    top: -90px;
  }
`;

const ImgCenter02 = styled(Box)`
  display: flex;
  position: relative;
  width: 220px;
  > img {
    z-index: 19;
  }

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

const ImgIslandShadow01 = styled(Box)`
  display: flex;
  position: absolute;
  width: 332px;
  height: 230px;
  right: 0%;
  bottom: 55px;
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

const TextInside01 = styled(Box)`
  display: flex;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  letter-spacing: 0.04em;
  color: black;
  color: #1f344f;
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
export default Stop021;

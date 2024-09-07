import Block from "/components/Common/Element/Block";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import imgBackData from "./assets/images/Back/back01.png";
import imgTrainInside01 from "./assets/images/Back/trainInside.png";
import imgCharacter01 from "./assets/images/Back/Character01.png";
import imgCharacter02 from "./assets/images/Back/Character02.png";
import imgCharacterGood01 from "./assets/images/Back/CharacterGood01.png";
import imgBack01 from "./assets/images/Back/Peer.png";
import imgTree01 from "./assets/images/Stop01/Tree.png";
import imgAdvertising01 from "./assets/images/Stop01/Adversiting01.png";
import imgChair01 from "./assets/images/Back/chair01.png";
import imgCloud01 from "./assets/images/Stop01/Cloud.png";
import imgRopeway01 from "./assets/images/Stop01/ropeway01.png";
import imgStamp01 from "./assets/images/Stop01/stamp01.png";
import imgStamp02 from "./assets/images/Stop01/stamp02.png";
import imgHill01 from "./assets/images/Stop01/hill01.png";
import { FiArrowRight } from "react-icons/fi";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import find from "lodash/find";
import get from "lodash/get";
import getConfig from "next/config";
import Image from "next/image";

const { publicRuntimeConfig } = getConfig();
const { APP_URL } = publicRuntimeConfig;

const Stop01 = (props) => {
  const { stopData, next, query, h, updateImage, shareCallback } = props;
  const uid = get(query, "uid");
  const [flagmovingevent, setFlagMovingEvent] = useState(false);

  const [flagNextEvent, setFlagNextEvent] = useState(false);
  const data1 = find(stopData, (data) => data.key === "mdl_2_1_all");
  const data2 = find(stopData, (data) => data.key === "mdl_2_2");
  const [displayImage, setDisplayImage] = useState(data1?.refactorData?.image);

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
          <ImgTree01 flagmovingevent={flagmovingevent ? true : false}>
            <img src={imgTree01.src} width={"100%"} height={"100%"} alt="" />
          </ImgTree01>
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

        <ImgRopeway01>
          <img src={imgRopeway01.src} width={"100%"} height={"100%"} alt="" />
        </ImgRopeway01>
        
        <ImgHill01>
          <img src={imgHill01.src} width={"100%"} height={"100%"} alt="" />
        </ImgHill01> */}
        <ImgMascot className="mascot">
          <img
            src={imgCharacterGood01.src}
            width={"100%"}
            height={"100%"}
            alt=""
          />
        </ImgMascot>
        <BoxUp01>
          <ImgHuman01>
            <ImgStamp01>
              <img src={imgStamp01.src} width={"100%"} height={"100%"} alt="" />
            </ImgStamp01>
            <ImgStamp02>
              <img src={imgStamp02.src} width={"100%"} height={"100%"} alt="" />
            </ImgStamp02>
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
                    "/fansreport/2022/assets/png/placeholder-artist.png"
                  );
                }}
              />
            </Block>
          </ImgHuman01>
          <TextGroup01>
            <TextTitle01>{data1?.refactorData?.label}</TextTitle01>
            <Text02>
              總共聽咗佢嘅歌
              <TextInside01>{data1?.refactorData?.num}</TextInside01>
              次， 犀利啊！
            </Text02>
            <Text02 mt={"15px"}>而佢嘅作品之中你聽得最多嘅係</Text02>
            <Text03 mt={"15px"}>
              {data2?.product?.product_title || "N/A"}
            </Text03>
            <Text02 mt={"15px"}>相信呢首歌對你一定有不一樣的意義！</Text02>
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
              // router.push("/Stop021");
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

  justify-content: center;
  overflow: hidden;
  flex-direction: column;

  /* background-image: url(${imgBackData.src});
  background-size: 120% 120%;
  background-position: center;
  background-repeat: no-repeat; */

  background-color: #84C1BA;
  opacity: 1;
  background-image: linear-gradient(0deg, #84C1BA 50%, #76B0B3 50%);
  background-size: 15px 15px;
  /* background-color: #89d1fd; */
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

const ImgTree01 = styled(Box)`
  display: ${({ flagmovingevent }) =>
    flagmovingevent === false ? "flex" : "none"};
  position: absolute;
  width: 270px;
  height: 530px;
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
  // }
  // @media (max-width: 390px) {
  //   width: 300px;
  // }
  // @media (max-width: 350px) {
  //   width: 280px;
  // }
  // @media (max-width: 320px) {
  //   width: 260px;
  // }
`;

const ImgCloud01 = styled(Box)`
  display: flex;
  position: absolute;
  width: 200px;
  height: 41px;
  left: 14px;
  top: 97px;
`;

const ImgRopeway01 = styled(Box)`
  display: flex;
  position: absolute;
  width: 100%;
  top: -0px;
  height: 251.55px;

  animation: eventRopeway01 2s;
  @keyframes eventRopeway01 {
    0% {
      top: -500px;
    }
    70% {
      top: -300px;
    }
    100% {
      top: 0px;
    }
  }
`;

const ImgStamp01 = styled(Box)`
  display: flex;
  position: absolute;
  width: 180px;
  left: -30px;
  top: -160px;
  z-index: 50;

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
    width: 170px;
    left: -30px;
    top: -150px;
  }
  @media (max-width: 390px) {
    width: 160px;
    left: -40px;
    top: -90px;
  }
  @media (max-width: 350px) {
    width: 150px;
    left: -30px;
    top: -80px;
  }
  @media (max-width: 320px) {
    width: 140px;
    left: -20px;
    top: -70px;
  }
`;

const ImgStamp02 = styled(Box)`
  display: flex;
  position: absolute;
  width: 150px;
  right: -80px;
  top: -100px;
  z-index: 50;

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
    width: 140px;
    right: -70px;
    top: -90px;
  }
  @media (max-width: 390px) {
    width: 130px;
    right: -60px;
    top: -80px;
  }
  @media (max-width: 350px) {
    width: 120px;
    right: -60px;
    top: -70px;
  }
  @media (max-width: 320px) {
    width: 110px;
    right: -50px;
    top: -60px;
  }
`;

const ImgHuman01 = styled(Box)`
  display: flex;
  position: relative;
  width: 233px;
  height: 233px;
  > img {
    z-index: 78;
  }

  animation: eventHuman01 3s;
  @keyframes eventHuman01 {
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
    width: 220px;
  }
  @media (max-width: 390px) {
    width: 200px;
  }
  @media (max-width: 350px) {
    width: 180px;
  }
  @media (max-width: 320px) {
    width: 160px;
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
  /* color: #1F344F; */
  color: #1F344F;
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
  text-align: center;
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
  text-align: center;
  display: flex;
  align-items: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.04em;
  /* White */
  color: #ffffff;
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

const Text03 = styled(Box)`
  display: flex;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 39px;
  /* identical to box height */

  display: flex;
  align-items: center;
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

const TextInside01 = styled(Box)`
  display: flex;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;
  /* identical to box height */

  text-align: center;
  letter-spacing: 0.04em;

  color: #1f344f;

  transition: 0.5s;
  @media (max-width: 420px) {
    font-size: 22px;
  }
  @media (max-width: 390px) {
    font-size: 21px;
  }
  @media (max-width: 350px) {
    font-size: 20px;
  }
  @media (max-width: 320px) {
    font-size: 18px;
  }
`;

const ImgHill01 = styled(Box)`
  display: flex;
  position: absolute;
  width: 270px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0px;
`;

const ButtonGroup01 = styled(Box)`
  display: flex;
  position: relative;
  width: 100%;
  padding: 20px 35px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 80;

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

const BoxUp01 = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 72;
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
export default Stop01;

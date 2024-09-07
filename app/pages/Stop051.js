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

const Stop051 = (props) => {
  const { stopData, deepLinkData, query, updateImage, shareCallback } = props;
  const uid = get(query, "uid");
  const [flagmovingevent, setFlagMovingEvent] = useState(false);
  const [animatelyrics, setAnimateLyrics] = useState(false);
  const [flagNextEvent, setFlagNextEvent] = useState(false);
  const mdl_7 = find(stopData, (item) => item.key === "mdl_7");
  const mdl_1 = find(stopData, (item) => item.key === "mdl_1");
  const mdl_2_1_local = find(stopData, (item) => item.key === "mdl_2_1_local");
  const mdl_2_1_nonlocal = find(
    stopData,
    (item) => item.key === "mdl_2_1_nonlocal"
  );
  const [displayImageMdl1, setDisplayImageMdl1] = useState(
    mdl_1?.refactorData?.image || false
  );

  useEffect(() => {
    setTimeout(() => {
      setFlagMovingEvent(true);
      setAnimateLyrics(true);
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
          {/* <ImgAdversiting01 flagmovingevent={flagmovingevent ? true : false}>
            <img
              src={imgAdvertising01.src}
              width={"100%"}
              height={"100%"}
              alt=""
            />
          </ImgAdversiting01> */}
          {/* <ImgTrees01 flagmovingevent={flagmovingevent ? true : false}>
            <img src={imgTrees01.src} width={"100%"} height={"100%"} alt="" />
          </ImgTrees01> */}
        </ImgBack01>

        <TextGroup01 className={animatelyrics ? "animatelyrics" : ""}>
          {mdl_7 && (
            <TextPart01>
              <TextStyle01>2022年與 MOOV 一起度過</TextStyle01>
              <TextStyle02>
                {Math.round(
                  ((mdl_7?.mdlData?.total_time_sec || 0) / 3600) * 10
                ) / 10}
                小時
              </TextStyle02>
            </TextPart01>
          )}

          {mdl_2_1_local && (
            <TextPart01>
              <TextStyle01>最愛歌手（本地）Top 3</TextStyle01>
              {map(mdl_2_1_local?.refactorData || [], (item, key) => (
                <TextStyle03>
                  {key + 1}.{item.label}
                </TextStyle03>
              ))}
            </TextPart01>
          )}

          {mdl_2_1_nonlocal && (
            <TextPart01>
              <TextStyle01>最愛歌手（外語） Top 3</TextStyle01>
              {map(mdl_2_1_nonlocal?.refactorData || [], (item, key) => (
                <TextStyle03>
                  {key + 1}.{item.label}
                </TextStyle03>
              ))}
            </TextPart01>
          )}

          {mdl_1 && (
            <TextPart02>
              <TextStyle01>我的年度之歌</TextStyle01>
              <ImgCenter01>
                <Block width="100%" height="100%">
                  <Image
                    src={displayImageMdl1}
                    priority={true}
                    alt=""
                    layout="responsive"
                    width="200px"
                    height="200px"
                    onError={() => {
                      setDisplayImageMdl1(
                        "/fansreport/2022/assets/png/placeholder-artist.png"
                      );
                    }}
                  />
                </Block>
              </ImgCenter01>
              <TextStyle03>{mdl_1?.refactorData?.label}</TextStyle03>
              <TextStyle03>
                全年共聽{mdl_1?.refactorData?.num || 0}次
              </TextStyle03>
            </TextPart02>
          )}
        </TextGroup01>
        <ImgChair01>
          <img src={imgChair01.src} width={"100%"} height={"100%"} alt="" />
        </ImgChair01>
        <ImgTrainInside01>
          <img
            src={imgTrainInside01.src}
            width={"100%"}
            height={"100%"}
            alt=""
          />
        </ImgTrainInside01>
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

        {/* <TextTitleTop01>
          我的MOOV音樂之旅
          <br />
          2022總站
        </TextTitleTop01> */}
        <ButtonGroup01>
          <a href={deepLinkData?.shortLink || ""}>
            <ButtonUp01>
              立即收聽
              <br />
              我的 2022 年度歌單
            </ButtonUp01>
          </a>
          <LinkButtonGroup01>
            <ButtonGroupSocial01>
              {/* <ButtonSocial01 mr={"25px"}>
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
            <Block bg="black" color="white" onClick={updateImage}>
              download
            </Block>
            {/* <TextShare01>Share</TextShare01> */}
          </LinkButtonGroup01>
        </ButtonGroup01>
      </BoxFirstEvent>

      {/* <BoxSecondEvent flagNextEvent={flagNextEvent ? true : false}>
        <ImgBack02>
          <img src={imgBack02.src} width={"100%"} height={"100%"} alt="" />
        </ImgBack02>
        <ImgCenter02>
          <img src={imgCenter01.src} width={"100%"} height={"100%"} alt="" />
          <ImgCharacter03>
            <img
              src={imgCharacterStand.src}
              width={"100%"}
              height={"100%"}
              alt=""
            />
          </ImgCharacter03>
          <a href={deepLinkData?.shortLink || ""}>
            <ButtonCenter01>我的 2022 年度歌單</ButtonCenter01>
          </a>
        </ImgCenter02>
        <ButtonGroup01>
          <LinkButtonGroup01>
            <ButtonGroupSocial01>
              <ButtonSocial01 mr={"25px"}>
                <BsInstagram />
              </ButtonSocial01>
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
            <TextShare01>Share</TextShare01>
          </LinkButtonGroup01>
        </ButtonGroup01>
      </BoxSecondEvent> */}
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
  display: flex;
  /* display: ${({ flagNextEvent }) => (!flagNextEvent ? "flex" : "none")}; */
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
  background-image: url(${imgBackData.src});
  background-size: 120% 120%;
  background-position: center;
  background-repeat: no-repeat;
  /* background: #a5e4d0; */
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
  width: 130px;
  bottom: 43px;
  left: 32px;
  z-index: 83;
  transition: 0.5s;
  @media (max-width: 420px) {
    width: 125px;
  }
  @media (max-width: 390px) {
    width: 120px;
  }
  @media (max-width: 350px) {
    width: 110px;
  }
  @media (max-width: 320px) {
    width: 105px;
  }
`;

const ImgCharacter02 = styled(Box)`
  display: flex;
  position: absolute;
  width: 160px;
  bottom: 27px;
  left: 32px;
  z-index: 84;
  transition: 0.5s;
  @media (max-width: 420px) {
    width: 150px;
  }
  @media (max-width: 390px) {
    width: 140px;
  }
  @media (max-width: 350px) {
    width: 130px;
  }
  @media (max-width: 320px) {
    width: 120px;
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

// const ImgTrees01 = styled(Box)`
//   display: ${({ flagmovingevent }) => (flagmovingevent === false? "flex" : "none")};
//   position: absolute;
//   width: 300px;
//   height: 550px;
//   bottom: -20px;
//   left: 600px;

//   animation: ${({ flagmovingevent }) =>
//     true ? "treeAnimation01 2.5s infinite" : "none"};
//   @keyframes treeAnimation01 {
//     0% {
//       left: 600px;
//     }
//     30% {
//       left: -300px;
//     }
//     100% {
//       left: -300px;
//     }
//   }
// `;

// const ImgAdversiting01 = styled(Box)`
//   display: flex;
//   width: 348px;
//
//   position: absolute;
//   left: ${({ flagmovingevent }) => (flagmovingevent === false? "600px" : "500px")};
//   bottom: 0px;
//   transition-delay: 500ms;
//   transition-duration: 4s;
//   transition-timing-function: ease-out;
// `;

const ImgCenter02 = styled(Box)`
  display: flex;
  position: absolute;
  width: 280px;
  left: 50%;
  transform: translateX(-50%);
  top: 107px;
  > img {
    z-index: 22;
    animation: eventCenterImage01 2s;
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
`;

const ImgBack02 = styled(Box)`
  display: flex;
  position: absolute;
  width: 328px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 125px;

  animation: eventImgBack01 3.5s;
  @keyframes eventImgBack01 {
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

const ButtonGroup01 = styled(Box)`
  display: flex;
  position: absolute;
  /* width: 100%; */
  flex-direction: column;
  align-items: flex-end;
  right: 20px;
  bottom: 30px;
  box-sizing: border-box;
  justify-content: center;

  animation: eventButtonGroup01 10s;
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

  transition: 0.5s;
  @media (max-width: 420px) {
    right: 20px;
    bottom: 30px;
  }
  @media (max-width: 390px) {
    right: 20px;
    bottom: 30px;
  }
  @media (max-width: 350px) {
    right: 15px;
    bottom: 30px;
  }
  @media (max-width: 320px) {
    right: 10px;
    bottom: 30px;
  }
`;

const LinkButtonGroup01 = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  margin-right: 20px;
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

const ImgCharacter03 = styled(Box)`
  display: flex;
  position: absolute;
  width: 93px;
  right: 30px;
  bottom: 15px;
  z-index: 22;

  animation: eventCenterImage01 2.8s;
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
`;

const ButtonCenter01 = styled(Box)`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: #ba6500;
  border-radius: 41px;
  width: 220px;
  height: 48px;
  justify-content: center;
  align-items: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  bottom: -70px;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #ba6500;
  }

  animation: eventButtonCenter01 3s;
  @keyframes eventButtonCenter01 {
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

const ButtonUp01 = styled(Box)`
  display: flex;
  width: 185px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: #328b7d;
  border-radius: 41px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;

  /* White */

  color: #ffffff;
  bottom: -70px;

  transition: 0.5s;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: #328b7d;
  }

  @media (max-width: 420px) {
    width: 170px;
    height: 50px;
    font-size: 15px;
  }
  @media (max-width: 390px) {
    width: 150px;
    height: 45px;
    font-size: 14px;
  }
  @media (max-width: 350px) {
    width: 130px;
    height: 40px;
    font-size: 13px;
  }
  @media (max-width: 320px) {
    width: 120px;
    height: 35px;
    font-size: 12px;
  }
`;

const TextTitleTop01 = styled(Box)`
  display: flex;
  position: absolute;
  top: 120px;
  right: 60px;
  background-color: #daffe0;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 114.02%;
  /* or 27px */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01em;

  color: #da8e25;
  /* transition: 0.5s;
  @media (max-width: 420px) {
    font-size: 22px;
    top: 125px;
  }
  @media (max-width: 390px) {
    top: 130px;
    font-size: 20px;
  }
  @media (max-width: 350px) {
    font-size: 18px;
  }
  @media (max-width: 320px) {
    font-size: 16px;
  } */
`;

const TextGroup01 = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-40%, -50%);
  width: 200px;
  transition: 8s;
  &.animatelyrics {
    transform: translate(-40%, -60%);
  }
`;

const TextPart01 = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-bottom: 14px;
  margin-bottom: 14px;
  border-bottom: 1px solid #ffffff;
`;

const TextPart02 = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const TextStyle01 = styled(Box)`
  display: flex;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.04em;

  /* White */

  color: #ffffff;
  margin-bottom: 5px;

  transition: 0.5s;
  @media (max-width: 420px) {
    font-size: 13px;
  }
  @media (max-width: 390px) {
    font-size: 12px;
  }
  @media (max-width: 350px) {
    font-size: 11px;
  }
  @media (max-width: 320px) {
    font-size: 10px;
  }
`;

const TextStyle02 = styled(Box)`
  display: flex;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 130.02%;
  /* or 31px */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01em;

  color: #ffffff;
  transition: 0.5s;
  @media (max-width: 420px) {
    font-size: 22px;
  }
  @media (max-width: 390px) {
    font-size: 20px;
  }
  @media (max-width: 350px) {
    font-size: 18px;
  }
  @media (max-width: 320px) {
    font-size: 16px;
  }
`;

const TextStyle03 = styled(Box)`
  display: flex;
  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 17px;
  line-height: 130.02%;
  /* or 22px */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01em;

  color: #ffffff;
  transition: 0.5s;
  @media (max-width: 420px) {
    font-size: 16px;
  }
  @media (max-width: 390px) {
    font-size: 15px;
  }
  @media (max-width: 350px) {
    font-size: 14px;
  }
  @media (max-width: 320px) {
    font-size: 13px;
  }
`;

const ImgCenter01 = styled(Box)`
  display: flex;
  width: 85px;
  height: 85px;

  transition: 0.5s;
  @media (max-width: 420px) {
    width: 80px;
    height: 80px;
  }
  @media (max-width: 390px) {
    width: 75px;
    height: 75px;
  }
  @media (max-width: 350px) {
    width: 70px;
    height: 70px;
  }
  @media (max-width: 320px) {
    width: 65px;
    height: 65px;
  }
`;

const ImgChair01 = styled(Box)`
  display: flex;
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 220px;
  z-index: 82;
`;

export default Stop051;

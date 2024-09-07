import { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Modal } from "@mui/material";
import imgBack01 from "./assets/images/Home/homgBack01.png";
import imgCharacter01 from "./assets/images/Home/Character01.png";
import imgBag01 from "./assets/images/Home/backBag01.png";
import imgBagText01 from "./assets/images/Home/backBagText01.png";
import imgStart01 from "./assets/images/Home/backBagStart01.png";
import imgPassport01 from "./assets/images/Home/passport01.png";
import imgSphere01 from "./assets/images/Home/sphere01.png";
import get from "lodash/get";
// import music01 from "/assets/music/UPM_10.wav"

const Home = (props) => {
  const { next, device, query, hasUser } = props;
  const uid = get(query, "uid");
  let url = "https://moov.hk";
  switch (device) {
    case "ios":
      url = "https://apps.apple.com/hk/app/moov-%E9%9F%B3%E6%A8%82/id436310157";
      break;
    case "android":
      url = "https://play.google.com/store/apps/details?id=com.now.moov";
      break;
  }

  const [openModalPassport, setOpenModalPassport] = useState(false);
  const handleCloseModalPassport = () => {
    setOpenModalPassport(false);
  };

  const [openModalSphere, setOpenModalSphere] = useState(false);
  const handleCloseModalSphere = () => {
    setOpenModalSphere(false);
  };

  const start = () => {
    if (!uid) {
      setOpenModalPassport(true);
    } else if (!hasUser) {
      setOpenModalSphere(true);
    } else {
      next();
    }
  };

  const playMusic = () => {
    let song = new Audio('/fansreport/2022/assets/music/UPM_10.mp3');
    song.play();
  };

  return (
    <StyledComponent>
      <ImgBack01>
        <img src={imgBack01.src} width="100%" height="100%" alt="" />
      </ImgBack01>
      <ImgBag01>
        <img src={imgBag01.src} height="100%" alt="" />
        <ImgBagText01>
          <img src={imgBagText01.src} width="100%" height="100%" alt="" />
        </ImgBagText01>
        <ImgStart01 onClick={start}>
          <img src={imgStart01.src} width="100%" height="100%" alt="" />
        </ImgStart01>
      </ImgBag01>
      <ImgCharacter01>
        <img src={imgCharacter01.src} width="100%" height="100%" alt="" />
      </ImgCharacter01>
      <ButtonPlayMusic onClick={playMusic}>
        Play Music
        {/* <audio src="/UPM_10.wav" controls play type="audio/wav"></audio> */}
      </ButtonPlayMusic>
      <Modal open={openModalPassport} onClose={handleCloseModalPassport}>
        <BoxPassport01>
          <ImgPassport01>
            <img src={imgPassport01.src} width="100%" height="100%" alt="" />
          </ImgPassport01>
          <TextPassport01>
            準備踏入新一年,
            <br />
            你嘅 MOOV app
            <br />
            都需要更新喇!
          </TextPassport01>
          <a href={url}>
            <ButtonUpdate01>立即更新</ButtonUpdate01>
          </a>
        </BoxPassport01>
      </Modal>

      <Modal open={openModalSphere} onClose={handleCloseModalSphere}>
        <BoxPassport01>
          <ImgPassport01>
            <img src={imgSphere01.src} width="100%" height="100%" alt="" />
          </ImgPassport01>
          <TextPassport01>
            唔好意思呀！
            <br />
            我哋需要了解你更多先可以一齊展開音樂之旅，聽多啲歌，下年再見啦！
          </TextPassport01>
          <a href="https://app.moov-music.com/link">
            <ButtonBack01>
              返回 MOOV
              <br />
              聽更多好歌!
            </ButtonBack01>
          </a>
        </BoxPassport01>
      </Modal>
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  position: relative;
  width: 428px;
  max-width: 428px;
  height: 100%;
  justify-content: center;

  background: #a5e4d0;
`;

const ImgBack01 = styled(Box)`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  right: 0px;
`;

const ImgCharacter01 = styled(Box)`
  display: flex;
  position: absolute;
  width: calc(50% + 15px);
  bottom: 0px;
  left: 20px;

  transition: 0.5s;
  // @media (max-width: 420px) {
  //   width: 230px;
  // }
  // @media (max-width: 390px) {
  //   width: 200px;
  //   left: 25px;
  // }
  // @media (max-width: 350px) {
  //   width: 180px;
  //   left: 20px;
  // }
  // @media (max-width: 320px) {
  //   width: 160px;
  //   left: 30px;
  // }
`;

const ImgBag01 = styled(Box)`
  display: flex;
  position: absolute;
  width: auto;
  top: 30px;
  height: 63%;
  left: 50%;
  transform: translateX(-50%);

  transition: 0.5s;
  // @media (max-width: 420px) {
  //   width: 370px;
  //   bottom: 180px;
  // }
  // @media (max-width: 390px) {
  //   width: 340px;
  //   bottom: 120px;
  // }
  // @media (max-width: 350px) {
  //   width: 300px;
  //   bottom: 130px;
  // }
  // @media (max-width: 320px) {
  //   width: 280px;
  //   bottom: 110px;
  // }
`;

const ImgBagText01 = styled(Box)`
  display: flex;
  position: absolute;
  width: 50%;
  top: 24%;
  left: 50%;
  transform: translateX(-50%);

  transition: 0.5s;
  // @media (max-width: 420px) {
  //   width: 220px;
  //   bottom: 410px;
  // }
  // @media (max-width: 390px) {
  //   width: 200px;
  //   bottom: 370px;
  // }
  // @media (max-width: 350px) {
  //   width: 180px;
  //   bottom: 315px;
  // }
  // @media (max-width: 320px) {
  //   width: 160px;
  //   bottom: 285px;
  // }
`;
const ImgStart01 = styled(Box)`
  display: flex;
  position: absolute;
  width: 60%;
  top: 65%;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;

  transition: 0.5s;
  // @media (max-width: 420px) {
  //   width: 220px;
  //   bottom: 230px;
  // }
  // @media (max-width: 390px) {
  //   width: 200px;
  //   bottom: 180px;
  // }
  // @media (max-width: 350px) {
  //   width: 180px;
  //   bottom: 170px;
  // }
  // @media (max-width: 320px) {
  //   width: 160px;
  //   bottom: 150px;
  // }
`;

const BoxPassport01 = styled(Box)`
  display: flex;
  position: absolute;
  width: 348px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #a5e4d0;
  border-radius: 30px;
  outline: none;
  flex-direction: column;
  align-items: center;
  padding: 40px 0px;
  box-sizing: border-box;

  backdrop-filter: blur(100px) !important;
  transition: box-shadow 300ms;
  transition: transform 505ms cubic-bezier(0, 0, 0.2, 1) 0ms !important;
  animation: back_animation1 0.5s 1;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  @keyframes back_animation1 {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }

  transition: 0.5s;
  @media (max-width: 390px) {
    width: 320px;
  }
  @media (max-width: 350px) {
    width: 300px;
  }
  @media (max-width: 320px) {
    width: 280px;
  }
`;

const ImgPassport01 = styled(Box)`
  display: flex;
  width: 186px;
`;

const TextPassport01 = styled(Box)`
  display: flex;
  margin-top: 20px;
  padding: 0 15px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 142.02%;
  text-align: center;
  color: #ffffff;
`;

const ButtonUpdate01 = styled(Box)`
  display: flex;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  background: #42baa7;
  border-radius: 41px;
  width: 180px;
  height: 48px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    background: white;
    color: #42baa7;
  }
`;

const ButtonBack01 = styled(Box)`
  display: flex;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  background: #42baa7;
  border-radius: 41px;
  width: 180px;
  height: 60px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    background: white;
    color: #42baa7;
  }
`;

const ButtonPlayMusic = styled(Box)`
  display: flex;
  position: absolute;
  right: 30px;
  bottom: 30px;
  z-index: 140;
  /* width: 150px;
  height: 50px;
  align-items: center;
  justify-content: center; */
  width: 120px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 41px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;


  color: #328b7d;

  transition: 0.5s;
  cursor: pointer;
  &:hover {

    text-shadow: 0px 0px 5px;
  }

  @media (max-width: 420px) {
    width: 115px;
    height: 35px;
    font-size: 15px;
  }
  @media (max-width: 390px) {
    width: 110px;
    height: 30px;
    font-size: 14px;
  }
  @media (max-width: 350px) {
    width: 105px;
    height: 25px;
    font-size: 13px;
  }
  @media (max-width: 320px) {
    width: 100px;
    height: 20px;
    font-size: 12px;
  }
`;

export default Home;

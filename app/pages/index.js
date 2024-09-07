import Block from "/components/Common/Element/Block";
import crypto from 'crypto'
import axios from 'axios'
import { useEffect, useState, useRef, useCallback } from "react";
import get from "lodash/get";
import getConfig from "next/config";
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import find from 'lodash/find'
import map from 'lodash/map'
import isNull from 'lodash/isNull'
import toNumber from 'lodash/toNumber'
import cloneDeep from 'lodash/cloneDeep'
import { pushTracker } from '/lib/gtm'
import { Box, Modal } from "@mui/material";
import styled from "styled-components";
// import { toPng, toJpeg } from 'html-to-image';
import domtoimage from 'dom-to-image';
import Loading from '/components/Common/Loading'
import WebShare from '/components/Common/WebShare'
import SvgMusicOn from '/public/assets/svg/music_on.svg'
import SvgMusicOff from '/public/assets/svg/music_off.svg'

import imgPassport01 from "./assets/images/Home/passport01.png";
import imgSphere01 from "./assets/images/Home/sphere01.png";

const { publicRuntimeConfig } = getConfig()
const { APP_URL } = publicRuntimeConfig

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
    width: 60%;
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

const FinalStopDownload = styled(Block)`
  img {
    display: block;
    margin: auto;
    &.final-mid {
      height: 100%;
    }
  }
  
  .last_result_download {
    width: 60%;
    margin: auto;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .result_section {
    padding: 20px 0;
    width: 100%;
    border-bottom: #FFFFFF 1px solid;
    h2, span {
      color: #FFFFFF !important; 
    }
  }
  .result_section img {
      width: 140px; 
  }
  li {
    text-align: center; 
  }
`
const addImageProcess = (src) => {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = () => resolve(img.height)
    img.onerror = reject
    img.src = src
  })
}

const Home = (props) => {
  const { data, hasUser, query, deepLinkData, isFbInapp, requesterHash, p } = props
  const [device, setDevice] = useState('desktop')
  const [loading, setLoading] = useState()
  const [playedMusic, setPlayedMusic] = useState()
  // console.log(h, 'h')
  
  const uid = get(query, 'uid')
  const list = map(
    get(data, 'list', []),
    (item) => {
      const key = item?.key
      let hasNext = false
      switch (key) {
        case 'mdl_2_1_all':
          hasNext = false
          break
        case 'mdl_1':
          if (find(data?.list || [], (data) => data.key === 'mdl_5')) hasNext = 'mdl_5'
          break
        case 'mdl_5':
          hasNext = false
          break
        case 'mdl_3':
          hasNext = !!find(data?.list || [], (data) => data.key === 'mdl_4_1') || !!find(data?.list || [], (data) => data.key === 'mdl_4_2')
          if (find(data?.list || [], (data) => data.key === 'mdl_4_1')) {
            hasNext = 'mdl_4_1'
          } else if (find(data?.list || [], (data) => data.key === 'mdl_4_2')) {
            hasNext = 'mdl_4_2'
          }
          break
        case 'mdl_4_1':
          if (find(data?.list || [], (data) => data.key === 'mdl_4_2')) {
            hasNext = 'mdl_4_2'
          }
          break
        case 'mdl_4_2':
          hasNext = false
          break
        case 'mdl_7':
          if (find(data?.list || [], (data) => data.key === 'mdl_6')) {
            hasNext = 'mdl_6'
          }
          break
        case 'mdl_6':
          hasNext = false
          break
      }
      return {
        ...item,
        hasNext,
      }
    }
  )

  // const [displayImg_mdl_2_1_all, setDisplayImg_mdl_2_1_all] = useState(find(refactorList, (data) => data.key === "mdl_2_1_all")?.refactorData?.image || '')
  // const [loadedDisplayImg_mdl_2_1_all, setLoadedDisplayImg_mdl_2_1_all] = useState()
  // const [displayImg_mdl_1, setDisplayImg_mdl_1] = useState(find(refactorList, (data) => data.key === "mdl_1")?.refactorData?.image || '')
  // const [loadedDisplayImg_mdl_1, setLoadedDisplayImg_mdl_1] = useState()
  // const [displayImg_mdl_5, setDisplayImg_mdl_5] = useState(find(refactorList, (data) => data.key === "mdl_5")?.refactorData?.image || '')
  // const [loadedDisplayImg_mdl_5, setLoadedDisplayImg_mdl_5] = useState()
  // const [displayImg_mdl_3, setDisplayImg_mdl_3] = useState(find(refactorList, (data) => data.key === "mdl_3")?.mdlData?.url || '')
  // const [loadedDisplayImg_mdl_3, setLoadedDisplayImg_mdl_3] = useState()
  // const [displayImg_mdl_4_1, setDisplayImg_mdl_4_1] = useState(find(refactorList, (data) => data.key === "mdl_4_1")?.refactorData?.image || '')
  // const [loadedDisplayImg_mdl_4_1, setLoadedDisplayImg_mdl_4_1] = useState()
  // const [displayImg_mdl_4_2, setDisplayImg_mdl_4_2] = useState(find(refactorList, (data) => data.key === "mdl_4_2")?.refactorData?.image || '')
  // const [loadedDisplayImg_mdl_4_2, setLoadedDisplayImg_mdl_4_2] = useState()
  // const [displayImg_mdl_6, setDisplayImg_mdl_6] = useState(find(refactorList, (data) => data.key === "mdl_6")?.refactorData?.image || '')
  // const [loadedDisplayImg_mdl_6, setLoadedDisplayImg_mdl_6] = useState()
  const [displayMdl, setDisplayMdl] = useState('mdl_2_1')
  const [dlWip, setDlWip] = useState()
  const [refactorList, setRefactorList] = useState(list)
  const [shareImage, setShareImage] = useState()
  const [openWebShare, setOpenWebShare] = useState()
  const [showMusic, setShowMusic] = useState()
  const [song, setSong] = useState()

  const onShare = (e, selector) => {
    pushGTMShare()
    if (!isFbInapp) {
      if (!!navigator?.share) {
        prepareShareImage(e, selector)
      } else {
        downloadImage(e, selector)
      }
    } else {
      if (!!navigator?.share) {
        prepareShareImage(e, selector)
      } else {
        downloadImage(e, selector)
      }
    }
    
    // if (device === 'desktop') {
    //   downloadImage(e, selector)
    // } else {
    //   prepareShareImage(e, selector)
    // }
  }

  const prepareShareImage = (e, selector) => {
    // shareImage
    const el = document.querySelector(selector || `.main_wrapper-${displayMdl}`)
    if (!el) {
      return
    }
    if (!dlWip) {
      setLoading(true)
      setDlWip(true)
      setTimeout(() => {
        domtoimage.toBlob(el).then(blob1 => {
          domtoimage.toBlob(el).then(blob2 => {
            domtoimage.toBlob(el).then(blob3 => {
              console.log(blob3, 'blob3')
              const shareData = {
                files: [new File([blob3], 'share.jpg', { type: "image/jpeg", lastModified: new Date().getTime() })]
              }
              setShareImage(shareData)
              setDlWip(false)
              setLoading(false)
              setOpenWebShare(true)
            })
          })
        })
      }, 500)
    }
  }

  const share = () => {
    if (shareImage) {
      try {
        navigator.share(shareImage).catch(() => console.log('canceled share'))
      } catch {
        console.log('web share not support')
        navigator.share({
          title: '2022 MOOV 音樂之旅',
          text: '立即與小粉團一起展開2022 MOOV音樂之旅，並與好友分享你的年度音樂報告吧！',
          url: `${APP_URL}?uid=${uid}`
        })
      }
      setOpenWebShare(false)
    }
  }
  
  const preloadList = async () => {
    const newList = await Promise.all(
      map(list, async (listItem) => {
        if (listItem?.refactorData?.image) {
          listItem.refactorData.image = await addImageProcess(listItem?.refactorData?.image).then(() => {
            console.log(listItem?.refactorData?.image, 'debug image 1 loaded')
            return listItem?.refactorData?.image
          }).catch((e) => {
            console.log(listItem?.refactorData?.image, 'debug image 1 cannot load')
            return '/fansreport/2022/assets/png/placeholder-artist.png'
          })
        }
  
        if (listItem?.mdlData?.url) {
          listItem.mdlData.url = await addImageProcess(listItem?.mdlData?.url).then(() => {
            console.log(listItem?.mdlData?.url, 'debug image 2 loaded')
            return listItem?.mdlData?.url
          }).catch((e) => {
            console.log(listItem?.mdlData?.url, 'debug image 2 cannot load')
            return '/fansreport/2022/assets/png/placeholder-artist.png'
          })
        }
  
        return listItem
      })
    )
    setRefactorList(newList)
  }

  useEffect(() => {
    preloadList()

    // hack
    window.gsap = gsap
  }, [])

  const ref = useRef()

  const playMusic = () => {
    if (!playedMusic) {
      setPlayedMusic(true)
      song.play();
    }
  };
  
  const pauseMusic = () => {
    if (playedMusic) {
      setPlayedMusic(false)
      song.pause();
    }
  };

  const downloadImage = useCallback((e, selector) => {
    const el = document.querySelector(selector || `.main_wrapper-${displayMdl}`)
    if (!el) {
      return
    }
    if (!dlWip) {
      setLoading(true)
      setDlWip(true)
      setTimeout(() => {
        domtoimage.toJpeg(el, { quality: 1 }).then(dataUrl => {
          // console.log('call 2')
          domtoimage.toJpeg(el, { quality: 1 }).then(dataUrl1 => {
            // console.log('call 3')
            domtoimage.toJpeg(el, { quality: 1 }).then(dataUrl2 => {
              // console.log('call 4')
              // console.log(dataUrl2)
              var link = document.createElement('a');
              link.download = 'share.jpeg';
              link.href = dataUrl2;
              link.click();
              setDlWip(false)
              setLoading(false)
            })
          })
        })
      }, 500)
    }
  }, [displayMdl])

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

  const pushGTM = (page, progress, action) => {
    console.log('pushGTM', page, progress, action)
    pushTracker({
      event: 'tracking',
      params: {
        requesterId: requesterHash,
        progress,
        page,
        action,
      },
    })
  }

  const pushGTMShare = () => {
    pushGTM(currentMdl.current, pageNumRef.current, 'share')
  }

  function ticket_moving(){
    gsap.to(".ticket", {
        rotate:1,
        duration: .5,
        yoyo:true,
        repeat:-1,
        repeatDelay:0
      });
    gsap.to(".index_cloud", {
      xPercent:-320,
      duration:40
    })
      // return () => {
      // }
  }
  
  const pageNumRef = useRef(isNull(p) ? 1 : toNumber(p))
  
  function index_dismiss(){
    if (find(refactorList, (data) => data.key === "mdl_2_1_all") && find(refactorList, (data) => data.key === "mdl_2_2")) {
      let tl = gsap.timeline({
        onStart: function(){ 
          //gsap.set('.scene01_near', {x: 100, opacity: 0.5});
        },
        onComplete: function(){ 
          //scene1_anime()
          const pageNum = 1
          pageNumRef.current = pageNum
          gsap.set(".index_page", {zIndex:0});
          //let indexPage = document.querySelectorAll(".index_page")
          //indexPage.style.left = 500+'px';
          result_in()
        },
      });
      tl.to('.index_page', {
          autoAlpha:0,
          duration: 1
        })
        .to('.scene01_tree', {
          x:-600,
          duration: .8,
          repeat:3
        },0)
        .from('.scene01_far', {
          xPercent:50,
          duration: 6
        },0)
        .from('.scene01_mid', {
          xPercent:80,
          duration: 6
        },0)
        .from('.scene01_near', {
          xPercent:100,
          duration: 6
        },0);
    } else {
      anime_S2()
    }
    
      //return tl;
  }
  
  
  function mochi_anime(){
    //var steppedEase = new steppedEase(5);
    gsap.to(".carriage_mochi img", {
      duration: 3,
      x:-320, 
      ease:"steps(2)",
      yoyo:true,
      repeat: -1
    });
    
  }
  
  function anime_S2(){
    if (find(refactorList, (data) => data.key === "mdl_1") || find(refactorList, (data) => data.key === "mdl_5")) {
      if (find(refactorList, (data) => data.key === "mdl_1")) {
        currentMdl.current = 'mdl_1'
      } else if (find(refactorList, (data) => data.key === "mdl_5")) {
        currentMdl.current = 'mdl_5'
      }

      let tl = gsap.timeline({  
        onStart: function(){ 
          gsap.to('#resultPage',{left:-500})
        },
        onComplete: function(){ 
          //scene1_anime()
          const pageNum = 2
          pageNumRef.current = pageNum
          gsap.set('#resultPage',{left:500, x:0})
          gsap.set(".result", {display:"none"});
          // gsap.set(".mochi",{autoAlpha:0,yPercent:50,})
          gsap.set(".footer_icon",{autoAlpha:0,yPercent:10,})
          result_in()
        },
      });
      tl
        .to('.scene02_tree', {
          x:-600,
          duration: .8,
          repeat:3
        },0)
        .from('.scene02_far', {
          xPercent:50,
          duration: 6
        },0)
        .from('.scene02_mid', {
          xPercent:80,
          duration: 6
        },0)
        .from('.scene02_near', {
          xPercent:100,
          duration: 6
        },0);
    } else {
      pageNumRef.current = pageNumRef.current + 1
      currentMdl.current = 'mdl_3'
      gsap.set(".scene02", {display:"none"});
      play_anime()
    }
  }

  function anime_S3(){
    if (find(refactorList, (data) => data.key === "mdl_3") || find(refactorList, (data) => data.key === "mdl_4_1") || find(refactorList, (data) => data.key === "mdl_4_2")) {
      if (find(refactorList, (data) => data.key === "mdl_3")) {
        currentMdl.current = 'mdl_3'
      } else if (find(refactorList, (data) => data.key === "mdl_4_1")) {
        currentMdl.current = 'mdl_4_1'
      } else if (find(refactorList, (data) => data.key === "mdl_4_2")) {
        currentMdl.current = 'mdl_4_2'
      }
      let tl = gsap.timeline({
        onStart: function(){ 
          gsap.to('#resultPage',{left:-500})
        },
        onComplete: function(){ 
          //scene1_anime()
          const pageNum = 3
          pageNumRef.current = pageNum
          gsap.set('#resultPage',{left:500, x:0})
          gsap.set(".result", {display:"none"});
          // gsap.set(".mochi",{autoAlpha:0,yPercent:50,})
          gsap.set(".footer_icon",{autoAlpha:0,yPercent:10,})
          result_in()
        },
      });
      tl
        .to('.scene03_tree', {
          x:-600,
          duration: .8,
          repeat:3
        },0)
        .from('.scene03_far', {
          xPercent:50,
          duration: 6
        },0)
        .from('.scene03_mid', {
          xPercent:80,
          duration: 6
        },0)
        .from('.scene03_near', {
          xPercent:100,
          duration: 6
        },0);
    } else {
      pageNumRef.current = pageNumRef.current + 1
      currentMdl.current = 'mdl_7'
      gsap.set(".scene03", {display:"none"});
      play_anime()
    }
  }
  function anime_S4(){
    if (find(refactorList, (data) => data.key === "mdl_7") || find(refactorList, (data) => data.key === "mdl_6")) {
      if (find(refactorList, (data) => data.key === "mdl_7")) {
        currentMdl.current = 'mdl_7'
      } else if (find(refactorList, (data) => data.key === "mdl_6")) {
        currentMdl.current = 'mdl_6'
      }
      let tl = gsap.timeline({
        onStart: function(){ 
          gsap.to('#resultPage',{left:-500})
        },
        onComplete: function(){ 
          //scene1_anime()
          const pageNum = 4
          pageNumRef.current = pageNum
          gsap.set('#resultPage',{left:500, x:0})
          gsap.set(".result", {display:"none"});
          // gsap.set(".mochi",{autoAlpha:0,yPercent:50,})
          gsap.set(".footer_icon",{autoAlpha:0,yPercent:10,})
          result_in()
        },
      });
      tl
        .to('.scene04_tree', {
          x:-600,
          duration: .8,
          repeat:3
        },0)
        .from('.scene04_far', {
          xPercent:50,
          duration: 6
        },0)
        .from('.scene04_mid', {
          xPercent:80,
          duration: 6
        },0)
        .from('.scene04_near', {
          xPercent:100,
          duration: 6
        },0);
    } else {
      pageNumRef.current = pageNumRef.current + 1
      gsap.set(".scene04", {display:"none"});
      play_anime()
    }
      //return tl;
  }
  function anime_S5(){
    let tl = gsap.timeline({
      onStart: function(){ 
        gsap.to('#resultPage',{left:-500})
        gsap.set('.carriage',{display:"none"})
        gsap.set('.carriage_final',{display:"block"})
      },
      onComplete: function(){ 
        //scene1_anime()
        const pageNum = 5
        pageNumRef.current = pageNum
        gsap.set('#resultPage',{left:500, x:0})
        gsap.set(".result", {display:"none"});
        //result_in()
        show_result5()
      },
    });
    tl
      .to('.scene05_tree', {
        x:-600,
        duration: .8,
        repeat:3
      },0)
      .from('.scene05_far', {
        xPercent:40,
        duration: 6
      },0)
      .from('.scene05_mid', {
        xPercent:50,
        duration: 6
      },0)
      .from('.scene05_near', {
        xPercent:90,
        duration: 6
      },0);
      //return tl;
  }
  
  function play_anime(){
    const pageNum = pageNumRef.current
    setShareImage()
    switch(pageNum) {
      case 1:
        anime_S2()
        break;
      case 2:
        anime_S3()
        break;
      case 3:
        anime_S4()
        break;
      case 4:
        anime_S5()
        break;
      default:
        //code
    }
  }

  const currentMdl = useRef('mdl_2_1')

  const pageMapping = () => {
    return pageNumRef.current
  }

  // CHECK IS THE RESULT HAVE 2nd PAGE
  function more_data(){
    const nextMdl = find(refactorList, (data) => data?.key === currentMdl?.current)?.hasNext
    setShareImage()
    // const have_2nd_result = tmp.current;
    // const pageNum = pageNumRef.current
    // console.log(have_2nd_result[pageNum]);
    
    if(!nextMdl){
      play_anime()
    } else {
      pushGTM(nextMdl, pageMapping(), 'pageview')
      const mdl = cloneDeep(currentMdl.current)
      currentMdl.current = nextMdl
      setDisplayMdl(nextMdl)
      //console.log("go to page 2")
      
      let target = `.${mdl}`
      let newTartget = `.${nextMdl}`
      gsap.to(target, {autoAlpha:0})
      gsap.to(newTartget, {display:"block"})
      gsap.set(target, {display:"none"})
  
      gsap.to(newTartget+" div", {
        stagger:.5,
        autoAlpha:1,
        duration: 1
      })
      // have_2nd_result[pageNum] = "no"
      // console.log("changed to "+have_2nd_result[pageNum])
      // tmp.current = have_2nd_result
    }
  }
  
  function result_in(){
    const pageNum = pageNumRef.current
    let tl = gsap.timeline({
      onStart: function(){
         //resultPage.style.left = 500+'px';
         gsap.set("#resultPage", {left:500});
      },
      onComplete: function(){ 
        switch(pageNum) {
          case 1:
            // show result 1
            gsap.set(`.${currentMdl.current}`, {display:"block" });
            show_result1()
            break;
          case 2:
            // show result 2
            gsap.set(`.${currentMdl.current}`, {display:"block" });
            show_result2()
            break;
          case 3:
            // show result 3
            gsap.set(`.${currentMdl.current}`, {display:"block" });
            show_result3()
            break;
          case 4:
            // show result 4
            gsap.set(`.${currentMdl.current}`, {display:"block" });
            show_result4()
            break;
          case 5:
            // show result final
            gsap.set(".last_result", {display:"block"});
            show_result5()
            break;
          default:
            // code block
        }
      },
    });
    tl.to(".result_wrapper", {
      x:-500,
      duration: .5
    });
  }

  // function show_result(resultSelector, sceneSelector){
  //   let tl = gsap.timeline({
  //     onStart: function(){
  //       //let result01 = document.querySelectorAll(".result_01");
  //       //result01.style.display = "flex";
  //     },
  //     onComplete: function(){
  //       gsap.set(".scene01", {display:"none"});
  //     },
  //   });
  //   tl.to(".result_01 div", {
  //     stagger:.5,
  //     autoAlpha:1,
  //     duration: 1
  //   })
  //   .to(".mochi", {
  //     autoAlpha:1,
  //     yPercent:-50,
  //     duration: .8
  //   })
  //   .to(".footer_icon", {
  //     autoAlpha:1,
  //     yPercent:-10,
  //     duration: .8
  //   });
  // }

  function show_result1(){
    pushGTM('mdl_2_1', pageMapping(), 'pageview')
    let tl = gsap.timeline({
      onStart: function(){
        //let result01 = document.querySelectorAll(".result_01");
        //result01.style.display = "flex";
      },
      onComplete: function(){
        gsap.set(".scene01", {display:"none"});
      },
    });
    const resultSelector = 'mdl_2_1'
    tl.to(`.${resultSelector} div`, {
      stagger:.5,
      autoAlpha:1,
      duration: 1
    })
    // .to(".mochi", {
    //   autoAlpha:1,
    //   yPercent:-50,
    //   duration: .8
    // })
    .to(".footer_icon", {
      autoAlpha:1,
      yPercent:-10,
      duration: .8
    });
  }
  function show_result2(){
    let resultSelector
    if (find(refactorList, (data) => data.key === "mdl_1")) {
      resultSelector = 'mdl_1'
    } else if (find(refactorList, (data) => data.key === "mdl_5")) {
      resultSelector = 'mdl_5'
    }
    if (resultSelector) {
      pushGTM(resultSelector, pageNumRef.current, 'pageview')
      currentMdl.current = resultSelector
      setDisplayMdl(resultSelector)
      let tl = gsap.timeline({
        onStart: function(){
          //let result02 = document.querySelectorAll(".result_02");
          //result02.style.display = "flex";
        },
        onComplete: function(){
          gsap.set(".scene02", {display:"none"});
        },
      });
      tl.to(`.${resultSelector} div`, {
        stagger:.5,
        autoAlpha:1,
        duration: 1
      })
      // .to(".mochi", {
      //   autoAlpha:1,
      //   yPercent:-50,
      //   duration: .8
      // })
      .to(".footer_icon", {
        autoAlpha:1,
        yPercent:-10,
        duration: .8
      });
    }
  }
  function show_result3(){
    let resultSelector
    if (find(refactorList, (data) => data.key === "mdl_3")) {
      resultSelector = 'mdl_3'
    } else if (find(refactorList, (data) => data.key === "mdl_4_1")) {
      resultSelector = 'mdl_4_1'
    } else if (find(refactorList, (data) => data.key === "mdl_4_2")) {
      resultSelector = 'mdl_4_2'
    }
    if (resultSelector) {
      pushGTM(resultSelector, pageNumRef.current, 'pageview')
      currentMdl.current = resultSelector
      setDisplayMdl(resultSelector)
      let tl = gsap.timeline({
        onStart: function(){
        },
        onComplete: function(){
          gsap.set(".scene03", {display:"none"});
        },
      });
      tl.to(`.${resultSelector} div`, {
        stagger:.5,
        autoAlpha:1,
        duration: 1
      })
      .to(".footer_icon", {
        autoAlpha:1,
        yPercent:-10,
        duration: .8
      });
    }
  }
  function show_result4(){
    let resultSelector
    if (find(refactorList, (data) => data.key === "mdl_7")) {
      resultSelector = 'mdl_7'
    } else if (find(refactorList, (data) => data.key === "mdl_6")) {
      resultSelector = 'mdl_6'
    }
    if (resultSelector) {
      pushGTM(resultSelector, pageNumRef.current, 'pageview')
      currentMdl.current = resultSelector
      setDisplayMdl(resultSelector)
      let tl = gsap.timeline({
        onStart: function(){
        },
        onComplete: function(){
          gsap.set(".scene04", {display:"none"});
        },
      });
      tl.to(`.${resultSelector} div`, {
        stagger:.5,
        autoAlpha:1,
        duration: 1
      })
      // .to(".mochi", {
      //   autoAlpha:1,
      //   yPercent:-50,
      //   duration: .8
      // })
      .to(".footer_icon", {
        autoAlpha:1,
        yPercent:-10,
        duration: .8
      });
    }
  }
  
  //FINAL RESULT
  function auto_scroll(){
    show_result5()
    //gsap.to(".last_result", {duration: 5, scrollTo: -250});
    gsap.to(".result_frame", {duration: 20, scrollTo: '.result_frame_end'}, 2);
  }
  //auto_scroll()
  
  function handleWheel(e) {
    /* if (!listening) return;
    const currentTime = new Date().getTime();
  
    if (currentTime - lastTime < animationDuration){
      e.preventDefault();
      return;
    }
    direction = e.wheelDeltaY < 0 ? "down" : "up"; */
  
    console.log("wheel")
  }
  
  function show_result5(){
    pushGTM('end', pageNumRef.current, 'pageview')
    let tl = gsap.timeline({
      onStart: function(){
      },
      onComplete: function(){
        //gsap.set(".scene04", {display:"none"});
      },
    });
    tl.to(".last_result div", {
      stagger:.5,
      autoAlpha:1,
      duration: 1
    })
    // tl.to(".result_frame", {
    //   duration: 5,
    //   scrollTo: 250,
    // }, 2)
    tl.to(".result_frame", {duration: 5, scrollTo: '.result_frame_end'}, 2);
    // gsap.to(".result_frame", {duration: 20, scrollTo: 250}, 2);
  }
  
  const start = () => {
    if (!uid) {
      setOpenModalPassport(true);
    } else if (!hasUser) {
      setOpenModalSphere(true);
    } else {
      index_dismiss();
      playMusic()
      setShowMusic(true)
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
    const nextIcon = document.getElementById("nextIcon");
    ticket_moving();
    mochi_anime()
    nextIcon.addEventListener("click", more_data);

    const device = require("current-device").default
    if (device.desktop()) setDevice('desktop')
    if (device.ios()) setDevice('ios')
    if (device.android()) setDevice('android')
    pushGTM('start', 0, 'pageview')
    setSong(new Audio('/fansreport/2022/assets/music/UPM_10.mp3'))
  }, [])

  return (
    <>
      <Block className={`main_wrapper main_wrapper-${displayMdl}`} ref={ref}>
        <Block className="carriage_wrapper">
            <Block className="carriage_background">
                <Block className="scene01">
                    <Block className="scene01_far">
                        <img src="/fansreport/2022/images/svg/s01_far.svg" alt="" />
                    </Block>
                    <Block className="scene01_mid">
                        <img src="/fansreport/2022/images/svg/s01_mid.svg" alt="" />
                    </Block>
                    
                    <Block className="scene01_near">
                        <img src="/fansreport/2022/images/svg/s01_near.svg" alt="" />
                    </Block>
                    <Block className="scene01_tree">
                        <img src="/fansreport/2022/images/svg/tree01.svg" alt="" />
                    </Block>
                </Block>
                <Block className="scene02">
                    <Block className="scene02_far">
                        <img src="/fansreport/2022/images/svg/s02_far.svg" alt="" />
                    </Block>
                    <Block className="scene02_mid">
                        <img src="/fansreport/2022/images/svg/s02_mid.svg" alt="" />
                    </Block>
                    
                    <Block className="scene02_near">
                        <img src="/fansreport/2022/images/svg/s02_near.svg" alt="" />
                    </Block>
                    <Block className="scene02_tree">
                        <img src="/fansreport/2022/images/svg/tree02.svg" alt="" />
                    </Block>
                </Block>
                <Block className="scene03">
                    <Block className="scene03_far">
                        <img src="/fansreport/2022/images/svg/s03_far.svg" alt="" />
                    </Block>
                    <Block className="scene03_mid">
                        <img src="/fansreport/2022/images/svg/s03_mid.svg" alt="" />
                    </Block>
                    
                    <Block className="scene03_near">
                        <img src="/fansreport/2022/images/svg/s03_near.svg" alt="" />
                    </Block>
                    <Block className="scene03_tree">
                        <img src="/fansreport/2022/images/svg/tree03.svg" alt="" />
                    </Block>
                </Block>
                <Block className="scene04">
                    <Block className="scene04_far">
                        <img src="/fansreport/2022/images/svg/s04_far.svg" alt="" />
                    </Block>
                    <Block className="scene04_mid">
                        <img src="/fansreport/2022/images/svg/s04_mid.svg" alt="" />
                    </Block>
                    
                    <Block className="scene04_near">
                        <img src="/fansreport/2022/images/svg/s04_near.svg" alt="" />
                    </Block>
                    <Block className="scene04_tree">
                        <img src="/fansreport/2022/images/svg/tree04.svg" alt="" />
                    </Block>
                </Block>
                <Block className="scene05">
                    <Block className="scene05_far">
                        <img src="/fansreport/2022/images/svg/s05_far.svg" alt="" />
                    </Block>
                    <Block className="scene05_mid">
                        <img src="/fansreport/2022/images/svg/s05_mid.svg" alt="" />
                    </Block>
                    
                    <Block className="scene05_near">
                        <img src="/fansreport/2022/images/svg/s05_near.svg" alt="" />
                    </Block>
                    <Block className="scene05_tree">
                        <img src="/fansreport/2022/images/svg/tree05.svg" alt="" />
                    </Block>
                    <Block className="result_frame" overflowY="auto">
                        <Block className="last_result" pb="200px" pt="140px">
                            {find(refactorList, (data) => data.key === "mdl_7") && (
                              <Block className="result_data result_section">
                                  <p>2022年與 MOOV 一起度過</p>
                                  <h2><span>{Math.round(((find(refactorList, (data) => data.key === "mdl_7")?.mdlData?.total_time_sec || 0) / 3600) * 10) /
                  10} 小時</span></h2>
                              </Block>  
                            )}
                            
                            {find(refactorList, (data) => data.key === "mdl_2_1_local") && (
                              <Block className="result_data result_section">
                                <p>最愛歌手(本地)Top 3</p>
                                <br />
                                <ol>
                                    {map(find(refactorList, (data) => data.key === "mdl_2_1_local")?.refactorData || [], (item, key) => (
                                      <li key={`local-top3-${key}`}>
                                        {item.label}
                                      </li>
                                    ))}
                                </ol>
                            </Block>
                            )}
                            
                            {find(refactorList, (data) => data.key === "mdl_2_1_nonlocal") && (
                              <Block className="result_data result_section">
                                <p>最愛歌手(外語)Top 3</p>
                                <br />
                                <ol>
                                    {map(find(refactorList, (data) => data.key === "mdl_2_1_nonlocal")?.refactorData || [], (item, key) => (
                                      <li key={`nonlocal-top3-${key}`}>
                                        {item.label}
                                      </li>
                                    ))}
                                </ol>
                            </Block>
                            )}
                            
                            <Block className="result_data result_section">
                                <p>我的年度之歌</p>
                                <Block pt="10px"><img src={find(refactorList, (data) => data.key === "mdl_1")?.refactorData?.image || ''} alt="" /></Block>
                                <h2>{find(refactorList, (data) => data.key === "mdl_1")?.refactorData?.label || ''}</h2>
                                <p>全年共聽<span>{find(refactorList, (data) => data.key === "mdl_1")?.refactorData?.num}</span>次</p>
                            </Block>
                        </Block>
                        <Block className="result_frame_end" />
                    </Block>
                </Block>
            </Block>
            <Block className="carriage">
                <Block className="carriage_top"><img src="/fansreport/2022/images/svg/carriage01.svg" alt="" /></Block>
                <Block className="carriage_bottom"><img src="/fansreport/2022/images/svg/carriage02.svg" alt="" /></Block>
                <Block className="carriage_mochi"><img src="/fansreport/2022/images/svg/Characters_Final3.svg" alt="" /></Block>
            </Block>
            <Block className="carriage_final">
                <Block className="carriage_top"><img src="/fansreport/2022/images/svg/carriage_top_fin.svg" alt="" /></Block>
                <Block className="carriage_bottom"><img src="/fansreport/2022/images/svg/carriage_bottom_fin.svg" alt="" /></Block>
                <Block className="listen_btn" onClick={() => pushGTM('end', 5, 'top50')}>
                  <a href={deepLinkData?.shortLink || ""}><img src="/fansreport/2022/images/svg/listen_btn.svg" alt="" /></a>
                </Block>
                <Block display="flex" position="absolute" bottom="10px" right="10px">
                  <Block className="share_icon" onClick={() => pushGTM('end', 5, 'share')} cursor="pointer" width="40px">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        `${APP_URL}?uid=${uid}`
                      )}`}
                      target="_blank"
                    >
                      <img src="/fansreport/2022/images/svg/icon_facebook.svg" alt="" />
                    </a>
                  </Block>
                  <Block pl="20px">
                    <Block className={`download_btn  download-${displayMdl || ''}`} onClick={(e) => onShare(e, '.final-stop-download')} cursor="pointer"><img src="/fansreport/2022/images/svg/download_btn.svg" alt="" /></Block>
                  </Block>
                </Block>
            </Block>
        </Block>

        {showMusic && !dlWip && (
              <Block zIndex="2000" position="absolute" left="10px" top="10px">
                {playedMusic && (
                  <Block onClick={pauseMusic}><SvgMusicOff /></Block>
                )}
                {!playedMusic && (
                  <Block onClick={playMusic}><SvgMusicOn /></Block>
                )}
              </Block>
            )}
        <Block className="index_page">
            <Block className="index_mountain">
                <img src="/fansreport/2022/images/svg/mountain_index.svg" alt="" />
            </Block>
            <Block className="index_cloud">
                <img src="/fansreport/2022/images/svg/cloud_index.svg" alt="" />
            </Block>
            <Block className="backpack">
                <img src="/fansreport/2022/images/svg/Backpack.svg" alt="" />
                <Block id="ticket" className="ticket" onClick={start} cursor="pointer">
                    <img src="/fansreport/2022/images/svg/Ticket.svg" alt="" />
                </Block>
            </Block>
            <Block className="index_mochi">
                <img src="/fansreport/2022/images/svg/Character_index.svg" alt="" />
            </Block>
            {/* <Block onClick={(e) => downloadImage(e, '.final-stop-download')} cursor="pointer">download</Block> */}
        </Block>

        <Block position="fixed" width="100%" height="100%" top="0" left="0" className="final-stop" zIndex="-5000" opacity="0">
        {/* <Block position="fixed" width="100%" height="100%" top="0" left="0" className="final-stop" zIndex="5000" opacity="1"> */}
          <Block width="100%" height="100%" top="0" left="0" overflowY="scroll" overflowX="hidden">
            <FinalStopDownload width="100%" minHeight="100%" display="flex" flexDirection="column" justifyContent="space-between" className="final-stop-download">
              <Block width="100%" display="block">
                <img
                  src="/fansreport/2022/assets/png/final-top.png"
                  alt=""
                  width="100%"
                />
              </Block>
              <Block width="100%" flex="1" display="block">
                <Block position="absolute" top="0" left="0" width="100%" height="100%">
                  <img
                    src="/fansreport/2022/assets/png/final-mid.png"
                    alt=""
                    height="100%"
                    className="final-mid"
                  />
                </Block>
                <Block className="last_result_download" pl="250px">
                {find(refactorList, (data) => data.key === "mdl_7") && (
                              <Block className="result_section">
                                  <p>2022年與 MOOV 一起度過</p>
                                  <h2><span>{Math.round(((find(refactorList, (data) => data.key === "mdl_7")?.mdlData?.total_time_sec || 0) / 3600) * 10) /
                  10} 小時</span></h2>
                              </Block>  
                            )}
                            
                            {find(refactorList, (data) => data.key === "mdl_2_1_local") && (
                              <Block className="result_section">
                                <p>最愛歌手(本地)Top 3</p>
                                <br />
                                <ol>
                                    {map(find(refactorList, (data) => data.key === "mdl_2_1_local")?.refactorData || [], (item, key) => (
                                      <li key={`local-top3-${key}`}>
                                        {item.label}
                                      </li>
                                    ))}
                                </ol>
                            </Block>
                            )}
                            
                            {find(refactorList, (data) => data.key === "mdl_2_1_nonlocal") && (
                              <Block className="result_section">
                                <p>最愛歌手(外語)Top 3</p>
                                <br />
                                <ol>
                                    {map(find(refactorList, (data) => data.key === "mdl_2_1_nonlocal")?.refactorData || [], (item, key) => (
                                      <li key={`nonlocal-top3-${key}`}>
                                        {item.label}
                                      </li>
                                    ))}
                                </ol>
                            </Block>
                            )}
                            
                            <Block className="result_section">
                                <p>我的年度之歌</p>
                                <Block pt="10px"><img src={find(refactorList, (data) => data.key === "mdl_1")?.refactorData?.image || ''} alt="" /></Block>
                                <h2>{find(refactorList, (data) => data.key === "mdl_1")?.refactorData?.label || ''}</h2>
                                <p>全年共聽<span>{find(refactorList, (data) => data.key === "mdl_1")?.refactorData?.num}</span>次</p>
                            </Block>
                </Block>
              </Block>
              <Block width="100%" display="block">
                <img
                  src="/fansreport/2022/assets/png/final-bottom.png"
                  alt=""
                  width="100%"
                />
              </Block>
            </FinalStopDownload>
          </Block>
        </Block>

        <Block id="resultPage" className="result_wrapper" flexWrap="wrap" minHeight="inherit">
            <Block className="result_frame" display="flex" alignItems="center">
              <Block display="flex" alignItems="flex-start" flexDirection="column" width="100%" pt="10px">
                {/* mdl_2_1 */}
                <Block className="result result_01 mdl_2_1">
                    <Block className="result_data stamp" mx="auto">
                        <img src="/fansreport/2022/assets/png/tag_favartist.png" alt="" />
                    </Block>
                    <Block className="result_data key_result">
                      <Block width="60%" position="relative" mx="auto">
                        <img src={find(refactorList, (data) => data.key === "mdl_2_1_all")?.refactorData?.image} width="100%" alt="" />
                      </Block>
                      <h1>{find(refactorList, (data) => data.key === "mdl_2_1_all")?.refactorData?.label || ''}</h1>
                    </Block>
                    <Block className="result_data text_contents" px="20px">
                        <p>總共聽咗佢嘅歌<span>{find(refactorList, (data) => data.key === "mdl_2_1_all")?.refactorData?.num || 0}</span>次，犀利啊！</p>
                        <p>而佢嘅作品之中你聽得最多嘅係</p>
                        <Block><h2>{find(refactorList, (data) => data.key === "mdl_2_2")?.product?.product_title || ''}</h2></Block>
                        <p>相信呢首歌對你一定有不一樣的意義!</p>
                    </Block>
                    {/* <Block className="emptyspace"></Block> */}
                </Block>
                {/* mdl_1 */}
                <Block className="result result_02 mdl_1">
                    <Block className="result_data stamp" mx="auto">
                        <img src="/fansreport/2022/assets/png/tag_favsong.png" alt="" />
                    </Block>
                    <Block className="result_data key_result">
                      <Block width="60%" position="relative" mx="auto">
                        {find(refactorList, (data) => data.key === "mdl_1")?.refactorData?.image && (
                          <img
                            src={find(refactorList, (data) => data.key === "mdl_1")?.refactorData?.image}
                            width="100%"
                            alt=""
                          />
                        )}
                        
                      </Block>
                      <Block textAlign="center" pt="8px"><p>2022 年你最喜愛嘅歌曲係</p></Block>
                      <Block px="20px"><h1>{find(refactorList, (data) => data.key === "mdl_1")?.refactorData?.label || ''}</h1></Block>
                    </Block>
                    <Block className="result_data text_contents">
                        <p>鍾意到聽咗<span>{find(refactorList, (data) => data.key === "mdl_1")?.refactorData?.num || 0}</span>次。</p>
                        <p>咁鍾意一定有特別嘅原因喇！</p>
                    </Block>
                </Block>

                {/* mdl_5 */}
                <Block className="result result_02b mdl_5">
                    <Block className="result_data text_contents" px="20px">
                        <p>你仲記唔記得上年<br />
                            係咁聽 {find(refactorList, (data) => data.key === "mdl_5")?.refactorData?.label || ''} 呢一首歌？<br />
                            似乎今年你遺忘咗佢...</p>
                    </Block>
                    <Block className="result_data key_result">
                      <Block width="60%" position="relative" mx="auto">
                        {find(refactorList, (data) => data.key === "mdl_5")?.refactorData?.image && (
                          <img
                            src={find(refactorList, (data) => data.key === "mdl_5")?.refactorData?.image}
                            alt=""
                            width="100%"
                          />
                        )}
                        
                      </Block>
                      <Block px="20px"><h1>{find(refactorList, (data) => data.key === "mdl_5")?.refactorData?.label || ''}</h1></Block>
                    </Block>
                </Block>

                {/* mdl_3 */}
                <Block className="result result_03 mdl_3">
                    <Block className="result_data text_contents">
                        <p>你知道嗎？一年四季<br />
                            MOOV 都有唔同嘅歌單<br />
                            陪你轉換心情!</p>
                    </Block>
                    <Block className="result_data stamp" mx="auto">
                        <img src="/fansreport/2022/assets/png/tag_favlist.png" alt="" />
                    </Block>
                    <Block className="result_data key_result">
                      <Block width="60%" position="relative" mx="auto">
                        {find(refactorList, (data) => data.key === "mdl_3")?.mdlData?.url && (
                          <img
                          src={find(refactorList, (data) => data.key === "mdl_3")?.mdlData?.url}
                          alt=""
                          width="100%"
                        />
                        )}
                        
                      </Block>
                      <Block textAlign="center" pt="14px">
                        <p>今年你最常聽嘅歌單係</p>
                      </Block>
                      <Block px="20px">
                        <h1>{find(refactorList, (data) => data.key === "mdl_3")?.mdlData?.chiname || ''}</h1>
                      </Block>
                    </Block>
                </Block>

                {/* mdl_4_1 */}
                <Block className="result result_03b mdl_4_1">
                    <Block className="result_data text_contents" px="15px">
                      <p>今年情人節無論係單身定係有另一半，都有音樂陪你度過。當日你聽最多嘅歌係 {find(refactorList, (data) => data.key === "mdl_4_1")?.refactorData?.label || ''}</p>
                    </Block>
                    <Block className="result_data key_result">
                      <Block width="60%" position="relative" mx="auto">
                        {find(refactorList, (data) => data.key === "mdl_4_1")?.refactorData?.image && (
                          <img
                          src={find(refactorList, (data) => data.key === "mdl_4_1")?.refactorData?.image}
                          alt=""
                          width="100%"
                        />
                        )}
                        
                      </Block>
                      <Block px="20px"><h1>{find(refactorList, (data) => data.key === "mdl_4_1")?.refactorData?.label || ''}</h1></Block>
                    </Block>
                </Block>

                {/* mdl_4_2 */}
                <Block className="result result_03b mdl_4_2">
                    <Block className="result_data text_contents">
                        <p>今年中秋，除咗有圓月、月餅、燈籠，<br />仲有呢首歌陪住你</p>
                    </Block>
                    <Block className="result_data key_result">
                    <Block width="60%" position="relative" mx="auto">
                      {find(refactorList, (data) => data.key === "mdl_4_2")?.refactorData?.image && (
                        <img
                        src={find(refactorList, (data) => data.key === "mdl_4_2")?.refactorData?.image}
                        alt=""
                        width="100%"
                      />
                      )}
                      
                    </Block>
                    <Block px="20px"><h1>{find(refactorList, (data) => data.key === "mdl_4_2")?.refactorData?.label}</h1></Block>
                  </Block>
                </Block>

                {/* mdl_7 */}
                <Block className="result result_04 mdl_7">
                    <Block className="result_data stamp" mx="auto">
                        <img src="/fansreport/2022/assets/png/tag_memories.png" alt="" />
                    </Block>
                    <Block className="result_data text_contents" pt="10px">
                        <p>感謝你今年同 MOOV 一齊度過咗</p>
                    </Block>
                    <Block className="result_data key_result">
                        <h1>{Math.round(((find(refactorList, (data) => data.key === "mdl_7")?.mdlData?.total_time_sec || 0) / 3600) * 10) /
                10} 小時</h1>
                    </Block>
                    <Block className="result_data text_contents">
                        <p>約定下年都要繼續一齊聽歌！</p>
                    </Block>
                </Block>

                {/* mdl_6 */}
                <Block className="result result_04b mdl_6">
                    <Block className="result_data text_contents">
                        <Block px="20px">
                          <p>或者你可能已經忘記咗喇...<br />
                              你嘅2022年,係由 {find(refactorList, (data) => data.key === "mdl_6")?.refactorData?.label} 呢首歌開始</p>
                        </Block>
                          <Block py="8px">
                            <Block width="60%" position="relative" mx="auto">
                              {find(refactorList, (data) => data.key === "mdl_6")?.refactorData?.image && (
                                <img
                                src={find(refactorList, (data) => data.key === "mdl_6")?.refactorData?.image}
                                alt=""
                                width="100%"
                              />
                              )}
                              
                            </Block>
                          </Block>
                    </Block>
                    <Block px="20px" textAlign="center"><h1>{find(refactorList, (data) => data.key === "mdl_6")?.refactorData?.label}</h1></Block>
                    <Block className="result_data text_contents">
                        <p>期待 2023 年會有不一樣嘅新轉變！</p>
                    </Block>
                </Block>
              </Block>
            </Block>
            <Block className="station_footer" px="20px" position="sticky" bottom="0" width="100%" flex="0 0 100%" pt="20px" alignSelf="flex-end" display={dlWip ? 'none' : 'flex'} flexWrap="wrap">
                <Block className="footer_icon station_share">
                    <Block display="flex">
                      <Block className="share_icon" onClick={pushGTMShare} cursor="pointer">
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            `${APP_URL}?uid=${uid}`
                          )}`}
                          target="_blank"
                        >
                          <img src="/fansreport/2022/images/svg/icon_facebook.svg" alt="" />
                        </a>
                      </Block>
                      <Block pl="20px">
                        <Block className={`download_btn download_btn_footer  download-${displayMdl || ''}`} onClick={onShare} cursor="pointer"><img src="/fansreport/2022/images/svg/download_btn.svg" alt="" /></Block>
                      </Block>
                    </Block>
                </Block>
                {/* <Block className="mochi"><img src="/fansreport/2022/images/svg/mochi_stop.svg" alt="" /></Block> */}
                <Block className="footer_icon next">
                    <Block id="nextIcon" className="next_icon" cursor="pointer"><img src="/fansreport/2022/images/svg/icon_next.svg" alt="" /></Block>
                </Block>

                {/* <Block className="pointer-event" flex="0 0 100%">
                  <Block onClick={prepareShareImage}>prepareShareImage</Block>
                  {shareImage && <Block onClick={share}>share</Block>}
                </Block> */}
            </Block>
        </Block>


        <Modal open={openModalPassport} onClose={handleCloseModalPassport}>
          <BoxPassport01>
            <ImgPassport01>
              <img src={imgPassport01.src} width="100%" height="100%" alt="" />
            </ImgPassport01>
            <TextPassport01>
            想同小粉團一齊展開2022 MOOV音樂之旅？
            </TextPassport01>
            <a href={url}>
              <ButtonUpdate01>立即登入</ButtonUpdate01>
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
      </Block>
      {loading && <Loading />}
      {openWebShare && <WebShare share={share} closeWebShare={() => setOpenWebShare(false)} />}
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { query } = ctx
  const { uid, p = null } = query

  const isFbInapp = !!(ctx?.req?.headers?.['user-agent'] || '').match(/(fban|fbav)/i)

  const API_URL = get(process, 'env.API_URL')
  const requesterId = new Date().getTime() + Math.random() * (999999 - 100000) + 100000
  const requesterHash = crypto.createHash('md5').update(requesterId.toString()).digest("hex")
  let deepLinkData
  try {
    deepLinkData = await axios.post('https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAziMOzzwVLtkC-SK0jx1d1879mAh3h-8M', {
    longDynamicLink: `https://app.moov-music.com/?link=https%3A%2F%2Fmoov.hk%2F%23%2Fuser%2Fpersonalchart%2F${uid}&apn=com.now.moov&ibi=com.moov.togo&isi=436310157&efr=1`
  })
    .then(({data}) => data)
    .catch((e) => console.log(e))
  } catch (e) {
    console.log(e)
  }

  const data = await axios.get(`${API_URL}/mdl/${uid}`).then(({ data }) => {
    return data
  })

  const hasUser = await axios.get(`${API_URL}/check-user/${uid}`).then(({ data }) => {
    return data !== false
  })

  return {
    props: {
      query,
      deepLinkData,
      hasUser,
      data,
      requesterHash,
      p,
      isFbInapp,
    },
  }
}

export default Home

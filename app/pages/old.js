import Home from "./Home";
import Stop01 from "./Stop01";
import Stop021 from "./Stop021";
import Stop022 from "./Stop022";
import Stop031 from "./Stop031";
import Stop032 from "./Stop032";
import Stop033 from "./Stop033";
import Stop041 from "./Stop041";
import Stop042 from "./Stop042";
import Stop051 from "./Stop051";
import { useEffect, useState } from 'react'
import get from 'lodash/get'
import map from 'lodash/map'
import filter from 'lodash/filter'
import find from 'lodash/find'
import axios from 'axios'
import Block from '/components/Common/Element/Block'
import crypto from 'crypto'
import { pushTracker } from '/lib/gtm'
import isNull from 'lodash/isNull'
import toNumber from 'lodash/toNumber'

const Main = (props) => {
  const { data, hasUser, query, deepLinkData, h, updateImage: propUpdateImage, setNoAnimation, requesterHash, p } = props
  const list = map(
    get(data, 'list', []),
    (item) => {
      return item
    }
  )
  console.log(list, 'list')
  // const list = filter(
  //   map(
  //     get(data, 'list', []),
  //     (item) => {
  //       console.log(item, 'item')
  //       return item
  //     }
  //   ),
  //   (item) => (
  //     item.key !== 'mdl_1' &&
  //     item.key !== 'mdl_5'
  //     && item.key !== 'mdl_3'
  //     && item.key !== 'mdl_4_1'
  //     && item.key !== 'mdl_4_2'
  //     && item.key !== 'mdl_7'
  //     && item.key !== 'mdl_6'
  //   )
  // )
  const initialProgress = isNull(p) ? -1 : toNumber(p)
  const [progress, setProgress] = useState(initialProgress)
  const [device, setDevice] = useState('desktop')

  const updateImage = async () => {
    await propUpdateImage()
  }
  
  const next = () => {
    if (progress < 0) {
      setProgress(0)
    } else {
      setProgress(progress + 1)
    }
    setNoAnimation()
  }
  let component = <Home next={next} device={device} query={query} hasUser={hasUser} updateImage={updateImage} />
  let stopData = []

  const pushGTM = (page, action) => {
    pushTracker({
      event: 'tracking',
      params: {
        requesterId: requesterHash,
        progress: progress + 2,
        page,
        action,
      },
    })
  }

  console.log(progress, 'progress')
  
  let skipAnimation = false
  switch (progress) {
    case 0:
      stopData = filter(list || [], (item) => item.key === 'mdl_2_1_all' || item.key === 'mdl_2_2')
      if (stopData.length === 0) {
        pushGTM('mdl_2_skip', 'pageview')
        // skip
        setProgress(progress + 1)
      }
      component = <Stop01 stopData={stopData} next={next} query={query} h={h} updateImage={updateImage} className="stop-01" shareCallback={(action) => pushGTM('mdl_2', action)} />
      pushGTM('mdl_2', 'pageview')
      break
    case 1:
      stopData = filter(list || [], (item) => item.key === 'mdl_1')
      if (stopData.length === 0) {
        pushGTM('mdl_1_skip')
        // skip
        setProgress(progress + 1)
        break
      }
      component = <Stop021 stopData={stopData} next={next} query={query} h={h} updateImage={updateImage} className="stop-021" shareCallback={(action) => pushGTM('mdl_1', action)} />
      pushGTM('mdl_1', 'pageview')
      break
    case 2:
      stopData = filter(list || [], (item) => item.key === 'mdl_5')
      if (stopData.length === 0) {
        pushGTM('mdl_5_skip', 'pageview')
        // skip
        setProgress(progress + 1)
        break
      }
      skipAnimation = !!(
        find(list, (item) => item.key === 'mdl_1')
      )
      component = <Stop022 stopData={stopData} next={next} query={query} h={h} updateImage={updateImage} shareCallback={(action) => pushGTM('mdl_5', action)} skipAnimation={skipAnimation} />
      pushGTM('mdl_5', 'pageview')
      break
    case 3:
      stopData = filter(list || [], (item) => item.key === 'mdl_3')
      if (stopData.length === 0) {
        pushGTM('mdl_3_skip', 'pageview')
        // skip
        setProgress(progress + 1)
        break
      }
      component = <Stop031 stopData={stopData} next={next} query={query} h={h} updateImage={updateImage} shareCallback={(action) => pushGTM('mdl_3', action)} />
      pushGTM('mdl_3', 'pageview')
      break
    case 4:
      stopData = filter(list || [], (item) => item.key === 'mdl_4_1')
      if (stopData.length === 0) {
        pushGTM('mdl_4_1_skip')
        // skip
        setProgress(progress + 1)
        break
      }
      skipAnimation = !!(
        find(list, (item) => item.key === 'mdl_3')
      )
      component = <Stop032 stopData={stopData} next={next} query={query} h={h} updateImage={updateImage} shareCallback={(action) => pushGTM('mdl_4_1', action)} skipAnimation={skipAnimation} />
      pushGTM('mdl_4_1', 'pageview')
      break
    case 5:
      stopData = filter(list || [], (item) => item.key === 'mdl_4_2')
      if (stopData.length === 0) {
        pushGTM('mdl_4_2_skip', 'pageview')
        // skip
        setProgress(progress + 1)
        break
      }
      skipAnimation = !!(
        find(list, (item) => item.key === 'mdl_3') ||
        find(list, (item) => item.key === 'mdl_4_1')
      )
      component = <Stop033 stopData={stopData} next={next} query={query} h={h} updateImage={updateImage} shareCallback={(action) => pushGTM('mdl_4_2', action)} skipAnimation={skipAnimation} />
      pushGTM('mdl_4_2', 'pageview')
      break
    case 6:
      stopData = filter(list || [], (item) => item.key === 'mdl_7')
      if (stopData.length === 0) {
        pushGTM('mdl_7_skip')
        // skip
        setProgress(progress + 1)
        break
      }
      component = <Stop041 stopData={stopData} next={next} query={query} h={h} updateImage={updateImage} shareCallback={(action) => pushGTM('mdl_7', action)} />
      pushGTM('mdl_7', 'pageview')
      break
    case 7:
      stopData = filter(list || [], (item) => item.key === 'mdl_6')
      if (stopData.length === 0) {
        pushGTM('mdl_6_skip', 'pageview')
        // skip
        setProgress(progress + 1)
        break
      }
      skipAnimation = !!(
        find(list, (item) => item.key === 'mdl_7')
      )
      component = <Stop042 stopData={stopData} next={next} query={query} h={h} updateImage={updateImage} shareCallback={(action) => pushGTM('mdl_6', action)} skipAnimation={skipAnimation} />
      pushGTM('mdl_6', 'pageview')
      break
    case 8:
      // stopData = filter(list || [], (item) => item.key === 'mdl_4_2')
      component = <Stop051 next={next} device={device} deepLinkData={deepLinkData} query={query} h={h} updateImage={updateImage} shareCallback={(action) => pushGTM('end', action)} stopData={list} />
      pushGTM('end', 'pageview')
      break
  } 

  useEffect(() => {
    const device = require("current-device").default
    if (device.desktop()) setDevice('desktop')
    if (device.ios()) setDevice('ios')
    if (device.android()) setDevice('android')
    pushGTM('start', 'pageview')
  }, [])
  return (
    <Block width="100%" height="100%" display="flex" justifyContent="center" alignItems="center" key={`progress-${progress}`}>
      {component}
    </Block>
  )
};

export async function getServerSideProps(ctx) {
  const { query } = ctx
  const { uid, p = null } = query

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
    },
  }
}

export default Main

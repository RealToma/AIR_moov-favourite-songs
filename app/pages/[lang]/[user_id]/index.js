import Block from '/components/Common/Element/Block'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home(props) {
  const { lang, user_id } = props
  const [data, setData] = useState()
  console.log(lang, user_id, 'params')
  useEffect(() => {
    axios.get(`/api/mdl/${user_id}`).then(({ data }) => {
      setData(data)
    })
  }, [])
  return (
    <>
    <Block>{JSON.stringify(data)}</Block>
      <Block>Home</Block>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { user_id, lang } = ctx.params
  return {
    props: {
      user_id,
      lang,
    },
  }
}
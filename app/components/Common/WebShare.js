import Block from "/components/Common/Element/Block";
import SvgClose from '/public/assets/svg/close.svg'
import SvgShare from '/public/assets/svg/ready_to_share.svg'

const WebShare = (props) => {
  const { share, closeWebShare } = props
  return (
    <Block position="fixed" top="0" left="0" bottom="0" right="0" bg="rgba(123, 197, 186, .7)" zIndex="3000" display="flex" alignItems="center" justifyContent="center">
      <Block onClick={share}>
        <SvgShare />
      </Block>
      <Block position="absolute" bottom="45px" onClick={closeWebShare}><SvgClose /></Block>
    </Block>
  )
}

export default WebShare
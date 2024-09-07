import Block from "/components/Common/Element/Block";
import SvgSpinner from '/public/assets/svg/spinner.svg'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinnerWrapper = styled(Block)`
  animation: ${rotate} 1s ease infinite;
  svg {
    display: block;
  }
`

const Loading = () => {
  return (
    <Block position="fixed" top="0" left="0" bottom="0" right="0" bg="rgba(123, 197, 186, .7)" zIndex="3000" display="flex" alignItems="center" justifyContent="center">
      <StyledSpinnerWrapper>
        <SvgSpinner />
      </StyledSpinnerWrapper>
    </Block>
  )
}

export default Loading
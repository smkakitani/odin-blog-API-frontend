// Styles
import styled from "styled-components";



// 
const redDefault = `#ff3985`; // #dc1f28
const redDisabled = `#754b5b`; // #ca88a1
const ButtonStyle = styled.button`
  cursor: pointer;

  background: linear-gradient(0deg,rgba(60, 5, 111, 0.8) 0%, rgba(108, 33, 179, 1) 50%);
  /* border-radius: 3px; */
  border: 3px groove ${redDefault};
  color: ${redDefault};
  padding: 0.25em 1em;
  transition: border-color 0.25s;

  &:disabled {
    background: linear-gradient(0deg,rgba(72, 28, 112, 0.8) 0%, rgb(142, 85, 196) 50%);
    color: ${redDisabled};
    border-color: ${redDisabled};
    cursor: default;
  }
`;
function Button({ type = "button", text, handleClick, className, isDisabled = false }) {  

  return (
    <ButtonStyle
      type={type}
      onClick={handleClick}
      className={className}
      disabled={isDisabled}
    >
      {text}
    </ButtonStyle>
  );
}



export default Button;
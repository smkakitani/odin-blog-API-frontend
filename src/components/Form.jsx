// Styles?
import styled from "styled-components";
// Components
import Button from "./Button";



// 
const ButtonStyle = styled(Button)`
  margin-top: 2rem;
`;
const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  background-color: rgba(60, 5, 111, 0.8);
  border: 2px solid rgb(58, 12, 102);
  padding: 1rem;
  
`;
function Form({ 
  children,
  className,
  // 
  handleSubmit, 
  message, 
  isError, 
  // 
  buttonText,
  isDisabled,
}) {

  return (
    <FormStyle onSubmit={handleSubmit} className={className} noValidate>
      {children}
      {isError && message.map((err) => <p key={err.path}>{err.msg}</p> )}      
      <ButtonStyle 
        type={"submit"}
        text={buttonText}
        isDisabled={isDisabled}
      />
    </FormStyle>
  );
}

const InputStyle = styled.input`
  border: 1px inset #8a2be2;

  margin-left: 0.5rem;

  &:focus {
    box-shadow: 0px 0px 13px 3px #8a2be2;
  }
  &:focus-visible {
    outline: 1px inset #8a2be2;
  }
`;
const Field = (props) => {
  /* TODO: add visibility change for password */

  return (
    <label>{props.labelText}
      <InputStyle 
        onChange={props.onChange}
        type={props.type} 
        name={props.name}
        id={props.name}
        className={props.className}
        value={props.value}
        minLength={props.minLength}
        maxLength={props.maxLength}
        pattern={props.pattern}

        required // all fields are required!?
      />
    </label>
  );
};



export {
  Form,
  Field,
};
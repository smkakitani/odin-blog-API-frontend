// Styles?

// Components
import Button from "./Button";



// 
function Form({ 
  children,
  // 
  handleSubmit, 
  message, 
  isError, 
  // 
  buttonText,
  isDisabled,
}) {

  return (
    <form onSubmit={handleSubmit}  noValidate>
      {children}
      {isError && message.map((err) => <p key={err.path}>{err.msg}</p> )}      
      <Button 
        type={"submit"}
        text={buttonText}
        isDisabled={isDisabled}
      />
    </form>
  );
}

const Field = (props) => {
  /* TODO: add visibility change for password */

  return (
    <label>{props.labelText}
      <input 
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
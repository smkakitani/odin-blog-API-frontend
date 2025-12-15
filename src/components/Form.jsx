// Styles?



// Components
import Button from "./Button";



// 
function Form({ 
  fields, 
  handleSubmit, 
  handleChange, 
  buttonText, 
  isError, 
  message, 
}) {

  return (
    <form onSubmit={handleSubmit}  noValidate>
      {fields.map((item) => (
        <Field key={item.name}
          {...item}
          onChange={handleChange}
        />
      ))}
      {isError && message.map((err) => <p key={err.path}>{err.msg}</p> )}

      <Button 
        type={"submit"}
        text={buttonText}
      />
    </form>
  );
}

const Field = (props) => {
  /* TODO: add visibility change for password? */

  return (
    <label>{props.labelText}
      <input onChange={props.onChange}
        type={props.type} // email, text (names), password, 
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










export default Form;
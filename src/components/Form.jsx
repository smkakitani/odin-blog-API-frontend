// Styles?

// Custom hook
import usePostData from "../api/usePostData";

// Components
import Button from "./Button";



// 
function Form({ fields, }) { // fields -> []
  const { error, result, isLoading } = usePostData(null, null);

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    // TODO: insert validation

    // if (valid) {

    // }
  }



  return (
    <form onSubmit={handleSubmit}  noValidate>
      {fields.map((item) => (
        <Field />
      ))}
      {error}

      <Button />
    </form>
  );
}

const Field = (props/* { type, name, value, minLength, } */) => {
  let type = props.type;
  let name = props.name;
  let className = props.className;
  let value = props.value;
  let minLength = props.minLength;
  let maxLength = props.maxLength;
  let pattern = props.pattern;
  let labelText = props.labelText;
  

  return (
    <label>{labelText}
      <input 
        type={type} // email, text (names), password, 
        name={name}
        id={name}
        className={className}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}

        required // all fields are required!?
      />
    </label>
  );
};










export default Form;
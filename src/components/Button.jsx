// 



// 
function Button({ type, text, handleClick, className }) {
  return (
    <button
      type={type ? type : "button"}
      onClick={handleClick}
      className={className}
    >
      {text}
    </button>
  );
}

export default Button;
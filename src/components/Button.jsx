// 



// 
function Button({ type = "button", text, handleClick, className, isDisabled = false }) {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={className}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}

export default Button;
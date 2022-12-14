const Input = ({ label, handleChange, type, name, value, placeholder, error, disabled}) => {
  return(
    <fieldset>
      <label>{label} </label>
      <input
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        type={type}
        disabled={disabled}
      />
      {error && <small>{error}</small>}
    </fieldset>
  )
}

export default Input
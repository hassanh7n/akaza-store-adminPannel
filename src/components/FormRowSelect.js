const FormRowSelect =  ({ labelText, name, value, handleChange, lists}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        id={name}
        onChange={handleChange}
        className='form-select'
      >
        {lists.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};


export default FormRowSelect;

const FormRowSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
  ...other
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
        {...other}
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue.id} title={itemValue.title}>
              {itemValue.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;

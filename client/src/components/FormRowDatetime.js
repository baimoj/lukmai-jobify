import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const FormRowDatetime = ({
  name,
  value,
  labelText,
  showIcon,
  excludeDateIntervals,
  ...other
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <DatePicker
        className="form-input"
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/yyyy"
        name={name}
        selected={value}
        showIcon={showIcon || false}
        excludeDateIntervals={excludeDateIntervals}
        {...other}
      />
    </div>
  );
};

export default FormRowDatetime;

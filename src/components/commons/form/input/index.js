import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";

const index = ({
  value,
  type,
  placeholder,
  disabled,
  onChange,
  onClick,
  startIcon,
  endIcon,
  isError,
  rightPlaceholder,
  isValid,
  hasBorder,
  defaultValue,
  width,
  isVisible,
  isTypePassword,
  setIsVisible,
  maxLength,
  isDirty,
}) => {
  const StartIcon = startIcon;
  const EndIcon = endIcon;
  return (
    <div className="input-container">
      <input
        type={type}
        value={defaultValue ? defaultValue : value}
        onChange={onChange}
        disabled={disabled}
        placeholder={hasBorder && placeholder}
        maxLength={maxLength}
        className={`${
          hasBorder ? "input-component-border" : "input-component"
        } ${isError && "input-error"} ${!isValid && "input-invalid"} ${
          isDirty && "input-dirty"
        }`}
        style={{ width: width }}
      />
      <label className="placeholder m-0">{placeholder}</label>
      <label className="rightPlaceholder m-0">{rightPlaceholder}</label>
      {startIcon && <StartIcon onClick={onClick} />}
      {endIcon && <EndIcon className="input-end-icon" />}
      {isTypePassword ? (
        isVisible ? (
          <VisibilityOffOutlinedIcon
            onClick={setIsVisible}
            className="input-password-end-icon password-toggle"
          />
        ) : (
          <VisibilityOutlinedIcon
            onClick={setIsVisible}
            className="input-password-end-icon password-toggle"
          />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default index;

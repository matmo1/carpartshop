const Input = ({ type = 'text', className = '', ...props }) => (
  <input
    type={type}
    className={`form-control ${className}`}
    {...props}
  />
);

export default Input;
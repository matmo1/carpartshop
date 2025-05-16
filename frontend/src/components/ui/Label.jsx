const Label = ({ htmlFor, children, className = '' }) => (
  <label 
    htmlFor={htmlFor} 
    className={`form-label ${className}`}
  >
    {children}
  </label>
);

export default Label;
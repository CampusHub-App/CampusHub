import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Button component for consistent button styling
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant (primary, secondary, outline, danger)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.fullWidth - Whether the button should take full width
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {Function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {Object} props.rest - Additional props to pass to the button element
 */
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  disabled = false,
  onClick,
  children,
  type = 'button',
  ...rest
}) => {
  // Variant styles
  const variantStyles = {
    primary: 'bg-[#027FFF] hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    outline: 'bg-transparent border border-[#027FFF] text-[#027FFF] hover:bg-blue-50',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  // Size styles
  const sizeStyles = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  const baseStyles = 'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyle}`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

/**
 * LinkButton component for button-styled links
 * @param {Object} props - Component props
 * @param {string} props.to - Link destination
 * @param {string} props.variant - Button variant (primary, secondary, outline, danger)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.fullWidth - Whether the button should take full width
 * @param {React.ReactNode} props.children - Button content
 * @param {Object} props.rest - Additional props to pass to the Link element
 */
export const LinkButton = ({
  to,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  ...rest
}) => {
  // Variant styles
  const variantStyles = {
    primary: 'bg-[#027FFF] hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    outline: 'bg-transparent border border-[#027FFF] text-[#027FFF] hover:bg-blue-50',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  // Size styles
  const sizeStyles = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  const baseStyles = 'inline-block font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-center';
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <Link
      to={to}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle}`}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default Button;
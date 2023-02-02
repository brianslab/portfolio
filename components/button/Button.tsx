import classnames from 'classnames';
import { ButtonProps } from './types';

export function Button({
  children,
  bordered = true,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  ...rest
}: ButtonProps) {
  const classes = classnames(
    rest.className,
    'flex items-center px-3 py-1.5 transition duration-150 ease-in-out',
    {
      border: bordered,
      'border-blue-500 hover:border-blue-400 bg-blue-500 hover:bg-blue-400 text-white':
        primary,
      'border-gray-900 hover:border-gray-800 bg-gray-900 hover:bg-gray-800 text-white':
        secondary,
      'border-green-500 hover:border-green-400 bg-green-500 hover:bg-green-400 text-white':
        success,
      'border-yellow-400 hover:border-yellow-300 bg-yellow-400 hover:bg-yellow-300 text-white':
        warning,
      'border-red-500 hover:border-red-400 bg-red-500 hover:bg-red-400 text-white':
        danger,
      'rounded-full': rounded,
      'bg-white': outline,
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-yellow-400': outline && warning,
      'text-red-500': outline && danger,
    }
  );

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

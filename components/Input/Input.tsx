import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Input = forwardRef((
  {error, className, ...props}: InputProps, 
  ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <input 
        className={cn(className, styles.input, {
          [styles.error]: error
        })} 
        ref={ref} 
        {...props} 
      />
      {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});
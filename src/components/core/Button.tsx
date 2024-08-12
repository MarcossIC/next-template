import { forwardRef, type ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	'data-testid'?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => {
	return (
		<button
			ref={ref}
			{...props}>
			{children}
		</button>
	);
});
Button.displayName = 'Button';

export default Button;

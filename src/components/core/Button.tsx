import { type ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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

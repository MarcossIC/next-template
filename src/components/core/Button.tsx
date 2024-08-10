import { forwardRef, type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

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

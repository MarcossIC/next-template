import type { PropsWithChildren } from 'react';

const Button = ({ children }: PropsWithChildren) => {
	return <button>{children}</button>;
};

export default Button;

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from 'utils';

//Button variant example
const btnCVA = cva(
  'inline-flex items-center justify-center outline-none focus:outline-none active:outline-none focus-visible:outline-none no-underline truncate disabled:opacity-60 disabled:cursor-default disabled:hover:bg-inherit disabled:active:bg-inherit disabled:hover:border-inherit disabled:active:border-inherit',
  {
    variants: {
      variant: {
        default: 'bg-slate-200 text-black hover:bg-slate-300 active:bg-slate-400',
        outline: 'bg-transparent border border-slate-300 hover:bg-slate-300 active:bg-slate-400',
      },
      size: {
        default: 'h-9 px-2 ',
        sm: 'h-6 px-2',
        lg: 'h-10 px-2',
        full: 'h-9 px-2 w-full max-w-[100cqw]',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof btnCVA> {
  'data-testid'?: string;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, ...props },
  ref
) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(btnCVA({ variant, size, className }))} ref={ref} {...props} />;
});

export default Button;

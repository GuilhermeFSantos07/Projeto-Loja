import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv ({
    base: "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none active:scale-95",
    variants: {
        variant: {
            primary: "bg-amber-700 text-white hover:bg-amber-800",
            success: "bg-green-600 text-white hover:bg-green-700",
            outline: "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100",
            danger: "bg-red-600 text-white hover:bg-red-700",
            ghost: "bg-transparent text-gray-600 hover:bg-gray-200",
        },
        size: {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 py-2 text-sm",
            lg: "h-12 px-6 text-base",
            icon: "h-8 w-8 p-0 flex items-center justify-center rounded-full",
        },
        fullWidth: {
            true: "w-full",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
    },
});

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

const Button = ({className, variant, size, fullWidth, ...props}: ButtonProps) => {
    return(
        <button
            className={buttonVariants({variant, size, fullWidth, className})}
            {...props}
        />
    );
};

export default Button;
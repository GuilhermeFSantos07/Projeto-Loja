import { useId, type ComponentProps } from "react";
import { tv } from "tailwind-variants";

const inputVariants = tv ({
    base: "flex h-11 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
});

interface InputProps extends ComponentProps<"input"> {
    label?: string;
}

const Input = ({className, label, id, ...props}: InputProps) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return(
        <div className="flex w-full flex-col gap-1.5">
            {label && (
                <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={inputVariants({className})}
                {...props}
            />
        </div>
    );
};

export default Input;
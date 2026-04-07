import { useId, type ComponentProps } from "react";
import { tv } from "tailwind-variants";

const selectVariants = tv ({
    base: "flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600 disabled:cursor-not-allowed disabled:opacity-50",
});

interface SelectProps extends ComponentProps<"select"> {
    label?: string;
    options: {value: string; label: string}[];
}

const Select = ({className, label, id, options, ...props}: SelectProps) => {
    const generatedId = useId ();
    const selectId = id || generatedId;

    return (
        <div className="flex w-full flex-col gap-1.5">
            {label && (
                <label htmlFor={selectId} className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <select id={selectId} className={selectVariants({className})} defaultValue=""{...props}>
                <option value="" disabled hidden>Selecione uma opção...</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
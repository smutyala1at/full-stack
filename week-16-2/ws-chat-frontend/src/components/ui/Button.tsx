interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    label: string;
    code?: string;
    onClick: () => void
}

const buttonClass = {
    "primary": "bg-white text-black",
    "secondary": "bg-zinc-700 text-white"
}

const sizeClass = {
    "sm": "px-3 py-2",
    "md": "px-5 py-2",
    "lg": "px-7 py-5"
}

export const Button = ({ variant, size, label, code="" , onClick }: ButtonProps) => {
    return <button className={`${buttonClass[variant]} ${sizeClass[size]} rounded-lg cursor-pointer font-mono font-medium place-items-center focus:ring-2 focus:ring-white/80`} onClick={() => onClick()} >
        <div className={`${code} ? "text-sm" : "text-base"`}>
            { label }
        </div>

        { code && 
            <div className="mt-2 font-extrabold text-2xl">
                { code }
            </div>
        }
    </button>
}
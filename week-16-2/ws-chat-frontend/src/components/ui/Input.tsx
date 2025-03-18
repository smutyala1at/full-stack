export const Input = ({ type, placeholder, reference }: { type: string, placeholder: string, reference?: React.Ref<HTMLInputElement> }) => {
    return <input 
                type={type}
                placeholder={placeholder}
                className="
                    px-3
                    py-2
                    text-zinc-400
                    text-base
                    font-medium
                    rounded-lg
                    w-full
                    border-1
                    border-zinc-400/50
                    outline-none
                    focus:ring-2 
                    focus:ring-white/80
                "
                ref={reference}
            />
}
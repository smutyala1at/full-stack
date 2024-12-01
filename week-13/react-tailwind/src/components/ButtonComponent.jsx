

export function Button({text, variant}){
    const color = variant === "enabled" ? "bg-emerald-300" : "bg-slate-400";
    return (
        <div>
            <button className={`${color} text-white w-96 px-14 py-2 rounded-md`}>
                {text}
            </button>
        </div>
    )
}
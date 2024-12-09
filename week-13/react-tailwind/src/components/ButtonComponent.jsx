


export function Button({text, variant}){
    const color = (variant === "enabled")? "bg-green-400" : "bg-blue-200";
    return (
        <div>
            <button className={`${color} text-white w-96 px-14 py-2 my-4 rounded-md cursor-pointer`}>
                {text}
            </button>
        </div>
    )
}
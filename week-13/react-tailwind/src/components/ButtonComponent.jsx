import { useEffect } from "react";


export function Button({text, variant}){
    const color = variant === "enabled" ? "bg-green-400" : "bg-blue-200";
    return (
        <div>
            <button className={`${color} text-white w-96 px-14 py-2 rounded-md`}>
                {text}
            </button>
        </div>
    )
}
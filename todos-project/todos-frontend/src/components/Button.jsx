
export default function Button({
    type,
    label,
    onClick
}){
    return (
        <button className="bg-zinc-900 text-white w-80 px-4 py-3 border rounded-lg mt-2 mb-2"
        type={type} onClick={(e) => onClick(e)}>
            {label}
        </button>
    )
}
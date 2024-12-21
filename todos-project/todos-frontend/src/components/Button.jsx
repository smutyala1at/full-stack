
export default function Button({
    label,
    onClick
}){
    return (
        <button className="bg-gray-500 text-white w-80 px-4 py-2 border rounded-lg mt-2 mb-1"
        onClick={onClick}>
            {label}
        </button>
    )
}
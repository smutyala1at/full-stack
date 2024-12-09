

export function Input({type, placeholder, onClick}){
    return (
        <div>
            <input onClick={onClick} className="w-96 px-3 py-3 my-2 text-white bg-blue-500 rounded-md" type={type} placeholder={placeholder} />
        </div>
    )
}
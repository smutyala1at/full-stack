
export default function InputBox({
    type = "text",
    label,
    placeholder,
    value,
    onChange,
    error
}) {
    return (
        <div className="mb-4">
            {label && (
            <label className="block text-sm font-medium mb-1 text-black">
                {label}
            </label>
            )}

            <input 
            type={type}
            name={placeholder.toLowerCase()}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-80 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-opacity-50
            ${error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
            />

            {error && (
            <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
            
        </div>
    )
}
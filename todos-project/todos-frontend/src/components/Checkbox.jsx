export default function Checkbox({label, isChecked, onChange}) {
    return (
        <div className="flex items-center">
            <label className="">{label}</label>
            <input type="checkbox" 
            checked={isChecked} // expects boolean value
            onChange={onChange}
            className="ml-4 w-5 h-5 rounded border-gray-300  focus:ring-blue-500" />
        </div>
    )
}
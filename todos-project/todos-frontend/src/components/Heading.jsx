
export default function Heading({
    title,
    subtitle=""
}) {
    return (
        <div className="mb-6">
            <h1 className="text-3xl text-black mb-2">{title}</h1>

            {subtitle && (
                <p className="text-sm text-black mb-2">{subtitle}</p>
            )}
        </div>
    )
}
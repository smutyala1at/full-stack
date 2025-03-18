export const Message = ({ message }: { message: string }) => {
    return <div className="inline-block max-w-max px-4 py-2 bg-white/90 font-medium text-base text-black rounded-lg ring-1 ring-inset ring-white/10">
        { message }
    </div>
}
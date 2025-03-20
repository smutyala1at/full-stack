export const RoomDetails = ({ roomId, userCount }: { roomId: string, userCount: number }) => {
    return <div className="flex justify-between text-white text-base px-3 py-2 bg-zinc-400/30 rounded-lg font-mono">
        <div>
            Room Code: {roomId}
        </div>
        <div>
            Users: {userCount}
        </div>
    </div>
}
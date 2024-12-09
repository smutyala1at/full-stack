

export function SideBar(){
    return <div className="flex">
        <div className="transition-all duration-1000 hidden md:block w-80 h-screen bg-red-500">
            Sidebar
        </div>
        <div className="bg-blue-200 w-full h-screen">
            Content
        </div>

    </div>
}
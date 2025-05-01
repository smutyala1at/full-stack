import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";

async function handleClick(username, password){
    await axios.post("http://localhost:3000/api/v1/signup", {
        username,
        password
    });
}

export default function Signup() {
    const usernameRef = useRef<HTMLInputElement | null>(null); 
    const passwordRef = useRef<HTMLInputElement | null>(null); 

    return <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-96 border border-gray-400 rounded-lg flex flex-col gap-5 p-4">
            <div className="flex flex-col gap-2">
                <div className="text-2xl font-bold">
                    Signup
                </div>
                <div className="text-sm">
                Let's get started!
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <input ref={usernameRef} type="text" placeholder="email" className="px-3 py-2 border rounded-lg w-full outline-none focus:ring-1 ring-gray-300 border-gray-300" />
                <input ref={passwordRef} type="password" placeholder="password" className="px-3 py-2 border rounded-lg w-full outline-none focus:ring-1 ring-gray-300 border-gray-300" />
                <button className="py-2 w-full text-center border rounded-lg focus:ring-1 ring-gray-300 border-gray-300 cursor-pointer" onClick={() => handleClick(usernameRef.current?.value, passwordRef.current?.value)}>
                    Sign in
                </button>
            </div>
        </div>
    </div>
}
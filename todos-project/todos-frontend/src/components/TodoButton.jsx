import { useState } from 'react';

export default function TodoButton({
    label,
    onClick
 }) {
    return(
        <button onClick={onClick} className="bg-green-300 w-40 h-12 border rounded-lg text-base font-bold text-zinc-900 hover:ring-2" >
            {label}
        </button>
    ) 
 } 
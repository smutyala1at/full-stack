
import React from "react";

interface PropType {
    type?: "text"; 
    reference: React.Ref<HTMLInputElement>;
    placeholder: string;
}

export default function InputText(
    { type, reference, placeholder }: PropType
) {
    return (
        <input 
            type={type}
            ref={reference} 
            placeholder={placeholder} 
            style={{
                width: 240,
                padding: 10,
                borderColor: "black",
                border: 1,
                borderRadius: 10
            }}
        />
    )
}
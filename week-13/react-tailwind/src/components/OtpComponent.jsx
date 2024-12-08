import { useRef, useState } from "react";
import { Button } from "./ButtonComponent";

export function OtpBox(){
    const inputRef = useRef([]);
    const [submitEnable, setSubmitEnable] = useState(false);

    function handleFocus(idx){
        if(inputRef.current[idx + 1]) {
            inputRef.current[idx + 1].focus()
        }
        else {
            setSubmitEnable(true);
            inputRef.current[idx].blur();
        }
    }

    function handleBackFocus(idx){
        if(idx === 0) return
        if(inputRef.current[idx - 1]) {
            inputRef.current[idx].value = ""
            setTimeout(() => inputRef.current[idx - 1].focus(), 0);
        }
    }

    return (
        <div>
            {Array(6)
                .fill(null)
                .map((_, idx) => {
                    return (
                        <input
                            key={idx} 
                            ref={(el) => inputRef.current[idx] = el} 
                            onChange={(e) => {if(/[0-9]/.test(e.target.value)) handleFocus(idx)}} 
                            onKeyDown={(e) => {
                                if(e.key === "Backspace") {
                                    if(submitEnable) setSubmitEnable(false)
                                    handleBackFocus(idx)
                                } 
                            }}
                            maxLength={1}
                            className="w-10 h-10 bg-blue-500 px-[10px] m-2 rounded-xl text-white text-center" 
                        />
                    )
                })
            }
            <Button text="Submit" variant={`${submitEnable ? "enabled": "disabled"}`} />
        </div>
    )
}
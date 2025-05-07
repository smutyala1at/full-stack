"use client"
import { Button } from "@repo/ui/button";
import InputText from "@repo/ui/input-text"
import { useRef } from "react";
import { useRouter } from "next/navigation"

export default function Home() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const inputVal = inputRef.current?.value
  const router = useRouter();

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      background: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center" 
    }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 20
        }}
      >
        <InputText reference={inputRef} placeholder="RoomId" />
        <Button onClick={() => router.push("/chat/123")}>{"Enter the room"}</Button>
      </div>
    </div>
  );
}

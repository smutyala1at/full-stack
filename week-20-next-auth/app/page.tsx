"use client"
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
  return (
    <SessionProvider>
      <AuthStatus />
    </SessionProvider>
  );
}

function AuthStatus(){
  const { status } = useSession();

  return (
    <div>
      { status == "authenticated" && <button onClick={() => signOut()}>Logout</button> }
      { status == "unauthenticated" && <button onClick={() => signIn()}>Logout</button> }
    </div>
  )
}

// "use client"
// import { SessionProvider, signIn, signOut, useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"

/* export default function Home() {
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
} */

export default async function App() {
  const session = await getServerSession();
  return (
    <div>
      {JSON.stringify(session?.user?.email)}
    </div>
  )
}

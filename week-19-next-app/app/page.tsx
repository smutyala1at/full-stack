import Link from "next/link";

export default function Home() {
  return (
  <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
    <div className="text-4xl font-bold">
      Todo Application
    </div>
    <div className="flex gap-10">
      <Link href={"/signup"} className="border border-gray-400 rounded-lg w-24 px-3 py-2 text-center cursor-pointer">Sign up</Link>
      <Link href={"/signin"} className="border border-gray-400 rounded-lg w-24 px-3 py-2 text-center cursor-pointer">Sign in</Link>
    </div>
  </div>
  );
}

import HomeMainForLayout from "@/components/Home";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  
const cookieStore = await cookies();
const token = cookieStore.toString()
if(!token){
redirect('/login')
}
  return <HomeMainForLayout />
}

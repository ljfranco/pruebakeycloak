import Login from "@/components/Login";
import Logout from "@/components/Logout";
import { getServerSession, Session } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import LoadUsers from "@/components/LoadUsers";

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (session) {
    return <div>
      <div>Your name is {session.user?.name}</div>
      <div><Logout /> </div>

      <LoadUsers accessToken={session.accessToken ?? null} />
    </div>
  }
  return (
    <div>
      <Login />
    </div>
  )
}

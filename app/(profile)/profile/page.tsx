import { prisma } from "@/prisma/prisma-client";
import { Profile } from "@/shared/components";
import { getUserSession } from "@/shared/lib/get-user-session";
import { redirect } from "next/navigation"

export default async function ProfilePage() {
	const session = await getUserSession()

	if(!session){
		return redirect('./not-auth');
	}	

	const user = await prisma.user.findFirst({
		where: {
			id: Number(session.id)
		}
	})

	if(!user){
		return redirect('./not-auth')
	}

	return (
		<Profile className="my-6 mb-6" user={user}/>
	)
}
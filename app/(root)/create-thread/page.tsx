import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.action'
import { PostThread } from '@/components/index';

type Props = {}

const page = async (props: Props) => {
    const user = await currentUser()
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    return (
        <>
            <h1 className="head-text text-left">
                Create Thread
                <PostThread userId={userInfo._id} />
            </h1>
        </>)

}

export default page
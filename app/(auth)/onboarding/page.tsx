import { UserButton } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <div className="bg-white">
            <UserButton></UserButton>
        </div>
    )
}

export default page
"use client"

import { signOut } from 'next-auth/react'

export default function SignoutButton() {
    return <button className='text-rose-700' onClick={()=> signOut()}>Sign Out</button>
}
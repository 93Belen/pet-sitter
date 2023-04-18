"use client"
import { signOut } from "next-auth/react"
import Link from "next/link"


export default function Nav() {
    return (
        <nav className='flex justify-end w-full list-none'>
            <div className='flex justify-around w-3/6'>
            <Link href='/' className='hover:text-mytheme duration-1000'>Dashboard <span className='text-mytheme'>|</span></Link>
            <Link href='/reviews' className='hover:text-mytheme duration-1000'>Reviews <span className='text-mytheme'>|</span></Link>
            <Link href='/pricing' className='hover:text-mytheme duration-1000'>Pricing <span className='text-mytheme'>|</span></Link>
            <li className='hover:text-mytheme duration-1000' onClick={() => signOut()}>Sign Out</li>
            </div>
        </nav>
    )
}
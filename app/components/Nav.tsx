"use client"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { CiMenuKebab } from 'react-icons/ci'
import { IoClose } from "react-icons/io5"
import { AnimatePresence, motion } from "framer-motion"


export default function Nav() {
    const [showMenu, setShowMenu] = useState(false)
    const openMenu = () => {
        setShowMenu(true)
    }
    const hideMenu = () => {
        setShowMenu(false)
    }
    return (
        <nav className='flex justify-end w-full list-none'>
            <div className='md:hidden'>
            <CiMenuKebab
            className='h-9 w-auto'
            onClick={openMenu}
            />
            <AnimatePresence>
          {showMenu && (
            <motion.div
            layout
            initial={{right: -250, opacity: 0}}
            animate={{right: 0, opacity: 1}}
            exit={{right: -250, opacity: 0}}
            transition={{ease: "linear", duration: 0.4}}
            className={`absolute bg-mylighttheme md:w-3/6 w-[90vw] h-screen top-0 right-[-200px] flex flex-col justify-around p-10 z-50`}>
            <IoClose className='text-4xl' onClick={hideMenu} />
            <Link onClick={hideMenu} href='/' className='m-auto text-4xl'>Dashboard</Link>
            <Link onClick={hideMenu} href='/reviews' className='m-auto text-4xl'>Reviews</Link>
            <Link onClick={hideMenu} href='/pricing' className='m-auto text-4xl'>Pricing </Link>
            <li className='m-auto text-4xl' onClick={() => signOut()}>Sign Out</li>
          </motion.div>
          )}       
      </AnimatePresence>
            </div>
            <div className='md:flex justify-around w-3/6 hidden'>
            <Link href='/' className='hover:text-mytheme duration-1000'>Dashboard</Link>
            <Link href='/reviews' className='hover:text-mytheme duration-1000'>Reviews</Link>
            <Link href='/pricing' className='hover:text-mytheme duration-1000'>Pricing </Link>
            <li className='hover:text-mytheme duration-1000' onClick={() => signOut()}>Sign Out</li>
            </div>
        </nav>
    )
}
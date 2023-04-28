"use client"

import React, { useState } from "react"
import {IoClose} from 'react-icons/io5'
import {motion, AnimatePresence} from 'framer-motion'
import { ChangeEvent } from 'react';



type dayInfo = {
  description: string,
  price: number
}


export default function Pricing() {
const [description, setDescription] = useState('')
const [price, setPrice] = useState(0)
const [id, setId] = useState<Number | undefined>()
const [show, setShow] = useState(false)
const [halfDayInfo, setHalfDayInfo] = useState<dayInfo>()
const [fullDayInfo, setFullDayInfo] = useState<dayInfo>()
const [dayAndNightInfo, setdayAndNightInfo] = useState<dayInfo>()
const [lettercount, setLetterCount] = useState(0)





  const editPricing = async(id: number) => {
    const data = {
      id: id,
      description: description,
      price: price
    }
    if(description.length > 100 && Number(price) > 0){
      const res = await fetch('api/addPricing', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      const jsonRes = await res.json()
      return jsonRes;
    }
    else {
      window.alert('Please fill up the form properly')
    }
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDescription(event.target.value)
    setLetterCount(event.target.value.length)
  }
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPrice(Number(event.target.value))
  }
  const handleIdChange = (newId: number) => {
    setShow(true)
    setId(newId)
  }
  const hideForm = () => {
    setShow(false)
  }

const getPricing = async() => {
  const res = await fetch('api/getPricing')
  const jsonRes = await res.json();
  return jsonRes;
}


const updatePricing = () => {
  getPricing().then(res => {
    setHalfDayInfo(res[0])
    setFullDayInfo(res[1])
    setdayAndNightInfo(res[2])
  })
}

updatePricing()


    return (
      <main className='pt-28 flex md:flex-row flex-col gap-10'>
        <AnimatePresence>
          {show && (
            <motion.form
            layout
            initial={{right: -250, opacity: 0}}
            animate={{right: 0, opacity: 1}}
            exit={{right: -250, opacity: 0}}
            transition={{ease: "linear", duration: 0.4}}
            className={`fixed bg-mygray md:w-3/6 w-[90vw] h-screen top-0 right-[-200px] flex flex-col justify-around p-10`}>
            <IoClose className='text-3xl' onClick={hideForm} />
            <div className='w-[90%]'>
            <textarea maxLength={200} minLength={100} onChange={handleDescriptionChange} className='rounded-lg p-7 w-full' cols={10} rows={12} name="description" id="description" />
            <p>Please, enter a description between 100 and 200 characters</p>
            <p>Character count: {lettercount}</p>
            </div>
            <input onChange={handlePriceChange} className='rounded-lg px-6 p-5' type="number" min={3} name="price" id="price" />
        <button onClick={() => {
          editPricing(id as number).then(() => updatePricing())
          setShow(false)
          }} className='bg-mytheme py-3 px-6 rounded-full w-fit'>Update</button>
          </motion.form>
          )}       
      </AnimatePresence>
       <div className='p-6 bg-mygray rounded-lg flex flex-col gap-5'>
         <h2 className='font-bold text-xl'>Half Day</h2>
         <p>{halfDayInfo?.description}</p>
          <p className='font-extrabold text-3xl m-auto'>${halfDayInfo?.price}</p>
          <button onClick={() => {handleIdChange(1)}} className='bg-mytheme py-3 px-6 rounded-full w-fit m-auto'>Edit</button>
       </div>
       <div className='p-6 bg-mygray rounded-lg flex flex-col gap-5'>
         <h2 className='font-bold text-xl'>All Day</h2>
         <p>{fullDayInfo?.description}</p>
          <p className='font-extrabold text-3xl m-auto'>${fullDayInfo?.price}</p>
          <button onClick={() => {handleIdChange(2)}} className='bg-mytheme py-3 px-6 rounded-full w-fit m-auto'>Edit</button>
       </div>
       <div className='p-6 bg-mygray rounded-lg flex flex-col gap-5'>
         <h2 className='font-bold text-xl'>Day and Overnight</h2>
         <p>{dayAndNightInfo?.description}</p>
          <p className='font-extrabold text-3xl m-auto'>${dayAndNightInfo?.price}</p>
          <button onClick={() => {handleIdChange(3)}} className='bg-mytheme py-3 px-6 rounded-full w-fit m-auto'>Edit</button>
       </div>
      </main>
    )
  }
  
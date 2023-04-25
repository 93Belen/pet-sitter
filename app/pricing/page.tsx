"use client"

import React, { useEffect, useState } from "react"
import {IoClose} from 'react-icons/io5'


type dayInfo = {
  description: string,
  price: number
}


export default function Pricing() {
const [description, setDescription] = useState('')
const [price, setPrice] = useState(0)
const [id, setId] = useState<Number | undefined>()
const [show, setShow] = useState('hidden')
const [halfDayInfo, setHalfDayInfo] = useState<dayInfo>()
const [fullDayInfo, setFullDayInfo] = useState<dayInfo>()
const [dayAndNightInfo, setdayAndNightInfo] = useState<dayInfo>()





  const editPricing = async(id: number) => {
    const data = {
      id: id,
      description: description,
      price: price
    }
    const res = await fetch('api/addPricing', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value))
  }
  const handleIdChange = (newId: number) => {
    setShow('')
    setId(newId)
  }
  const hideForm = () => {
    setShow('hidden')
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
      <main className='pt-10 flex gap-10'>
      <div className={`absolute bg-mygray w-3/6 h-screen top-0 right-0 flex flex-col justify-around p-10 ${show}`}>
        <IoClose onClick={hideForm} />
        <textarea maxLength={200} onChange={handleDescriptionChange} className='rounded-lg p-7' cols={10} rows={12} name="description" id="description" />
        <input onChange={handlePriceChange} className='rounded-lg px-6 p-5' type="number" min={3} name="price" id="price" />
        <button onClick={() => {
          editPricing(id as number).then(() => updatePricing())
          setShow('hidden')
          }} className='bg-mytheme py-3 px-6 rounded-full w-fit'>Update!</button>
      </div>
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
  
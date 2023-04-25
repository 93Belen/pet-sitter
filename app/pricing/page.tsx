"use client"

import { useState } from "react"
import {IoClose} from 'react-icons/io5'


export default function Pricing() {
const [description, setDescription] = useState('')
const [price, setPrice] = useState(0)
const [id, setId] = useState<Number | undefined>()
const [show, setShow] = useState('hidden')


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

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }
  const handlePriceChange = (event) => {
    setPrice(Number(event.target.value))
  }
  const handleIdChange = (newId: number) => {
    setShow('')
    setId(newId)
  }
  const showForm = () => {
    setShow('')
  }
  const hideForm = () => {
    setShow('hidden')
  }


    return (
      <main className='pt-10 flex gap-10'>
      <div className={`absolute bg-mygray w-3/6 h-screen top-0 right-0 flex flex-col justify-around p-10 ${show}`}>
        <IoClose onClick={hideForm} />
        <textarea maxLength={200} onChange={handleDescriptionChange} className='rounded-lg p-7' cols={10} rows={12} name="description" id="description" />
        <input onChange={handlePriceChange} className='rounded-lg px-6 p-5' type="number" min={3} name="price" id="price" />
        <button onClick={() => {editPricing(id as number)}} className='bg-mytheme py-3 px-6 rounded-full w-fit'>Update!</button>
      </div>
       <div className='p-6 bg-mygray rounded-lg flex flex-col gap-5'>
         <h2 className='font-bold text-xl'>Half Day</h2>
         <p>Lorem ipsum dolor sit amet consectetur 
           adipisicing elit. Culpa similique quia 
           ferendis cum provident beatae unde dol
           dolore! Quas explicabo magni ipsa accus
           olorem ullam, consequuntur officiis. Sequi!</p>
          <p className='font-extrabold text-3xl m-auto'>$9.99 /h</p>
          <button onClick={() => {handleIdChange(1)}} className='bg-mytheme py-3 px-6 rounded-full w-fit m-auto'>Edit</button>
       </div>
       <div className='p-6 bg-mygray rounded-lg flex flex-col gap-5'>
         <h2 className='font-bold text-xl'>All Day</h2>
         <p>Lorem ipsum dolor sit amet consectetur 
           adipisicing elit. Culpa similique quia 
           ferendis cum provident beatae unde dol
           dolore! Quas explicabo magni ipsa accus
           olorem ullam, consequuntur officiis. Sequi!</p>
          <p className='font-extrabold text-3xl m-auto'>$9.99 /h</p>
          <button onClick={() => {handleIdChange(2)}} className='bg-mytheme py-3 px-6 rounded-full w-fit m-auto'>Edit</button>
       </div>
       <div className='p-6 bg-mygray rounded-lg flex flex-col gap-5'>
         <h2 className='font-bold text-xl'>Day and Overnight</h2>
         <p>Lorem ipsum dolor sit amet consectetur 
           adipisicing elit. Culpa similique quia 
           ferendis cum provident beatae unde dol
           dolore! Quas explicabo magni ipsa accus
           olorem ullam, consequuntur officiis. Sequi!</p>
          <p className='font-extrabold text-3xl m-auto'>$9.99 /h</p>
          <button onClick={() => {handleIdChange(3)}} className='bg-mytheme py-3 px-6 rounded-full w-fit m-auto'>Edit</button>
       </div>
      </main>
    )
  }
  
"use client"


import React, { useEffect, useState, ChangeEvent } from "react";
import {IoClose} from 'react-icons/io5'
import {motion, AnimatePresence} from 'framer-motion'


type review = {
  id: string,
  user: string
  text: string,
  answer: string | null
}

export default function Reviews() {
  const [reviews, setReviews] = useState<review[]>();
  const [show, setShow] = useState(false);
  const [answer, setAnswer] = useState('')
  const [id, setId] = useState('')



  const getReviews = async() => {
    const res = await fetch('api/reviews/getall')
    const jsonRes = await res.json()
    return jsonRes;
  }

useEffect(() => {
  getReviews().then((res) => setReviews(res))
},[reviews])

const hideForm = () => {
  setShow(false)
}
const answerOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setAnswer(event.target.value)
}

const postAnswer = async() => {
  const data = {
    id: id,
    answer: answer
  }
  const res = await fetch('api/reviews/comment', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)

  })
  setShow(false)
  const jsonRes = await res.json();
  return jsonRes
}

const deleteReview = async(idToDelete: string) => {
  const sure = window.confirm('Are you sure you want to delete this review')
  if(sure){
    const res = await fetch('api/reviews/delete', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({idToDelete})
    })
    const jsonRes = await res.json()
    return jsonRes
  }
  
}

  const displayReviews = () => {
    const arr = [];
    reviews?.forEach(review => {
      arr.push(
        <motion.div layout key={review.id} className='p-6 bg-mygray rounded-lg flex flex-col gap-5'>
         <h2>{review.user}</h2>
         <p>{review.text}</p>
         <div className='flex gap-2 justify-self-end self-end md:w-2/5'>
         <button onClick={() => {deleteReview(review.id)}} className='bg-myred py-3 px-6 rounded-full w-fit m-auto text-white text-sm hover:bg-mylightred duration-1000 pointer-events-auto'>Delete</button>
         <button onClick={() => {
           setId(review.id)
           setShow(true)
           }} className='bg-mytheme py-3 px-6 rounded-full w-fit m-auto text-sm hover:bg-mylighttheme duration-1000 pointer-events-auto'>Answer</button>
         </div>
         <motion.div
         layout>
         {review.answer && (
           <motion.div className='p-3 rounded-lg bg-mydarkgray'>
              <p>Answer: {review.answer}</p>
           </motion.div>
          
         )}
         </motion.div>
       </motion.div>
      )
    })
    return arr;
  }



    return (
      <AnimatePresence>
      <motion.main
      layout
       className='pt-28 flex flex-col gap-10'>
        <AnimatePresence>
          {show && (
            <motion.div
            layout
            initial={{right: -250, opacity: 0}}
            animate={{right: 0, opacity: 1}}
            exit={{right: -250, opacity: 0}}
            transition={{ease: "linear", duration: 0.4}}
            className={`fixed bg-mygray md:w-3/6 w-[90vw] h-screen top-0 right-[-200px] flex flex-col justify-around p-10`}>
            <IoClose className='text-3xl' onClick={hideForm} />
            <textarea onChange={answerOnChange} maxLength={150}  className='rounded-lg p-7' cols={10} rows={12} name="description" id="description" />
            <button onClick={postAnswer} className='bg-mytheme py-3 px-6 rounded-full w-fit'>Answer</button>
          </motion.div>
          )}       
      </AnimatePresence>
       {displayReviews()}
      </motion.main>
      </AnimatePresence>
    )
  }
  
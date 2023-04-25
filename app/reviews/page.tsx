"use client"


import { useEffect, useState } from "react";
import {IoClose} from 'react-icons/io5'
import { isConstructorDeclaration } from "typescript";

type review = {
  id: string,
  user: string
  text: string,
  answer: string | null
}

export default function Reviews() {
  const [reviews, setReviews] = useState<review[]>();
  const [show, setShow] = useState('hidden');
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
  setShow('hidden')
}
const answerOnChange = (event) => {
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
  const jsonRes = await res.json();
  return jsonRes
}

const deleteReview = async(idToDelete: string) => {
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

  const displayReviews = () => {
    const arr = [];
    reviews?.forEach(review => {
      arr.push(
        <div key={review.id} className='p-6 bg-mygray rounded-lg flex flex-col gap-5'>
         <h2>{review.user}</h2>
         <p>{review.text}</p>
         <div className='flex gap-2 justify-self-end self-end w-2/5'>
         <button onClick={() => {deleteReview(review.id)}} className='bg-myred py-3 px-6 rounded-full w-fit m-auto text-white text-sm'>Delete</button>
         <button onClick={() => {
           setId(review.id)
           setShow('')
           }} className='bg-mytheme py-3 px-6 rounded-full w-fit m-auto text-sm'>Answer</button>
         </div>
         {review.answer && (
           <div className='bg-mytheme p-3 rounded-lg text-white'>
              <p>Answer: {review.answer}</p>
           </div>
          
         )}
       </div>
      )
    })
    return arr;
  }



    return (
      <main className='pt-10 flex flex-col gap-10'>
        <div className={`absolute bg-mygray w-3/6 h-screen top-0 right-0 flex flex-col justify-around p-10 ${show}`}>
        <IoClose onClick={hideForm} />
        <textarea onChange={answerOnChange} maxLength={150}  className='rounded-lg p-7' cols={10} rows={12} name="description" id="description" />
        <button onClick={postAnswer} className='bg-mytheme py-3 px-6 rounded-full w-fit'>Answer</button>
      </div>
       {displayReviews()}
      </main>
    )
  }
  
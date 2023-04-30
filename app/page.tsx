"use client"

import { DayPicker, DayClickEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useEffect, useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs'
import { AnimatePresence, motion } from 'framer-motion'




const halfStyle = { border: '4px solid #C94B4B' };
const fullStyle = { border: '4px solid #4BC9AB' };
const fullAndNightStyle = { background: '#4BC9AB' };

type Availability = {
  date: number,
  status: string
}



export default function Home() {
  const [halfDays, setHalfDays] = useState<Date[]>([]);
  const [fullDays, setFullDays]= useState<Date[]>([])
  const [dayAndNight, setdayAndnight] = useState<Date[]>([]);
  const [clicked, setClicked] = useState(false)
  const getCalendar = async() => {
    // Half day
      const response = await fetch('api/getcalendar/halfday')
      const jsonResponse: Availability[] = await response.json();
      const arrOfDates: Date[] = jsonResponse.map(element => new Date(Number(element.date)));
      setHalfDays(arrOfDates)

    // Full Day
    const responseTwo = await fetch('api/getcalendar/fullday')
    const jsonResponseTwo: Availability[] = await responseTwo.json();
    const arrOfDatesTwo: Date[] = jsonResponseTwo.map(element => new Date(Number(element.date)));
    setFullDays(arrOfDatesTwo)

    // Day and night
    const responseThree = await fetch('api/getcalendar/dayandnight')
    const jsonResponseThree: Availability[] = await responseThree.json();
    const arrOfDatesThree: Date[] = jsonResponseThree.map(element => new Date(Number(element.date)));
    setdayAndnight(arrOfDatesThree)
  }
  useEffect(() => {
    getCalendar()
  },[])

  const isItInHalf = (day: Date) => {
    let result;
    halfDays.forEach((halfDay: Date) => {
      if(halfDay.getTime() === day.getTime()){
        result = true;
        return
      }
      else{
        result = false;
      }
    })
    return result;
  }

  const isItInFull = (day: Date) => {
    let result;
    fullDays.forEach((fullDay: Date) => {
      if(fullDay.getTime() === day.getTime()){
        result = true;
        return
      }
      else{
        result = false;
      }
    })
    return result
  }

  const isItInNight = (day: Date) => {
    let result;
    dayAndNight.forEach((night: Date) => {
      if(night.getTime() === day.getTime()){
        result = true;
        return
      }
      else{
        result = false;
      }
    })
    return result
  }


  const removeDate = (day: Date, arr: Date[]) => {
    const newArr = arr.filter((element: Date) => {
      if(element.getTime() === day.getTime()){
          
      }
      else {
        return element
      }
    })
    return newArr;
  }




  const handleDayClick: DayClickEventHandler = (day) => {
    day.setHours(0, 0, 0, 0)
    if(!isItInHalf(day) && !isItInFull(day) && !isItInNight(day)){
      setHalfDays((prev) => [...prev, day])
    }
    else if(isItInHalf(day)){

      const newArr = removeDate(day, halfDays)
      setHalfDays(newArr);
      setFullDays((prev) => [...prev, day])
    }
    else if(isItInFull(day) ){
      const nweArr = removeDate(day, fullDays)
      setFullDays(nweArr)
      setdayAndnight((prev) => [...prev, day])
    }
    else if(isItInNight(day)){
      const nweArr = removeDate(day, dayAndNight)
      setdayAndnight(nweArr)
    }
  };




  const sendToDB = async() => {
    const availabilities: Availability[] = []
    halfDays.forEach(day => {
      availabilities.push({
        'date': day.getTime(),
        'status': 'Half Day'
      })
    })
    fullDays.forEach(day => {
      availabilities.push({
        'date': day.getTime(),
        'status': 'Full Day'
      })
    })
    dayAndNight.forEach(day => {
      availabilities.push({
        'date': day.getTime(),
        'status': 'Day And Night'
      })
    })
  const res = await fetch('api/addtocalendar', {
    method: 'POST',
    body: JSON.stringify({availabilities})
  })
  }

const postAndRefresh = () => {
  sendToDB().then((res) => {
    setClicked(true)
    setTimeout(() => {
    setClicked(false)
  }, 1000)
  }).then(() =>{
    getCalendar()
  }) 
}

  
  
  return (
    <main className='md:flex md:gap-20 gap-20 justify-center pt-28'>
      <div className='w-full md:h-[70vh] m-auto flex justify-items-center justify-center'>
        <DayPicker
        modifiers={{ half: halfDays, full: fullDays, night: dayAndNight}}
        modifiersStyles={{ half: halfStyle, full: fullStyle, night: fullAndNightStyle }}
        onDayClick={handleDayClick}
        className='m-auto'
        />
      </div>
      <div className='w-full md:h-[70vh]'>
        <div className='flex flex-col justify-center p-7 gap-5 h-3/5'>

        <button
        id='save-button' 
        onClick={postAndRefresh} 
        className='bg-mytheme py-3 px-6 rounded-full w-fit hover:bg-mylighttheme duration-1000 pointer-events-auto flex gap-2 justify-center'>
          <AnimatePresence>   
          {clicked && (
            <>
            <motion.p animate={{width: 0, opacity: 0}} transition={{ease: "linear", duration: 0.3, }} initial={{width: 'fit-content', opacity: 1}} id='button-text'>Save</motion.p>
            </>
          )}
          {!clicked && (
           <>
           <motion.p animate={{width: 'fit-content', opacity: 1}} transition={{ease: "linear", duration: 0.3,}} initial={{width: 0, opacity: 0}} id='button-text'>Save</motion.p>
           </>
          )}
          <BsCheckCircleFill className='m-auto' />
          </AnimatePresence>  
        </button>

        <div className='flex gap-5'>
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12.5" cy="12.5" r="10.5" stroke="#C94B4B" stroke-width="4"/>
          </svg>
          <p> Half Day</p>
        </div>
        <div className='flex gap-5'>
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12.5" cy="12.5" r="10.5" stroke="#4BC9AB" stroke-width="4"/>
          </svg>
          <p> All Day</p>
        </div>
      <div className='flex gap-5'>
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12.5" cy="12.5" r="12.5" fill="#4BC9AB"/>
        </svg>
        <p> All Day & Overnight</p>
      </div>
        </div>
      </div>
    </main>
  )
}

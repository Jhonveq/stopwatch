import React, { useEffect, useRef, useState } from 'react'

const Stopwatch = () => {

    const [isRunning, setIsRunning] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [laps, setLaps] = useState([0])
    const intervalIdRef = useRef(null)
    const startTimeRef = useRef(0)

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10)
        }
        return () => {
            clearInterval(intervalIdRef.current)
        }

    }, [isRunning])

    function start() {
        setIsRunning(true)
        startTimeRef.current = Date.now() - elapsedTime
        console.log(laps.length)
    }
    function stop() {
        setIsRunning(false)
    }
    function reset() {
        if (isRunning) {
            setLaps(l => [...l, elapsedTime])
            return console.log(laps)
        }
            setElapsedTime(0) 
            setLaps([0])
    }
    function formatTime(value) {
        let hours = Math.floor(value / (1000 * 60 * 60)) 
        let minutes = Math.floor(value / (1000 * 60) % 60)
        let seconds = Math.floor(value / (1000) % 60)
        let millisecods = Math.floor((value % 1000) / 10) 
        const twoDigit = (number) => String(number).padStart(2, '0') 
        const format = `${twoDigit(minutes)}:${twoDigit(seconds)}:${twoDigit(millisecods)}`

        return format
    }


  return (
            <>
            <section className='flex flex-col items-center border-solid border-4 border-black rounded-[50px] p-[30px] mt-5 bg-gray-100'>
                <div className='font-mono text-4xl font-bold drop-shadow-md mb-6 sm:text-7xl'>{formatTime(elapsedTime)}</div>
                <div className='flex flex-col sm:grid grid-cols-3'>
                    <button className='text-xl font-bold py-2 px-5 m-1 border-none rounded text-white cursor-pointer bg-green-500 hover:bg-green-400 duration-500 ease-out' onClick={start}>START</button>
                    <button onClick={stop} className='text-xl font-bold py-2 px-5 m-1 border-none rounded text-white cursor-pointer bg-red-500 hover:bg-red-400 duration-500 ease-out'>STOP</button>
                    <button onClick={reset} className='text-xl font-bold py-2 px-5 m-1 border-none rounded text-white cursor-pointer bg-blue-500 hover:bg-blue-400 duration-500 ease-out'>{isRunning ? 'LAP' : 'RESET'}</button>
                </div>
            </section>
            <section className='flex flex-col items-center border-solid border-4 border-black rounded-[50px] p-[30px] mt-5 bg-gray-100'>
                <h2 className='text-center text-4xl font-bold font-mono mb-2 sm:text-5xl'>LAPS</h2>
                <ul className='text-center'>
                    {   
                        laps.map((lap, index) => index >= 1 && <li key={index} className='text-l sm:xl'><span className='font-bold'>Lap {index}:</span> {formatTime( lap - laps[index - 1])}</li>) 
                    }
                    <p className='text-red-500 text-xl sm:text-2xl'><span className='font-bold'>Lap {laps.length}:</span> {formatTime(elapsedTime - laps[laps.length - 1])}</p>
                </ul>
            </section>
            </>
        
  )
}

export default Stopwatch
import React, { useState, useEffect } from "react";

const IndexPage = () => {

  const [count, setCount] = useState();
  const [seconds, setSeconds] = useState()
  const INITIAL_VALUE_COUNTDOWN = seconds;
  const [finish, setFinish] = useState(false)
  const [cancel, setCancel] = useState(false)
  let timer;

  useEffect(() => {
    timer = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      }
      else if (count === 0) {
        setFinish(true);
        setCount()
      }
      else clearInterval(timer);
    }, 1000)
    return () => {
      clearInterval(timer);
    }
  }, [count]);

  function startCounter() {
    setCount(INITIAL_VALUE_COUNTDOWN);
    setSeconds('')
  };

  function stopCounter() {
    clearInterval(timer);
    setCount('');
    setCancel(true)
    setTimeout(() => {
      setCancel(false)
    }, 3500)
  };
  
  function removeFinishMessage() {
    setFinish(false)
  } 


  
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-20 w-[200px] mx-auto text-3xl">
        <h1>Contador</h1>
        <div className=' flex items-center justify-center w-[100px] h-[100px] bg-slate-800 my-8 rounded-full'>
          <span className='text-xl text-white'>{count}</span>
        </div>
        {finish ? 
        <div className='flex flex-row p-3 mb-5 items-center justify-around w-full bg-amber-600'>
          <button className='text-xs' onClick={removeFinishMessage}>✕</button>
          <p className='text-xs'>
            O temporizador acabou!
          </p>
        </div> 
        : null
        }
        {cancel ? 
          <p className='p-3 bg-gray-600 text-xs text-white mb-5 text-center w-full'>
            Temporizador cancelado!
          </p> : null
        }
        <div className='flex flex-col'>
          <input type='number' placeholder='Segundos' 
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            className="text-sm bg-violet-600 border-0 outline-0 px-3 py-4 mr-4 rounded-[5px] w-full"
          />
          <div className='flex flex-row mt-5'>
            <button
              className='text-sm px-6 py-3 rounded-[5px] bg-green-400 mr-4 w-full'
              onClick={startCounter}
            >
              ▶
            </button>
            <button
              className='text-sm px-6 py-3 rounded-[5px] bg-red-400 w-full'
              onClick={stopCounter}
            >
              ✕
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default IndexPage;

import React, { useState } from 'react'

// rfc 
import { RxCaretDown } from "react-icons/rx"; 

export default function Header() {
    const [toggle, setToggle] = useState(false); //state managae : aisa menu jiske value ke karan component react krega 
    const hideSideMenu = () => {
        setToggle(false);
    }

    const showSideMenu = () => {
      setToggle(true);
    }
  return (
    <> {/* react segment : every thing must be raped in a single parent || but agar aap koi section nahi lagana chahte to koi ek empty tag laga do , mai usse bhi thik hu !!*/}
        <div className='black-overlay w-full h-full fixed duration-500' style={{
          opacity: toggle ? 1 : 0,
          visibility: toggle ? "visible" : "hidden"
        }}>
        </div>
      <header className='p-[15px] shadow-xl text-[#686b78]'>
          <div className='max-w-[1200px] mx-auto border border-red-500 flex items-center'>
              <div className='w-[100px] '>
                  <img src="images/logo.png" className='w-full' alt="not" />
              </div>
              <div className=''>
              <span className=' font-bold border-b-[3px] border-[black]'>Nagpur,</span> Maharashtra, India <RxCaretDown onClick={showSideMenu} fontSize={25} className='inline text-[#fc8019] cursor-pointer'/>
              </div>
          </div>
      </header>
    </>    
  )
}

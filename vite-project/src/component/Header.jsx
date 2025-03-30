import React from 'react'
// rfc 
import { RxCaretDown } from "react-icons/rx";

export default function Header() {
  return (
      <header className='p-[15px] shadow-xl'>
          <div className='max-w-[1200px] mx-auto border border-red-500 flex items-center'>
              <div className='w-[100px] '>
                  <img src="images/logo.png" className='w-full' alt="not" />
              </div>
              <div className=''>
              <span className=' font-bold border-b-[3px] border-[black]'>Nagpur,</span> Maharashtra, India <RxCaretDown fontSize={25} className='inline text-[#fc8019]'/>
              </div>
          </div>
      </header>
    
  )
}

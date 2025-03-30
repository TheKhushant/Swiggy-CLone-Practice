import React from 'react'
// rfc 
export default function Header() {
  return (
      <header className='p-[15px] shadow-xl'>
          <div className='max-w-[1200px] mx-auto border border-red-500'>
              <div className='w-[80px] h-[80px] border border-blue-500'>
                  <img src="images/logo.png" className='w-full h-full object-cover' alt="not" />
              </div>
          </div>
      </header>
  )
}

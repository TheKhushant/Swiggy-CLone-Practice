import React, { useState } from 'react'

// rfc 
//below is the icons logos from react icons website
import { RxCaretDown } from "react-icons/rx"; 
import { IoMdSearch } from "react-icons/io";
import { CiDiscount1 } from "react-icons/ci";

export default function Header() {
    const [toggle, setToggle] = useState(false); //state managae : aisa menu jiske value ke karan component react krega 
    const hideSideMenu = () => {
        setToggle(false);
    }

    const showSideMenu = () => {
      setToggle(true);
    }

    // array object me data dal ke usko miltiple time use kr sakte ho
    const links = [
      {
        icon: <IoMdSearch/>,
        name: "Search"
      },
      {
        icon: <CiDiscount1/>,
        name: "Offers",
        sup: "New"
      },
      {
        icon: "",
        name: "Search"
      },
      {
        icon: "",
        name: "Help"
      },
      {
        icon: "",
        name: "Sign up"
      },
      {
        icon: "",
        name: "Cart",
        sup: "(3)"
      }     
    ]

  return (
    <> {/* react segment : every thing must be raped in a single parent || but agar aap koi section nahi lagana chahte to koi ek empty tag laga do , mai usse bhi thik hu !!*/}
        <div onClick={hideSideMenu} className='black-overlay w-full h-full fixed duration-500' style={{
          opacity: toggle ? 1 : 0,
          visibility: toggle ? "visible" : "hidden",
          zIndex: 999999
        }}>
          <div onClick={(e)=>{
            e.stopPropagation();
          }} className='w-[500px] bg-white h-full absolute duration-[400ms]'
          style={{
            left: toggle?'0%':'-100%'
          }}
          ></div>
        </div>
      <header className='p-[15px] shadow-xl text-[#686b78]'>
          <div className='max-w-[1200px] mx-auto flex items-center'>
              <div className='w-[100px] '>
                  <img src="images/logo.png" className='w-full' alt="not" />
              </div>
              <div className=''>
              <span className=' font-bold border-b-[3px] border-[black]'>Nagpur,</span> Maharashtra, India <RxCaretDown onClick={showSideMenu} fontSize={25} className='inline text-[#fc8019] cursor-pointer'/>
              </div>
              <nav className='hidden md:flex  gap-5 ml-auto list-none text-[18px] font-semibold'>
                {/* showing data from array object (using Loop) */}
                {
                  // {/* in loop/while rendering react ko samjane ke liye ki kon kis chij ko represent krra hai ! to remove this confusion we use ___Key={index}____ to identify every element uniquely*/}
                  links.map((link, index) => {
                      return <li key={index} className='flex hover:text-[fc8019] items-center gap-2'>
                        {link.icon}
                        {link.name}
                        <sup>{link.sup}</sup>
                      </li>
                  }
                )
              }
              </nav>
          </div>
      </header>
    </>    
  )
}

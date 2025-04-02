import React, { useState,useEffect } from 'react'
import { FaArrowLeft,FaArrowRight } from "react-icons/fa6";
import Card from './Card';

export default function TopRest() {
    const [data,setData] = useState([]);
    
    const fetchTopRestaurant = async () => {
        const response = await fetch('http://localhost:5000/top-restaurant-chains');
        const apiData = await response.json();
        setData(apiData);
    }

    useEffect(
        () => {
            fetchTopRestaurant();
        },[]
    )
  return (
    <div className='max-w-[1200px] mx-auto'>
        <div className='flex my-5 items-center justify-between'>
            <div className='text-[25px] font-bold'>Top Resturant Chains in Nagpur</div>
            <div className='flex'>
                <div className='cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2' >
                <FaArrowLeft/>
                </div>
                <div className='cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2'>
                <FaArrowRight  />
                </div>
            </div>
        </div>
        <div className="flex gap-5 overflow-hidden ">
            {
                data.map(
                    (d,i)=>{
                        return <Card {...d} key={i}/>
                    }
                )
            }    
        </div>
    </div>
  )
}

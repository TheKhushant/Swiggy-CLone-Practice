import React, {useEffect, useRef, useState} from 'react'
import Card from './Card';

export default function OnlineDelivery() {
    const [data, setData] = useState([]);
    const targetRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        if (!targetRef.current) return;
  
        const rect = targetRef.current.getBoundingClientRect();
        // Check if top reached 0
        setIsSticky(rect.top <= 0);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
        // const [categories, setCategory] = useState([0]);
        const fetchTopRestaurant =async () => {
            const response = await fetch("https://sensational-manatee-a6fac0.netlify.app//top-restaurant-chains");
            const apiData = await response.json();
            // const data = await response.json();
            setData(apiData);
        }
        useEffect(
            () => {
                fetchTopRestaurant();
            },[] 
        )
        console.log("fetched data : ",data);
    return (
    <div className='max-w-[1200px] mx-auto' ref={targetRef}>
        <div className='flex my-5 items-center justify-between'>
            <div className='text-[25px] font-bold'>Top Resturant Chains in Nagpur</div>
                {/* <div className='flex'>
                    
                </div> */}
        </div>
        <div className={`my-component ${isSticky ? "fixed top-0 z-[999999] bg-white w-full left-0" : ""}`}>
            <div className='max-w-[1200px] mx-auto flex my-4 gap-3 border border-red-500'>
                <div className='p-3 rounded-md shadow'>Filter</div>
                <div className=''></div>
                <div className='p-3 rounded-md shadow'>Sort</div>
            </div>
        </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3  ">
        {
            data.map(
                (d,i)=>{
                    return <Card key={i} {...d}/>
                }
            )
        }
    </div>
    </div>
    
    
    
  )
}

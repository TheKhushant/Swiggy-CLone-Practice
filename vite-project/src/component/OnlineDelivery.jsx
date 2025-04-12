import React, {useEffect, useState} from 'react'
import Card from './Card';

export default function OnlineDelivery() {
    const [data, setData] = useState([]);
        // const [categories, setCategory] = useState([0]);
        const fetchTopRestaurant =async () => {
            const response = await fetch("http://localhost:5000/top-restaurant-chains");
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
    <div>
        <div className='max-w-[1200px] mx-auto '>
            <div className='flex my-5 items-center justify-between'>
                <div className='text-[25px] font-bold'>Top Resturant Chains in Nagpur</div>
                    <div className='flex'>
                        
                    </div>
            </div>
        <div className="grid grid-cols-4 gap-3  ">
            {
                data.map(
                    (d,i)=>{
                        return <Card key={i} {...d}/>
                    }
                )
            }
        </div>
        </div>
    </div>
    
    
  )
}

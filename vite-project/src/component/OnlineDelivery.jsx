import React, {useEffect, useState} from 'react'

export default function OnlineDelivery() {
    const [data, setData] = useState([]);
        // const [categories, setCategory] = useState([0]);
        const fetchCategory =async () => {
            const response = await fetch("http://localhost:5000/top-restuarant-chains");
            const apiData = await response.json();
            // const data = await response.json();
            setData(apiData);
        }
        useEffect(
            () => {
                fetchTopRestaurant();
            },[] 
        )
    return (
    <div>
      <div className='max-w-[1200px] mx-auto'>
              <div className='flex my-5 items-center justify-between'>
                  <div className='text-[25px] font-bold'>Top Resturant Chains in Nagpur</div>
                    <div className='flex'>
                        
                    </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 ">
                <div className="flex gap-5 overflow-hid den ">
                  {
                      data.map(
                          (d,i)=>{
                              return <Card {...d} key={i}/>
                          }
                      )
                  }    
                </div>
              </div>
          </div>
    
  )
}

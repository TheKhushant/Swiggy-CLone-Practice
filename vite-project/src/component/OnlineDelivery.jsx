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
            const response = await fetch("https://swiggy-api-molm.onrender.com/top-restaurant-chains");
            const apiData = await response.json();
            // const data = await response.json();
            setData(apiData);
        }
        useEffect(
            () => {
                fetchTopRestaurant();
            },[] 
        )
        // console.log("fetched data : ",data);
    return (
    <div className='max-w-[1200px] mx-auto' ref={targetRef}>
        <div className='flex my-5 items-center justify-between'>
            <div className='text-[25px] font-bold'>Top Resturant Chains in Nagpur</div>
                {/* <div className='flex'>
                    
                </div> */}
        </div>
        <div className={`my-component ${isSticky ? "fixed top-0 z-[999999] bg-white w-full left-0" : ""}`}>
  <div className='max-w-[1200px] mx-auto flex gap-3 my-4 justify-between '>

    {/* Filter */}
    <div className='p-3 rounded-3xl shadow border border-black-300'>
      Filter
    </div>

    {/* Sort */}
    <div className='p-3 rounded-3xl shadow border border-black-100 flex items-center'>
        <select
            className='ml-2 rounded py-1'
            onChange={e => {
                const value = e.target.value;
                let sortedData = [...data];
                if (value === "deliveryTime") {
                    // Shuffle for random order (simulate delivery time)
                    for (let i = sortedData.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [sortedData[i], sortedData[j]] = [sortedData[j], sortedData[i]];
                    }
                } else if (value === "rating") {
                    sortedData.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
                } else if (value === "costLowToHigh") {
                    sortedData.sort((a, b) => (a.costForTwo || 0) - (b.costForTwo || 0));
                } else if (value === "costHighToLow") {
                    sortedData.sort((a, b) => (b.costForTwo || 0) - (a.costForTwo || 0));
                }
                setData(sortedData);
            }}
        >
            <option value="relevance">Relevance</option>
            <option value="deliveryTime">Delivery Time</option>
            <option value="rating">Rating</option>
            <option value="costLowToHigh">Cost: Low to High</option>
            <option value="costHighToLow">Cost: High to Low</option>
        </select>
    </div>
    <div className='p-3 rounded-3xl shadow border border-black-300'>
      Fast Delivery
    </div>

    {/* Cuisines */}
    <div className='p-3 rounded-3xl shadow border border-black-300'>
      Cuisines
    </div>

    {/* Explore (e.g., new restaurants) */}
    <div className='p-3 rounded-3xl shadow border border-black-300'>
      New on Swiggy
    </div>

    {/* Ratings */}
    <div className='p-3 rounded-3xl shadow border border-black-300'>
      Ratings 4.0+
    </div>

    {/* Veg / Non-Veg */}
    <div className='p-3 rounded-3xl shadow border border-black-300'>
      Pure Veg
    </div>

    {/* Offers */}
    <div className='p-3 rounded-3xl shadow border border-black-300'>
      Offers
    </div>

    {/* Cost for Two */}
    <div className='p-3 rounded-3xl shadow border border-black-300'>
      Rs.300 - Rs.600
    </div>

    <div className='p-3 rounded-3xl shadow border border-black-300'>
      Below Rs.300
    </div>

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

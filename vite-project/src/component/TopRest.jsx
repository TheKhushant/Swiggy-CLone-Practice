import { useState, useEffect } from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Card from './Card';

export default function TopRest() {
    const [data, setData] = useState([]);
    const [slide, setSlide] = useState(0);
    const cardsToShow = 4; // Number of cards to show at once
    const scrollBy = 3; // Number of cards to scroll per click

    const fetchTopRestaurant = async () => {
        const response = await fetch('https://swiggy-api-molm.onrender.com/top-restaurant-chains');
        const apiData = await response.json();
        setData(apiData);
    }

    useEffect(() => {
        fetchTopRestaurant();
    }, []);

    // Calculate the maximum slide index so that we stop after every 3 results
    const maxSlide = Math.max(
        0,
        Math.ceil((data.length - cardsToShow) / scrollBy) * scrollBy
    );

    const nextSlide = () => {
        setSlide(prev => Math.min(prev + scrollBy, maxSlide));
    };

    const prevSlide = () => {
        setSlide(prev => Math.max(prev - scrollBy, 0));
    };

    return (
        <div className='max-w-[1200px] mx-auto px-2'>
            <div className='flex my-5 items-center justify-between'>
                <div className='text-[25px] font-bold'>Top Resturant Chains in Nagpur</div>
                <div className='flex'>
                    <div className='cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2' onClick={prevSlide} >
                        <FaArrowLeft />
                    </div>
                    <div className='cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2' onClick={nextSlide}>
                        <FaArrowRight />
                    </div>
                </div>
            </div>
            <div className="overflow-hidden">
                <div
                    className="flex gap-5 duration-500"
                    style={{
                        transform: `translateX(-${(slide * (100 / cardsToShow))}%)`,
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    {
                        data.map((d, i) => (
                            <div key={i} className="w-full md:w-[273px] shrink-0">
                                <Card width="w-full md:w-[273px]" {...d} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

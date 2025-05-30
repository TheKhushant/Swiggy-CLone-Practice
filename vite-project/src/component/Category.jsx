import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";


export default function Category({ setLoading }) {
    const [slide, setSlide] = useState(0);
    const [categories, setCategory] = useState([]);

    const fetchCategory = async () => {
        try {
            console.log("function is called");
            const response = await fetch("https://swiggy-api-molm.onrender.com/categories");
            const data = await response.json();
            setCategory(data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            // Let the App component know loading is done
            setLoading(false);
        }
    }

    useEffect(
        () => {
            fetchCategory();
        }, []
    )
    const nextSlide = () => {
        if (slide >= categories.length - 8) return;
        setSlide(slide + 3);
    }
    const prevSlide = () => {
        if (slide <= 0) return;
        setSlide(slide - 3);
    }

    return (
        <div>
            <div className='max-w-[1200px] mx-auto'>
                <div className='flex my-5 items-center justify-between'>
                    <div className='text-[25px] font-bold'>What's on your mind</div>
                    <div className='flex'>
                        <div className='cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2' onClick={prevSlide} >
                            <FaArrowLeft />
                        </div>
                        <div className='cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2' onClick={nextSlide}>
                            <FaArrowRight />
                        </div>
                    </div>
                </div>
                <div className='flex overflow-hidden' >
                    {
                        categories.map(
                            (cat, index) => {
                                return (
                                    <div style={{
                                        transform: `translateX(-${slide * 100}%)`
                                    }} key={index} className='w-[200px] shrink-0 duration-500'>
                                        <img src={"https://swiggy-api-molm.onrender.com/images/" + cat.image} />
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </div>
            <hr className='my-4 border-[1px]' />
        </div>
    )
}
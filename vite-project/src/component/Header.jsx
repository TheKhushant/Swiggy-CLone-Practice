import React, { useState } from 'react'

import { RxCaretDown } from "react-icons/rx"; 
import { IoMdSearch } from "react-icons/io";
import { CiDiscount1 } from "react-icons/ci";
export default function Header() {
  const [toggle, setToggle] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [randomDishes, setRandomDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enlargedImg, setEnlargedImg] = useState(null);

  const hideSideMenu = () => {
    setToggle(false);
    setSelectedArea(null);
    setRandomDishes([]);
    setEnlargedImg(null);
  };
  const showSideMenu = () => setToggle(true);

  const links = [
    { icon: <IoMdSearch/>, name: "Search" },
    { icon: <CiDiscount1/>, name: "Offers", sup: "New" },
    { icon: "", name: "Search" },
    { icon: "", name: "Help" },
    { icon: "", name: "Sign up" },
    { icon: "", name: "Cart", sup: "(3)" }     
  ];

  // List of nearby Nagpur areas
  const nagpurAreas = [
    "Dharampeth",
    "Sitabuldi",
    "Civil Lines",
    "Wardha Road",
    "Mahal",
    "Sadar",
    "Pratap Nagar",
    "Manish Nagar"
  ];

  // Fetch random dish images and names from an API (e.g., TheMealDB)
  const fetchRandomDishes = async (area) => {
    // For demo, fetch 3 random meals from TheMealDB API
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data1 = await res.json();
    const res2 = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data2 = await res2.json();
    const res3 = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data3 = await res3.json();
    return [
      {
        name: data1.meals[0].strMeal,
        img: data1.meals[0].strMealThumb
      },
      {
        name: data2.meals[0].strMeal,
        img: data2.meals[0].strMealThumb
      },
      {
        name: data3.meals[0].strMeal,
        img: data3.meals[0].strMealThumb
      }
    ];
  };

  async function handleAreaClick(area) {
    setSelectedArea(area);
    setLoading(true);
    try {
      const dishes = await fetchRandomDishes(area);
      setRandomDishes(dishes);
    } catch {
      setRandomDishes([]);
    }
    setLoading(false);
  }

  return (
    <>
    <div onClick={hideSideMenu} className='black-overlay w-full h-full fixed duration-500' style={{
      opacity: toggle ? 1 : 0,
      visibility: toggle ? "visible" : "hidden",
      zIndex: 999999
    }}>
      <div onClick={e => e.stopPropagation()} className='w-[500px] bg-white h-full absolute duration-[400ms]'
      style={{ left: toggle ? '0%' : '-100%' }}>
      {/* Location List */}
      <div className="p-6 border-b">
        <h2 className="font-bold text-2xl mb-4">Nearby Nagpur Locations</h2>
        <ul className="list-disc pl-5">
        {nagpurAreas.map(area => (
          <li
            key={area}
            className={`py-2 cursor-pointer hover:text-[#fc8019] text-2xl ${selectedArea === area ? "font-bold" : ""}`}
            onClick={() => handleAreaClick(area)}
          >
            {area}
          </li>
        ))}
        </ul>
        {selectedArea && (
          <div className="mt-6">
            <h3 className="font-semibold mb-4 text-xl">Available Dishes in {selectedArea}:</h3>
            <div className="grid grid-cols-2 gap-6">
              {loading ? (
                <span className="text-lg">Loading...</span>
              ) : randomDishes.length > 0 ? (
                randomDishes.map(dish => (
                  <div key={dish.name} className="flex items-center gap-4 border p-3 rounded shadow-sm">
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="w-24 h-24 object-cover rounded transition-transform duration-300 hover:scale-110"
                      onError={e => { e.target.src = "/images/placeholder.jpg"; }}
                    />
                    <span className="text-lg font-semibold">{dish.name}</span>
                  </div>
                ))
              ) : (
                <span className="text-lg">No dishes found.</span>
              )}
            </div>
          </div>
        )}
      </div>
      {/* You can add more content here if needed */}
      </div>
    </div>
    <header className='p-[15px] shadow-xl text-[#686b78]'>
      <div className='max-w-[1200px] mx-auto flex items-center'>
      <div className='w-[100px] '>
        <img src="images/logo.png" className='w-full' alt="not" />
      </div>
      <div>
        <span className=' font-bold border-b-[3px] border-[black]'>Nagpur,</span> Maharashtra, India <RxCaretDown onClick={showSideMenu} fontSize={25} className='inline text-[#fc8019] cursor-pointer'/>
      </div>
      <nav className='hidden md:flex  gap-5 ml-auto list-none text-[18px] font-semibold'>
        {links.map((link, index) => (
        <li key={index} className='flex hover:text-[fc8019] items-center gap-2'>
          {link.icon}
          {link.name}
          <sup>{link.sup}</sup>
        </li>
        ))}
      </nav>
      </div>
    </header>
    </>
  )
}

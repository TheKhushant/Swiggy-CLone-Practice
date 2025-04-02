import React from 'react'

export default function Card(props) {
  return (
    <div className='w-[273px] shrink-0 grow '>
        <div className='h-[182px] overflow-hidden rounded-[15px] relative'>
            <img className='object-cover w-full h-full' src={"http://localhost:5000/images/"+props.image}  alt="nat geo" />
        <div className='image-overlay absolute w-full h-full top-0 flex items-end p-2 text-[25px] text-white font-bold tracking-tighter '>
            {props.offer}
        </div>
        
        </div>
        
    </div>
  )
}

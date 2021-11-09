import React, {useEffect} from 'react';
import Link from "next/link";
import Aos from 'aos';
import 'aos/dist/aos.css'
import {StarIcon} from "@heroicons/react/solid";

const MovieCard = ({id,image,title,year, animate='zoom-in-up',rating=1,genres=['Sci-fi','documentary']}) => {
    useEffect(()=>{
        Aos.init();
    },[])
    return (
        <Link href={`movie/${id}`}>
            <a>
                <div data-aos={animate} key={id} className={'mt-3 '}>
                    <div className={'hover:scale-110 relative group border-[3px] transition duration-250 ease-in hover:border-green-500 cursor-pointer'}>
                        <img loading={'lazy'} src={image} width={'100%'} />
                        <div className={'text-center transition duration-150 absolute hidden group-hover:block top-0 left-0 w-full h-full bg-[rgba(0,0,0,.8)]'}>
                            <StarIcon className={'h-8 lg:mt-14 mt-8 text-green-500 mx-auto'} />
                            <p className={'text-white mt-5 lg:text-2xl font-bold'}>
                                {rating} / 10
                            </p>
                            <br/>
                            {genres.map((item, index)=>{
                                if (index < 2){
                                    return (
                                        <p key={item} className={'text-white lg:text-2xl font-bold'}>
                                            {item}
                                        </p>
                                    )
                                }
                            })}
                        </div>
                    </div>
                    <p className={'mt-2 font-semibold text-white line-clamp-2 text-xs lg:text-sm'}>
                        {title}
                    </p>
                    <p className={'text-xs text-gray-400'}>{year}</p>
                </div>
            </a>
        </Link>
    );
};

export default MovieCard;
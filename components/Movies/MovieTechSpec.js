import {useEffect, useState} from "react";
import Link from "next/link";
import {DownloadIcon} from "@heroicons/react/outline";

export default function MovieTechSpec({qualities,code}) {
    const [active, setActive] = useState(0);
    const [activeTorrent, setActiveTorrent] = useState({});
    useEffect(()=>{
    },[])
    return (
        <div>
            <div className={'flex space-x-2'}>
                {qualities?.map((item,index)=>(
                    <>
                        <div onClick={e=>setActive(index)} className={`p-2 border rounded-lg text-gray-100 ${index===active?'bg-gray-100 text-black font-bold':''} cursor-pointer hover:scale-110 transition duration-150`} key={index}>
                            {item.quality} {" "} {item.type}
                        </div>
                    </>
                ))}
            </div>
            <div className={'mt-7'}>
                {qualities?.map((item,index)=>(
                    <>
                        {index===active&&(
                            <>
                                <div className={'flex space-x-2 items-center'}>
                                    <p className={'text-white font-bold text-lg'}>
                                        Size:
                                    </p>
                                    <p className={'text-white font-bold'}>
                                        {item.size}
                                    </p>
                                </div>
                                <div className={'flex space-x-2 items-center'}>
                                    <p className={'text-white font-bold text-lg'}>
                                        Subtitle:
                                    </p>
                                    <p className={'text-white font-bold'}>
                                        <a target={'_blank'} href={`https://yifysubtitles.org/movie-imdb/${code}`} className={'group flex hover:bg-gray-500 transition duration-150 items-center space-x-1 px-4 py-1 rounded-lg border'}>
                                            <DownloadIcon className={'h-4 group-hover:text-black text-white'} />
                                        </a>
                                    </p>
                                </div>
                            </>
                        )}
                    </>
                ))}
            </div>
        </div>
    );
}
import {useRouter} from "next/router";
import Header from "../../components/Header";
import {DownloadIcon, HomeIcon, PhotographIcon, PlayIcon} from "@heroicons/react/outline";
import DetailLoading from "../../components/Movies/DetailLoading";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import {HeartIcon} from "@heroicons/react/solid";
import Aos from 'aos';
import 'aos/dist/aos.css'
import {useRecoilState} from "recoil";
import {modalAtom} from "../../Atoms/modalAtom";
import TrillerPlayer from "../../components/Movies/TrillerPlayer";
import MovieTechSpec from "../../components/Movies/MovieTechSpec";
import Player from "../../components/Movies/Player";
import {PlayerAtom} from "../../Atoms/PlayerAtom";

const Movies = () => {
    const router = useRouter();
    const {id} = router.query;
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});
    const [responseStatus, setResponseStatus] = useState(200);
    const [SuggestionMoviesLoading, setSuggestionMoviesLoading] = useState(true);
    const [suggestionMovies, setSuggestionMovies] = useState({});
    const [collapseDescription, setCollapseDescription] = useState(true);
    const [showModal, setShowModal] = useRecoilState(modalAtom)
    const [player, setPlayer] = useRecoilState(PlayerAtom)
    const [playerIndex, setPlayerIndex] = useState(0);

    useEffect(() =>{
        const upMovieTrailer  = async () =>{
            await movieTrailer( 'Up' )
        }
        if(!router.isReady) return;
        if (typeof id !== 'undefined'){
            axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=true`).then(res => {
                if (res.data===''){
                    setResponseStatus(404)
                    setLoading(false)
                }else{
                    setLoading(false)
                    setResponseStatus(200)
                    setMovie(res.data.data.movie)
                    axios.get(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${id}`).then(res=>{
                        setTimeout(()=>{
                            setSuggestionMoviesLoading(false);
                        },500)
                        setSuggestionMovies(res.data.data.movies)
                    }).catch(err=>{
                        setSuggestionMoviesLoading(false);
                    })
                }
            })
        }
        Aos.init();
    },[router.isReady,id])

    useEffect(()=>{
        setLoading(true)
        setSuggestionMoviesLoading(true)
    },[id])

    const playVideo = (i) => {
        setPlayer(true)
        setPlayerIndex(i)
    }

    return (
        <div className={'px-2'}>
            <Header title={movie?.title} />
            <div className={'max-w-6xl mx-auto'}>
                {loading?(
                    <DetailLoading />
                ):responseStatus===200?(
                    <div data-aos={'zoom-in'} className={'mt-10'}>
                        <div className={'flex'}>
                            <div>
                                <img className={'border-[3px]'} loading={'lazy'} src={movie.medium_cover_image} alt=""/>
                                <button onClick={e=>{setPlayerIndex(0); setPlayer(true);}} className={'w-full p-2 hover:scale-110 hover:bg-green-500 transition duration-110 flex items-center text-center justify-center space-x-2 bg-green-600 font-bold mt-3 text-white rounded-lg'}>
                                    <p>Watch</p> <PlayIcon className={'h-7'} />
                                </button>
                            </div>
                            <div className={'ml-12 flex-grow'}>
                                <h2 className={'font-bold text-3xl text-white '}>
                                    {movie.title}
                                </h2> <br/>
                                <p className={'text-xl text-white font-semibold'}>
                                    {movie.year}
                                </p>
                                <div className={'flex text-xl text-white font-bold space-x-2'}>
                                    {
                                        movie?.genres?.map((item, i)=>(
                                            <p key={item} className={`${movie?.genres?.length>=6?'text-sm':''}`}>
                                                {item} {" "}
                                                {i!==movie?.genres?.length-1&&(
                                                    <>
                                                        /
                                                    </>
                                                )}
                                            </p>
                                        ))
                                    }
                                </div>
                                <br/>
                                <div className={'flex items-center'}>
                                    <p className={'lg:text-xl text-white font-semibold italic text-sm'}>Available in: </p>
                                    <div className={'flex ml-3 space-x-2 overflow-x-auto scrollbar-hide'}>
                                        {movie?.torrents?.map((item,i)=>(
                                            <div onClick={()=>playVideo(i)} className={'px-3 py-1 text-xs hover:bg-gray-600 border text-white rounded-lg cursor-pointer hover:scale-110 transition duration-150'} key={i}>
                                                {item.quality}.{item.type.toUpperCase()}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className={'text-gray-400 text-sm italic'}>WEB: same quality as BluRay, but ripped earlier from a streaming service</p>
                                <br/>
                                <div className={'flex items-center'}>
                                    <div className={'w-20'}>
                                        <HeartIcon className={'h-7 text-green-700'} />
                                    </div>
                                    <div>
                                        <p className={'font-bold text-lg text-white'}>
                                            {movie?.like_count}
                                        </p>
                                    </div>
                                </div>
                                <div className={'flex items-center mt-3'}>
                                    <div className={'w-20'}>
                                        <img src={'https://yts.mx//assets/images/website/logo-imdb.svg'} />
                                    </div>
                                    <div>
                                        <p className={'font-bold text-lg text-white'}>
                                            {movie?.rating}
                                        </p>
                                    </div>
                                </div>
                                <div className={'flex items-center mt-3'}>
                                    <div className={'w-20'}>
                                        <DownloadIcon className={'h-7 text-white'} />
                                    </div>
                                    <div>
                                        <p className={'font-bold text-lg text-white'}>
                                            {movie?.download_count}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={'pl-28 w-1/3 hidden md:block'}>
                                {SuggestionMoviesLoading?(
                                    <div>
                                        <div className={'animate-pulse grid grid-cols-2'}>
                                            <div>
                                                <PhotographIcon className={'text-gray-600 h-[150px]'} />
                                            </div>
                                            <div>
                                                <PhotographIcon className={'text-gray-600 h-[150px]'} />
                                            </div>
                                        </div>
                                        <div className={'animate-pulse grid grid-cols-2'}>
                                            <div>
                                                <PhotographIcon className={'text-gray-600 h-[150px]'} />
                                            </div>
                                            <div>
                                                <PhotographIcon className={'text-gray-600 h-[150px]'} />
                                            </div>
                                        </div>
                                    </div>
                                ):(
                                    <>
                                        <p className={'pb-3 text-white font-semibold text-lg'}>Suggestion Movies</p>
                                        <div className={'grid grid-cols-2 items-center gap-5'}>
                                            {suggestionMovies?.map((movie,i)=>(
                                                <div data-aos={'zoom-out'} c data-aos-duration={'2000'} key={movie.id}>
                                                    <Link href={`/movie/${movie.id}`}>
                                                        <a>
                                                            <img className={'border border-black hover:border-green-700 hover:opacity-80'} loading={'lazy'} width={'80%'} src={movie.medium_cover_image} />
                                                        </a>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={'grid grid-cols-3 mt-20 gap-5 lg:gap-0'}>
                            <div className={'relative'} onClick={e=>setShowModal(true)}>
                                <img className={'shadow-lg rounded-lg hover:opacity-80 cursor-pointer transition duration-150 hover:scale-110 ease-in'} loading={'lazy'} src={movie?.medium_screenshot_image1} alt=""/>
                                <div className={'group absolute w-11/12 z-1 cursor-pointer h-full top-0 flex items-center justify-center content-center text-center'}>
                                    <PlayIcon className={'group-hover:scale-110 lg:h-28 h-14 text-white transition duration-150'} />
                                </div>
                            </div>
                            <div>
                                <a target={'_blank'} href={movie?.large_screenshot_image2} rel="noreferrer">
                                    <img className={'shadow-lg rounded-lg hover:opacity-80 cursor-pointer transition duration-150 hover:scale-110 ease-in'} loading={'lazy'} src={movie?.medium_screenshot_image2} alt=""/>
                                </a>
                            </div>
                            <div>
                                <a target={'_blank'} href={movie?.large_screenshot_image3} rel="noreferrer">
                                    <img className={'shadow-lg rounded-lg hover:opacity-80 cursor-pointer transition duration-150 hover:scale-110 ease-in'} loading={'lazy'} src={movie?.medium_screenshot_image3} alt=""/>
                                </a>
                            </div>
                        </div>
                        <div className={'grid grid-cols-2 mt-12 bg-[#1D1D1C]'}>
                            <div>
                                <p className={'text-white font-bold text-xl'}>
                                    Synopsis
                                </p>
                                <p className={`${collapseDescription&&'line-clamp-2'} mt-4 text-white text-sm text-gray-400`}>
                                    {movie.description_full}
                                </p>
                                {String(movie.description_full).length >= 60 && (
                                    <span className={'text-blue-400 select-none cursor-pointer'} onClick={e=>setCollapseDescription(collapseDescription===true?false:true)}>More</span>
                                )}
                                <p className={'mt-3 text-white italic font-semibold'}>
                                    Uploaded At: <span className={'text-green-500'}>{movie?.date_uploaded}</span>
                                </p>
                            </div>
                        </div>
                        <div>
                            <br/>
                            <MovieTechSpec code={movie?.imdb_code} qualities={movie.torrents} />
                        </div>
                        <br/><br/><br/><br/>
                    </div>
                ):(
                    <div className={'flex flex-col items-center justify-center h-[80vh] content-center text-white'}>
                        <h1 className={'text-5xl'}>
                            Not Found
                        </h1>
                        <br/>
                        <Link href={'/'}>
                            <a>
                                <HomeIcon className={'h-10'} />
                            </a>
                        </Link>
                    </div>
                )}
            </div>
            {showModal&&(
                <TrillerPlayer id={id} />
            )}
            {player&&(
                <Player movie_id={id} index={playerIndex} />
            )}
            <br/><br/><br/><br/><br/><br/>
        </div>
    );
};

export default Movies;


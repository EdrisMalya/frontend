import Header from "../components/Header";
import React, {useEffect, useState} from "react";
import Loading from "../components/Loading";
import axios from "axios";
import MovieCard from "../components/Movies/MovieCard";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/solid";
import {useRouter} from "next/router";

const Browse_movies = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState({});
    const router = useRouter();
    const {pathname, query} = router;

    const loadMovies = page => {
        if (typeof page!=='undefined'){
            axios.get(`https://yts.mx/api/v2/list_movies.json?page=${page}&sort_by=year`).then(res=>{
                setMovies(res.data.data.movies)
                setLoading(false);
            }).catch(error=>{
                setLoading(false);
                alert('Something went wrong')
            });
        }
    }

    useEffect(()=>{
        let page;
        if (router.isReady && typeof router.query.page_number==='undefined'){
            page = 1;
            router.replace({
                pathname,
                query: {
                    'page_number': page
                }
            })
        }
        else{
            page = query.page_number
        }
        loadMovies(page);
        return ()=> {
            setLoading(true);
        }
    },[router.isReady,query.page_number]);
    return (
        <div>
            <Header title={'Browse Movies'} />
            <div className={'max-w-6xl mx-auto pb-24'}>
                {loading?(
                    <div className={'flex items-center justify-center w-full h-[80vh]'}>
                        <Loading size={100} />
                    </div>
                ):(
                    <>
                        <div className={'grid grid-cols-3 lg:grid-cols-5 gap-4 mt-4'}>
                            {movies.map(movie=>(
                                <MovieCard
                                    animate={'zoom-in'}
                                    key={movie.id}
                                    id={movie.id}
                                    image={movie.medium_cover_image}
                                    title={movie.title}
                                    year={movie.year}
                                    rating={movie.rating}
                                    genres={movie.genres}
                                />
                            ))}
                        </div>
                        <div className={'flex mt-12'}>
                            <div className={'flex-1'}>
                                <button disabled={parseInt(query.page_number)===1} onClick={()=>router.push({pathname,query:{page_number:(parseInt(router.query.page_number)-1)}})} className={'p-2 disabled:cursor-not-allowed hover:disabled:scale-100 hover:scale-125 transition duration-150 ease-out bg-green-500 disabled:bg-green-900 flex items-center space-x-2 rounded-lg font-semibold shadow-lg'}>
                                    <ArrowLeftIcon className={'h-4'} />
                                    <p>
                                        Previous
                                    </p>
                                </button>
                            </div>
                            <div>
                                <button onClick={()=>router.push({pathname,query:{page_number:(parseInt(router.query.page_number)+1)}})} className={'p-2 hover:scale-125 transition duration-150 ease-out bg-green-500 flex items-center space-x-2 rounded-lg font-semibold shadow-lg'}>
                                    <p>
                                        Next
                                    </p>
                                    <ArrowRightIcon className={'h-4'} />
                                </button>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default Browse_movies;
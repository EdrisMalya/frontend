import React, {useEffect, useState} from 'react';
import Loader from "react-loader-spinner";
import axios from "axios";
import MovieCard from "./MovieCard";
import Link from "next/link";

const LatestMovie = () => {
    const [movies, setMovies] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get('https://yts.mx/api/v2/list_movies.json?sort_by=year').then(res=>{
            if (res.data.status==="ok"){
                setMovies(res.data.data.movies)
                setLoading(false);
            }
        }).catch(()=>{
            alert('Something went wrong')
        })
    },[]);

    return (
        <section className={'bg-[#171717] block mt-10 p-6'}>
            <div className={'max-w-6xl mx-auto '}>
                <div className={'flex items-center mt-2'}>
                    <p className={'text-white text-2xl font-semibold flex-grow'}>
                        Latest Movies
                    </p>
                    <p className={'text-gray-400'}>
                        <Link href={'/browse_movies'}>
                            Browse All
                        </Link>
                    </p>
                </div>
                {loading?(
                    <div className={'flex items-center justify-center content-center'}>
                        <Loader
                            className={'mt-5'}
                            type="BallTriangle"
                            color="#00BFFF"
                            height={100}
                            width={100}
                        />
                    </div>
                ):(
                    <div className={'grid grid-cols-3 lg:grid-cols-5 gap-4 mt-4'}>
                        {movies.map(movie=>(
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                image={movie.medium_cover_image}
                                title={movie.title}
                                year={movie.year}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default LatestMovie;
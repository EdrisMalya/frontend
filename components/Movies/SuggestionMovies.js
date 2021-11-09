import React, {useEffect, useState} from 'react';
import axios from "axios";
import Loader from "react-loader-spinner";
import MovieCard from "./MovieCard";

const SuggestionMovies = () => {
    const [popularDownloads, setPopularDownloads] = useState({});
    const [loadingPopularDownloads,setLoadingPopularDownloads] = useState(true);

    useEffect(()=>{
        axios.get('https://yts.mx/api/v2/list_movies.json?sort_by=year')
            .then(res => {
                if (res.data.status==="ok"){
                    setPopularDownloads(res.data.data.movies)
                    setLoadingPopularDownloads(false);
                }
            })
    },[])

    return (
        <>
            {
                loadingPopularDownloads?(
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
                    <div className={'grid grid-cols-2 gap-5 lg:grid-cols-4  lg:gap-16 content-center'}>
                        {popularDownloads.splice(0,4).map(movie=>(
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                image={movie.medium_cover_image}
                                title={movie.title}
                                year={movie.year}
                            />
                        ))}
                    </div>
                )
            }
        </>
    );
};

export default SuggestionMovies;
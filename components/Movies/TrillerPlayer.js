import {useRecoilState} from "recoil";
import {modalAtom} from "../../Atoms/modalAtom";
import Loader from "react-loader-spinner";
import React, {useEffect, useState} from "react";
import YouTube from "react-youtube";
import axios from "axios";
const TrillerPlayer = ({id}) => {
    const [showModal, setShowModal] = useRecoilState(modalAtom)
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState(null);
    const error = () => {
        setShowModal(false);
        alert('Something went wrong')
    }

    useEffect(()=>{
        axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`).then(res=>{
            setLoading(false)
            setMovie(res.data.data.movie)
        }).catch(err=>{
            setShowModal(false);
            alert('Something went wrong')
        })
    },[id])

    return (
        <>
            {
                showModal&&(
                    <div>
                        <div onClick={e=>setShowModal(false)} className={'fixed flex items-center content-center justify-center top-0 left-0 w-screen h-screen z-40 bg-[rgba(0,0,0,.6)]'}>
                                {loading?(
                                    <div className={'flex h-[400px] top-[50%] left-[50%] w-[600px] shadow-lg rounded-lg p-5 bg-[rgab(0,0,0,.9)]'}>
                                        <div className={'flex items-center justify-center content-center w-full'}>
                                            <Loader
                                                type="BallTriangle"
                                                color="green"
                                                height={100}
                                                width={100}
                                            />
                                        </div>
                                    </div>

                                ):(
                                    <div>
                                        <YouTube
                                            videoId={movie?.yt_trailer_code}                  // defaults -> null
                                            id={movie?.id}                       // defaults -> null
                                            onError={error}
                                        />
                                    </div>
                                )}
                            </div>
                    </div>
                )
            }
        </>
    );
};

export default TrillerPlayer;
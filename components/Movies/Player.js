import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import {useRecoilState} from "recoil";
import {PlayerAtom} from "../../Atoms/PlayerAtom";
import Loader from "react-loader-spinner";
import React, {useEffect, useState} from "react";
import axios from "axios";
import parseTorrent from 'parse-torrent';


const Player = ({movie_id, index=0}) => {
    const [showModal, setShowModal] = useRecoilState(PlayerAtom);
    const [showLoading, setShowLoading] = useState(true);
    const [video, setVideo] = useState('');
    const [movie, setMovie] = useState({});

    useEffect(()=>{
        axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${movie_id}`).then(res=>{
            setMovie(res.data.data.movie)
            setShowLoading(false)
            let torrentHas = res.data.data.movie.torrents[index].hash
            let movieName = encodeURIComponent(res.data.data.movie.title_long);
            let torrentId = `magnet:?xt=urn:btih:${torrentHas}&dn=${movieName}&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce`
            window.open(`https://edrismalya.000webhostapp.com/player?link=${torrentId}`,'_blank')
            setShowModal(false)
        }).catch(err=>{
            setShowModal(false);
            alert('Something went wrong222')
        })
    },[movie_id])
    return (
        <div>
            <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
                {showLoading?(
                    <ModalBody>
                        <div className={'flex items-center justify-center content-center'}>
                            <Loader
                                className={'mt-5'}
                                type="BallTriangle"
                                color="#00BFFF"
                                height={100}
                                width={100}
                            />
                        </div>
                    </ModalBody>
                ):(
                    <>

                        <ModalHeader toggler={() => setShowModal(false)}>
                            {movie.title}
                        </ModalHeader>
                        <ModalBody>

                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="red"
                                buttonType="link"
                                onClick={(e) => setShowModal(false)}
                                ripple="dark"
                            >
                                Close
                            </Button>

                            <Button
                                color="green"
                                onClick={(e) => setShowModal(false)}
                                ripple="light"
                            >
                                Save Changes
                            </Button>
                        </ModalFooter>

                    </>
                )}
            </Modal>
        </div>
    );
};

export default Player;
import {DocumentTextIcon, SearchIcon, TrendingUpIcon, VideoCameraIcon} from "@heroicons/react/outline";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import Head from "next/head";
import Loader from "react-loader-spinner";
import Loading from "./Loading";
import axios from "axios";
import {useRouter} from "next/router";


const Header = ({title='AEM'}) => {
    const [filter, setFilter] = useState(false);
    const [autoCompleteBoxLeftMargin, setAutoCompleteBoxLeftMargin] = useState(0);
    const [searchWidth, setSearchWidth] = useState(0);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [searchResult, setSearchResult] = useState({});
    const [activeSearchResult, setActiveSearchResult] = useState(0);
    const [activeSearchResultId, setActiveSearchResultId] = useState(null);
    const router = useRouter();

    const resize = () => {
        let margin = document.querySelector('#search').getBoundingClientRect().left;
        setAutoCompleteBoxLeftMargin(parseInt(String(margin).split('.')[0]));
        let width = document.querySelector('#search').getBoundingClientRect().width;
        setSearchWidth(width);
    }

    useEffect(()=>{
        let margin = document.querySelector('#search').getBoundingClientRect().left;
        setAutoCompleteBoxLeftMargin(parseInt(String(margin).split('.')[0]));
        let width = document.querySelector('#search').getBoundingClientRect().width;
        setSearchWidth(width);
        window.addEventListener('resize', resize)
    },[]);

    const search = e => {
        setInputValue(e.target.value)
        let cancel
        if (e.target.value!==null & e.target.value.length > 1 && e.keyCode!==27 && e.keyCode!==40 && e.keyCode!==38){
            setLoading(true);
            axios({
                method: 'GET',
                url: 'https://yts.mx/api/v2/list_movies.json',
                params: {
                    query_term: e.target.value.toLowerCase().replace(' ','+'),
                    sort_by: 'year',
                    limit: 8
                },
                cancelToken: new axios.CancelToken(c=> cancel = c)
            }).then(res=>{
                if (res.data.data.movie_count > 0){
                    setLoading(false)
                    setSearchResult(res.data.data.movies)
                    setActiveSearchResultId(res.data.data.movies[0].id)
                }else{
                    setLoading(false)
                    setSearchResult({});
                }
            }).catch(error=>{
                setLoading(false);
                setSearchResult({});
            });
        }else{
            if (e.keyCode===27){
                setLoading(false);
                setSearchResult({})
                setActiveSearchResult(0)
                e.target.value = '';
            }
        }
        if (searchResult?.length>0){
            if (e.keyCode===40){
                if (searchResult.length!==activeSearchResult+1){
                    setActiveSearchResult(activeSearchResult+1);
                    e.target.value = searchResult[activeSearchResult+1].title_long;
                    setActiveSearchResultId(searchResult[activeSearchResult+1].id);
                }
            }
            if (e.keyCode===38){
                if (activeSearchResult !== 0){
                    setActiveSearchResult(activeSearchResult-1);
                    e.target.value = searchResult[activeSearchResult-1].title_long;
                    setActiveSearchResultId(searchResult[activeSearchResult-1].id);
                }
            }
            if (e.keyCode===13 && activeSearchResultId!=null){
                setLoading(false)
                setSearchResult({})
                setActiveSearchResult(0)
                setInputValue('')
                setActiveSearchResultId('')
                router.push(`/movie/${activeSearchResultId}`)
            }
        }
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className={'h-18 bg-[#1D1D1D] sticky top-0 py-2 z-30'}>
                <div className={'flex items-center px-3 lg:px-16'}>
                    <Link href={'/'}>
                        <a>
                            <div className={'text-white flex items-center space-x-3 flex-grow lg:flex-grow-0'}>
                                <div>
                                    <VideoCameraIcon className={'h-10 lg:h-14'} />
                                </div>
                                <div>
                                    <p className={'text-2xl -mt-2'}>|</p>
                                </div>
                                <div>
                                    <p className={'font-semibold text-xl lg:text-2xl'}>AEM</p>
                                </div>
                            </div>
                        </a>
                    </Link>
                    <div className={'flex-grow pl-10'}>
                        <h4 className={'text-xl text-gray-400 hidden lg:inline-flex'}>
                            HD movies at the smallest file size.
                        </h4>
                    </div>
                    <div className={'flex items-center space-x-2 md:hidden'}>
                        <SearchIcon onClick={e=> {setFilter(filter?false:true)}} className={'h-7 font-semibold cursor-pointer text-white'} />
                    </div>
                    <div id={'search'} className={'flex hidden md:inline-flex items-center space-x-2 p-4 border h-10 border-gray-400 rounded-full'}>
                        <div>
                            <SearchIcon className={'h-4 text-gray-400'} />
                        </div>
                        <div className={'flex-grow'}>
                            <input onKeyUp={search} type="text" className={'w-full bg-transparent ring-0 outline-none text-gray-400  text-sm'} placeholder={'Quick search'}/>
                        </div>
                        {loading&&(
                            <div>
                                <Loading />
                            </div>
                        )}
                    </div>
                    <div id={''} className={'flex hidden md:inline-flex ml-4 space-x-3 text-gray-400 text-sm'}>
                        <Link href={'/'}>
                            <a className={'hover:text-white transition duration-200'}>Home</a>
                        </Link>
                        <div className={'text-white font-bold'}>
                            |
                        </div>
                        <Link href={'/browse_movies'}>
                            <a className={'hover:text-white transition duration-200'}>Browse Movies</a>
                        </Link>
                    </div>
                </div>
                {searchResult.length > 0&&(
                    <div className={'hidden lg:block'}>
                        <div className={'block border fixed h-auto bg-[#1d1d1d] shadow-lg'} style={{left: `${autoCompleteBoxLeftMargin}px`,width: `${searchWidth}px`}}>
                            {searchResult?.map((movie,index)=>(
                                <div onClick={e=>router.push('/movie/'+movie.id)} key={movie.id} className={`flex items-center border-b p-2 space-x-2 cursor-pointer hover:bg-gray-700 ${activeSearchResult===index&&'bg-gray-700'}`}>
                                    <img loading={'lazy'} src={`${movie.small_cover_image}`} alt=""/>
                                    <div>
                                        <p className={'line-clamp-1 text-white text-xs font-semibold'}>
                                            {movie.title_long}
                                        </p>
                                        <p className={'mt-2 text-gray-400 text-sm'}>
                                            {movie.year}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {filter&&(
                    <div className={'bg-[#171717] p-4'}>
                        <div className={'transition items-center flex'}>
                            <div className={'flex-grow'}>
                                <input onKeyUp={search} className={'rounded-tl-lg outline-none text-white rounded-bl-lg w-full px-3 py-2 text-sm placeholder-gray-400 bg-[#333333]'} placeholder={'Search for a movie...'} type="text"/>
                            </div>
                            <button className={'bg-[#4AA24A] text-white h-[38px] px-4 rounded'}>Search</button>
                            {loading&&(
                                <div className={'ml-3'}>
                                    <Loading />
                                </div>
                            )}

                        </div>
                        {searchResult.length > 0 &&(
                            <div className={'border mt-3'}>
                                {searchResult.map((movie,index)=>(
                                    <div onClick={e=>router.push('/movie/'+movie.id)} key={index} className={`flex items-center border-b p-2 space-x-2 cursor-pointer hover:bg-gray-700 ${activeSearchResult===index&&'bg-gray-700'}`}>
                                        <div>
                                            <img src={movie.small_cover_image} alt=""/>
                                        </div>
                                        <div>
                                            <p className={'line-clamp-1 text-white text-xs font-semibold'}>
                                                {movie.title_long}
                                            </p>
                                            <p className={'mt-2 text-gray-400 text-sm'}>
                                                {movie.year}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {/*{searchResult.length > 0&&(
                            )}*/}
                    </div>
                )}
            </div>
        </>
    );
};

export default Header;
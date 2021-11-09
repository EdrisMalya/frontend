import {StarIcon} from "@heroicons/react/solid";
import SuggestionMovies from "./Movies/SuggestionMovies";
import LatestMovie from "./Movies/LatestMovie";

const Main = () => {
    return (
        <main  className={'h-screen bg-no-repeat bg-cover'}>
            <div >
                <div className={'text-center hidden md:block'}>
                    <h1 className={'text-white font-bold text-5xl mt-14'}>
                        Download and watch movies: HD smallest size
                    </h1>
                    <span className={'w-1/2 inline-block text-gray-400 mt-10'}>
                    Welcome to the official AEM website. Here you can browse, watch and download movies in excellent 720p, 1080p, 2160p 4K and 3D quality, all at the smallest file size. AEM Movies Torrents.
                </span><br/><br/>
                    <p className={'inline-block text-blue-400'}>
                        IMPORTANT - AEM.COM is the only new official domain for AEM Movies
                    </p>
                </div>
                <div className={'max-w-6xl mx-auto px-3'}>
                    <div className={'flex items-center space-x-2 content-center justify-center mt-6'}>
                        <StarIcon className={'h-7 text-green-700'} />
                        <h4 className={'text-xl text-white font-bold'}>
                            Popular Downloads
                        </h4>
                    </div><br/>
                    <div className={'block w-full bg-[#555] h-[1px]'} /><br/>
                    <SuggestionMovies />
                </div>
                <LatestMovie />
            </div>
        </main>
    );
};

export default Main;
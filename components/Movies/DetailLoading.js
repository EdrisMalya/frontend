import {PhotographIcon} from "@heroicons/react/outline";

const DetailLoading = () => {
    return (
        <div>
            <div className={'grid grid-cols-3 gap-14'}>
                <div className="animate-pulse flex space-x-4">
                    <PhotographIcon className={'text-gray-600'} />
                </div>
                <div>
                    <div className="animate-pulse flex space-x-4 mt-14">
                        <div className="flex-1 space-y-4 py-1">
                            <div className="h-4 bg-gray-600 rounded w-3/4" />
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-600 rounded" />
                                <div className="h-4 bg-gray-600 rounded w-5/6" />
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="animate-pulse flex space-x-4 mt-14">
                        <div className="flex-1 space-y-4 py-1">
                            <div className="h-4 bg-gray-600 rounded w-3/4" />
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-600 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
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
                <div className={'p-4 animate-pulse'}>
                    <div className={'w-full h-52 bg-[#2D2D2C] rounded-2xl'} />
                </div>
                <div className={'p-4 animate-pulse'}>
                    <div className={'w-full h-52 bg-[#2D2D2C] rounded-2xl'} />
                </div>
                <div className={'p-4 animate-pulse'}>
                    <div className={'w-full h-52 bg-[#2D2D2C] rounded-2xl'} />
                </div>
            </div>
        </div>
    );
};

export default DetailLoading;
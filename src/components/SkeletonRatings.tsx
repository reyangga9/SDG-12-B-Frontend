export const SkeletonRatings = () => {
    return (
        <>
            <div className='mb-3 flex items-center animate-pulse'>
                <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3'></div>
                <div className="w-1/12 h-5 bg-gray-300 rounded-lg"></div>

                <div>
                    <div className="w-full h-6 bg-gray-300 rounded-lg"></div>
                </div>

                <div className=" bg-gray-300 px-2 py-1 rounded-full shadow-lg ml-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-6 bg-gray-300 rounded-lg"></div>
                    </div>
                </div>
            </div>
            <div className="relative mb-3">
                <div className="border text-black p-4 rounded-xl shadow-md">
                    <div className="w-1/6 h-4 bg-gray-300 rounded-md"></div>

                </div>
            </div>
        </>
    );
};
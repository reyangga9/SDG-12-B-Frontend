export const SkeletonResto = () => {
    return (
        <div className='flex justify-between space-x-7 animate-pulse'>
            <div className='flex flex-col w-full'>
                <div className="w-1/2 h-6 bg-gray-300 rounded-lg mb-2"></div>
                <div className="w-1/6 h-4 bg-gray-300 rounded-md mb-2"></div>
                <div className="w-5/12 h-6 bg-gray-300 rounded-lg mb-2"></div>
            </div>
            <figure className='flex-none h-full'>
                <div className="w-40 h-40 border object-cover bg-gray-100 rounded-xl"></div>
            </figure>
        </div>
    );
};
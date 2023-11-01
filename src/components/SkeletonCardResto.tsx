export const SkeletonCardResto = () => {
    return (
        <div className="card w-72 h-full bg-base-100 border mb-8 animate-pulse transition-all duration-300 ease-in-out">
            <figure className="px-2 pt-2">
                <div className="w-full h-60 border object-cover bg-gray-100 rounded-xl"></div>
            </figure>
            <div className="card-body px-3 py-3">
                <div className="w-full h-6 bg-gray-300 rounded-lg mb-2"></div>
                <div className="w-2/3 h-4 bg-gray-300 rounded-md"></div>
            </div>
        </div>
    );
};
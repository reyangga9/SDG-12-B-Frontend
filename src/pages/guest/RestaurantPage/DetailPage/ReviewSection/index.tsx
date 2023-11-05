import { Star } from "lucide-react";
import { SkeletonRatings } from "~/components/SkeletonRatings";
import { ReviewsSectionProps } from "./types";

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ ratings }) => {
    return (
        <div id="reviews-content">
            <h2 className="text-xl font-semibold mb-3">All Reviews</h2>
            {ratings.length > 0
                ? ratings.map((rating, index) => (
                    <div key={index}>
                        <div className="mb-3 flex items-center">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                                {rating.name && (
                                    <p className="text-white text-lg font-bold">
                                        {rating.name[0]}
                                    </p>
                                )}
                            </div>
                            <div>
                                <p className="font-bold">{rating.name}</p>
                            </div>
                            <div className=" bg-white px-2 py-1 rounded-full shadow-lg ml-auto">
                                <div className="flex items-center gap-2">
                                    <Star size={20} fill="yellow" className="text-yellow-500" />
                                    <span className="text-md font-semibold">{rating.rating}</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative mb-3">
                            <div className="bg-white text-black p-4 rounded-xl shadow-md">
                                {rating.comment && <p>{rating.comment}</p>}
                            </div>
                        </div>
                    </div>
                ))
                : Array.from({ length: 4 }).map((_, index) => <SkeletonRatings key={index} />)}
        </div>
    );
};

export default ReviewsSection;

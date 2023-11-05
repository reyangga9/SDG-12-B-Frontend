import { Restaurant } from "../types"; // Import your Restaurant type definition

export interface RestoProfileSectionProps {
    restaurant: Restaurant | null;
    setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>; // Define the prop type for setImageLoaded
    imageLoaded: boolean;
    loading: boolean;
}
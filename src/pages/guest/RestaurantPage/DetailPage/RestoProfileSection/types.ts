import { Restaurant } from "~/hook/useRestaurantHook";

export interface RestoProfileSectionProps {
  restaurant: Restaurant | null;
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>; // Define the prop type for setImageLoaded
  imageLoaded: boolean;
  loading: boolean;
}

import { Food } from "../types";

export interface MenuSectionProps {
    foods: Food[] | null;
    foodCounts: { [id: string]: number };
    handleIncrement: (id: string) => void;
    handleDecrement: (id: string) => void;
    imageLoaded: boolean;
    setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>; // Define the prop type for setImageLoaded
}

export interface MenuSectionProps {
    foods: any[] | null;
    foodCounts: { [id: string]: number };
    handleIncrement: (id: string, restoId: string) => void;
    handleDecrement: (id: string, restoId: string) => void;
    imageLoaded: boolean;
    setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>; // Define the prop type for setImageLoaded
}
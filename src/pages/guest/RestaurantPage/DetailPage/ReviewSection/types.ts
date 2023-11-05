export interface ReviewsSectionProps {
    ratings: {
        name: string;
        rating: number;
        comment?: string; // Make the 'comment' property optional
    }[];
}
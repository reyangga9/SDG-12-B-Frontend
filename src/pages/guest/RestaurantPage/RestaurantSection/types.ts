import { Restaurant } from "~/hook/useRestaurantHook";

export type RestaurantSectionProps = {
    restaurants: Restaurant[] | null;
    loading: boolean;
};
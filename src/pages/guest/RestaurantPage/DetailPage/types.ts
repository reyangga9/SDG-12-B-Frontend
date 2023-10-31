export interface Restaurant {
    _id: string;
    nama: string;
    category: string[];
    alamat: string;
    kota: string;
    gambarRestaurant: string;
    rating: Rating[];
    // Definisikan properti lainnya sesuai dengan respons API
}
export interface Rating {
    name: string;
    rating: number;
    comment?: string;
    _id: string;
}

export interface ColorCache {
    [key: string]: string;
}

export interface Food {
    _id: string;
    makanan: string;
    tanggalExpired: string;
    gambarMakanan: string;
    harga: number;
    restoId: string;
    stokMakanan: number;
    discountPercentage: number;
}


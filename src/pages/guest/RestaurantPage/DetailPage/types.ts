export interface Restaurant {
    _id: string;
    nama: string;
    category: string;
    alamat: string;
    kota: string;
    gambarRestaurant: string;
    // Definisikan properti lainnya sesuai dengan respons API
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


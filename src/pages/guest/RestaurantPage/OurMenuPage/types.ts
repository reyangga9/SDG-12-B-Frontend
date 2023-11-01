export interface Food {
    _id: string;
    makanan: string;
    tanggalExpired: string;
    gambarMakanan: string;
    harga: number;
    restoId: string;
    stokMakanan: number;
    discountPercentage: number;
    category: string[];
}
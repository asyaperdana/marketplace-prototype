import type { Product } from "$lib/types";

type ProductSeed = Omit<Product, "status" | "createdAt" | "updatedAt"> & {
	createdAt: string;
	updatedAt?: string;
	status?: Product["status"];
};

const toDate = (value: string) => new Date(value);

const createProduct = (data: ProductSeed): Product => ({
	...data,
	status: data.status ?? "available",
	createdAt: toDate(data.createdAt),
	updatedAt: toDate(data.updatedAt ?? data.createdAt)
});

export const mockProducts: Product[] = [
	createProduct({
		id: "prod_001",
		title: "MacBook Pro M1 2020",
		description:
			"Dijual MacBook Pro M1 2020 13 inch. RAM 8GB, SSD 256GB. Kondisi mulus 98%, hanya pemakaian wajar. Battery health 90%. Tidak ada dent, layar aman, semua fungsi normal. Kelengkapan fullset original (dus, charger, kabel). Bonus sleeve case.",
		price: 12500000,
		originalPrice: 19999000,
		images: [
			"https://images.unsplash.com/photo-1611186871348-d1fa63198cc4?w=800&q=80",
			"https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=800&q=80"
		],
		category: "electronics",
		condition: "like_new",
		sellerId: "user_001",
		location: "Jakarta Selatan",
		createdAt: "2024-03-01"
	}),
	createProduct({
		id: "prod_002",
		title: "iPhone 13 128GB Midnight",
		description:
			"iPhone 13 kapasitas 128GB warna Midnight. Ex garansi iBox. Face ID on, True Tone on, iCloud kosong. BH 88%. Body mulus banget selaiknya baru, selalu pakai casing. Kelengkapan HP dan kabel data original.",
		price: 8200000,
		originalPrice: 12000000,
		images: [
			"https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800&q=80",
			"https://images.unsplash.com/photo-1695048180490-3211925b7d69?w=800&q=80"
		],
		category: "electronics",
		condition: "good",
		sellerId: "user_002",
		location: "Bandung",
		createdAt: "2024-03-02"
	}),
	createProduct({
		id: "prod_003",
		title: "Sony WH-1000XM4 Noise Cancelling",
		description:
			"Headphone Sony WH-1000XM4. Noise cancelling terbaik. Suara jernih, masih garansi resmi Sony Indonesia sampai Agustus 2024. Jarang dipakai, earpad masih empuk banget. Lengkap dus, case, kabel aux, adapter pesawat.",
		price: 2800000,
		originalPrice: 4000000,
		images: [
			"https://images.unsplash.com/photo-1618335829737-2228915674e0?w=800&q=80",
			"https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80"
		],
		category: "electronics",
		condition: "like_new",
		sellerId: "user_003",
		location: "Surabaya",
		createdAt: "2024-03-03"
	}),
	createProduct({
		id: "prod_004",
		title: "Kamera Analog Canon AE-1",
		description:
			"Kamera analog legendaris Canon AE-1 Program. Lensa 50mm f/1.8. Shutter empuk, lightmeter nyala akurat. Optik lensa bersih no fog no jamur. Body ada brassing dikit wajar vintage. Siap pakai hunting foto.",
		price: 2500000,
		images: [
			"https://images.unsplash.com/photo-1518118014377-ce94f39feb4c?w=800&q=80",
			"https://images.unsplash.com/photo-1500634245200-e5245c7574ef?w=800&q=80"
		],
		category: "hobbies",
		condition: "good",
		sellerId: "user_004",
		location: "Yogyakarta",
		createdAt: "2024-03-04"
	}),
	createProduct({
		id: "prod_005",
		title: "IKEA POÄNG Armchair",
		description:
			"Kursi santai IKEA POÄNG warna birch veneer/Hillared beige. Kondisi masih sangat kokoh, tidak ada yang patah. Cover cushion baru dicuci laundry, bersih wangi. Nyaman banget buat baca buku atau nonton TV. Dijual karena mau pindahan.",
		price: 950000,
		originalPrice: 1995000,
		images: [
			"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
			"https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80"
		],
		category: "home",
		condition: "good",
		sellerId: "user_001",
		location: "Jakarta Selatan",
		createdAt: "2024-03-05"
	}),
	createProduct({
		id: "prod_006",
		title: "Sepeda Lipat Brompton M6L",
		description:
			"Brompton M6L tahun 2019 warna Racing Green. 6 speed. Kondisi 95% mulus, jarang gowes jauh. Upgrade sadel Brooks B17. Ban masih tebal. Lipatan aman, engsel kencang. Dokumen lengkap, siap gowes santai CFD.",
		price: 28500000,
		originalPrice: 32000000,
		images: [
			"https://images.unsplash.com/photo-1485965120184-e224f7a1aab7?w=800&q=80",
			"https://images.unsplash.com/photo-1507035895480-2b3156c311a6?w=800&q=80"
		],
		category: "vehicles",
		condition: "like_new",
		sellerId: "user_005",
		location: "Tangerang Selatan",
		createdAt: "2024-03-06"
	}),
	createProduct({
		id: "prod_007",
		title: "Nike Air Jordan 1 High Chicago",
		description:
			"Air Jordan 1 Retro High OG 'Lost & Found'. Size US 9 / EUR 42.5. Baru 100% Brand New In Box (BNIB). Receipt pembelian dari Atmos ada. Dijual karena salah size. Barang kolektor, harga bakal naik terus.",
		price: 3500000,
		images: ["https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80"],
		category: "fashion",
		condition: "new",
		sellerId: "user_006",
		location: "Jakarta Barat",
		createdAt: "2024-03-07"
	}),
	createProduct({
		id: "prod_008",
		title: "Novel Harry Potter Complete Set",
		description:
			"Jual koleksi pribadi novel Harry Potter 1-7 Bahasa Indonesia terbitan Gramedia. Cetakan lama, kertas masih enak dibaca walau agak menguning (natural aging). Tidak ada halaman sobek atau coretan. Bonus bookmark asrama Hogwarts.",
		price: 450000,
		images: [
			"https://images.unsplash.com/photo-1609866138210-84bb69694d58?w=800&q=80",
			"https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80"
		],
		category: "books",
		condition: "good",
		sellerId: "user_007",
		location: "Depok",
		createdAt: "2024-03-08"
	}),
	createProduct({
		id: "prod_009",
		title: "Stroller Bugaboo Bee 5",
		description:
			"Stroller premium Bugaboo Bee 5 warna Grey Melange. Bisa dari newborn sampai balita. Suspensi empuk banget, manuver lincah. Kondisi kain bersih, rangka ada baret halus pemakaian loading bagasi mobil. Rain cover included.",
		price: 4800000,
		originalPrice: 11000000,
		images: [
			"https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80",
			"https://images.unsplash.com/photo-1591027480007-a42f6ef886c3?w=800&q=80"
		],
		category: "baby",
		condition: "good",
		sellerId: "user_008",
		location: "Jakarta Utara",
		createdAt: "2024-03-09"
	}),
	createProduct({
		id: "prod_010",
		title: "Skincare La Mer Crème de la Mer 60ml",
		description:
			"Original La Mer Moisturizing Cream. Masih segel, belum pernah dibuka sama sekali (BNIB). Dapat kado ultah tapi nggak cocok sama kulit saya. Expiry date masih lama 2026. Harga counter 5jt-an.",
		price: 3200000,
		originalPrice: 5400000,
		images: [
			"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
			"https://images.unsplash.com/photo-1571781926291-28059004d3b9?w=800&q=80"
		],
		category: "beauty",
		condition: "new",
		sellerId: "user_009",
		location: "Bali",
		createdAt: "2024-03-10"
	}),
	createProduct({
		id: "prod_011",
		title: "Gitar Akustik Yamaha F310",
		description:
			"Gitar akustik sejuta umat, Yamaha F310 Original. Suara nyaring, senar baru ganti D'Addario 0.10. Body mulus, neck lurus, fret aman. Cocok buat pemula belajar gitar. Bonus softcase tebal.",
		price: 850000,
		originalPrice: 1300000,
		images: ["https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=800&q=80"],
		category: "hobbies",
		condition: "good",
		sellerId: "user_010",
		location: "Malang",
		createdAt: "2024-03-11"
	}),
	createProduct({
		id: "prod_012",
		title: "Tanaman Monstera King Besar",
		description:
			"Monstera deliciosa (King) ukuran besar. Daun sudah pecah cantik, ada 6 daun, tinggi sekitar 1 meter. Akar sehat rimbun, pot terakota diameter 40cm. Perawatan mudah. Khusus pengiriman instan kurir mobil atau ambil sendiri.",
		price: 350000,
		images: [
			"https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80",
			"https://images.unsplash.com/photo-1600411833196-7c1f6b152789?w=800&q=80"
		],
		category: "home",
		condition: "good",
		sellerId: "user_011",
		location: "Bogor",
		createdAt: "2024-03-12"
	}),
	createProduct({
		id: "prod_013",
		title: "Samsung Galaxy S22 Ultra",
		description:
			"Samsung S22 Ultra 5G 256GB Burgundy. Ex Garansi SEIN. Mulus 99% like new, plastik bezel masih nempel. S-Pen lancar jaya. Kamera zoom 100x mantap. Fullset original.",
		price: 11500000,
		originalPrice: 17999000,
		images: [
			"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80"
		],
		category: "electronics",
		condition: "like_new",
		sellerId: "user_002",
		location: "Surabaya",
		createdAt: "2024-03-13"
	}),
	createProduct({
		id: "prod_014",
		title: "Keyboard Mechanical Keychron K2",
		description:
			"Keychron K2 V2 Wireless Mechanical Keyboard. Gateron Brown Switch. RGB Backlight. Aluminum frame. Hot-swappable. Baterai awet, bluetooth lancar. Keycaps PBT double shot.",
		price: 1200000,
		originalPrice: 1600000,
		images: [
			"https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80"
		],
		category: "electronics",
		condition: "good",
		sellerId: "user_003",
		location: "Bandung",
		createdAt: "2024-03-14"
	}),
	createProduct({
		id: "prod_015",
		title: "Levi's 501 Original Jeans",
		description:
			"Celana Jeans Levi's 501 Original 100%. Button fly. Size W32 L32. Warna biru dongker (Dark Stonewash). Baru sekali pakai, dijual karena kekecilan (salah size). Masih ada tag.",
		price: 650000,
		originalPrice: 999000,
		images: [
			"https://images.unsplash.com/photo-1542272617-08f08375810c?w=800&q=80"
		],
		category: "fashion",
		condition: "like_new",
		sellerId: "user_004",
		location: "Jakarta",
		createdAt: "2024-03-15"
	}),
	createProduct({
		id: "prod_016",
		title: "Tas Carrier Eiger 60L",
		description:
			"Carrier Eiger Rhinos 60L. Backsystem nyaman, busa tebal. Belum pernah dipakai naik gunung, cuma tes fitting di rumah. Include rain cover original. Cocok buat pendaki pemula.",
		price: 850000,
		originalPrice: 1200000,
		images: [
			"https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80"
		],
		category: "hobbies",
		condition: "like_new",
		sellerId: "user_005",
		location: "Malang",
		createdAt: "2024-03-16"
	}),
	createProduct({
		id: "prod_017",
		title: "Sepatu Running Adidas Ultraboost",
		description:
			"Adidas Ultraboost 21. Size 43. Warna Hitam Putih. Boost empuk banget, enak buat lari jarak jauh atau jalan santai. Outsole Continental masih tebal. Box replacement.",
		price: 1100000,
		originalPrice: 2800000,
		images: [
			"https://images.unsplash.com/photo-1587563871167-1ee9c731aef4?w=800&q=80"
		],
		category: "fashion",
		condition: "good",
		sellerId: "user_006",
		location: "Yogyakarta",
		createdAt: "2024-03-17"
	}),
	createProduct({
		id: "prod_018",
		title: "Meja Belajar Minimalis",
		description:
			"Meja belajar/kerja gaya scandinavian. Kaki kayu solid jati belanda, top table MDF duco putih. Ada laci 2 buah. Ukuran 120x60cm. Kondisi masih bagus, cuma ada noda tinta dikit di pojok.",
		price: 450000,
		images: [
			"https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80"
		],
		category: "home",
		condition: "fair",
		sellerId: "user_007",
		location: "Depok",
		createdAt: "2024-03-18"
	}),
	createProduct({
		id: "prod_019",
		title: "Mainan LEGO Star Wars",
		description:
			"LEGO Star Wars 75300 Imperial TIE Fighter. MIB (Mint In Box), segel utuh belum rakit. Cocok buat koleksi atau kado. Dijual murah BU.",
		price: 600000,
		originalPrice: 750000,
		images: [
			"https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800&q=80"
		],
		category: "hobbies",
		condition: "new",
		sellerId: "user_008",
		location: "Tangerang",
		createdAt: "2024-03-19"
	}),
	createProduct({
		id: "prod_020",
		title: "Helm KYT NF-R",
		description:
			"Helm Fullface KYT NF-R Motif Espargaro. Size L. Double visor lancar. Busa pipi masih kencang. Visor clear ada baret halus pemakaian, dark visor aman. Include sarung helm.",
		price: 1300000,
		originalPrice: 2200000,
		images: [
			"https://images.unsplash.com/photo-1558507308-417105cb0317?w=800&q=80"
		],
		category: "vehicles",
		condition: "good",
		sellerId: "user_009",
		location: "Bekasi",
		createdAt: "2024-03-20"
	})
];

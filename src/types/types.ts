// types.ts
export interface EskulData {
  id: number;
  name: string;
  Article: string;
  fotoEktra: string;
}

export interface IPpdbImage {
  url?: string;
  id?: number;
}

export interface Kelulusan {
  id: number;
  createdAt: string;
  ppdbId: number;
  ppdb: PpdbData;
  statusKelulusan: boolean;
  updatedAt: string;
}

export interface PpdbData {
  id: number;
  nama: string;
  tempat: string;
  nisn: string;
  ttl: string;
  nik: string;
  noKK: string;
  alamat: string;
  alamatOrtu: string;
  namaAyah: string;
  tahunLahirAyah: string;
  pendidikanAyah: string;
  pekerjaanAyah: string;
  namaIbu: string;
  tahunLahirIbu: string;
  pendidikanIbu: string;
  pekerjaanIbu: string;
  noTelp: string;
  isPaid: boolean;
  isVerified: boolean;
  email: string;
  createdAt: string;
  updatedAt: string;
  fotoMurid: string;
  fotoBukti: string;
  image: IPpdbImage[];
  Kelulusan?: Kelulusan;
}

export interface IBerita {
  id: number;
  name: string;
  fotoBerita: string;
  Article: string;
  createdAt: Date;
  updatedAt: string;
}
export interface IGaleri {
  id: number;
  name: string;
  fotoGaleri: string;
  Article: string;
  createdAt: Date;
  updatedAt: string;
}
export interface IEktrakulikuler {
  id: number;
  name: string;
  fotoEktra: string;
  Article: string;
  createdAt: Date;
  updatedAt: string;
}
export interface IPrestasi {
  id: number;
  name: string;
  fotoPrestasi: string;
  Article: string;
  createdAt: Date;
  updatedAt: string;
}

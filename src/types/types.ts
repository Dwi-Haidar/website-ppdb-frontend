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
  email: string;
  createdAt: string;
  updatedAt: string;
  fotoMurid: string;
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

// types.ts
export interface EskulData {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface IPpdbData {
  nama: string;
  nisn: string;
  ttl: string;
  nik: string;
  noKK: string;
  alamat: string;
  namaAyah: string;
  tahunLahirAyah: string;
  pendidikanAyah: string;
  pekerjaanAyah: string;
  namaIbu: string;
  tahunLahirIbu: string;
  pendidikanIbu: string;
  pekerjaanIbu: string;
  alamatOrtu: string;
  image: string[];
  noTelp: string;
}

export interface IPpdbImage {
  url?: string;
}

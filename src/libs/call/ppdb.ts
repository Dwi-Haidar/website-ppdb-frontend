import API from "../index";


export const createPpdb = async (body: {
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
    noTelp: string;
    image: FileList | null;
}) => {
    const formData = new FormData();
    
    if(body.image !== null) {
        for (let i = 0; i < body.image.length; i++) {
            formData.append('image', body.image[i]);
        }
    }
    formData.append('data', JSON.stringify(body));
    return await API.post('ppdb', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    }



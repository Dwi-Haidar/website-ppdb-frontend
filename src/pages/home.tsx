import React from "react";
import Banner from "../components/componentsHome/banner";
import CardEskul from "../components/componentsHome/cardEskul";
import { EskulData } from "../types/types";
import Img1 from "../assets/image/futsal.jpeg"
import Marawis from "../assets/image/rebana.jpeg"
import Pmr from "../assets/image/pmr.jpeg"
import Pramuk from "../assets/image/Pramuka.jpeg"
import takewnd from "../assets/image/tkdn.jpeg"
import paskib from "../assets/image/paskibra.jpeg"
import AboutUs from "../components/componentsHome/AboutUs";
import Galeri from "../components/componentsHome/galeri"

const Home: React.FC = () => {
  const eskulData: EskulData[] = [
    {
      id: 1,
      name: "Futsal",
      description: "Raih kemenangan dan kesehatan dengan bermain futsal bersama kami!",
      image: Img1,
    },
    {
      id: 2,
      name: "Marawis",
      description: "Latihan dan pertunjukan Marawis untuk melestarikan seni musik tradisional dan meningkatkan keterampilan musikal.",
      image: Marawis,
    },
    {
      id: 3,
      name: "PMR",
      description: "Pelatihan dan kegiatan Palang Merah Remaja (PMR) untuk meningkatkan keterampilan pertolongan pertama dan kepedulian sosial.",
      image: Pmr,
    },
    {
      id: 4,
      name: "Pramuka",
      description: "Aktivitas dan pelatihan Pramuka untuk membangun karakter, kepemimpinan, dan keterampilan outdoor.",
      image: Pramuk,
    },
    {
      id: 5,
      name: "Paskibra",
      description: "Latihan dan persiapan Paskibra untuk meningkatkan keterampilan baris-berbaris dan disiplin.",
      image: paskib,
    },
    {
      id: 6,
      name: "Taekwondo",
      description: "Pelatihan Taekwondo untuk meningkatkan keterampilan bela diri, kekuatan fisik, dan disiplin diri.",
      image: takewnd,
    },
  ];
  

  return (
    <div className="faded mt-[15%] md:mt-[10%] lg:mt-[4%]">
      <Banner />
      <div>
        <AboutUs/>
      </div>
      <div>
        <Galeri />
      </div>
      <div className="flex justify-center items-center my-5">
        <p className="font-bold text-[30px]">Ekstrakurikuler</p>
      </div>
      <div className="flex gap-5 flex-wrap w-full justify-center items-center px-[7%]">
        {eskulData.map((item) => (
          <CardEskul
            key={item.id}
            eskul={item}
          />
        ))}
      </div>
      
      <div className="flex flex-wrap my-10 gap-3 mx-5 justify-center">
        <div className="w-[100%] md:w-[47%] text-center">
          <p className="font-bold text-[30px]">Visi</p>
          <div>
            <p className="lg:text-[25px] text-start">"Menjadi lembaga pendidikan unggulan yang memadukan kualitas akademik dan nilai-nilai Islam, berkomitmen untuk mencetak generasi yang cerdas, berakhlak mulia, dan siap menghadapi tantangan global dengan penuh keimanan dan kemandirian."</p>
          </div>
        </div>
        <div className="w-[100%] md:w-[47%] text-center">
          <p className="font-bold text-[30px]">Misi</p>
          <div>
            <p className="lg:text-[25px] text-start">Menyediakan pendidikan berkualitas dengan integrasi nilai-nilai Islam, membentuk karakter siswa, serta menciptakan lingkungan yang aman dan mendukung pengembangan akademik dan kreatif siswa.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

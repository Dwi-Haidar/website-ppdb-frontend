
import { Link } from "react-router-dom";


interface CardEskulProps {
  name: string;
  fotoEktra: string;
  Article: string;
}

const CardEskul: React.FC<CardEskulProps> = ({ name, fotoEktra, Article }) => {
  return (
    <Link to="" className="lg:w-[300px] md:w-[48%] w-[90%] flex flex-col justify-center items-center my-3 ">
      <div>
        <div className="w-full flex flex-col p-3 gap-1 rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <img
            className="rounded-t-xl h-[150px] md:h-[120px] w-full object-cover"
            src={fotoEktra}
            style={{ objectFit: "cover", height: "200px" }}
            alt={name}
          />
          <Link to="#" className="font-bold hover:text-[#127521] text-[20px]">
            {name}
          </Link>
          {/* <Link to="#" className="hover:text-[#127521]">
            {Article}
          </Link> */}
        </div>
      </div>
    </Link>
  );
};

export default CardEskul;

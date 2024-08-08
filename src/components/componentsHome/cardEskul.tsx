// components/componentsHome/CardEskul.tsx
import { Link } from "react-router-dom";
import { EskulData } from "../../types/types";

interface CardEskulProps {
  eskul: EskulData;
}

const CardEskul: React.FC<CardEskulProps> = ({ eskul }) => {
  return (
    <Link to="" className="lg:w-[30%] md:w-[48%] w-[90%] flex flex-col justify-center items-center my-3 ">
      <div>
        <div className="w-full flex flex-col p-3 gap-1 rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <img
            className="rounded-t-xl h-[150px] md:h-[120px] w-full object-cover"
            src={eskul.image}
            alt={eskul.name}
          />
          <Link to="#" className="font-bold hover:text-[#127521] text-[20px]">
            {eskul.name}
          </Link>
          <Link to="#" className="hover:text-[#127521]">
            {eskul.description}
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default CardEskul;

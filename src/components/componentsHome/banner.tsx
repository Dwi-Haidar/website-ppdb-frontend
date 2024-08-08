import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import Img1 from"../../assets/image/a.png"
import Img2 from"../../assets/image/s.png"


const settings = {
  dots: true,
  infinite: true,
  speed: 170,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const MySlider = () => (
  <Slider {...settings}>
    <div className="flex justify-center items-center my-3 w-full ">
        <img  src={Img2} className="w-[70%] my-auto mx-auto" alt="" />
    </div>
    <div className="flex justify-center items-center my-3 w-full ">
    <img  src={Img1} className="w-[70%]  my-auto mx-auto" alt="" />
    </div>
  </Slider>
);

export default MySlider;

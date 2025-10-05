
import Marquee from "react-fast-marquee";
import img1 from '../../../../assets/brands/amazon.png';
import img2 from '../../../../assets/brands/amazon_vector.png';
import img3 from '../../../../assets/brands/casio.png';
import img4 from '../../../../assets/brands/moonstar.png';
import img5 from '../../../../assets/brands/start-people 1.png';

const CompanyLogo = () => {
  return (
    <div className="py-10 bg-base-200 flex flex-col items-center justify-center p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-10">
        Welcome to My Home Page
      </h1>

      {/* Image Marquee */}
      <div className="">
        <Marquee pauseOnHover={true} speed={50}>
          <img
            src={img1}
            alt="img1"
            className="mx-4 rounded-xl shadow-lg"
          />
          <img
            src={img2}
            alt="img2"
            className="mx-4 rounded-xl shadow-lg"
          />
          <img
            src={img3}
            alt="img3"
            className="mx-4 rounded-xl shadow-lg"
          />
          <img
            src={img4}
            alt="img4"
            className="mx-4 rounded-xl shadow-lg"
          />
          <img
            src={img5}
            alt="img5"
            className="mx-4 rounded-xl shadow-lg"
          />
        </Marquee>
      </div>
    </div>
  );
};

export default CompanyLogo;

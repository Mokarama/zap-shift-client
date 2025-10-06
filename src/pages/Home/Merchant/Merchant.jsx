
import img1 from '../../../assets/banner/location-merchant.png'
// import img2 from '../../../assets/banner/be-a-merchant-bg.png'
const Merchant = () => {
  return (
    <>
      <div className="hero bg-[url(assets/banner/be-a-merchant-bg.png)]  bg-[#05515a] py-8 my-3 rounded-3xl">
      
        <div className="hero-content flex-col lg:flex-row-reverse  px-20">
          <img
            src={img1}
            className="max-w-sm rounded-lg "
          />
          <div>
            <h1 className="text-5xl font-bold ">Merchant and Customer Satisfaction is Our First Priority</h1>
            <p className="py-6">
             We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
            </p>
            <button className="btn  bg-[#CAEB66] rounded-full mr-5" >Become a Merchant</button>
            <button className="btn  border-2 border-[#CAEB66] rounded-full  bg-[#05515a] text-[#CAEB66]">Earn with Profast Courier</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Merchant;

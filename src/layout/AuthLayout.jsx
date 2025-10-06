import { Outlet } from "react-router";
import authImg from "/src/assets/authImage.png";

const AuthLayout = () => {
  return (
    <>
   
      <div className="">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={authImg} className="max-w-sm rounded-lg shadow-2xl" />
          <div className="flex-1">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;

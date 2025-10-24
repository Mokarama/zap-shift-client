import { useForm } from "react-hook-form";
import ProFastLogo from "../../../components/ProFast/ProFastLogo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";

const LogIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const onSubmit = async (data) => {


    signIn(data.email, data.password)
     .then(result=>{
        console.log(result.user);
          Swal.fire({
        icon: "success",
        title: "Logged In",
        text: "You have successfully logged in!",
        confirmButtonColor: "#16a34a",
      });

        navigate(from);
     })
     .catch(error=>{
         Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message.includes("auth/user-not-found") 
              ? "User not found. Please check your email."
              : error.message.includes("auth/wrong-password")
              ? "Wrong password. Please try again."
              : error.message,
        confirmButtonColor: "#ef4444",
      });
     });
    
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <ProFastLogo />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card bg-base-100 w-full border-2 shadow-2xl mt-5"
      >
        <div className="card-body">
          <fieldset className="fieldset space-y-4">
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-600">Email is required</p>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">
                Password must be 6 characters or longer
              </p>
            )}

            <button type="submit" className="btn btn-neutral w-full mt-4">
              Login
            </button>
          </fieldset>
        </div>
         <SocialLogin></SocialLogin>
           <p className="mt-3 font-bold p-2">
           Already registered? <Link to="/register"  className="font-bold text-xl border-b-2 pb-1">Login</Link>
         </p>
      </form>
     
    </div>
  );
};

export default LogIn;

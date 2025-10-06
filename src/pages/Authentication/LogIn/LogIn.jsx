import { useForm } from "react-hook-form";



const LogIn = () => {
 const{register, handleSubmit, formState: {errors}}=useForm();

 const onSubmit=data=>{
  console.log(data);
 
 }
    return (
   <>
    <form onSubmit={handleSubmit(onSubmit)}  className="card bg-base-100 w-full border-2 shadow-2xl">
      <div className="card-body ">
        <fieldset className="fieldset">

            {/* //email */}
          <label className="label">Email</label>
          <input type="email" className="input"  {...register("email")}   placeholder="Email" />

          {/* //password */}
          <label className="label">Password</label>
          <input type="password" className="input" {...register("password",
            {required:true, minLength:6}
            )} placeholder="Password" />
         {
          errors.password?.type==='required' && <p className="text-red-600">Password is required</p>
         }
        {
          errors.password?.type==='minLength' && <p className="text-red-600">Password must be 6 characters or longer</p>
        }

          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </div>
    </form>  
        </>
    );
};

export default LogIn;
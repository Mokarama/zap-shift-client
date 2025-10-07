import { useForm } from "react-hook-form";

const Register = () => {
    const {register, handleSubmit, formState:{errors}}=useForm();

    const onSubmit=data=>{
        console.log(data);
    }

return (
  <>
    <form onSubmit={handleSubmit(onSubmit)} className="card shadow-2xl">
       
      <div className="card-body">
         <h2>Create an Account  !</h2>
        <fieldset className="fieldset">

        {/* Name filed */}
        {/* <label className="label">Name</label>
          <input type="text" 
          {...register("text")}
          className="input w-full" placeholder="Name" /> */}

            {/* Email filed */}
          <label className="label">Email</label>
          <input type="email" 
          {...register("email",{ required:true})}
          className="input" placeholder="Email" />

          {/* password filed */}
          <label className="label">Password</label>
          <input type="password"
            {...register("password", {required:true,minLength:6})}
           className="input" placeholder="Password" />
            {
             errors.password?.type==="required" && <p className="text-red-500">Password is required</p>
            }

            {
                errors.password?.type==="minLength" && <p className="text-red-500">Password must be 6 characters or longer</p>
            }
          <button className="btn btn-neutral mt-4">Register</button>

        </fieldset>
      </div>
    </form>
      
  </>
    );
};

export default Register;
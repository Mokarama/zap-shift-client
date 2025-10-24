import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = useAuth();
  const onSubmit = (data) => {
    console.log(data);
    // console.log(createUser);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

   const handleImageUpload =(e)=>{
      const image =e.target.files[0];
      console.log(image);
     const formData=new FormData();
     formData.append('image',image);


   }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="card shadow-2xl">
        <div className="card-body">
          <h2>Create an Account !</h2>
          <fieldset className="fieldset">
            {/* Name filed */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("text", {
                required: true,
              })}
              className="input w-full"
              placeholder="Your name"
            />

            {errors.name?.type === "required" && <p>name is required</p>}

             {/* Profile  filed */}
            <label className="label">Name</label>
            <input
              type="file"
               onChange={handleImageUpload}
              {...register("file", {
                required: true,
              })}
              className="input w-full"
              placeholder="Your Profile Picture"
            />

            {errors.name?.type === "required" && <p>name is required</p>}

            {/* Email filed */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && <p>email is required</p>}

            {/* password filed */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}

            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be 6 characters or longer
              </p>
            )}
            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
        </div>
      </form>
    </>
  );
};

export default Register;

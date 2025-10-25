
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
 import useAxios from './../../../hooks/useAxios';
import { useState } from "react";
import { Link } from "react-router";



const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser,updateUserProfile } = useAuth();

  //profile picture
  const [profilePic, setProfilePic]=useState('');
  const axiosInstance=useAxios();

  const onSubmit = (data) => {
    console.log(data);
    // console.log(createUser);
    createUser(data.email, data.password)
      .then(async(result) => {
        console.log(result.user);

      //update userinfo in the database
        const userInfo ={
          email: data.email,
          role: 'user',
          created_at :new Date().toISOString(),
          last_log_in :new Date().toISOString(),

        }

        const userRes =await axiosInstance.post('/users', userInfo);
        console.log(userRes.data);
        


      //update user profile in firebase
      const userProfile ={
        displayName: data.name,
         photoURL:profilePic,
      }
      updateUserProfile(userProfile)
      .then(()=>{
        console.log('profile name pic updated')
      })
      .catch(error =>{
        console.log(error)
      })
     


      })
      .catch((error) => {
        console.log(error.message);
      });
  };

   const handleImageUpload =async(e)=>{
      const image =e.target.files[0];
      console.log(image);
      if(!image){
        console.log("No image selected");
        return;
      }
      console.log("Selected image :" , image);
      //form data create
     const formData=new FormData();
     formData.append('image',image);

   const imageUploadUrl =`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
  //  console.log(import.meta.env.VITE_image_upload_key,'image paisi');



   try{
      const res =await axios.post(imageUploadUrl, formData);
      // console.log(res.data.data.url,'paisi ');
      setProfilePic(res.data.data.url);
   }
   catch(error){
        console.log(error)
   }
   }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} 
      className="card shadow-2xl">
        <div className="card-body">
        
          <h2>Create an Account !</h2>
          <fieldset className="fieldset">

            {/* Name filed */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", {
                required: true,
              })}
              className="input w-full"
              placeholder="Your name"
            />

            {errors.name?.type === "required" && <p>name is required</p>}

               {/* Profile  filed */}
            <label className="label">Upload your image</label>
            <input 
              type="file"
              
              {...register("file", {
                required: true,
                onChange:handleImageUpload
            })}
              className="input w-full"
              placeholder="Your Profile Picture"
            />

            {errors.file?.type === "required" && <p>Image file is required</p>}


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
           <p className="mt-3 font-bold">
           Already registered? <Link to="/login"  className="font-bold text-xl border-b-2 pb-1">Login</Link>
         </p>

          </fieldset>
        </div>
      </form>
    </>
  );
};

export default Register;

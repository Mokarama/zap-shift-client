import { useEffect, useState } from "react";


const MyParcels = () => {
    const [parcels, setParcels]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/parcels')
        .then(res=>res.json())
        .then(data=>setParcels(data))

        .catch(err=>console.log("Error fetching parcels",err))

    },[])
    return (
        <div>
           <h2>My Parcels coming here</h2> 
           {
            parcels.length===0 ?(
                <p>No parcels found</p>
            ):(
                <ul>
                    {
                     parcels.map(parcel=>(
                        <li>
                            {parcel.sender_name}-{parcel.receiver_name}
                        </li>
                     ))
                    }
                </ul>
            )
           }
        </div>
    );
};

export default MyParcels;
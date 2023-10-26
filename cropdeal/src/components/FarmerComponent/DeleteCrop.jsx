import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CropService from "../../service/CropService";


let DeleteCrop=()=>{

    let location=useLocation();
    let navigate=useNavigate();

    useEffect( ()=>{
        CropService.deleteCrop(location.state.cropid).then(()=>{
            alert('crop deleted')
            navigate({pathname:"/viewAllCrop"})
        },()=>{})
    },[]);
    return(
        <>
       
        </>
    );
}


export default DeleteCrop;
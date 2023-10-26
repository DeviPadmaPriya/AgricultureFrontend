import React from 'react';
import axios from "axios";

    const getAllCropsUrl="http://localhost:8081/crop/getAll";
    const addCropUrl="http://localhost:8081/crop/add";
    const deleteCropUrl="http://localhost:8081/crop/delete/";
    const updateCropUrl="http://localhost:8081/crop/update/";
    const viewCropIdUrl="http://localhost:8081/crop/getById/";

class CropService{

   
    getAllCrops(){
  return axios.get(getAllCropsUrl);
   
}
findCropId(cropid){
    return axios.get(viewCropIdUrl+cropid);
   }

    addCrop(crop){
return axios.post(addCropUrl,crop);
    }

    updateCrop(){

    }
    deleteCrop(cropid){
 return axios.delete(deleteCropUrl+cropid);
    }

}  

export default new CropService();
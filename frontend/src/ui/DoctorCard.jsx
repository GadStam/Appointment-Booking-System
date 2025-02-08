import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ id, name, image, speciality, available }) => {
    const navigate = useNavigate();
  return (
   <div
      onClick={() => {navigate(`/appointment/${id}`); scrollTo(0, 0)}}
      className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
    >
      <img className="bg-blue-50" src={image} alt={name} />
      <div className="p-4">
        <div className={`flex items-center gap-2 text-sm ${available ? "text-green-500" : "text-red-500"}`}>
          <p className={`w-2 h-2 rounded-full ${available ? "bg-green-500" : "bg-red-500"}`}></p>
          <p>{available ? "Available" : "Not Available"}</p>
        </div>
        <p className="text-gray-900 text-lg font-medium">{name}</p>
        <p className="text-gray-600 text-sm">{speciality}</p>
      </div>
    </div>
  )
}

export default DoctorCard
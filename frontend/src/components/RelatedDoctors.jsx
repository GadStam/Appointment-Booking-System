import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import DoctorCard from '../ui/DoctorCard'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality, docId}) => {
    const {doctors} = useContext(AppContext)
    const [relatedDoctors, setRelatedDoctors] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        if(doctors.length > 0){
            const doctorData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelatedDoctors(doctorData)
        }
    },[doctors, speciality, docId])
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relatedDoctors.slice(0, 5).map((doctor) => (
          <DoctorCard
            key={doctor._id}
            id={doctor._id}
            name={doctor.name}
            image={doctor.image}
            speciality={doctor.speciality}
            available={doctor.available}
          />
        ))}
        </div>
        <button onClick={()=>{naviagte('/doctors'); scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
    </div>
  )
}

export default RelatedDoctors
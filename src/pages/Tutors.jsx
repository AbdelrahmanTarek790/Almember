import { Each } from "@/utils/Each"
import back1 from "../assets/back1.png"
import { useEffect, useState } from "react"
import { getMethod } from "@/utils/ApiMethods"

export const Tutors = () => {
    const [tutors, setTutors] = useState([])
    useEffect(() => {
        getMethod("/teachers").then((res) => {
            // console.log(res.data.data)
            setTutors(res.data.data)
        })
    }, [])

    return (
        <div className="flex flex-col items-center mt-20 relative">
            <img src={back1} alt="" className="absolute z-[-1] left-[-500px] w-[800px] opacity-35   top-[300px] origin-center" />
            <img src={back1} alt="" className="absolute z-[-1] right-[-500px] w-[800px] opacity-35   top-[1000px] origin-center" />

            <p className="text-center text-4xl  lg:text-5xl font-extrabold text-[#2A3E34]">تعلم على يد خيـرة الشيوخ</p>
            <p className="text-center text-2xl w-[95%] lg:w-[650px] mt-6 ">
                <span className="font-bold">ملحوظة هامة</span>: جميع الشيوخ<span className="font-bold"> لا يتقاضون اجراً</span> مقابل وجودهم على
                الاكاديمية، فهم يقدمون العلم لوجه الله تعالى.
            </p>
            <div className=" h-[5px] bg-[#2A3E34] w-[650px] mt-20"></div>
            <div className="flex flex-col  gap-10 mt-10 mb-10">
                <Each
                    of={tutors}
                    render={(item, index) => (
                        <div className="flex flex-col justify-center items-center">
                            <div className={`flex lg:flex-row ${index % 2 ? "" : "lg:flex-row-reverse"} flex-col  gap-14 items-center lg:w-[1000px]`}>
                                <img src={item.photo} alt="" className=" w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-full" />
                                <div className={` ${index % 2 ? "lg:text-left" : "lg:text-right"}  text-center  text-[#2A3E34] w-[90%]`}>
                                    <p className=" text-2xl font-bold mt-4 ">{item.Fname + " " + item.Mname + " " + item.Lname}</p>
                                    <p className=" text-xl mt-2 font-semibold">{item.qualifications}</p>
                                    <p className=" text-lg mt-2">{item.educationLevel}</p>
                                    <p className=" text-2xl font-bold mt-2">{item.qualifications}</p>
                                </div>
                            </div>

                            <div
                                className={` h-[5px] bg-[#2A3E34] w-[90%] lg:w-[1000px] mt-20 ${index * 1 === tutors.length - 1 ? " hidden " : ""}`}
                            ></div>
                        </div>
                    )}
                ></Each>
            </div>
        </div>
    )
}

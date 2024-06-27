import { getMethod } from "@/utils/ApiMethods"
import React, { useEffect, useState } from "react"
import back1 from "../../assets/back1.png"
import { Each } from "@/utils/Each"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const Courses = () => {
    const [List, setList] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getMethod("/courses", localStorage.getItem("token")).then((res) => {
            console.log(res.data)
            setList(res.data.data)
        })
    }, [])
    return (
        <div className="flex flex-col items-center mt-20 relative mb-20">
            <img src={back1} alt="" className="absolute z-[-1] left-[-500px] w-[800px] opacity-35   top-[300px] origin-center" />
            <img src={back1} alt="" className="absolute z-[-1] right-[-500px] w-[800px] opacity-35   top-[-350px] origin-center" />
            <img src={back1} alt="" className="absolute z-[-1] right-[-500px] w-[800px] opacity-35   top-[600px] origin-center" />
            <p className="text-center text-4xl  lg:text-5xl font-extrabold text-[#2A3E34]">المقررات الدراسية</p>
            <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-center items-center place-items-center mt-20
    "
            >
                <Each
                    of={List}
                    render={(item, index) => (
                        <div className={` bg-[#2A3E34]  gap-14  w-[90%] lg:w-[420px] rounded-3xl`}>
                            <div className={`  text-center  text-white flex flex-col items-center justify-center`}>
                                <p className=" text-5xl  mt-8 lg:mt-4 font-deco ">
                                    {item.subject === "fiqh"
                                        ? "الفقه"
                                        : item.subject === "tafseer"
                                        ? "التفسير"
                                        : item.subject === "hadeeth"
                                        ? " الحديث"
                                        : item.subject === "aqeedah"
                                        ? " العقيدة"
                                        : item.subject}
                                </p>
                                <div className={` h-[2px] bg-white mt-8  lg:mt-5 w-[90%] `}></div>

                                <p className=" text-xl mt-4 font-bold">{item?.book?.title} </p>
                                {/* <p className=" text-lg mt-2 font-bold">{item.text}</p> */}
                                <p className=" text-base mt-1 w-[90%] mb-4">{item.description}</p>
                                <Button
                                    onClick={() => {
                                        navigate(`/courses/${item._id}`)
                                    }}
                                    className="rounded-full bg-white text-base text-primary font-cairo   font-bold px-10 hover:bg-[#cde2d7]  mb-4"
                                >
                                    ادخل الدورة
                                </Button>
                            </div>
                        </div>
                    )}
                ></Each>
            </div>
        </div>
    )
}

export default Courses

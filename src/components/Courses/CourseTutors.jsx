import { Each } from "@/utils/Each"
import { Show } from "@/utils/Show"
import { useEffect, useState } from "react"

export const CourseTutors = ({ items }) => {
    const [item, setItems] = useState([])
    useEffect(() => {
        setItems(items.teachers)
    }, [items])
    return (
        <div className=" w-full h-full font-cairo border-2 border-[#385044] rounded-xl mt-4 lg:mt-2">
            <h1 className=" mt-2 text-2xl font-bold text-primary pr-3">مدرسو المقرر</h1>
            <div className="w-full h-[2px] mt-3 bg-[#385044] "></div>
            <div className=" mr-8 text-[#385044] mt-3 text-lg">المدرسين المسؤولين عن هذا المقرر</div>
            <Show>
                <Show.When
                    isTrue={item.length === 0}
                    children={<div className="text-2xl text-center mt-8">لا يوجد مدرسين مسؤولين عن هذا المقرر</div>}
                ></Show.When>
                <Show.Else
                    children={
                        <Each
                            of={item}
                            render={(item, index) => (
                                <div className="flex flex-col justify-center items-center">
                                    <div
                                        className={`flex lg:flex-row ${
                                            index % 2 ? "" : "lg:flex-row-reverse"
                                        } flex-col  gap-14 items-center  px-5 py-5`}
                                    >
                                        <img src={item.photo} alt="" className=" w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-full" />
                                        <div className={` ${index % 2 ? "lg:text-left" : "lg:text-right"}  text-center  text-[#2A3E34] w-[90%]`}>
                                            <p className=" text-2xl font-bold mt-4 ">{item.Fname + " " + item.Mname + " " + item.Lname}</p>
                                            <p className=" text-xl mt-2 font-semibold">{item.qualifications}</p>
                                            <p className=" text-lg mt-2">{item.educationLevel}</p>
                                            <p className=" text-2xl font-bold mt-2">{item.qualifications}</p>
                                        </div>
                                    </div>

                                    {/* <div
                                        className={` h-[5px] bg-[#2A3E34] w-[90%] lg:w-[1000px] mt-20 ${
                                            index * 1 === item.tutors.length - 1 ? " hidden " : ""
                                        }`}
                                    ></div> */}
                                </div>
                            )}
                        ></Each>
                    }
                ></Show.Else>
            </Show>
        </div>
    )
}

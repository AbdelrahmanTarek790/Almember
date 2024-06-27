import { Each } from "@/utils/Each"
import back1 from "../../assets/back1.png"
import { useEffect, useState } from "react"
import { getMethod } from "@/utils/ApiMethods"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export const Library = () => {
    const [courses, setCourses] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getMethod("/books/").then((res) => {
            console.log(res.data.data)
            setCourses(res.data.data)
        })
    }, [])
    return (
        <div className="flex flex-col items-center mt-20 relative mb-20">
            <img src={back1} alt="" className="absolute z-[-1] left-[-500px] w-[800px] opacity-35   top-[300px] origin-center" />
            <img src={back1} alt="" className="absolute z-[-1] right-[-500px] w-[800px] opacity-35   top-[-350px] origin-center" />
            <img src={back1} alt="" className="absolute z-[-1] right-[-500px] w-[800px] opacity-35   top-[600px] origin-center" />
            <p className="text-center text-4xl  lg:text-5xl font-extrabold text-[#2A3E34]">مكتبة الاكاديمية</p>
            <p className="text-center text-2xl lg:text-3xl mt-6 text-[#2A3E34]">جميع الكتب مقدمة مجاناً بالتعاون مع دور النشر الخاصة بكل كتاب</p>

            <div
                className=" flex flex-wrap gap-10 justify-center items-center place-items-center mt-20 w-full
    "
            >
                <Each
                    of={courses}
                    render={(item, index) => (
                        <div className={` border border-[#2A3E34]  gap-14  w-[90%] lg:w-[300px] rounded-3xl`}>
                            <div className={`  text-center  text-primary flex flex-col items-center justify-center`}>
                                <p className=" text-4xl  mt-8 lg:mt-4 font-deco ">
                                    {item?.course?.subject === "fiqh"
                                        ? "الفقه"
                                        : item?.course?.subject === "tafseer"
                                        ? "التفسير"
                                        : item?.course?.subject === "hadeeth"
                                        ? " الحديث"
                                        : item?.course?.subject === "aqeedah"
                                        ? " العقيدة"
                                        : item?.course?.subject}
                                </p>
                                <img src={item.imageURL?item.imageURL: "https://s3-alpha-sig.figma.com/img/73cf/daf5/7ad22262f394506e4f619c48e404d0ed?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HgrQu8cR2qdRHVAIV~UD--MczbbeAXQbMRaiA8FyzGb5k-sE6ClFO~0i0RZU0EzgA3YETw9S~dWbKp-BVlfNcXt883HgEYLqEi6rL5egfXsR0vK3sLkSOwU13S847gvSsgEhvKz8sskgecO3cR3UyriPi7iwbv-182A2SD06wEB20X4uvSIjGkMQ30z9yx0r9zPUWNbj2rDevm9Axydy6Gor9mr~GCeUk0CABbfJ~KwmeMjD-dzX416ZjovnY8oBzsMr~kWemIKMTCxYQncKNjaCRZNbD7C6kEJbjPQbylIePNiA6eXgyKyD~2CHYPWBvb3~OVGJQ8dRssoAK5LiaQ__"}></img>

                                <p className=" text-xl mt-4 font-bold h-[60px]">{"الكتاب:" + (item.title ? item.title : "لا يوجد")}</p>

                                <Button
                                    onClick={() => {
                                        window.location.href = item.downloadLink
                                    }}
                                    className="rounded-full bg-primary  text-base text-white font-cairo mt-2  font-bold px-10 hover:bg-[#cde2d7]  mb-4"
                                >
                                    تحميل الكتاب
                                </Button>
                                <Button
                                    onClick={() => {
                                        window.open(item.readLink, "_blank").focus()
                                    }}
                                    className="border border-[#2A3E34] rounded-full bg-white text-base  text-primary font-cairo   font-bold px-10 hover:bg-[#cde2d7]  mb-4"
                                >
                                    عرض الكتاب
                                </Button>
                            </div>
                        </div>
                    )}
                ></Each>
            </div>
        </div>
    )
}

import { getMethod } from "@/utils/ApiMethods"
import { Each } from "@/utils/Each"
import { Show } from "@/utils/Show"
import { CheckCircle2 } from "lucide-react"
import { useEffect, useState } from "react"

export const CourseDegree = ({ items }) => {
    const [item, setItems] = useState({
        description: "",
        lectureStats: [],
    })
    useEffect(() => {
        getMethod(`/students/${items.id}/stats`, localStorage.getItem("token")).then((res) => {
            setItems(res.data.courseStat)
            console.log(res.data.courseStat);
        })
    }, [items])

    return (
        <div className=" w-full h-full flex flex-col justify-between font-cairo border-2 border-[#385044] rounded-xl mt-4 lg:mt-2">
            <div>
                <h1 className=" mt-2 text-2xl font-bold text-primary pr-3">درجات المقرر</h1>
                <div className="w-full h-[2px] mt-3 bg-[#385044] "></div>
                <div className="flex flex-col  mt-6 gap-2">
                    <Each
                        of={item.lectureStats}
                        render={(item, index) => {
                            return (
                                <div className="flex justify-between">
                                    <div className="ml-8 text-[#2A3E34] text-center">
                                        {/* النتيجه */}
                                        <p>النتيجة</p>
                                        <p>
                                            ({item.latestQuizScore}/{item.bestQuizScore})
                                        </p>
                                    </div>
                                    <div className="mr-8 flex items-center justify-end gap-2 text-[#2A3E34]">
                                        <div>
                                            <p className=" text-lg  font-bold">الاختبار الاسبوعي </p>

                                            <p className=" text-lg  font-bold "> {item.lecture.name} على محاضرة</p>
                                            {/* <p>{item.lecture.description ? item.lecture.description : "التفاصيل غير متوفرة"}</p> */}
                                        </div>
                                        <Show>
                                            <Show.When
                                                isTrue={item.done}
                                                children={<i className="fa-solid fa-circle-check text-2xl"></i>}
                                            ></Show.When>
                                            <Show.Else children={<i className="fa-regular fa-circle-check  text-2xl"></i>}></Show.Else>
                                        </Show>
                                    </div>
                                </div>
                            )
                        }}
                    ></Each>
                </div>
            </div>
            <div className="text-lg font-bold text-primary">
                <div className="w-full h-[2px] mt-3 bg-[#385044] "></div>
                <p className="mr-8  mt-3">
                    مجموع الاختبارات المنتهية : {item.lectureStats.filter((item) => item.done).length} / {item.lectureStats.length}
                </p>
                <p className="mr-8">
                    متوسط درجات الاختبارات :{" "}
                    {item.lectureStats.length > 0
                        ? item.lectureStats.reduce((acc, item) => acc + item.latestQuizScore, 0) / item.lectureStats.length
                        : 0}{" "}
                </p>

                <p className="mr-8  mb-3">درجة الاختبار النهائي : {item?.finalExamScore ? item.finalExamScore : "لم يتم الحل"}</p>
            </div>
        </div>
    )
}

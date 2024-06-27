import { Button } from "@/components/ui/button"
import { Subjects } from "@/data"
import { getMethod } from "@/utils/ApiMethods"
import { set } from "date-fns"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
export const Quiz = ({ items, reload }) => {
    const { id } = useParams()
    const [data, setData] = useState({
        course: {
            subject: "",
        },
        name: "",
        comments: [],
        replies: [],
    })
    const [currentLesson, setCurrentLesson] = useState({})
    const [courseStat, setCourseStat] = useState({})
    useEffect(() => {
        setData(items)
        console.log(items)

        if (items.course.id) {
            getMethod(`/students/${items.course.id}/stats`, localStorage.getItem("token")).then((res) => {
                console.log(res.data.courseStat)
                setCourseStat(res.data.courseStat)
                setCurrentLesson(res.data.courseStat.lectureStats.filter((item) => item.lecture.id === id)[0])
            })
            console.log(currentLesson)
        }
    }, [items])

    return (
        <div className=" flex flex-col items-end px-5 py-8  text-right w-full">
            <p className="text-primary font-semibold text-right text-lg">
                {`( ${data.name} ) ${Subjects[data.course.subject]}     >  الاختبار الاسبوعي علي محاضرة  `}
            </p>
            <p className="text-primary text-2xl font-extrabold mt-6 ">{`
    ( ${data.name} ) الاختبار الاسبوعي علي محاضرة 
    `}</p>
            <div className="w-full h-[2px] mt-3 bg-[#385044] "></div>
            <p className="text-primary text-xl mt-6">
                يحتوي هذا الاختبار على {items.quiz.length > 0 ? items.quiz[0].mcq.length : 0} اسئلة فقط من نوع اختيار من متعدد أو صح وخطأ.
            </p>
            <p className="text-primary text-xl">
                يُسمح بتقديم هذا الاختبار ثلات مرات فقط خلال فترة إتاحته، ويتم احتساب الدرجة الأعلى للطالب من بين تلك المحاولات.
            </p>
            <p className="text-primary text-xl mb-6">درجة هذا الاختبار تسهم في درجة الطالب النهائية في المقرر بنسبة 2%.</p>
            <div className="w-full h-[1px] mt-3 bg-[#385044] "></div>
            <div className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between w-full mt-6">
                <div className=" text-center">
                    <Link to={`/quiz/${id}/`}>
                        <Button className="px-6">ابدأ الاختبار الان</Button>
                    </Link>
                    <p className="text-xs mt-2">الاختبار الاسبوعي الاول</p>
                </div>{" "}
                <div>
                    <p className="font-bold text-primary text-lg">{data.name} ابدا في حل الاختبار الاسبوعي على </p>
                    {/* <p className="font-bold text-primary text-lg">المحاولات المتبقية: 2</p> */}
                </div>
            </div>
            <div className="w-full h-[1px] mt-3 bg-[#385044] "></div>
            <div className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between w-full mt-6">
                <div className="text-center ml-5 font-bold text-primary text-xl">
                    <p className="">الدرجة</p>
                    <p className="text-lg">
                        {/* {courseStat.lectureStats[0].latestQuizScore}/{courseStat.lectureStats[0].bestQuizScore} */}
                        {items.quiz.length > 0 ? (items.quiz[0].scoreFrom ? items.quiz[0].scoreFrom : 0) : 0}/
                        {currentLesson?.bestQuizScore ? currentLesson?.bestQuizScore : 0}
                    </p>
                </div>
                <div>
                    <p className="font-bold text-primary text-lg">درجة الاختبار</p>
                    {/* <p className="font-bold text-primary text-lg">اعلى محاولة: الاولي</p> */}
                </div>
            </div>
        </div>
    )
}

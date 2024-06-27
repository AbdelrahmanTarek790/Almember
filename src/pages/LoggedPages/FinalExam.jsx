import { SideBarLearn } from "@/components/SideBarLearn"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Subjects } from "@/data"
import { getMethod, postMethod } from "@/utils/ApiMethods"
import { Each } from "@/utils/Each"
import { Show } from "@/utils/Show"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { CornerTopRightIcon } from "@radix-ui/react-icons"
import { set } from "date-fns"
import { CornerRightUpIcon, ReplyIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"

export const FinalExam = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [showAnswers, setShowAnswers] = useState(false)
    const [finalAnswers, setFinalAnswers] = useState({})
    const [passed, setPassed] = useState(false)
    const [courseStat, setCourseStat] = useState({
        lectureStats: [
            {
                id: 0,
            },
        ],
    })

    const location = useLocation()
    const [data, setData] = useState({
        course: {
            subject: "",
        },
        name: "",
        comments: [],
        replies: [],
        mcqs: [],
        meqs: [],
    })

    const [comment, setComment] = useState("")
    const [reload, setReload] = useState(false)
    const [quizes, setQuizes] = useState({
        mcqs: [],
        meqs: [],
    })

    const [quizesAnswers, setQuizeAnswers] = useState({
        mcqs: [],
        meqs: [],
    })

    const [answers, setAnswers] = useState({
        scoreFrom: 2,
        durationInMins: 30,
        lectureQuizzesGrades: [],
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        getMethod(`/courses/${id}/final/`, localStorage.getItem("token")).then((res) => {
            console.log(res)
            setData(res.data)
        })
    }, [])

    const submitAnswers = () => {
        // setReload(true)
        let mcqs = []
        let meqs = []

        for (let i = 0; i < data.mcqs.length; i++) {
            if (quizesAnswers.mcqs[i]?.answer >= 0) {
                mcqs.push({
                    mcq: quizesAnswers.mcqs[i].mcq,
                    answer: quizesAnswers.mcqs[i].answer,
                })
            }
        }

        for (let i = 0; i < data.meqs.length; i++) {
            if (quizesAnswers.meqs[i]?.answer) {
                meqs.push({
                    meq: quizesAnswers.meqs[i].meq,
                    answer: quizesAnswers.meqs[i].answer,
                })
            }
        }
        postMethod(
            `/courses/${id}/final/answers`,
            {
                mcqs,
                meqs,
            },
            localStorage.getItem("token")
        ).then((res) => {
            setReload(false)
            if (res.status === "Success") {
                // setIsSubmitted(true)
                console.log(res.data)
                if (res.data.passed) {
                    // setShowAnswers(true)
                    setFinalAnswers(res.data.finalAnswer)
                    setPassed(true)
                    setShowAnswers(true)
                    setIsSubmitted(true)
                } else {
                    setFinalAnswers(res.data.finalAnswer)
                    setPassed(false)
                    setShowAnswers(true)
                    setIsSubmitted(true)
                    setCourseStat(res.data.courseStat)
                }
                // setFinalAnswers(res.data.lectureQuizzesGrades)
                // setShowAnswers(true)
            }
        })
    }

    return (
        <div className="flex justify-end flex-col-reverse lg:flex-row  h-full">
            <div className=" flex flex-col items-end px-5 py-8  text-right w-full">
                {/* <p className="text-primary font-semibold text-right text-lg">
                    {`( ${data.name} ) ${Subjects[data.course.subject]}     >  الاختبار الاسبوعي علي محاضرة  `}
                </p> */}
                <p className="text-primary text-2xl font-extrabold mt-6 ">{` ( ${Subjects[data.course.subject]} ) الاختبار النهائي علي مادة `}</p>
                <div className="w-full h-[2px] mt-3 bg-[#385044] "></div>
                <p className="text-primary text-lg font-bold mt-6 ">
                    يحتوي هذا الاختبار على {data.mcqs?.length} اسئلة فقط من نوع اختيار من متعدد أو صح وخطأ. و {data.meqs?.length} اسئلة من مقالي
                </p>
                <p className="mb-6">
                    يُسمح بتقديم هذا الاختبار ثلاث مرات فقط خلال فترة إتاحته، ويتم احتساب الدرجة الأعلى للطالب من بين تلك المحاولات.
                </p>
                <Show>
                    <Show.When isTrue={showAnswers} children={<QuizAnswer finalAnswers={finalAnswers}></QuizAnswer>}></Show.When>
                    <Show.Else
                        children={
                            <div className="w-full">
                                <Each
                                    of={data?.mcqs}
                                    render={(item, index) => (
                                        <div className="w-full border-2 border-primary rounded-xl mt-4">
                                            <p className="text-[#2A3E34] text-lg  font-bold mt-6 mb-4 mr-5" style={{ direction: "rtl" }}>
                                                {index + 1}- {item.question}
                                            </p>
                                            <RadioGroup
                                                defaultValue={6}
                                                value={quizesAnswers.mcqs[index]?.answer >= 0 ? quizesAnswers.mcqs[index].answer : -1}
                                                onValueChange={(e) => {
                                                    setQuizeAnswers({
                                                        mcqs: {
                                                            ...quizesAnswers.mcqs,
                                                            [index]: {
                                                                mcq: item.id,
                                                                answer: e,
                                                            },
                                                        },
                                                        meqs: quizesAnswers.meqs,
                                                    })
                                                }}
                                                className="mr-5 mb-5"
                                            >
                                                <Each
                                                    of={item.choices}
                                                    render={(choice, index) => (
                                                        <div className="flex flex-row-reverse items-center justify-start gap-3 space-x-2">
                                                            <RadioGroupItem value={index} id={`r${item._id}_${index}`} />
                                                            <Label className="text-primary text-base" htmlFor={`r${item._id}_${index}`}>
                                                                {choice}
                                                            </Label>
                                                        </div>
                                                    )}
                                                ></Each>
                                            </RadioGroup>
                                        </div>
                                    )}
                                ></Each>

                                <Each
                                    of={data?.meqs}
                                    render={(item, index) => (
                                        <div className="w-full border-2 border-primary rounded-xl mt-4" style={{ direction: "rtl" }}>
                                            <p className="text-[#2A3E34] text-lg  font-bold mt-6 mb-4 mr-5" style={{ direction: "rtl" }}>
                                                {index + 1}- {item.question}
                                            </p>
                                            <Input
                                                value={quizesAnswers.meqs[index]?.answer ? quizesAnswers.meqs[index].answer : ""}
                                                placeholder="اكتب الاجابة هنا"
                                                onChange={(e) => {
                                                    setQuizeAnswers({
                                                        mcqs: quizesAnswers.mcqs,
                                                        meqs: {
                                                            ...quizesAnswers.meqs,
                                                            [index]: {
                                                                meq: item.id,
                                                                answer: e.target.value,
                                                            },
                                                        },
                                                    })
                                                }}
                                                className="w-[97%] mx-auto border-2 border-primary rounded-xl p-2 my-2"
                                            ></Input>
                                        </div>
                                    )}
                                ></Each>
                            </div>
                        }
                    ></Show.Else>
                </Show>
                <Show>
                    <Show.When
                        isTrue={showAnswers&&passed}
                        children={
                            <div className="flex   gap-4 w-full items-center mt-10">
                                <Link to={`/profile/certifications`}>
                                    <Button className="mt-4"> الذهاب الي الشهادة </Button>
                                </Link>
                            </div>
                        }
                    ></Show.When>
                      <Show.When
                        isTrue={showAnswers&&!passed}

                        children={
                            <div className="flex   gap-4 w-full items-center mt-10">
                               <Link to={`/courses/${courseStat.course}`}>
                                    <Button >
                                        الذهاب الي  الدرس
                                    </Button>
                                </Link>
                            </div>
                        }
                    ></Show.When>
                    <Show.Else
                        children={
                            <div className="flex   gap-4 w-full items-center mt-10">
                                <Button className=" " disabled={reload} onClick={submitAnswers}>
                                    ارسال الاجابات
                                </Button>
                                <Dialog
                                    open={open}
                                    onOpenChange={() => {
                                        setOpen(!open)
                                    }}
                                >
                                    <DialogTrigger asChild>
                                        <p className="cursor-pointer text-primary text-base font-bold hover:underline">حذف جميع الاجابات</p>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <p className="text-primary font-bold text-lg">حذف جميع الاجابات؟</p>
                                        <DialogDescription className="text-right    ">
                                            هل انت متأكد من أنك تريد حذف جميع الاجابات من الاسئلة؟ لا يمكن التراجع عن هذه العملية.
                                        </DialogDescription>
                                        <div className="flex gap-6">
                                            <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    setOpen(false)
                                                }}
                                            >
                                                لا، الغاء
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                onClick={() => {
                                                    setQuizeAnswers({
                                                        mcqs: [],
                                                        meqs: [],
                                                    })
                                                    setOpen(false)
                                                }}
                                            >
                                                نعم، حذف
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        }
                    ></Show.Else>
                </Show>
                <Dialog
                    open={isSubmitted && passed}
                    onOpenChange={() => {
                        setIsSubmitted(false)
                    }}
                >
                    <DialogContent>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-primary text-2xl font-bold mt-4">مبروك النجاح</p>
                            <p className="text-primary text-lg mt-4">لقد نجحت في الاختبار</p>
                            <p className="text-primary text-lg mt-4">الدرجة: {finalAnswers.score}</p>
                            <div className="flex   gap-4 w-full justify-center items-center mt-10">
                                <Link to={`/profile/certifications`}>
                                    <Button className=""> الذهاب الي الشهادة </Button>
                                </Link>
                                <Button
                                    onClick={() => {
                                        setIsSubmitted(false)
                                    }}
                                >
                                    مراجعة الاجابات
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={isSubmitted && !passed}
                    onOpenChange={() => {
                        navigate(`/learn/${id}`)
                    }}
                >
                    <DialogContent>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-primary text-2xl font-bold mt-4">للاسف لم تنجح في الاختبار</p>
                            <p className="text-primary text-lg mt-4">الدرجة: {finalAnswers.score}</p>
                            <div className="flex   gap-4 w-full justify-center items-center mt-10">
                                <Link to={`/courses/${courseStat.course}`}>
                                    <Button >
                                        الذهاب الي  الدرس
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => {
                                        setIsSubmitted(false)
                                    }}
                                >
                                    مراجعة الاجابات
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <SideBarLearn name={data.course.subject} courseID={data.course.id}></SideBarLearn>
        </div>
    )
}

const QuizAnswer = ({ finalAnswers }) => {
    console.log(finalAnswers)
    return (
        <div className="w-full">
            <p className="text-3xl font-bold text-primary"> نتائج الاختبار</p>
            <Each
                of={finalAnswers.mcqs}
                render={(item, index) => (
                    <div className="w-full border-2 border-primary rounded-xl mt-4" style={{ direction: "rtl" }}>
                        <div className="flex justify-between items-center">
                            <p className={`${item.correct ? " text-[#2A3E34] " : " text-red-500 "} text-lg font-bold mt-6 mb-4 mr-5`}>
                                {index + 1} - {item.mcq.question}
                            </p>

                            <p className={`${item.correct ? " text-[#2A3E34] " : " text-red-500 "} text-sm font-bold mt-6 mb-4 ml-5`}>
                                {item.correct ? "اجابه صحيحة" : "اجابة خاطئة"}
                            </p>
                        </div>
                        <RadioGroup defaultValue={item.answer} className="mr-5 mb-5" value={item.answer}>
                            <Each
                                of={item.mcq.choices}
                                render={(choice, index) => (
                                    <div className="flex flex-row-reverse items-center justify-start gap-3 space-x-2">
                                        <RadioGroupItem
                                            value={index}
                                            id={`r${index}`}
                                            className={` ${index === item.answer && !item.correct ? "text-red-500  " : "   text-primary"} text-base`}
                                        />
                                        <Label
                                            className={` ${index === item.answer && !item.correct ? "text-red-500  " : "   text-primary"} text-base`}
                                            htmlFor={`r${index}`}
                                        >
                                            {choice}
                                        </Label>
                                    </div>
                                )}
                            ></Each>
                        </RadioGroup>
                    </div>
                )}
            ></Each>
            <Each
                of={finalAnswers.meqs}
                render={(item, index) => (
                    <div className="w-full border-2 border-primary rounded-xl mt-4" style={{ direction: "rtl" }}>
                        <div className="flex justify-between items-center">
                            <p className={` text-[#2A3E34]  text-lg font-bold mt-6 mb-4 mr-5`}>
                                {index + 1} - {item.meq.question}
                            </p>
                            <p className="text-sm font-bold mt-6 mb-4 ml-5">5 / {item.scoreByAi}</p>
                        </div>
                        <Input
                            value={item.answer}
                            placeholder="اكتب الاجابة هنا"
                            disabled
                            className="w-[97%] mx-auto border-2 border-primary rounded-xl p-2 my-2"
                        ></Input>
                    </div>
                )}
            ></Each>
        </div>
    )
}

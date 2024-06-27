import { SideBarLearn } from "@/components/SideBarLearn"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog"
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

export const QuizPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [showAnswers, setShowAnswers] = useState(false)
    const [finalAnswers, setFinalAnswers] = useState({})

    const location = useLocation()
    const [data, setData] = useState({
        course: {
            subject: "",
        },
        name: "",
        comments: [],
        replies: [],
    })

    const [comment, setComment] = useState("")
    const [reload, setReload] = useState(false)
    const [quizes, setQuizes] = useState({
        mcq: [],
    })

    const [answers, setAnswers] = useState({
        scoreFrom: 2,
        durationInMins: 30,
        lectureQuizzesGrades: [],
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        getMethod(`/lectures/${id}`, localStorage.getItem("token")).then((res) => {
            setData(res.data)
            console.log(res)
        })
        getMethod(`/lectures/${id}/quiz/`, localStorage.getItem("token")).then((res) => {
            setQuizes(res.data[0])
            setAnswers({ ...answers, scoreFrom: res.data[0].scoreFrom, durationInMins: res.data[0].durationInMins })
        })
    }, [])

    const submitAnswers = () => {
        setReload(true)

        postMethod(`/lectures/${id}/quiz/answers/submit`, answers, localStorage.getItem("token")).then((res) => {
            setReload(false)
            if (res.status === "Success") {
                setIsSubmitted(true)

                setFinalAnswers(res.data.lectureQuizzesGrades)
                setShowAnswers(true)
            }
        })
    }

    return (
        <div className="flex justify-end flex-col-reverse lg:flex-row  h-full">
            <div className=" flex flex-col items-end px-5 py-8  text-right w-full">
                <p className="text-primary font-semibold text-right text-lg">
                    {`( ${data.name} ) ${Subjects[data.course.subject]}     >  الاختبار الاسبوعي علي محاضرة  `}
                </p>
                <p className="text-primary text-2xl font-extrabold mt-6 ">{` ( ${data.name} ) الاختبار الاسبوعي علي محاضرة `}</p>
                <div className="w-full h-[2px] mt-3 bg-[#385044] "></div>
                <p className="text-primary text-lg font-bold mt-6 mb-10">
                    يحتوي هذا الاختبار على {quizes.mcq?.length} اسئلة فقط من نوع اختيار من متعدد أو صح وخطأ.
                </p>
                <Show>
                    <Show.When isTrue={showAnswers} children={<QuizAnswer finalAnswers={finalAnswers}></QuizAnswer>}></Show.When>
                    <Show.Else
                        children={
                            <Each
                                of={quizes.mcq}
                                render={(item, index) => (
                                    <div className="w-full border-2 border-primary rounded-xl mt-4">
                                        <p className="text-[#2A3E34] text-lg  font-bold mt-6 mb-4 mr-5" style={{ direction: "rtl" }}>
                                            {index + 1}- {item.question}
                                        </p>
                                        <RadioGroup
                                            defaultValue={6}
                                            value={answers.lectureQuizzesGrades[index]?.answer >= 0 ? answers.lectureQuizzesGrades[index].answer : -1}
                                            onValueChange={(e) => {
                                                // console.log(item.id);
                                                //find the index of the item in the array and update the answer
                                                let newAnswers = answers.lectureQuizzesGrades
                                                newAnswers[index] = { mcq: item.id, answer: e }
                                                setAnswers({ ...answers, lectureQuizzesGrades: newAnswers })
                                                console.log(answers)
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
                        }
                    ></Show.Else>
                </Show>
                <Show>
                    <Show.When
                        isTrue={showAnswers}
                        children={
                            <div className="flex   gap-4 w-full items-center mt-10">
                                <Link to={`/learn/${id}`}>
                                    <Button className="mt-4">العودة الى المحاضرة</Button>
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
                                        <p
                                            className="cursor-pointer text-primary text-base font-bold hover:underline"
                                            // onClick={() => {
                                            //     setAnswers({ ...answers, lectureQuizzesGrades: [] })
                                            // }}
                                        >
                                            حذف جميع الاجابات
                                        </p>
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
                                                    setAnswers({
                                                        ...answers,
                                                        lectureQuizzesGrades: [],
                                                    })
                                                    setOpen(false)
                                                }}
                                            >
                                                نعم، حذف
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                {/* <Dialog
                        open={isSubmitted}
                        onOpenChange={() => {
                         
                            navigate(`/learn/${id}`)
                        }}
                    >
                        <DialogContent>
                            <div className="flex flex-col items-center justify-center">
                             
                                <p className="text-primary text-2xl font-bold mt-4">شكرا لك على تقديم الاجابات</p>
                                <p className="text-primary text-lg mt-4">سيتم تقديم النتائج في اقرب وقت</p>
                                <Link to={`/learn/${id}`}>
                                    <Button className="mt-4">العودة الى المحاضرة</Button>
                                </Link>
                            </div>
                        </DialogContent>
                    </Dialog> */}
                            </div>
                        }
                    ></Show.Else>
                </Show>
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
                of={finalAnswers}
                render={(item, index) => (
                    <div className="w-full border-2 border-primary rounded-xl mt-4">
                        <div className="flex justify-between items-center">
                            <p className={`${item.correct ? " text-[#2A3E34] " : " text-red-500 "} text-sm font-bold mt-6 mb-4 ml-5`}>
                                {item.correct ? "اجابه صحيحة" : "اجابة خاطئة"}
                            </p>
                            <p className={`${item.correct ? " text-[#2A3E34] " : " text-red-500 "} text-lg font-bold mt-6 mb-4 mr-5`} style={{direction:"rtl"}}>
                                {index + 1} - {item.mcq.question}
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
        </div>
    )
}

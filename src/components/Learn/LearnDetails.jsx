import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useStore } from "@/context/storeContext"
import { Subjects } from "@/data"
import { deleteMethod, patchMethod, postMethod } from "@/utils/ApiMethods"
import { Each } from "@/utils/Each"
import { Show } from "@/utils/Show"
import { CornerRightUpIcon, DeleteIcon, MinusIcon, PlusIcon, ReplyIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useToast } from "../ui/use-toast"
export const LearnDetails = ({ items }) => {
    const { state, setState } = useStore()
    const navigate = useNavigate()
    const {toast} = useToast()
    const { id } = useParams()
    const [data, setData] = useState({
        course: {
            subject: "",
        },
        name: "",
        comments: [],
        replies: [],
        quiz: [],
    })

    const [isReply, setIsReply] = useState({
        reply: false,
        id: "",
    })
    const [comment, setComment] = useState("")
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setData(items)
        console.log(items);
        console.log(data);
    }, [items])

    return (
        <div className=" flex flex-col items-end px-5 py-8  text-right w-full">
            <p className="text-primary font-semibold text-lg">
                {" "}
                {data.name} {"<"} {Subjects[data.course.subject]}
            </p>
            <p className="text-primary text-3xl font-extrabold mt-6 ">{data.name}</p>
            <div className="w-full h-[2px] mt-3 bg-[#385044] "></div>
            <p className="text-[#385044] font-semibold mt-6 text-xl">
                {data?.description
                    ? data?.description
                    : "تغطي هذه المحاضرة شرحاً لما جاء في كتاب مقرر التفسير من قوله (التعريف بعلم التفسير) في الصفحة رقم 11 وحتى قوله (نشأة علم التفسير) في الصفحة رقم 13"}
            </p>
            {/* video */}
            <div className="mt-6 w-full flex justify-center ">
                <iframe
                    className="w-full max-w-[800px] aspect-video "
                    src={data.videoLink ? data.videoLink : "https://www.youtube.com/embed/tgbNymZ7vqY"}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <p className="text-center w-full mt-3 text-2xl text-[#385044]">اتممت المشاهدة؟</p>
            {/* button */}
            <div className="flex flex-col items-center  w-full">
                <Button
                    className="px-14 mt-3 text-lg"
                    disabled={data.quiz.length === 0}
                    variant={data.quiz.length === 0 ? "destructive" : "default"}
                    onClick={() => {
                        if (data.quiz.length === 0) {
                           
                            return
                        }
                        navigate(`/learn/${id}/quiz`)
                    }}
                >
                    {data.quiz.length > 0 ? "الاختبار الاسبوعي" : "لا يوجد اختبار"}
                </Button>
                <p>الاختبار الاسبوعي الاول</p>
            </div>
            <div className="w-full h-[2px] mt-3 bg-[#385044] "></div>
            <p className="mt-6 text-primary text-2xl font-extrabold">منتدى المناقشات</p>
            <p>اذا كان لديك اي سؤال فلا تتردد او تبخل بسؤالك</p>
            <div
                className="w-full p-6 rounded-3xl my-7 "
                style={{
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
                }}
            >
                <Show>
                    <Show.When
                        isTrue={isReply.reply}
                        children={
                            <div>
                                <div className="flex justify-between mb-4   ">
                                    <Button
                                        variant="outline"
                                        className="px-4"
                                        onClick={() => {
                                            setIsReply({ reply: false, id: "" })
                                        }}
                                    >
                                        الغاء
                                    </Button>
                                    <p className="">
                                        {data.comments.find((i) => i.id === isReply.id)?.student.Fname
                                            ? data.comments.find((i) => i.id === isReply.id)?.student.Fname
                                            : data.comments.find((i) => i.id === isReply.id)?.teacher.Fname}
                                        انت الان ترد علي
                                    </p>
                                    {/* الغاء */}
                                </div>
                                <div className="flex items-center">
                                    <Textarea
                                        placeholder="اكتب ردك هنا"
                                        onChange={(e) => {
                                            setComment(e.target.value)
                                        }}
                                        className="text-right"
                                    ></Textarea>
                                    <img
                                        src={state.photo ? state.photo : "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256"}
                                        width={36}
                                        height={36}
                                        alt="Avatar"
                                        className="overflow-hidden rounded-full w-14 h-14 ml-2"
                                    />
                                </div>
                            </div>
                        }
                    ></Show.When>
                    <Show.Else
                        children={
                            <div className="flex">
                                <Textarea
                                    placeholder="اكتب سؤالك هنا"
                                    onChange={(e) => {
                                        setComment(e.target.value)
                                    }}
                                    value={comment}
                                    className="text-right"
                                ></Textarea>
                                <img
                                    src={state.photo ? state.photo : "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256"}
                                    width={36}
                                    height={36}
                                    alt="Avatar"
                                    className="overflow-hidden rounded-full w-14 h-14 ml-2"
                                />
                            </div>
                        }
                    ></Show.Else>
                </Show>

                <div className="flex justify-start mt-4">
                    <Button
                        className="px-14"
                        disabled={reload}
                        onClick={() => {
                            setReload(true)
                            if (isReply.reply) {
                                postMethod(`/lectures/${id}/comments/${isReply.id}/reply`, { text: comment }, localStorage.getItem("token")).then(
                                    (res) => {
                                        // console.log(res.data.comment.id)

                                        setReload(false)

                                        if (res.status === "success") {
                                            setData({
                                                ...data,
                                                comments: data.comments.map((i) =>
                                                    i._id.toString() === res.data.comment._id.toString() ? res.data.comment : i
                                                ),
                                            })
                                        }

                                        setComment("")
                                        setIsReply({ reply: false, id: "" })
                                    }
                                )
                                return
                            } else {
                                postMethod(`/lectures/${id}/comments`, { text: comment }, localStorage.getItem("token")).then((res) => {
                                    setReload(false)
                                    console.log(res)

                                    if (res.status === "Success") {
                                        setComment("")
                                        setData({ ...data, comments: [...data.comments, res.data] })
                                    }
                                })
                            }
                        }}
                    >
                        ارسال
                    </Button>
                </div>
            </div>

            <Each
                // filter by the most likes
                of={data.comments.sort((a, b) => b.totalScore - a.totalScore)}
                render={(item, index) => (
                    // comments and reply
                    <div className="w-full px-6 rounded-3xl ">
                        <div
                            className="w-full flex gap-2 flex-row-reverse justify-between p-6 rounded-3xl mt-7"
                            style={{
                                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
                            }}
                        >
                            <div className="w-full">
                                <div className="flex flex-row-reverse justify-between ">
                                    <div className="flex flex-row-reverse items-center ">
                                        <img
                                            src={
                                                item.teacher?.photo
                                                    ? item.teacher.photo
                                                    : item.student?.photo
                                                    ? item.student.photo
                                                    : "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256"
                                            }
                                            width={36}
                                            height={36}
                                            alt="Avatar"
                                            className="overflow-hidden rounded-full w-10 h-10 ml-2"
                                        />

                                        <p className="text-primary font-bold">
                                            {item.teacher
                                                ? item.teacher.Fname + " " + item.teacher.Lname
                                                : item.student
                                                ? item.student.Fname + " " + item.student.Lname
                                                : "Ahmed Mohesn"}
                                        </p>
                                    </div>
                                    <div className="flex justify-start gap-3">
                                        <Button
                                            variant="outline"
                                            className="flex items-center w-fit p-0 px-2"
                                            onClick={() => {
                                                setIsReply({ reply: true, id: item.id })
                                            }}
                                        >
                                            <ReplyIcon size={16}></ReplyIcon>
                                            رد
                                        </Button>
                                        <Show>
                                            <Show.When
                                                isTrue={state._id === item.student?._id || state._id === item.teacher?._id}
                                                children={
                                                    <Button
                                                        variant="destructive"
                                                        className="flex items-center w-fit p-0 px-2"
                                                        onClick={() => {
                                                            deleteMethod(`/lectures/L/comments/${item.id}`, localStorage.getItem("token")).then(
                                                                (res) => {
                                                                    setData({ ...data, comments: data.comments.filter((i) => i.id !== item.id) })
                                                                }
                                                            )
                                                        }}
                                                    >
                                                        <DeleteIcon size={16}></DeleteIcon>
                                                        حذف
                                                    </Button>
                                                }
                                            ></Show.When>
                                        </Show>
                                    </div>
                                </div>
                                <p className="text-[#385044] pr-10">{item.text}</p>
                            </div>
                            <div className="flex flex-col items-center bg-[#F5F6FA] p-2 rounded-lg h-fit  gap-2">
                                <PlusIcon
                                    size={18}
                                    className={`text-[#3A5A40] ${
                                        !item.likes.includes(state._id) ? "hover:text-blue-500 transition-all cursor-pointer" : ""
                                    } `}
                                    onClick={() => {
                                        if (!item.likes.includes(state._id)) {
                                            patchMethod(`/lectures/${data.id}/comments/like/${item.id}`, {}, localStorage.getItem("token")).then(
                                                (res) => {
                                                    console.log(res.data)
                                                    setData({ ...data, comments: data.comments.map((i) => (i.id === item.id ? res.data : i)) })
                                                }
                                            )
                                        }
                                    }}
                                />
                                <p className="text-primary">{item.totalScore}</p>
                                <MinusIcon
                                    size={18}
                                    className={`text-[#3A5A40]  ${
                                        !item.disLikes.includes(state._id) ? "hover:text-red-500 transition-all cursor-pointer" : ""
                                    } `}
                                    onClick={() => {
                                        if (!item.disLikes.includes(state._id)) {
                                            patchMethod(`/lectures/${data.id}/comments/dislike/${item.id}`, {}, localStorage.getItem("token")).then(
                                                (res) => {
                                                    setData({ ...data, comments: data.comments.map((i) => (i.id === item.id ? res.data : i)) })
                                                }
                                            )
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className={`flex flex-col    ${item.replies?.length === 0 ? " hidden" : ""}`}>
                            <Each
                                of={item.replies}
                                render={(item, index) => (
                                    <div className="flex items-center">
                                        <div
                                            className="w-[98%] flex gap-2 flex-row-reverse justify-between p-6 rounded-3xl mt-7"
                                            style={{
                                                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
                                            }}
                                        >
                                            <div className="w-full">
                                                <div className="flex flex-row-reverse justify-between ">
                                                    <div className="flex flex-row-reverse items-center ">
                                                        <img
                                                            src={
                                                                item.teacher?.photo
                                                                    ? item.teacher.photo
                                                                    : item.student?.photo
                                                                    ? item.student.photo
                                                                    : "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256x"
                                                            }
                                                            width={36}
                                                            height={36}
                                                            alt="Avatar"
                                                            className="overflow-hidden rounded-full w-10 h-10 ml-2"
                                                        />

                                                        <p className="text-primary font-bold">
                                                            {item.teacher
                                                                ? item.teacher.Fname + " " + item.teacher.Lname
                                                                : item.student
                                                                ? item.student.Fname + " " + item.student.Lname
                                                                : "Ahmed Mohesn"}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-start gap-3">
                                                        <Button
                                                            variant="outline"
                                                            className="flex items-center w-fit p-0 px-2"
                                                            onClick={() => {
                                                                setIsReply({ reply: true, id: item.id })
                                                            }}
                                                        >
                                                            <ReplyIcon size={16}></ReplyIcon>
                                                            رد
                                                        </Button>
                                                        <Show>
                                                            <Show.When
                                                                isTrue={state._id === item.student?._id || state._id === item.teacher?._id}
                                                                children={
                                                                    <Button
                                                                        variant="destructive"
                                                                        className="flex items-center w-fit p-0 px-2"
                                                                        onClick={() => {
                                                                            deleteMethod(
                                                                                `/lectures/L/comments/${item.id}`,
                                                                                localStorage.getItem("token")
                                                                            ).then((res) => {
                                                                                // replies
                                                                                setData({
                                                                                    ...data,
                                                                                    comments: data.comments.map((i) => {
                                                                                        if (i.replies) {
                                                                                            return {
                                                                                                ...i,
                                                                                                replies: i.replies.filter((i) => i.id !== item.id),
                                                                                            }
                                                                                        }
                                                                                        return i
                                                                                    }),
                                                                                })
                                                                            })
                                                                        }}
                                                                    >
                                                                        <DeleteIcon size={16}></DeleteIcon>
                                                                        حذف
                                                                    </Button>
                                                                }
                                                            ></Show.When>
                                                        </Show>
                                                    </div>
                                                </div>
                                                <p className="text-[#385044] pr-10">{item.text}</p>
                                            </div>
                                            <div className="flex flex-col items-center bg-[#F5F6FA] p-2 rounded-lg h-fit  gap-2">
                                                <PlusIcon
                                                    size={18}
                                                    className="text-[#3A5A40] hover:text-primary/20 transition-all cursor-pointer"
                                                    onClick={() => {
                                                        patchMethod(
                                                            `/lectures/${data.id}/comments/like/${item.id}`,
                                                            {},
                                                            localStorage.getItem("token")
                                                        ).then((res) => {
                                                            setData({
                                                                ...data,
                                                                comments: data.comments.map((i) => (i.id === item.id ? res.data : i)),
                                                            })
                                                        })
                                                    }}
                                                />
                                                <p className="text-primary">{item.totalScore}</p>
                                                <MinusIcon
                                                    size={18}
                                                    className="text-[#3A5A40]  hover:text-red-500 transition-all cursor-pointer"
                                                    onClick={() => {
                                                        patchMethod(
                                                            `/lectures/${data.id}/comments/dislike/${item.id}`,
                                                            {},
                                                            localStorage.getItem("token")
                                                        ).then((res) => {
                                                            setData({
                                                                ...data,
                                                                comments: data.comments.map((i) => (i.id === item.id ? res.data : i)),
                                                            })
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <CornerRightUpIcon size={40} />
                                    </div>
                                )}
                            ></Each>
                        </div>
                    </div>
                )}
            ></Each>
        </div>
    )
}

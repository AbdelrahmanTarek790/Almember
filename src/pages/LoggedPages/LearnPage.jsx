import { LearnDetails } from "@/components/Learn/LearnDetails"
import { Quiz } from "@/components/Learn/Quiz"
import { SideBarLearn } from "@/components/SideBarLearn"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Subjects } from "@/data"
import { getMethod, postMethod } from "@/utils/ApiMethods"
import { Each } from "@/utils/Each"
import { Show } from "@/utils/Show"
import { CornerTopRightIcon } from "@radix-ui/react-icons"
import { CornerRightUpIcon, ReplyIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

export const LearnPage = () => {
    const { id } = useParams()
    const location = useLocation()
    const [data, setData] = useState({
        course: {
            subject: "",
        },
        name: "",
        comments: [],
        replies: [],
        quiz: [],
    })
    const [comment, setComment] = useState("")
    const [reload, setReload] = useState(false)

    useEffect(() => {
        console.log(location.pathname)
        getMethod(`/lectures/${id}`, localStorage.getItem("token")).then((res) => {
            setData(res.data)
            console.log(res)
            // setLectures(res.data.courseStat.lectureStats)
        })
    }, [id])

    return (
        <div className="flex justify-end flex-col-reverse lg:flex-row  h-full">
            <Show>
                <Show.When
                    isTrue={location.pathname === `/learn/${id}`}
                    children={<LearnDetails items={data} reload={reload}></LearnDetails>}
                ></Show.When>
                <Show.When isTrue={location.pathname === `/learn/${id}/quiz`} children={<Quiz items={data} reload={reload}></Quiz>}></Show.When>
            </Show>
            {/* <LearnDetails items={data} reload={reload}></LearnDetails>
             */}
            <SideBarLearn name={data.course.subject} courseID={data.course.id}></SideBarLearn>
        </div>
    )
}

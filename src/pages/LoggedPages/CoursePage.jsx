import { CourseAbout } from "@/components/Courses/CourseAbout"
import { CourseDegree } from "@/components/Courses/CourseDegree"
import { CourseDetails } from "@/components/Courses/CourseDetails"
import { CourseTutors } from "@/components/Courses/CourseTutors"
import { SideBarCourseDetails } from "@/components/SideBarCourseDetails"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Subjects } from "@/data"
import { getMethod } from "@/utils/ApiMethods"
import { Each } from "@/utils/Each"
import { Show } from "@/utils/Show"
import { ChevronsLeft, ChevronsRight, ChevronsRightLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export const CoursePage = () => {
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getMethod(`/courses/guest/${id}`).then((res) => {
            // console.log(res.data)
            setData(res.data)
            setLoading(false)
        })
    }, [location.pathname])

    return (
        <div className="flex justify-end flex-col-reverse lg:flex-row  h-full">
            <div className=" flex flex-col items-end px-5 py-8  text-right w-full">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-cairo">{Subjects[data.subject]}</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <ChevronsLeft className="w-5 h-5"></ChevronsLeft>
                        </BreadcrumbSeparator>
                        <Each
                            of={location.pathname
                                .split("/")
                                .filter((item) => item !== id)
                                .reverse()}
                            render={(item, index) => (
                                <div className="flex items-center gap-2.5">
                                    <BreadcrumbItem className="cursor-pointer">
                                        <BreadcrumbLink
                                            onClick={() => {
                                                if (item === "") {
                                                    navigate("/")
                                                } else if (item === "courses") {
                                                    navigate("/courses")
                                                }
                                            }}
                                        >
                                            {item === "" ? "الرئسية" : item === "courses" ? "المقررات" : item}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <Show>
                                        <Show.When isTrue={index !== location.pathname.split("/").length - 2}>
                                            <BreadcrumbSeparator>
                                                <ChevronsLeft className="w-5 h-5"></ChevronsLeft>
                                            </BreadcrumbSeparator>
                                        </Show.When>
                                    </Show>
                                </div>
                            )}
                        ></Each>
                    </BreadcrumbList>
                </Breadcrumb>
                <Show>
                    <Show.When
                        isTrue={!loading && location.pathname === `/courses/${id}`}
                        children={<CourseDetails items={data}></CourseDetails>}
                    ></Show.When>
                    <Show.When
                        isTrue={!loading && location.pathname === `/courses/${id}/degrees`}
                        children={<CourseDegree items={data}></CourseDegree>}
                    ></Show.When>
                    <Show.When
                        isTrue={!loading && location.pathname === `/courses/${id}/tutors`}
                        children={<CourseTutors items={data}></CourseTutors>}
                    ></Show.When>
                    <Show.When
                        isTrue={!loading && location.pathname === `/courses/${id}/info`}
                        children={<CourseAbout items={data}></CourseAbout>}
                    ></Show.When>
                </Show>
            </div>
            <SideBarCourseDetails name={data.subject}></SideBarCourseDetails>
        </div>
    )
}

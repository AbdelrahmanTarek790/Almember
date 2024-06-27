import * as React from "react"
import { ChevronLeftIcon, Home, LineChart, Package, Package2, Settings, ShoppingCart, Users2 } from "lucide-react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { Each } from "@/utils/Each"
import { Subjects } from "@/data"
import { getMethod } from "@/utils/ApiMethods"
import { Show } from "@/utils/Show"
import { Button } from "./ui/button"

export const SideBarLearn = ({ name, courseID }) => {
    const navigate = useNavigate()

    const location = useLocation()
    const [items, setItems] = React.useState({
        lectureStats: [],
        course: {
            final: {},
        },
    })

    React.useEffect(() => {
        if (courseID) {
            getMethod(`/students/${courseID}/stats`, localStorage.getItem("token")).then((res) => {
                setItems(res.data.courseStat)
                console.log(items)
            })
        }
        setActive(location.pathname)
    }, [location, courseID])
    const [active, setActive] = React.useState(location.pathname)

    return (
        <aside className="lg:min-h-[720px] lg:min-w-[250px] lg:max-w-[250px]  z-10  flex-col border-l bg-background sm:flex">
            <nav className="flex flex-col gap-4 py-4  items-end">
                <div className="w-[200px] lg:w-[80%] text-center bg-[#2A3E34] py-3 text-4xl text-white  font-deco rounded-s-full">
                    {Subjects[`${name}`] ? Subjects[`${name}`] : ""}
                </div>
                <Each
                    of={items.lectureStats.sort((a, b) => a.lecture.order - b.lecture.order)}
                    render={(item, index) => (
                        <div className="w-[97%]">
                            <Button
                                onClick={() => navigate(`/learn/${item.lecture.id}`)}
                                disabled={!item.open}
                                className={`${
                                    active === `/learn/${item.lecture.id}` ? " font-bold bg-[#62996c]/20 text-primary " : " bg-transparent"
                                }"flex w-[100%] h-auto text-right mt-4  whitespace-normal hover:bg-[#62996c]/20 px-2 items-center  justify-end gap-2 font-cairo rounded-lg text-muted-foreground transition-colors hover:text-foreground"`}
                            >
                                <div>
                                    <p>{item.lecture.name}</p>
                                </div>
                                <Show>
                                    <Show.When
                                        isTrue={item.done}
                                        children={<i className="fa-solid text-primary fa-circle-check text-2xl"></i>}
                                    ></Show.When>
                                    <Show.Else children={<i className="fa-regular fa-circle-check  text-primary text-2xl"></i>}></Show.Else>
                                </Show>
                            </Button>
                            <Show>
                                <Show.When
                                    isTrue={item.lecture?.quiz?.length > 0}
                                    children={
                                        <Button
                                            disabled={!item.open}
                                            onClick={() => navigate(`/learn/${item.lecture.id}/quiz`)}
                                            className={`${
                                                active === `/learn/${item.lecture.id}/quiz` || active === `/quiz/${item.lecture.id}/`
                                                    ? " font-bold bg-[#62996c]/20 text-primary  "
                                                    : "bg-transparent "
                                            }" flex w-[100%] h-auto text-right mt-4  whitespace-normal hover:bg-[#62996c]/20 px-2 items-center  justify-end gap-2 font-cairo rounded-lg text-muted-foreground transition-colors hover:text-foreground"`}
                                        >
                                            <div>
                                                <p>اختبار محاضرة</p>
                                                <p>{item.lecture.name}</p>
                                            </div>
                                            <Show>
                                                <Show.When
                                                    isTrue={item.done}
                                                    children={<i className="fa-solid text-primary fa-circle-check text-2xl"></i>}
                                                ></Show.When>
                                                <Show.Else
                                                    children={<i className="fa-regular fa-circle-check text-primary  text-2xl"></i>}
                                                ></Show.Else>
                                            </Show>
                                        </Button>
                                    }
                                ></Show.When>
                            </Show>
                        </div>
                    )}
                ></Each>
                <Show>
                    <Show.When
                        isTrue={items?.course?.final ? true : false}
                        children={
                            <Link to={`/final/${items.course.id}`} className={` w-[100%] flex justify-center`}>
                                <Button className="w-[90%]">اختبار نهائي</Button>
                            </Link>
                        }
                    ></Show.When>
                    <Show.Else
                        children={
                            <Link className={` w-[100%] flex justify-center`}>
                                <Button className="w-[90%]" disabled>
                                    لا يوجد اختبار نهائي
                                </Button>
                            </Link>
                        }
                    ></Show.Else>
                </Show>
            </nav>
        </aside>
    )
}

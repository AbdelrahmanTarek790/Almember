import * as React from "react"
import { ChevronLeftIcon, Home, LineChart, Package, Package2, Settings, ShoppingCart, Users2 } from "lucide-react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Link, useLocation, useParams } from "react-router-dom"
import { Each } from "@/utils/Each"
import { Subjects } from "@/data"

export const SideBarCourseDetails = ({ name }) => {
    const { id } = useParams()
    const location = useLocation()
    const ProfList = [
        { title: "المنهج الدراسـي", url: `/courses/${id}` },
        { title: "درجات المقررات", url: `/courses/${id}/degrees` },
        { title: "مدرسو المقرر", url: `/courses/${id}/tutors` },
        { title: "معلومات عن المنهج", url: `/courses/${id}/info` },
    ]
    React.useEffect(() => {
        setActive(location.pathname)
    }, [location])
    const [active, setActive] = React.useState(location.pathname)

    return (
        <aside className="lg:min-h-[720px] lg:min-w-[250px] lg:max-w-[250px]  z-10  flex-col border-l bg-background sm:flex">
            <nav className="flex flex-col gap-4 py-4  items-end">
                <div className="w-[200px] lg:w-[80%] text-center bg-[#2A3E34] py-3 text-4xl text-white  font-deco rounded-s-full">
                    {Subjects[`${name}`]}
                </div>
                <Each
                    of={ProfList}
                    render={(item, index) => (
                        <Link
                            to={item.url}
                            className={`${
                                active === item.url ? " font-bold  " : " "
                            }" flex w-[90%] items-center mr-4 justify-end font-cairo rounded-lg text-muted-foreground transition-colors hover:text-foreground"`}
                        >
                            <span>{item.title}</span>
                            <ChevronLeftIcon className={active === item.url ? "" : "opacity-0"}></ChevronLeftIcon>
                        </Link>
                    )}
                ></Each>
            </nav>
        </aside>
    )
}

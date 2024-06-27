import * as React from "react"
import { ChevronLeftIcon, Home, LineChart, Package, Package2, Settings, ShoppingCart, Users2 } from "lucide-react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Link, useLocation, useParams } from "react-router-dom"
import { Each } from "@/utils/Each"

export const Sidebar = () => {
    // const nav = useParams()
    const location = useLocation()
    React.useEffect(() => {
        setActive(location.pathname)
    }, [location])
    const [active, setActive] = React.useState(location.pathname)

    return (
        <aside className="lg:min-h-[720px] lg:min-w-[250px] lg:max-w-[250px]  z-10  flex-col border-l bg-background sm:flex">
            <nav className="flex flex-col gap-4 py-4  items-end">
        
                <Each
                    of={ProfList}
                    render={(item, index) => (
                        <Link
                            to={item.url}
                            className={`${
                                active === item.url ? " font-bold " : " "
                            }" flex w-[90%] items-center mr-4 justify-end font-cairo rounded-lg text-muted-foreground transition-colors hover:text-foreground"`}
                        >
                            <span>{item.title}</span>

                            <ChevronLeftIcon className={active === item.url ? "" : "opacity-0"}></ChevronLeftIcon>

                            {/* <Settings className="h-5 w-5" />
                                        <span className="sr-only">Settings</span> */}
                        </Link>
                    )}
                ></Each>
            </nav>
            {/* <nav className="mt-auto flex flex-col items-end gap-4 px-2 sm:py-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to={"/settings"}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Settings className="h-5 w-5" />
                                <span className="sr-only">Settings</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav> */}
        </aside>
    )
}

const ProfList = [
    { title: "حسابي", url: "/profile" },
    { title: "شهاداتي", url: "/profile/certifications" },
]

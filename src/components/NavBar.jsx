import { ListLogged, ListLoggedOut } from "@/data"
import { Each } from "@/utils/Each"
import { Show } from "@/utils/Show"
import { Bell, ChevronDown, Home, MoveDownIcon, Package2, PanelLeft } from "lucide-react"

import { Link, useLocation } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useEffect, useState } from "react"
import { useStore } from "@/context/storeContext"

export const NavBar = () => {
    const { setState, state } = useStore()

    // const location = useLocation()
    // useEffect(() => {
    //     setActive(location.pathname)
    //     // setBreadcrumb(location.pathname.split("/").filter((item) => item !== "edit"))
    // }, [location])
    // const [active, setActive] = useState(location.pathname)
    // console.log(state);

    return (
        <header className="sticky top-0 z-30 flex w-full py-3 items-center gap-4 border-b bg-primary justify-between px-3 lg:px-16 sm:static h-auto sm:border-0 text-primary-foreground ">
            <div className="flex flex-row-reverse items-center gap-3">
                <Show>
                    <Show.When isTrue={state.isLoggedIn}>
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex items-center hover:bg-[#2f5236] p-1 rounded-lg transition-all cursor-pointer">
                                        <ChevronDown size={36} />
                                        <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                                            <img
                                                src={state.photo ? state.photo : "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256"}
                                                width={36}
                                                height={36}
                                                alt="Avatar"
                                                className="overflow-hidden rounded-full"
                                            />
                                        </Button>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuLabel>حسابي الشخصي</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <Link to={"/profile"} className="">
                                        <DropdownMenuItem className=" justify-end hover:cursor-pointer">حسابي</DropdownMenuItem>
                                    </Link>
                                    <Link to={"/profile/certifications"}>
                                        <DropdownMenuItem className=" justify-end hover:cursor-pointer">شهاداتي</DropdownMenuItem>
                                    </Link>
                                    {/* <Link to={"/profile/degrees"}>
                                        <DropdownMenuItem className=" justify-end hover:cursor-pointer">درجات الاختبارات</DropdownMenuItem>
                                    </Link> */}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => {
                                            localStorage.removeItem("token")
                                            window.location.href = "/login"
                                        }}
                                        className=" justify-center hover:cursor-pointer"
                                    >
                                        تسجيل الخروج
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {/* <Bell size={24} className="" /> */}
                        </div>
                    </Show.When>
                    <Show.Else>
                        <div className=" gap-3 items-center hidden lg:flex">
                            <Link
                                to="/register"
                                className="text-xl font-semibold bg-[#dad7cd] px-5 py-1 rounded-full text-[#2a3e34] hover:bg-[#cecbc0] font-cairo transition-all"
                            >
                                إنشاء حساب
                            </Link>
                            <Link to="/login" className="text-xl font-semibold font-cairo hover:scale-110">
                                تسجيل الدخول
                            </Link>
                        </div>
                    </Show.Else>
                </Show>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="lg:hidden">
                            <PanelLeft className="h-5 w-5 text-primary" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="sm:max-w-xs  text-right flex flex-col justify-between">
                        <nav className="flex flex-col-reverse gap-6 text-lg font-medium text-right items-end  mt-6">
                            <Show>
                                <Show.When isTrue={state.isLoggedIn}>
                                    <Each
                                        of={ListLogged}
                                        render={(item) => (
                                            <Link
                                                to={item.url}
                                                className={` ${
                                                    // active === item.url
                                                    //     ? "flex items-center gap-4 px-2.5 text-foreground"
                                                    " flex items-center gap-4 px-2.5 text-foreground hover:text-foreground transition-all text-right"
                                                } `}
                                            >
                                                {item.text}
                                            </Link>
                                        )}
                                    ></Each>
                                </Show.When>
                                <Show.Else>
                                    <Each
                                        of={ListLoggedOut}
                                        render={(item) => (
                                            <Link
                                                to={item.url}
                                                className={` ${
                                                    // active === item.url
                                                    //     ? "flex items-center gap-4 px-2.5 text-foreground"
                                                    " flex items-center gap-4 px-2.5 text-foreground  hover:text-foreground transition-all text-right"
                                                } `}
                                            >
                                                {item.text}
                                            </Link>
                                        )}
                                    ></Each>
                                </Show.Else>
                            </Show>
                        </nav>
                        <Show>
                            <Show.When
                                isTrue={!state.isLoggedIn}
                                children={
                                    <div className="flex gap-3 flex-col items-center">
                                        <Link
                                            to="/register"
                                            className="text-xl font-semibold bg-[#dad7cd] px-5 py-1 rounded-full text-[#2a3e34] hover:bg-[#cecbc0] font-cairo transition-all"
                                        >
                                            إنشاء حساب
                                        </Link>
                                        <Link to="/login" className="text-xl font-semibold font-cairo">
                                            تسجيل الدخول
                                        </Link>
                                    </div>
                                }
                            ></Show.When>
                        </Show>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="flex items-center space-x-14">
                <div className="hidden lg:flex gap-7">
                    <Show>
                        <Show.When isTrue={state.isLoggedIn}>
                            <Each
                                of={ListLogged}
                                render={(item, index) => (
                                    <Link to={item.url} key={index} className="flex items-center gap-2">
                                        <span className="text-xl font-semibold font-cairo hover:scale-110 transition-all">{item.text}</span>
                                    </Link>
                                )}
                            ></Each>
                        </Show.When>
                        <Show.Else>
                            <Each
                                of={ListLoggedOut}
                                render={(item, index) => (
                                    <Link to={item.url} key={index} className="flex items-center gap-2">
                                        <span className="text-xl font-semibold font-cairo hover:scale-110 transition-all">{item.text}</span>
                                    </Link>
                                )}
                            ></Each>
                        </Show.Else>
                    </Show>
                </div>

                <Link to="/" className="">
                    <span className="text-5xl font-deco">المنبر</span>
                </Link>
            </div>
        </header>
    )
}

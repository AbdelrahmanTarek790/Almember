import { Home, LineChart, Package, ShoppingCart, Users2 } from "lucide-react"
export const ListLogged = [
    {
        icon: LineChart,
        text: "الدعم الأكاديمي",
        url: "/support",
    },
    {
        icon: Users2,
        text: "المكتبة",
        url: "/library",
    },
    {
        icon: ShoppingCart,
        text: "مقرراتي الدراسية",
        url: "/courses",
    },
    {
        icon: Home,
        text: "الرئيسية",
        url: "/",
    },
]

export const ListLoggedOut = [
    {
        icon: Home,
        text: "تواصل معنا",
        url: "/contact-us",
    },
    {
        icon: Home,
        text: "الشيوخ",
        url: "/tutors",
    },
    {
        icon: Home,
        text: "المناهج",
        url: "/curriculum",
    },
    {
        icon: Home,
        text: "الرئيسية",
        url: "/",
    },
]

export const Subjects = {
    aqeedah: "العقيده",
    hadeeth: "الحديث",
    fiqh: "الفقه",
    tafseer: "التفسير",
}

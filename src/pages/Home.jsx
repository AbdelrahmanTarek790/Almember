import { Button } from "@/components/ui/button"
import main1 from "../assets/main1.png"
import back1 from "../assets/back1.png"
import main2 from "../assets/main2.png"
import main3 from "../assets/main3.png"
import main4 from "../assets/main4.png"
import main5 from "../assets/main5.png"
import main6 from "../assets/main6.png"
import { Each } from "@/utils/Each"
import { List } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getMethod, postMethod } from "@/utils/ApiMethods"
import { useToast } from "@/components/ui/use-toast"
import "aos/dist/aos.css"
import Aos from "aos"
import ChatEmbed from "@/components/ChatEmbed"

export const HomeLoggedOut = () => {
    const { toast } = useToast()
    const navigate = useNavigate()
    const List1 = [
        {
            img: main3,
            title: "دروس دينيــــة شاملـــة",
            description: "تعليمًا شاملاً في المواد  الأساسية مثل العقيدة، الفقه، التفسير، والحديث.",
        },
        {
            img: main2,
            title: "أستخدام الذكاء الأصطناعي",
            description: "تجربة تعلم حديثة وسهلة عن طريق استخدام الذكاء الاصطناعي في التعلم.",
        },
        {
            img: main4,
            title: "مجانية ومفتوحة للجميـع",
            description: "متاحة مجاناً للأشخاص الذين تزيد أعمارهم عن 16 عامًا ويجيدون القراءة.",
        },
        {
            img: main5,
            title: "متابعة الطلاب بشكل دائم",
            description: "تقوم الاكاديمية دائماً بتقييم أداء الطلاب وتقديم تقارير دورية.",
        },
    ]
    const [tutors, setTutors] = useState([])
    useEffect(() => {
        getMethod("/teachers").then((res) => {
            console.log(res.data.data)
            setTutors(res.data.data)
        })
    }, [])
    const [email, setEmail] = useState("")
    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])
    return (
        <div className="overflow-hidden">
            <div className="flex justify-center lg:justify-evenly font-cairo item-center mt-16 relative">
                <img src={back1} alt="" className="absolute z-[-1] left-[-400px] w-[800px] opacity-35   top-[-400px] origin-center" />
                <img src={back1} alt="" className="absolute z-[-1] right-[-400px] w-[800px] opacity-35   bottom-[-400px] origin-center" />
                <div>
                    <img src={main1} className="hidden lg:block w-[561px]" alt="" data-aos="fade-right" />
                </div>
                <div className="flex flex-col items-center space-y-8 pt-36 lg:mb-0  gap-8 lg:gap-0 lg:text-right">
                    <p className="text-4xl lg:text-6xl  font-extrabold text-[#2A3E34]" data-aos="fade-down">
                        أكاديمية المنبـــــر
                    </p>
                    <div className="w-[95%] lg:w-[500px] text-center lg:text-right" data-aos="fade-up">
                        <p dir="rtl" className="text-[#3A5A40] text-xl mb-10 mr-8 font-bold">
                            المنبر هي اكاديمية لتعليم العلوم الإسلامية الشرعية بــاستخــدام الذكــاء الاصطنــاعــي لتسهيــل العمليــة التعليمية،
                            وجعلها اكثر تفاعلية مع الطالب.
                        </p>
                        <div className="flex justify-center flex-wrap gap-5 mt-4">
                            <Link to={"/login"}>
                                <Button className="rounded-full bg-[#2a3e34] text-xl  px-7 hover:bg-[#395346]">تسجيل الدخول</Button>
                            </Link>
                            <Link to={"/register"}>
                                <Button className="rounded-full bg-[#466746] text-xl px-7 ">إنشاء حساب</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-auto bg-[#2a3e34] mt-3 pb-4" data-aos="fade-up" data-aos-offset="200" data-aos-duration="1000">
                <p className="text-center text-white font-cairo text-3xl font-bold pt-8">ماذا تقدم أكاديمية منبـر</p>
                <div className="flex text-center justify-evenly mt-8 flex-wrap h-auto">
                    <Each
                        of={List1}
                        render={(item, index) => (
                            <div className="w-[263px] h-[254px]">
                                <img src={item.img} alt="" className="w-[152px] h-[152px] mx-auto" />
                                <p className="text-white text-xl  font-bold mt-4">{item.title}</p>
                                <p className="text-white text-base mt-1">{item.description}</p>
                            </div>
                        )}
                    ></Each>
                </div>
            </div>
            <div className="flex flex-col items-center font-cairo">
                <div className="flex justify-center lg:gap-32 flex-row-reverse font-cairo item-center mt-16">
                    <img src={back1} alt="" className="absolute z-[-1] left-[-620px] w-[1000px] opacity-35    origin-center" />

                    <div>
                        <img src={main6} className="w-[561px] hidden lg:block" alt="" data-aos="flip-left" data-aos-offset="300" />
                    </div>
                    <div
                        className="flex flex-col justify-center gap-8 lg:items-end text-center lg:text-right"
                        data-aos="fade-left"
                        data-aos-offset="300"
                    >
                        <p className="text-4xl font-bold text-[#466746]">رسالة أكاديمية المنبر</p>
                        <div className="w-auto lg:w-[470px]">
                            <p className="text-[#2A3E34] text-xl">
                                أكاديمية المنبر هي الوجهة المثالية لتعلم <span className="font-bold">العلوم الشرعية الإسلامية</span> بسهولة ويسر. تأتي
                                رسالة المنبر كجواب على تحديات العصر الحديث، حيث يعاني الكثيرون من البعد عن دراسة العلوم الشرعية، اعتقاداً منهم
                                بصعوبتها او تلاهيهم بملهيات الحياة. تسعى المنبر لتغيير هذه النظرة وتحقيق تقدم حقيقي في تعلم العلوم الشرعية
                                <span className="font-bold">
                                    باستخدام احدث الاساليب التكنولوجية والنفسية لخلق رحلة تعلم أكثر متعة وشمولية وتفاعلية.
                                </span>
                            </p>
                            <div className="flex justify-center  mt-4">
                                <Link to={"/register"}>
                                    <Button className="rounded-full bg-[#466746] text-xl px-7">إنشاء حساب</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-aos="fade-down" className="flex flex-wrap flex-col items-center justify-evenly mt-10 w-full  font-cairo ">
                    <p className="text-[#2A3E34] font-extrabold text-4xl lg:text-5xl text-center  mt-6">تعلم على يد خيرة الشيوخ</p>
                    <div className="flex flex-wrap items-center justify-evenly mt-10 w-full  font-cairo " data-aos="zoom-in">
                        <Each
                            of={tutors}
                            render={(item, index) => (
                                <div className="w-[300px] flex flex-col items-center text-center">
                                    <img
                                        src={
                                            item.photo
                                                ? item.photo
                                                : "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256"
                                        }
                                        alt=""
                                        className="w-[200px] h-[200px] rounded-full"
                                    />
                                    <br />
                                    <p className="text-[#2A3E34] text-xl font-bold">
                                        الشيخ {item.Lname} {item.Mname} {item.Fname}
                                    </p>
                                    <p className="text-[#3A5A40] text-lg">أستاذ وعالم في العلم الشرعي</p>
                                    <p className="text-[#2A3E34] text-lg font-bold">
                                        يُدرِس: {item.coursesToTeach[0] ? item.coursesToTeach[0].text : "لا يدرس منهجاً"}
                                    </p>
                                </div>
                            )}
                        ></Each>
                    </div>
                    <Button
                        data-aos="fade-left"
                        data-aos-offset="50"
                        onClick={() => {
                            navigate("/tutors")
                        }}
                        className="rounded-full bg-[#2a3e34] text-xl font-bold  px-10 hover:bg-[#395346] mt-8"
                    >
                        تعرف على المزيد
                    </Button>
                    <div
                        className="w-[90%]  lg:w-[60%] lg:min-w-[800px] flex lg:h-[450px] rounded-3xl flex-col lg:flex-row mt-24 mb-24"
                        style={{ boxShadow: "0px 0px 30px -15px rgba(0,0,0,0.64)" }}
                        data-aos="fade-up"
                    >
                        <div className="w-full lg:w-[70%] py-5 lg:py-0 h-full flex flex-col justify-center gap-5 text-center  items-center lg:text-right">
                            <div className="text-[#2a3e34]">
                                <p className="text-4xl font-extrabold">اشترك في قائمتنا البريدية</p>
                                <p className="text-2xl mt-3">لمتابعة اخر الدروس المرفوعة والاطلاع على كل جديد</p>
                            </div>
                            <Input
                                placeholder="البريد الإلكتروني"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                className="w-[70%] mt-4"
                            />
                            <Button
                                onClick={() => {
                                    //validate the email
                                    if (!email.includes("@")) {
                                        toast({
                                            title: "يرجى إدخال بريد إلكتروني صحيح",
                                            variant: "destructive",
                                        })
                                        return
                                    }

                                    postMethod("/members", { email: email }).then((res) => {
                                        console.log(res)
                                        if (res.status === "Success") {
                                            toast({
                                                title: "تم الاشتراك بنجاح",
                                                variant: "",
                                            })
                                        } else {
                                            toast({
                                                title: res.message,
                                                variant: "destructive",
                                            })
                                        }
                                    })
                                }}
                                className="rounded-full bg-[#2a3e34] text-xl font-bold  px-10 hover:bg-[#395346] mt-8"
                            >
                                اشترك
                            </Button>
                        </div>
                        <div className="w-full lg:w-[30%] py-5 lg:py-0 h-full bg-[#2A3E34] rounded-b-3xl lg:rounded-b-none lg:rounded-e-3xl flex flex-col justify-center gap-10 items-center text-center  text-white">
                            <p className="text-4xl font-extrabold">!تواصل معنا</p>
                            <p className="text-2xl">للحصول على الدعم والإجابة على جميع استفساراتك</p>
                            <Button
                                onClick={() => {
                                    window.open("https://wa.me/+201126569556", "_blank").focus()
                                }}
                                className="rounded-full bg-white text-[#466746] hover:bg-[#e3eee3] text-xl font-extrabold  w-fit px-10"
                            >
                                اتصل بنا
                            </Button>
                        </div>
                    </div>
                </div>
                <ChatEmbed></ChatEmbed>
            </div>
        </div>
    )
}

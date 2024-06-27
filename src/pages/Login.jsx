import { Label } from "@/components/ui/label"
import back1 from "../assets/back2.png"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { postMethod } from "@/utils/ApiMethods"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { Show } from "@/utils/Show"
export const Login = () => {
    const [data, setData] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const navigate = useNavigate()

    const handleLogin = async () => {
        // console.log(data)
        setLoading(true)
        const res = await postMethod("/students/login", data)
        // console.log(res)

        toast({
            title: res.status === "success" ? "تم تسجيل الدخول بنجاح" : res.message,
            variant: res.status === "success" ? "" : "destructive",
        })
        if (res?.status === "success") {
            localStorage.setItem("token", res.token)
            window.location.href = "/"
        }
        setLoading(false)
        // console.log(res)
    }
    return (
        <div className="flex items-center justify-center  relative  py-24">
            <img src={back1} alt="" className="absolute z-[-1] left-[0px] opacity-35  top-[300px] origin-center" />
            <img src={back1} alt="" className="absolute z-[-1] right-[-150px] opacity-70 top-[-100px] origin-center rotate-180" />

            <div className="w-[95vw] max-w-[500px] lg:w-[550px] bg-[#2A3E34] h-[650px] rounded-3xl ] text-white font-cairo">
                <p className="text-center text-4xl  font-extrabold mt-14">تسجيل الدخول</p>
                <div className="flex flex-col items-center text-right gap-4">
                    <Label className="mt-10 text-right w-[80%]">البريد الإلكتروني</Label>
                    <Input
                        className="w-[80%] text-black text-right"
                        type="email"
                        onChange={(e) => {
                            setData({ ...data, email: e.target.value })
                        }}
                        placeholder="البريد الالكتروني"
                    ></Input>
                </div>
                <div className="flex flex-col items-center text-right gap-4">
                    <Label className="mt-6 text-right w-[80%]">كلمة السر</Label>
                    <Input
                        className="w-[80%] text-black text-right"
                        type="password"
                        onChange={(e) => {
                            setData({ ...data, password: e.target.value })
                        }}
                        placeholder="كلمة السر"
                    ></Input>
                </div>
                <div className="">
                    <p
                        onClick={() => {
                            navigate("/forget-password")
                        }}
                        className="text-left  text-sm font-bold mt-2 ml-14 cursor-pointer"
                    >
                        لا تتذكر كلمة السر ؟
                    </p>
                </div>

                <div className="flex justify-center gap-5 mt-10">
                    <Button
                        className="rounded-lg bg-white text-base text-[#466746]  font-bold px-10 hover:bg-[#f6fffa]"
                        disabled={loading}
                        onClick={handleLogin}
                    >
                        <Show>
                            <Show.When isTrue={loading} children={<Loader2 className="animate-spin mr-2"></Loader2>}></Show.When>
                        </Show>
                        تسجيل الدخول
                    </Button>
                </div>

                <div className="relative mt-16 flex justify-center">
                    <span className="absolute sm:left-[180px] z-10 bg-[#2A3E34] flex justify-center items-center top-[-6px] text-sm text-center w-[150px]">
                        او بأستخدام
                    </span>
                    <div className=" h-px bg-gray-400 w-[85%]"></div>
                </div>
                <div className="flex justify-center gap-5 mt-10">
                    <Button className="rounded-lg bg-[#466746] text-base text-white  font-bold px-10 hover:bg-[#395346]">
                        {<i className="fa-brands fa-google mr-4"></i>}تسجيل الدخول بواسطة جوجل
                    </Button>
                </div>
                <div className="flex justify-center gap-2 mt-8 mb-6">
                    <Link to={"/register"} className="opacity-100">
                        إنشاء حساب جديد
                    </Link>
                    <span className="opacity-65">ليس لديك حساب ؟</span>
                </div>
            </div>
            <br />
        </div>
    )
}

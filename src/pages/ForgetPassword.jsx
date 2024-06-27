import { useToast } from "@/components/ui/use-toast"
import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import back1 from "../assets/back2.png"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { postMethod } from "@/utils/ApiMethods"
import { Loader2 } from "lucide-react"
import { Show } from "@/utils/Show"
const ForgetPassword = () => {
    const [data, setData] = useState({ email: "" })
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const handleForget=  () => {
        postMethod("/students/forgot-password", data).then((res) => {
            console.log(res);   
            toast({
                title: res.status === "success" ? "تم ارسال رابط اعادة تعيين كلمة المرور" : res.message,
                variant: res.status === "success" ? "" : "destructive",
            })
        })

        // students/forgot-password
    }

    return (
        <div className="flex items-center justify-center  relative  py-24">
            <img src={back1} alt="" className="absolute z-[-1] left-[0px] opacity-35  top-[300px] origin-center" />
            <img src={back1} alt="" className="absolute z-[-1] right-[-150px] opacity-70 top-[-100px] origin-center rotate-180" />

            <div className="w-[95vw] max-w-[500px] lg:w-[550px] bg-[#2A3E34] rounded-3xl ] text-white font-cairo">
                <p className="text-center text-4xl  font-extrabold mt-14">هل نسيت كلمة المرور</p>
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

                <div className="flex justify-center gap-5 mt-10 mb-6">
                    <Button
                        className="rounded-lg bg-white text-base text-[#466746]  font-bold px-10 hover:bg-[#f6fffa]"
                        disabled={loading}
                        onClick={handleForget}
                    >
                        <Show>
                            <Show.When isTrue={loading} children={<Loader2 className="animate-spin mr-2"></Loader2>}></Show.When>
                        </Show>
                        إعادة تعيين
                    </Button>
                </div>
            </div>
            <br />
        </div>
    )
}

export default ForgetPassword

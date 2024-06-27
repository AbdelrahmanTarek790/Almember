import { useToast } from "@/components/ui/use-toast"
import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import back1 from "../assets/back2.png"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useParams } from "react-router-dom"
import { patchMethod, postMethod } from "@/utils/ApiMethods"
import { Loader2 } from "lucide-react"
import { Show } from "@/utils/Show"
const ResetPassword = () => {
    const [data, setData] = useState({ })
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const { toast } = useToast()
    const handleRest = () => {
        patchMethod(`/students/reset-password/${id}`, data).then((res) => {
         
            toast({
                title: res.status === "success" ? "تم تغيير كلمة المرور بنجاح" : res.message,
                variant: res.status === "success" ? "" : "destructive",
            })
            if (res?.status === "success") {
                window.location.href = "/login"
            }
        })

        // students/forgot-password
    }

    return (
        <div className="flex items-center justify-center  relative  py-24">
            <img src={back1} alt="" className="absolute z-[-1] left-[0px] opacity-35  top-[300px] origin-center" />
            <img src={back1} alt="" className="absolute z-[-1] right-[-150px] opacity-70 top-[-100px] origin-center rotate-180" />

            <div className="w-[95vw] max-w-[500px] lg:w-[550px] bg-[#2A3E34] rounded-3xl ] text-white font-cairo">
                <p className="text-center text-4xl  font-extrabold mt-14">
                    تغيير كلمة المرور
                </p>
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
                </div>{" "}
                <div className="flex flex-col items-center text-right gap-4">
                    <Label className="mt-6 text-right w-[80%]">تأكيد كلمة السر</Label>
                    <Input
                        className="w-[80%] text-black text-right"
                        type="password"
                        onChange={(e) => {
                            setData({ ...data, passwordConfirm: e.target.value })
                        }}
                        placeholder=" تأكيد كلمة السر" 
                    ></Input>
                </div>
                <div className="flex justify-center gap-5 mt-10 mb-6">
                    <Button
                        className="rounded-lg bg-white text-base text-[#466746]  font-bold px-10 hover:bg-[#f6fffa]"
                        disabled={loading}
                        onClick={handleRest}
                    >
                        <Show>
                            <Show.When isTrue={loading} children={<Loader2 className="animate-spin mr-2"></Loader2>}></Show.When>
                        </Show>
                        تغيير كلمة المرور
                    </Button>
                </div>
            </div>
            <br />
        </div>
    )
}

export default ResetPassword

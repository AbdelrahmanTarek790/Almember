import { Label } from "@/components/ui/label"
import contact from "../assets/contact.png"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
export const Contact = () => {
    return (
        <div className="text-center text-lg  lg:text-xl font-extrabold text-[#2A3E34] relative font-cairo mt-14 mb-20">
            <img src={contact} className=" hidden lg:block w-[650px]  2xl:w-[750px] xl:w-[700px]  absolute -z-10 bottom-[-200px] 2xl:bottom-[-250px] right-0  " alt="" />

            <p className=" text-4xl  lg:text-5xl ">تواصل معنا</p>
            <p className="mt-3">سعيًا منا في التوسع لخدمة الطلاب الراغبين في دراسة العلوم الشرعية</p>
            <p className="font-semibold">فإننا في اكاديمية المنبر نرحب  بأي استفسار، شكوى، تعليق، او طلب.</p>

            <div className="flex ml-[2%] justify-center  lg:justify-normal 2xl:justify-around mt-16 font-bold ">
                <div className="w-[95%] lg:w-[550px] lg:h-[700px] rounded-3xl bg-white" style={{ boxShadow: "0px 0px 30px -15px rgba(0,0,0,0.64)" }}>
                    <div className="flex flex-col items-center text-right gap-4  mt-10">
                        <Label className="mt-10 text-right w-[80%] font-bold text-[#2A3E34]">الاسم بالكامل</Label>
                        <Input className="w-[80%] text-black text-right" type="text" placeholder="الاسم بالكامل"></Input>
                    </div>
                    <div className="flex flex-col items-center text-right gap-4">
                        <Label className="mt-10 text-right w-[80%] font-bold text-[#2A3E34]">البريد الإلكتروني</Label>
                        <Input className="w-[80%] text-black text-right" type="email" placeholder="البريد الالكتروني"></Input>
                    </div>
                    <div className="flex flex-col items-center text-right gap-4">
                        <Label className="mt-10 text-right w-[80%] font-bold text-[#2A3E34]">الرسالة</Label>
                        <Textarea className="w-[80%] text-black text-right h-[222px] max-h-[250px]" type="text" placeholder="الرسالة"></Textarea>
                    </div>
                    <div className="flex justify-center gap-5 mt-10 mb-6 lg:mb-0">
                        <Button className="rounded-lg bg-[#466746] text-base text-white  font-bold px-10 hover:bg-[#395346]">إرسال</Button>
                    </div>
                </div>
                <div className="hidden lg:block opacity-0">s</div>
            </div>
        </div>
    )
}

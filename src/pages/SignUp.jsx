import { Label } from "@/components/ui/label"
import back1 from "../assets/back2.png"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { DatePicker } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { postMethod } from "@/utils/ApiMethods"
import { useToast } from "@/components/ui/use-toast"
import { Show } from "@/utils/Show"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Each } from "@/utils/Each"
const dateFormat = "YYYY-MM-DD"
import planetpulse from "planetpulse"
import CountryFlag from "react-country-flag"
export const SignUp = () => {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({
        Fname: "",
        Lname: "",
        email: "",
        password: "",
        passwordConfirm: "",
        phone: {
            countryCode: "",
            number: "",
        },
        country: "",
        birthDate: null,
    })
    console.log(planetpulse.getAllCountries());

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value,
        })
    }

    const handleDateChange = (date, dateString) => {
        setData({
            ...data,
            birthDate: dateString,
        })
    }

    const handleSubmit = () => {
        setLoading(true)
        postMethod("/students/signup", data).then((res) => {
            console.log(res)
            if (res.status === "error") {
                if (res.error?.code === 11000) {
                    toast({
                        title: "البريد الإلكتروني موجود بالفعل",
                        variant: "destructive",
                    })
                    setLoading(false)
                    return
                }
                toast({
                    title: Object.values(res.error.errors)[0].message,
                    variant: "destructive",
                })
                setLoading(false)
                return
            }
            if (res.status === "success") {
                localStorage.setItem("token", res.token)

                toast({
                    title: "تم إنشاء الحساب بنجاح",
                    variant: "",
                })
                setLoading(false)
                window.location.href = "/"
            }
        })
    }

    return (
        <div className="flex items-center justify-center relative py-24">
            <img src={back1} alt="" className="absolute z-[-1] left-[0px] opacity-35 bottom-[0] origin-center" />
            <img src={back1} alt="" className="absolute z-[-1] right-[-150px] opacity-70 top-[-100px] origin-center rotate-180" />

            <div className="w-[90vw] max-w-[550px] lg:w-[550px] bg-[#2A3E34] rounded-3xl text-white font-cairo">
                <p className="text-center text-4xl font-extrabold mt-14">إنشاء حساب</p>

                <div className="flex flex-col items-center text-right gap-4">
                    <Label className="mt-10 text-right w-[80%]">الاسم الأول</Label>
                    <Input
                        className="w-[80%] text-black text-right"
                        type="text"
                        name="Fname"
                        placeholder="الاسم الأول"
                        value={data.Fname}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col items-center text-right gap-4">
                    <Label className="mt-6 text-right w-[80%]">الاسم الأخير</Label>
                    <Input
                        className="w-[80%] text-black text-right"
                        type="text"
                        name="Lname"
                        placeholder="الاسم الأخير"
                        value={data.Lname}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col items-center text-right gap-4">
                    <Label className="mt-6 text-right w-[80%]">البريد الإلكتروني</Label>
                    <Input
                        className="w-[80%] text-black text-right"
                        type="email"
                        name="email"
                        placeholder="البريد الإلكتروني"
                        value={data.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col items-center text-right gap-4">
                    <Label className="mt-6 text-right w-[80%]">كلمة السر</Label>
                    <Input
                        className="w-[80%] text-black text-right"
                        type="password"
                        name="password"
                        placeholder="كلمة السر"
                        value={data.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col items-center text-right gap-4">
                    <Label className="mt-6 text-right w-[80%]">تأكيد كلمة السر</Label>
                    <Input
                        className="w-[80%] text-black text-right"
                        type="password"
                        name="passwordConfirm"
                        placeholder="تأكيد كلمة السر"
                        value={data.passwordConfirm}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center text-right gap-4">
                    <Label className="mt-6 text-right w-[80%]">البلد</Label>
                    <Select
                        value={data.country}
                        onValueChange={(e) => {
                            setData({
                                ...data,
                                country: e,
                                phone: {
                                    ...data.phone,
                                    countryCode: planetpulse.getCountryByName(e).dialling_code,
                                },
                            })
                        }}
                    >
                        <SelectTrigger className="w-[80%] text-black text-right">
                            <SelectValue id="mariage-state" placeholder="البلد" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <Each
                                    of={planetpulse.getAllCountries()}
                                    render={(country, index) => <SelectItem value={country.name}>{country.name}</SelectItem>}
                                ></Each>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {/* <Input
                    planetpulse.getAllCountries()
                        className="w-[80%] text-black text-right"
                        type="text"
                        name="country"
                        placeholder="البلد"
                        value={data.country}
                        onChange={handleChange}
                    /> */}
                </div>

                <div className="flex flex-col items-center text-right gap-4">
                    <Label className="mt-6 text-right w-[80%]">رقم الهاتف</Label>
                    <div className="w-[80%] flex gap-2">
                        <Input
                            className="w-[75%] text-black text-right"
                            type="phone"
                            name="phone.number"
                            placeholder="رقم الهاتف"
                            value={data.phone.number}
                            onChange={(e) => {
                                setData({
                                    ...data,
                                    phone: {
                                        ...data.phone,
                                        number: e.target.value,
                                    },
                                })
                            }}
                        />{" "}
                        <div className="flex items-center  w-[33%] sm:w-[25%] text-black text-right relative">
                            <CountryFlag
                                countryCode={planetpulse.getCountryByName(data.country)?.code}
                                svg
                                className="absolute right-2 z-10"
                                style={{ width: "1.5em", height: "1.5em", marginRight: "5px" }}
                            />
                            <Input
                                className="w-full text-black text-left"
                                type="text"
                                placeholder="كود البلد"
                                disabled
                                value={data.phone.countryCode}
                            />
                        </div>
                        {/* <Input
                            className="w-[25%] text-black text-right"
                            type="text"
                            placeholder="كود البلد"
                            disabled
                            value={data.phone.countryCode}
                            // onChange={(e) => {
                            //     setData({
                            //         ...data,
                            //         phone: {
                            //             ...data.phone,
                            //             countryCode: e.target.value,
                            //         },
                            //     })
                            // }}
                        /> */}
                    </div>
                </div>

                <div className="flex flex-col items-center text-right gap-4">
                    <Label className="mt-6 text-right w-[80%]">تاريخ الميلاد</Label>
                    <DatePicker
                        id="birth-date"
                        className="h-10 w-[80%] px-3 py-2 min-w-[185px]"
                        format={dateFormat}
                        value={data.birthDate ? dayjs(data.birthDate, dateFormat) : null}
                        onChange={handleDateChange}
                    />
                </div>

                <div className="flex justify-center gap-5 mt-10">
                    <Button
                        className="rounded-lg bg-white text-base text-[#466746] font-bold px-10 hover:bg-[#f6fffa]"
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        <Show>
                            <Show.When isTrue={loading} children={<Loader2 className="animate-spin mr-2"></Loader2>}></Show.When>
                        </Show>
                        إنشاء حساب جديد
                    </Button>
                </div>
                <div className="relative mt-12 flex justify-center">
                    <span className="absolute sm:left-[200px] z-10 bg-[#2A3E34] flex justify-center items-center top-[-6px] text-sm text-center w-[150px]">
                        او بأستخدام
                    </span>
                    <div className="h-px bg-gray-400 w-[85%]"></div>
                </div>
                <div className="flex justify-center gap-5 mt-10">
                    <Button className="rounded-lg bg-[#466746] text-base text-white font-bold px-10 hover:bg-[#395346]">
                        {<i className="fa-brands fa-google mr-4"></i>}تسجيل بواسطة جوجل
                    </Button>
                </div>
                <div className="flex justify-center gap-2 mt-8 mb-8">
                    <Link to={"/login"} className="opacity-100">
                        يمكنك تسجيل الدخول
                    </Link>
                    <span className="opacity-65">لديك حساب ؟</span>
                </div>
            </div>
            <br />
        </div>
    )
}

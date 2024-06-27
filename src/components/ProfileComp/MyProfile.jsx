import { useStore } from "@/context/storeContext"
import { Button } from "../ui/button"
import { Pencil } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { DatePicker } from "antd"
import dayjs from "dayjs"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Show } from "@/utils/Show"
import { patchMethod, putMethod } from "@/utils/ApiMethods"
import planetpulse from "planetpulse"
import { Each } from "@/utils/Each"
import CropEasy from "../CropEasy"
import PopupProfile from "../PopupProfile"
const dateFormat = "YYYY-MM-DD"
export const MyProfile = () => {
    const { state, setState } = useStore()
    const [data, setData] = useState(state)
    const [active, setActive] = useState(true)
    const togglePopup = () => {
        setIsOpen(!isOpen)
    }
    useEffect(() => {
        setData(state)
    }, [state])
    const onChange = (date, dateString) => {
        setData({ ...data, birthDate: dateString })
    }
    const submitHandler = () => {
        console.log(data)
        patchMethod("/students/update-me", data, state.token).then((res) => {
            if (res.status === "Success") {
                setActive(!active)
                setState({ ...data, token: state.token, isLoggedIn: true })
            }
            console.log(res)
        })
    }
    return (
        <div className=" flex flex-col items-end px-5 py-8  text-right">
            <p className="text-2xl font-bold text-primary">بيانات الحساب</p>
            <div className={` h-[2px] bg-[#2A3E34] w-[90%] lg:w-[1000px] mt-8`}></div>
            <PopupProfile items={state} handleClose={togglePopup} />
            {/* <img
                src={state.photo ? state.photo : "https://placehold.co/150x150"}
                className="rounded-full h-[150px] w-[150px] mt-8"
            ></img> */}
            <div className="flex  flex-col-reverse items-end gap-3 md:flex-row md:items-center mt-4">
                <Show>
                    <Show.When
                        isTrue={!active}
                        children={
                            <div className="flex gap-4">
                                <Button
                                    className="h-10 w-32 bg-white border border-primary text-primary hover:bg-[#e3eee3]"
                                    onClick={() => {
                                        setData(state)
                                        setActive(!active)
                                    }}
                                >
                                    الغاء
                                </Button>

                                <Button className="h-10 w-32 mr-4 bg-primary text-white" onClick={submitHandler}>
                                    حفظ التغييرات
                                </Button>
                            </div>
                        }
                    ></Show.When>
                    <Show.Else
                        children={
                            <span
                                className="mr-4  text-primary cursor-pointer hover:underline"
                                onClick={() => {
                                    setActive(!active)
                                }}
                            >
                                تعديل بياناتك<Pencil size={17} className="inline ml-1"></Pencil>
                            </span>
                        }
                    ></Show.Else>
                </Show>

                <p className="text-2xl font-bold text-[#2A3E34]">المعلومات الشخصية</p>
            </div>
            <div className="grid grid-cols-2 gap-4  text-right  mt-4">
                <div className="grid gap-2">
                    <Label htmlFor="mid-name">الاسم الاوسط</Label>
                    <Input
                        id="mid-name"
                        placeholder="الاسم الاوسط"
                        className=" text-right"
                        onChange={(e) => {
                            setData({ ...data, Mname: e.target.value })
                        }}
                        disabled={active}
                        defaultValue={data.Mname}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="first-name">الاسم الاول</Label>
                    <Input
                        id="first-name"
                        placeholder="الاسم الاول"
                        className=" text-right"
                        onChange={(e) => {
                            setData({ ...data, Fname: e.target.value })
                        }}
                        disabled={active}
                        defaultValue={data.Fname}
                        required
                    />
                </div>
            </div>
            <div className="grid gap-2  text-right">
                <Label htmlFor="last-name">الاسم الاخير</Label>
                <Input
                    id="last-name"
                    placeholder="الاسم الاخير"
                    className=" text-right"
                    onChange={(e) => {
                        setData({ ...data, Lname: e.target.value })
                    }}
                    disabled={active}
                    defaultValue={data.Lname}
                    required
                />
            </div>
            <div className={` h-[1px] bg-[#2A3E34] w-[90%] lg:w-[1000px] mt-8`}></div>
            <div className="grid grid-cols-2 gap-4  text-right  mt-4">
                <div className="grid gap-2">
                    <Label htmlFor="country">الدولة</Label>
                    <Select
                        disabled={active}
                        value={data.country}
                        onValueChange={(e) => {
                            setData({ ...data, country: e })
                        }}
                    >
                        <SelectTrigger className=" text-black">
                            <SelectValue id="mariage-state" placeholder="البلد" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <Each
                                    of={planetpulse.getAllCountries()}
                                    render={(country, index) => (
                                        <SelectItem defaultValue={data.country} value={country.name}>
                                            {country.name}
                                        </SelectItem>
                                    )}
                                ></Each>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {/* <Input
                        id="country"
                        placeholder="الدولة"
                        className=" text-right"
                        onChange={(e) => {
                            setData({ ...data, country: e.target.value })
                        }}
                        disabled={active}
                        defaultValue={data.country}
                        required
                    /> */}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="natunality">الجنسية</Label>
                    <Input id="natunality" placeholder="الجنسية" className=" text-right" disabled={active} defaultValue={data.city} required />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4  text-right  mt-4">
                <div className="grid gap-2">
                    <Label htmlFor="mariage-state">الحالة الاجتماعية</Label>
                    <Select
                        value={data.isSingle}
                        disabled={active}
                        onValueChange={(e) => {
                            setData({ ...data, isSingle: e })
                        }}
                    >
                        <SelectTrigger className="h-10 w-full px-3 py-2 min-w-[185px]">
                            <SelectValue id="mariage-state" placeholder="الحالة الاجتماعية" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value={true}>اعزب</SelectItem>
                                <SelectItem value={false}>متزوج</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="city">المدينة</Label>
                    <Input
                        id="city"
                        placeholder="المدينة"
                        className=" text-right"
                        onChange={(e) => {
                            setData({ ...data, city: e.target.value })
                        }}
                        disabled={active}
                        defaultValue={data.city}
                        required
                    />
                </div>
            </div>
            <div className="grid gap-2  text-right  mt-4">
                <Label htmlFor="birth-date">تاريخ الميلاد</Label>
                <DatePicker
                    id="birth-date"
                    className="h-10 w-full px-3 py-2 min-w-[185px]"
                    value={dayjs(data.birthDate, dateFormat)}
                    disabled={active}
                    onChange={onChange}
                />
            </div>
            <div className={` h-[1px] bg-[#2A3E34] w-[90%] lg:w-[1000px] mt-8`}></div>
            <p className="text-2xl font-bold text-[#2A3E34] mt-4">معلومات التواصل</p>
            <div className="grid grid-cols-2 gap-4  text-right  mt-4">
                <div className="grid gap-2">
                    <Label htmlFor="countryCode">الرمز الآلي للدولة</Label>
                    <Input
                        id="countryCode"
                        placeholder="الرمز الآلي للدولة"
                        onChange={(e) => {
                            setData({ ...data, phone: { ...data.phone, countryCode: e.target.value } })
                        }}
                        className=" text-right"
                        disabled={active}
                        defaultValue={data.phone.countryCode}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                        id="phone"
                        placeholder="رقم الهاتف"
                        onChange={(e) => {
                            setData({ ...data, phone: { ...data.phone, number: e.target.value } })
                        }}
                        className=" text-right"
                        disabled={active}
                        defaultValue={data.phone.number}
                        required
                    />
                </div>
            </div>
            <div className={` h-[1px] bg-[#2A3E34] w-[90%] lg:w-[1000px] mt-8`}></div>
            <p className="text-2xl font-bold text-[#2A3E34]  mt-4">معلومات التحصيل العلمي والعمل</p>
            <div className="grid grid-cols-2 gap-4  text-right  mt-4">
                <div className="grid gap-2">
                    <Label htmlFor="education">المؤهل الدراسي</Label>
                    <Input
                        id="education"
                        onChange={(e) => {
                            setData({ ...data, educationLevel: e.target.value })
                        }}
                        placeholder="المؤهل الدراسي"
                        className=" text-right"
                        disabled={active}
                        defaultValue={data.educationLevel}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="job">الوظيفة</Label>
                    <Input
                        id="job"
                        placeholder="الوظيفة"
                        onChange={(e) => {
                            setData({ ...data, currentJob: e.target.value })
                        }}
                        className=" text-right"
                        disabled={active}
                        defaultValue={data.currentJob}
                        required
                    />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="lastCertificate" className=" text-right mt-4">
                    آخر شهادة علمية حصلت عليها
                </Label>
                <Input
                    id="lastCertificate"
                    onChange={(e) => {
                        setData({ ...data, lastCertificate: e.target.value })
                    }}
                    placeholder="آخر شهادة علمية حصلت عليها"
                    className=" text-right"
                    disabled={active}
                    defaultValue={data.lastCertificate}
                    required
                />
            </div>
            <br />
            <br />
        </div>
    )
}

import { Subjects } from "@/data"
import { getMethod } from "@/utils/ApiMethods"
import { Each } from "@/utils/Each"
import React, { useEffect } from "react"
import { Button } from "../ui/button"
import axios from "axios"
import { Show } from "@/utils/Show"
import { Loader } from "lucide-react"

const Certificates = () => {
    const [certificates, setCertificates] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    useEffect(() => {
        getMethod("/students/certificates", localStorage.getItem("token")).then((res) => {
            setCertificates(res.data.data)
            setLoading(false)
        })
    }, [])

    return (
        <div className=" flex flex-col items-end  w-full px-5 py-8  text-right">
            <p className="text-2xl font-bold text-primary">شهاداتي</p>
            <div className={` h-[2px] bg-[#2A3E34] w-[90%] lg:w-[95%] mt-8`}></div>
            <div className="flex w-full flex-col items-end gap-3 mt-4">
                <Show>
                    <Show.When
                        isTrue={certificates.length === 0 && !loading}
                        children={
                            <div className="flex w-full items-center justify-center mt-10">
                                <p className="text-lg font-bold ">ليس لديك شهادات حتى الآن</p>
                            </div>
                        }
                    ></Show.When>
                    <Show.When
                        isTrue={loading}
                        children={
                            <div className="flex w-full items-center justify-center mt-10">
                                <Loader size={32} className="animate-spin" />
                            </div>
                        }
                    ></Show.When>
                    <Show.Else
                        children={
                            <Each
                                of={certificates}
                                render={(item, index) => (
                                    <div className="flex flex-col-reverse sm:flex-row w-full items-center justify-around gap-3 mt-10">
                                        <div>
                                            <iframe src={item.pdfURL} alt="" className=" w-[232.5px] h-[165px] " />
                                            <div className="flex justify-center gap-2 mt-2">
                                                <Button
                                                    onClick={() => {
                                                        window.open(item.pdfURL)
                                                    }}
                                                >
                                                    عرض
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={async () => {
                                                        // window.URL.createObjectURL(item.pdfURL)
                                                        const response = await axios.get(item.pdfURL, {
                                                            responseType: "blob", // Specify blob response type for binary data
                                                        })

                                                        const blob = new Blob([response.data], { type: "application/pdf" })
                                                        const href = window.URL.createObjectURL(blob)
                                                        const link = document.createElement("a")
                                                        link.href = href
                                                        link.setAttribute("download", "certificate.pdf")

                                                        link.click()
                                                        window.URL.revokeObjectURL(href)
                                                    }}
                                                >
                                                    تحميل
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold">{item.course.text}</p>
                                            <p className="text-lg">{Subjects[item.course.subject]}</p>
                                            <p className="text-lg">
                                                {item.Date
                                                    ? `${new Date(item.Date).getFullYear()} / ${new Date(item.Date).getMonth() + 1}  / ${new Date(
                                                          item.Date
                                                      ).getDate()}`
                                                    : ""}
                                            </p>{" "}
                                        </div>
                                    </div>
                                )}
                            ></Each>
                        }
                    ></Show.Else>
                </Show>
            </div>
        </div>
    )
}

export default Certificates

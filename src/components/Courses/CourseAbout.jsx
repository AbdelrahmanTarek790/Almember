import { Subjects } from "@/data"
import { Each } from "@/utils/Each"
import { Show } from "@/utils/Show"
import { Button } from "../ui/button"

export const CourseAbout = ({ items }) => {
    console.log(items)
    return (
        <div className=" w-full h-full font-cairo mt-4 lg:mt-2">
            <h1 className=" mt-2 text-2xl font-bold text-primary pr-3">معلومات عن المنهج</h1>
            <div className="w-full h-[2px] mt-3 bg-[#385044] "></div>
            <div className="mr-8 text-[#2A3E34] mt-3 text-6xl font-deco">{Subjects[items.subject]}</div>
            <div className="mr-8 text-[#2A3E34] mt-3 text-lg">{items.description}</div>
            <div className="w-full h-[1px] mt-3 bg-[#e4e4e4] "></div>
            {/* teachers */}
            <Show>
                <Show.When
                    isTrue={items.teachers.length > 0}
                    children={
                        <Each
                            of={items.teachers}
                            render={(item, index) => (
                                <div className="text-2xl text-center my-8 flex justify-end gap-2  items-center">
                                    <p className=" text-2xl font-bold ">{item.Fname + " " + item.Mname + " " + item.Lname}</p>
                                    <p> : يُدرَس بواسطة</p>
                                    <img
                                        src={item?.photo ? item.photo : "https://placehold.co/150x150"}
                                        alt=""
                                        className=" w-[100px] h-[100px] rounded-full"
                                    />
                                </div>
                            )}
                        ></Each>
                    }
                ></Show.When>
                <Show.Else children={<div className="text-2xl text-center my-8 ">لا يوجد مدرسين مسؤولين عن هذا المقرر</div>}></Show.Else>
            </Show>

            {/* course book */}
            <div className="w-full h-[1px] mt-3 bg-[#e4e4e4] "></div>

            <Show>
                <Show.When
                    isTrue={items.book ? true : false}
                    children={
                        <div className="flex flex-col items-center">
                            <p className="text-right font-extrabold">الكتاب الخاص بالمقرر</p>
                            <p className="text-right">{"الكتاب:" + (items.book.title ? items.book.title : "لا يوجد")}</p>
                            <img
                                className="w-[150px]"
                                src={items.book.imageURL? items.book.imageURL:"https://s3-alpha-sig.figma.com/img/73cf/daf5/7ad22262f394506e4f619c48e404d0ed?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HgrQu8cR2qdRHVAIV~UD--MczbbeAXQbMRaiA8FyzGb5k-sE6ClFO~0i0RZU0EzgA3YETw9S~dWbKp-BVlfNcXt883HgEYLqEi6rL5egfXsR0vK3sLkSOwU13S847gvSsgEhvKz8sskgecO3cR3UyriPi7iwbv-182A2SD06wEB20X4uvSIjGkMQ30z9yx0r9zPUWNbj2rDevm9Axydy6Gor9mr~GCeUk0CABbfJ~KwmeMjD-dzX416ZjovnY8oBzsMr~kWemIKMTCxYQncKNjaCRZNbD7C6kEJbjPQbylIePNiA6eXgyKyD~2CHYPWBvb3~OVGJQ8dRssoAK5LiaQ__"}
                            ></img>

                            <Button
                                onClick={() => {
                                    window.location.href = items.book.downloadLink
                                }}
                                className="rounded-full bg-primary  text-base text-white font-cairo mt-2  font-bold px-10 hover:bg-[#cde2d7]  mb-4"
                            >
                                تحميل الكتاب
                            </Button>
                            <Button
                                onClick={() => {
                                    window.location.href = items.book.readLink
                                }}
                                className="border border-[#2A3E34] rounded-full bg-white text-base  text-primary font-cairo   font-bold px-10 hover:bg-[#cde2d7]  mb-4"
                            >
                                عرض الكتاب
                            </Button>
                        </div>
                    }
                ></Show.When>
                <Show.Else children={<div className="text-2xl text-center my-8 ">لا يوجد كتب مسؤولة عن هذا المقرر</div>}></Show.Else>
            </Show>
            <div className="w-full h-[1px] mt-3 bg-[#e4e4e4] "></div>
            <p className="text-right font-extrabold">عن المنهج</p>
            <p className="text-right">
                يُقدم هذا المنهج شرحًا شاملاً لعلم التفسير، ذلك العلم الجليل الذي يُعنى بفهم معاني القرآن الكريم وتفسيره. يُقدم هذا الفهم من خلال
                محاضرات تفاعلية تُغطي مختلف جوانب هذا العلم، بدءًا من تعريفه ونشأته، مرورًا بأهم كتبه وطرقه، وصولًا إلى تفسير سورة الفاتحة وآية
                الكرسي.
            </p>

            <p className="text-right font-extrabold mt-10">ما الذي يميز هذا المنهج؟</p>
            <p>التفاعلية: يتيح المنهج للطلاب فرصة المشاركة والتفاعل من خلال منتديات خاصة لمناقشة المواضيع وطرح الأسئلة.</p>
            <p>الشمولية: يُقدم المنهج شرحًا شاملًا لجميع جوانب علم التفسير، مما يجعله مناسبًا لطلاب العلم الشرعي والمهتمين بدراسة القرآن الكريم.</p>
            <p>الوضوح: يتم شرح جميع المواضيع بطريقة واضحة ومبسطة، مما يجعله سهل الفهم للجميع.</p>
            <p>التنوع: يتم تقديم محتوى المنهج بطرق متنوعة تشمل الفيديو والصوت والملفات المكتوبة، مما يُلبي احتياجات مختلف الطلاب.</p>

            <p className="text-right font-extrabold  mt-10">ما الذي ستتعلمه من هذا المنهج؟</p>
            <p>ستتمكن من فهم معاني القرآن الكريم وفقه مقاصده.</p>
            <p>ستتعلم كيفية تفسير القرآن الكريم بالطريقة الصحيحة.</p>
            <p>ستتعرف على أهم كتب التفسير وطرقه.</p>
            <p>ستتمكن من تفسير سورة الفاتحة وآية الكرسي.</p>
        </div>
    )
}

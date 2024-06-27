import Certificates from "@/components/ProfileComp/Certificates"
import { MyProfile } from "@/components/ProfileComp/MyProfile"
import { Sidebar } from "@/components/SideBar"
import { Show } from "@/utils/Show"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export const Profile = () => {
    const location = useLocation()
    const [active, setActive] = useState(location.pathname)
    useEffect(() => {
        setActive(location.pathname)
        console.log(location.pathname)
    }, [location])

    return (
        <div className="flex justify-end flex-col-reverse lg:flex-row h-full">
            <Show>
                <Show.When isTrue={location.pathname === "/profile"} children={<MyProfile></MyProfile>}></Show.When>
                <Show.When isTrue={location.pathname === "/profile/certifications"} children={<Certificates>Hey</Certificates>}></Show.When>
            </Show>

            <Sidebar></Sidebar>
        </div>
    )
}

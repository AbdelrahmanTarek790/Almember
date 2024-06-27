import { useState } from "react"
import CropEasy from "./CropEasy"

const PopupProfile = ({items}) => {
    const [file, setFile] = useState(null)
    const [photoURL, setPhotoURL] = useState(items)
    const [openCrop, setOpenCrop] = useState(false)
    console.log(items);
    const handleChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFile(file)
            setPhotoURL(URL.createObjectURL(file))
            setOpenCrop(true)
        }
    }

    return (
        <div className="mt-4">
            <div className="popup-box">
                <div className="box">
                    {!openCrop && (
                        <div className="relative">
                            <label className="-label   text-transparent  transition-all hover:text-white" htmlFor="profilePhoto">
                                <span className="spanava glyphicon glyphicon-camera"></span>
                                <i className=" spanava fa-solid fa-camera mr-[40px] mt-10 text-[50px] "></i>
                            </label>
                            <label htmlFor="profilePhoto">
                                <input accept="image/*" id="profilePhoto" type="file" style={{ display: "none" }} onChange={handleChange} />
                                <img
                                    id="output"
                                    className="rounded-full"
                                    alt={items.name}
                                    // className=""
                                    width={150}
                                    src={items.photo ? items.photo : "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256"}
                                />
                            </label>
                        </div>
                    )}
                    {openCrop && <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />}
                </div>
            </div>
        </div>
    )
}

export default PopupProfile

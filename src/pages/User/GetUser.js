import React, { useState, useContext } from 'react'
import { firestore, storage } from '../../config/firebase';
import { doc, serverTimestamp, setDoc, } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const initialState = {
    fullName: "",
    job: "",
    phone: "",
    address: "",
}

export default function GetUser() {

    const { users } = useContext(AuthContext)
    const user = users.user
    // console.log(user)

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const [file, setFile] = useState({})
    const [userImg, setUserImg] = useState("")

    const handleChange = e => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }


    const handleAddProfile = async (e) => {
        e.preventDefault()

        if (file.name) {
            setFile(file)
        }

        const fileExt = file.name.split('.').pop();
        let randomId = window.getRandomId();

        const imageRef = ref(storage, `userPrfilePic/${randomId}.${fileExt}`)
        const uploadTask = uploadBytesResumable(imageRef, file);
        uploadTask.on('state_changed',
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUserImg(downloadURL);
                });
            },
            (err) => {
                console.error(err)
            }
        );

        let { fullName, job, phone, address } = state
        fullName = fullName.trim()
        job = job.trim()
        phone = phone.trim()
        address = address.trim()
        if (fullName.length < 3) {
            return window.notify("Name length should be at least 3 characters", "error")
        }
        if (job.length < 3) {
            return window.notify("Please enter job", "error")
        }
        if (phone.length !== 11) {
            return window.notify("Please enter correct phone number", "error")
        }
        if (address.length < 10) {
            return window.notify("Please enter address", "error")
        }

        setIsProcessing(true)
        try {
            await setDoc(doc(firestore, "users", user.uid), {
                fullName: fullName,
                job: job,
                phone: phone,
                address: address,
                uid: user.uid,
                image: userImg,
                date: serverTimestamp(),
            });
            // console.log("user documents created at firestore")
            window.notify("User profile created", "success")
            setState(initialState)
            setIsProcessing(false)
        }
        catch (err) {
            console.error(err)
        }

    }


    return (
        <div className="auth">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card p-2 p-md-3 p-lg-4">
                            <div className="row">
                                <div className="col">
                                    <h1 className='text-center text-white'>User Profile</h1>
                                </div>
                            </div>
                            <form onSubmit={handleAddProfile}>
                                <div className="row mb-4">
                                    <div className="col">
                                        <label className='text-light fs-5' htmlFor="fullName">Full Name</label>
                                        <input type="text" className='w-100 emailStyle d-block' placeholder='Enter Your Full Name' name='fullName' value={state.fullName} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <label className='text-light fs-5' htmlFor="Job">Job</label>
                                        <input type="text" className='w-100 emailStyle d-block' placeholder='Enter Your Experties' name='job' value={state.job} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <label className='text-light fs-5' htmlFor="phone">Phone</label>
                                        <input type="number" className='w-100 emailStyle d-block' placeholder='Enter Your Phone' name='phone' value={state.phone} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <label className='text-light fs-5' htmlFor="address">Address</label>
                                        <input type="text" className='w-100 emailStyle' placeholder='Enter your Address' name='address' value={state.address} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <label htmlFor="address" className='text-light fs-5'>Profile Photo</label>
                                        <input type="file" accept='image/*' className='w-100 shadow-none outline-none form-control w-100 ' name='address' onChange={e => { setFile(e.target.files[0]) }} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <button className='btn btn-danger text-light w-100 my-4' disabled={isProcessing}>
                                            {
                                                !isProcessing
                                                    ? "Add Profile"
                                                    : <div className='spinner-grow spinner-grow-sm'></div>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



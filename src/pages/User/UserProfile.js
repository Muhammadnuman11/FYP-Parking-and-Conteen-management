import React, { useContext, useState, useEffect } from 'react'
import { collection, doc, getDocs, serverTimestamp, setDoc, } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Link } from 'react-router-dom'
import { firestore, storage } from '../../config/firebase'
import UserImg from "../asset/user.jpg"
import { AuthContext } from "../Context/AuthContext"
import { AiFillCamera } from 'react-icons/ai'

export default function UserProfile() {

    const { users } = useContext(AuthContext)
    const userAuth = users.user

    const [getUser, setGetUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [imgLoading, setImgLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false)
    const [user, setUser] = useState({})
    // const [userProfile, setUserProfile] = useState("")

    const handleChange = e => {
        setUser(s => ({ ...s, [e.target.name]: e.target.value }))
    }


    const fetchUser = async () => {
        let array = []
        try {
            const querySnapshot = await getDocs(collection(firestore, "users"));
            querySnapshot.forEach((doc) => {
                let data = doc.data()
                array.push(data)
            });
            const userArr = array.filter(array => {
                return array.uid === userAuth.uid
            })
            setGetUser(userArr)
        }
        catch (err) {
            console.error(err)
        }
        setIsLoading(false)
        setImgLoading(false)
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        setIsProcessing(true)
        setIsLoading(true)
        let updatedData = { ...user };
        updatedData.modifiedDate = serverTimestamp();
        updatedData.userEmail = userAuth.email;
        try {
            await setDoc(doc(firestore, "users", userAuth.uid), updatedData, { merge: true });
            let newDocuments = getUser.map((doc) => {
                if (doc.id === user.id)
                    return user
                return doc
            })
            window.notify("User profile successfully updated", "success")
            setGetUser(newDocuments)
        }
        catch (err) {
            console.error(err)
            window.notify("Something went wrong, Profile isn't updated", "error")
        }
        setIsProcessing(false)
    }

    const handleImgChange = (e) => {
        setIsLoading(true)
        setImgLoading(true)
        let file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        // let randomId = window.getRandomId();
        // console.log(randomId + "." + fileExt)
        // console.log(userAuth.uid + "." + fileExt)
        let imgName = `userPrfilePic/${userAuth.uid}.${fileExt}`
        const imageRef = ref(storage, imgName)
        const uploadTask = uploadBytesResumable(imageRef, file);
        uploadTask.on('state_changed',
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    let userImg = downloadURL;
                    let userImgName = userAuth.uid;
                    setDoc(doc(firestore, "usersProfile", userAuth.uid), { userImg, userImgName });
                    setDoc(doc(firestore, "users", userAuth.uid), { userImg }, { merge: true });
                });
            },
            (err) => {
                console.error(err)
            }
        );
    }

    // const imgRead = async () => {
    //     try {
    //         const q = query(collection(firestore, "usersProfile"), where("userImgName", "==", userAuth.uid));
    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach((doc) => {
    //             // doc.data() is never undefined for query doc snapshots
    //             // console.log(doc.id, " => ", doc.data());
    //             let data = doc.data().userImg
    //             setUserProfile(data)

    //         });
    //     }
    //     catch (err) {
    //         console.error(err)
    //     }
    //     setImgLoading(false)
    // }

    useEffect(() => {
        fetchUser()
    })


    return (
        <>
            {
                !isLoading
                    ?
                    getUser.map((userData, i) => {
                        return <div key={i}>
                            <div className='profile py-5'>
                                <div className="container">
                                    <div className="row">
                                        <div className="col bg-light rounded mb-4">
                                            <nav className="navbar navbar-expand-lg bg-light">
                                                <div className="container-fluid">
                                                    <Link to="/" className="navbar-brand">User Profile</Link>
                                                    <div className="navbar-collapse">
                                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                                            <li className="nav-item">
                                                                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-between">
                                        <div className="col-12 col-md-5 col-lg-3 bg-light text-center rounded d-flex flex-column align-items-center py-2">
                                            {
                                                !userData.userImg
                                                    ?
                                                    <div className='UserImg'>
                                                        <img src={UserImg} alt="UserPic" />
                                                        <div className="image-upload">
                                                            {
                                                                !imgLoading ?
                                                                    <>
                                                                        <label htmlFor="file-input" className='fs-3'
                                                                            data-toggle="modal" data-target="#profilePic">
                                                                            <AiFillCamera />
                                                                        </label>
                                                                        <input id="file-input" type="file"
                                                                            accept='image/*'
                                                                            className='d-none'
                                                                            onChange={handleImgChange}
                                                                        />
                                                                    </>
                                                                    :
                                                                    <div className='spinner-border spinner-border-sm text-primary' ></div>
                                                            }
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className='UserImg'>
                                                        <img src={userData.userImg} alt="UserPic" />

                                                        <div className="image-upload">
                                                            {
                                                                !imgLoading ?
                                                                    <>
                                                                        <label htmlFor="file-input" className='fs-3'
                                                                            data-toggle="modal" data-target="#profilePic">
                                                                            <AiFillCamera />
                                                                        </label>
                                                                        <input id="file-input" type="file"
                                                                            accept='image/*'
                                                                            className='d-none'
                                                                            onChange={handleImgChange}
                                                                        />
                                                                    </>
                                                                    :
                                                                    <div className='spinner-border spinner-border-sm text-primary' ></div>
                                                            }
                                                        </div>
                                                    </div>

                                            }

                                            <div className='mb-3'>
                                                <h1 className='m-0'>{userData.fullName}</h1>
                                            </div>
                                            <div>
                                                <p className='text-secondary mb-2'>{userData.job}</p>
                                                <p className='text-secondary mb-2'>{userAuth.email}</p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-8 bg-light rounded py-4 px-2 px-md-5">
                                            <div className='d-flex my-4'>
                                                <div className='fw-bold w-25'>Full Name</div>
                                                <div>{userData.fullName}</div>
                                            </div>
                                            <hr />
                                            <div className='d-flex my-4'>
                                                <div className='fw-bold w-25'>Job</div>
                                                <div>{userData.job}</div>
                                            </div>
                                            <hr />
                                            <div className='d-flex my-4'>
                                                <div className='fw-bold w-25'>Email</div>
                                                <div>{userAuth.email}</div>
                                            </div>
                                            <hr />
                                            <div className='d-flex my-4'>
                                                <div className='fw-bold w-25'>Phone</div>
                                                <div>{userData.phone}</div>
                                            </div>
                                            <hr />
                                            <div className='d-flex my-4'>
                                                <div className='fw-bold w-25'>Address</div>
                                                <div>{userData.address}</div>
                                            </div>
                                            <hr />

                                            <div className='d-flex justify-content-end mt-4'>
                                                <button className='btn' data-bs-toggle="modal" data-bs-target="#editProfile">Edit Profile</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Model */}
                            <div className="modal fade" id="editProfile">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">User profile</h1>
                                        </div>
                                        <div className="modal-body">
                                            {/* Body */}
                                            <div className="container">
                                                <div className="row mb-4">
                                                    <div className="col">
                                                        <label htmlFor="fullName">Full Name</label>
                                                        <input type="text" className='w-100 shadow-none outline-none form-control  d-block' placeholder='Enter Your Full Name' name='fullName' onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col">
                                                        <label className='' htmlFor="Job">Job</label>
                                                        <input type="text" className='w-100 shadow-none outline-none form-control  d-block' placeholder='Enter Your Experties' name='job' onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col">
                                                        <label htmlFor="phone">Phone</label>
                                                        <input type="number" className='w-100 shadow-none outline-none form-control d-block' placeholder='Enter Your Phone' name='phone' onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col">
                                                        <label htmlFor="address">Address</label>
                                                        <input type="text" className='w-100 shadow-none outline-none form-control ' placeholder='Enter your Address' name='address' onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col d-flex justify-content-between">
                                                        <button type="button" className="btn btn-secondary my-4" data-bs-dismiss="modal">Close</button>
                                                        <button className='btn btn-danger text-light my-4' data-bs-dismiss="modal" disabled={isProcessing} onClick={handleUpdateProfile}>
                                                            {
                                                                !isProcessing
                                                                    ? "Update Profile"
                                                                    : <div className='spinner-grow spinner-grow-sm'></div>
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                    :
                    <div className="profile d-flex justify-content-center align-items-center">
                        <div className='spinner-border text-primary' ></div>
                    </div>
            }
        </>
    )
}

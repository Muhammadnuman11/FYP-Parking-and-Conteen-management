import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { firestore } from '../../config/firebase';
import UserImg from "../asset/user.jpg"

export default function Users() {

  const [isLoading, setIsLoading] = useState(true);
  const [getData, setGetData] = useState([])

  const handleGetData = async () => {
    let array = []
    const querySnapshot = await getDocs(collection(firestore, "users"));
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      array.push(data)
    });
    // console.log(array)
    setGetData(array)
    setIsLoading(false)
  }

  useEffect(() => {
    handleGetData()
  })

  return (
    <>
      <div className='users py-5 px-3 px-md-0'>
        <div className="container">
          <div className="row">
            <div className="col bg-light rounded mb-4">
              <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                  <Link to="/" className="navbar-brand">Users Profiles</Link>
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
          <div className="row d-flex justify-content-evenly">
            {
              !isLoading
                ?
                getData.map((users, i) => {
                  return <div className="col-12 col-md-4 bg-light rounded d-flex flex-column align-items-center m-3 text-center" key={i}>
                    {
                      !users.userImg
                        ?
                        <div className='usersImg'>
                          <img src={UserImg} alt="UserPic" />
                        </div>
                        :
                        <div className='usersImg'>
                          <img src={users.userImg} alt="UserPic" />
                        </div>
                    }




                    <div className='mb-3'>
                      <h4 className='m-0'>{users.fullName}</h4>
                    </div>
                    <div>
                      <p className='text-secondary mb-2'>
                        <span className='text-dark fw-bold'>Job: </span>
                        {users.job}
                      </p>
                      <p className='text-secondary mb-2'>
                        <span className='text-dark fw-bold'>Email: </span>
                        {users.userEmail}
                      </p>
                      {/* <p className='text-secondary mb-2'>
                        <span className='text-dark fw-bold'>Time: </span>
                        {users.modifiedDate}
                      </p> */}
                      <span className='text-dark fw-bold'>Uid: </span>
                      <p className='text-secondary mb-2'>
                        {users.uid}
                      </p>
                      <p className='text-secondary mb-2'>
                        <span className='text-dark fw-bold'>Phone: </span>
                        {users.phone}
                      </p>
                      <span className='text-dark fw-bold'>Address: </span>
                      <p className='text-secondary mb-2'>
                        {users.address}
                      </p>
                    </div>
                  </div>
                })
                :
                <div className="profile d-flex justify-content-center align-items-center">
                  <div className='spinner-border text-primary' ></div>
                </div>
            }
          </div>
        </div>
      </div>

    </>
  )
}

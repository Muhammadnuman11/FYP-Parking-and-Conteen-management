import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'


export default function TopNavbar() {

    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        setInterval(() => {
            setCurrentTime(dayjs().format("dddd, MMMM D YYYY, hh:mm:ss A"))
        }, 1000)
    }, [])

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col bg-info text-center py-2 text-white fs-5">
                        {currentTime}
                    </div>
                </div>
            </div>
        </>
    )
}

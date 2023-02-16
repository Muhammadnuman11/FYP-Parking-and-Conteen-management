import React from 'react'

export default function Footer() {

    const year = new Date().getFullYear()

    return (
        <footer className='py-3 bg-info'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="mb-0 text-white text-center">&copy; {year}. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

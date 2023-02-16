import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { FiSettings } from "react-icons/fi"

export default function Home() {
    return (
        <>
            {/* Hero section */}
            <Carousel fade interval={5000}>
                <Carousel.Item>
                    <div className="img">
                        <img
                            className="d-block w-100 h-100"
                            src="https://media.istockphoto.com/id/1371333667/photo/cars-for-sale-stock-lot-row.jpg?b=1&s=170667a&w=0&k=20&c=pm6p9WyxhVfNiTWnE8nE0GlJ4WnZ9Bt4lXUVZCWkq2o="
                            alt="Car Parking"
                        />
                    </div>
                    <Carousel.Caption>
                        <h3 className='text-info'>CAR PARKING SYSTEM</h3>
                        <p>One stop solution for paring search and parking booking</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="img">
                        <img
                            className="d-block w-100 h-100"
                            src="https://media.istockphoto.com/id/481197411/photo/beautiful-hotel-dining-room.jpg?s=612x612&w=0&k=20&c=f_b_Qq0A5SETlqI9kEf9zppZr3W35UwY1ZLYAoTuIDI="
                            alt="Canteen"
                        />
                    </div>

                    <Carousel.Caption>
                        <h3 className='text-info'>CANTEEN MANGEMENT SYSTEM</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* Car Parking */}
            <div className="container py-5 parking">
                <div className="row">
                    <div className="col text-center">
                        <h2>Car Parking System</h2>
                        <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eveniet incidunt ab facilis obcaecati eos ea! Voluptates natus tenetur provident at nesciunt amet vero sapiente quidem, magni autem harum quibusdam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eveniet incidunt ab facilis obcaecati eos ea! Voluptates natus tenetur.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4 text-center">
                        <div className="card border-0 rounded-0">
                            <div className="icons text-info">
                                <FiSettings />
                            </div>
                            <h4>Car Parking</h4>
                            <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quam beatae aperiam quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, itaque?</p>
                            <button className='btn btn-info'>Learn More</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 text-center d-flex">
                        <div className="card border-0 rounded-0">
                            <div className="icons text-info">
                                <FiSettings />
                            </div>
                            <h4>Car Parking</h4>
                            <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quam beatae aperiam quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, itaque?</p>
                            <button className='btn btn-info'>Learn More</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 text-center">
                        <div className="card border-0 rounded-0">
                            <div className="icons text-info">
                                <FiSettings />
                            </div>
                            <h4>Car Parking</h4>
                            <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quam beatae aperiam quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, itaque?</p>
                            <button className='btn btn-info'>Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Canteen */}
            <div className="container py-5 parking">
                <div className="row">
                    <div className="col text-center">
                        <h2>Canteen Management System</h2>
                        <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eveniet incidunt ab facilis obcaecati eos ea! Voluptates natus tenetur provident at nesciunt amet vero sapiente quidem, magni autem harum quibusdam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eveniet incidunt ab facilis obcaecati eos ea! Voluptates natus tenetur.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4 text-center">
                        <div className="card border-0 rounded-0">
                            <div className="icons text-info">
                                <FiSettings />
                            </div>
                            <h4>Canteen</h4>
                            <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quam beatae aperiam quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, itaque?</p>
                            <button className='btn btn-info'>Learn More</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 text-center d-flex">
                        <div className="card border-0 rounded-0">
                            <div className="icons text-info">
                                <FiSettings />
                            </div>
                            <h4>Canteen</h4>
                            <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quam beatae aperiam quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, itaque?</p>
                            <button className='btn btn-info'>Learn More</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 text-center">
                        <div className="card border-0 rounded-0">
                            <div className="icons text-info">
                                <FiSettings />
                            </div>
                            <h4>Canteen</h4>
                            <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quam beatae aperiam quaerat! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, itaque?</p>
                            <button className='btn btn-info'>Learn More</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

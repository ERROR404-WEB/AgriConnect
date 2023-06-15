import React from 'react'
import './Dashboard.css'
export default function Rooms() {
    return (
        <div>
            <div className="rooms">
                <div className="room-heading">
                    <h6><b>Rooms:</b></h6>
                    <i className="fa-solid fa-pen-to-square edit-icon"></i>
                </div>

                <div className="rooms-container">
                    <div className="room">
                        <h5>Crop</h5>
                        <p>20sq Feet</p>
                        <button className="btn btn-primary btn-sm">View</button>
                    </div>
                    <div className="room">
                        <h5>Crop</h5>
                        <p>20sq Feet</p>
                        <button className="btn btn-primary btn-sm">View</button>
                    </div>
                    <div className="room">
                        <h5>Crop</h5>
                        <p>20sq Feet</p>
                        <button className="btn btn-primary btn-sm">View</button>
                    </div>
                    <div className="room">
                        <h5>Crop</h5>
                        <p>20sq Feet</p>
                        <button className="btn btn-primary  btn-sm">View</button>
                    </div>
                    <div className="room">
                        <h5>Crop</h5>
                        <p>20sq Feet</p>
                        <button className="btn btn-primary btn-sm">View</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

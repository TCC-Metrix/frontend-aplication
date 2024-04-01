import React, { ReactNode } from 'react'
import './Popup.css'

interface PopupProps {
    isActive: boolean;

}

const Popup: React.FC<PopupProps> = ({isActive}) => {


    return (
        <div className={`popup-overlay-container ${isActive ? 'overlay-active' : 'overlay-inative'}`}>
            <div className="popup-container">
                
            </div>
        </div>
    )
}

export default Popup
import React from 'react'
import Button from '../button/button.component';
import { useNavigate } from 'react-router-dom';
import './banner.style.scss';

function Banner() {
    const navigate = useNavigate();

    const navigateTo = (loc) => {
        navigate(loc);
    }

    return (
        <div className="banner-container">
            <div className="overlay">
                <h1>Your very own electronics store!</h1>

                <h2>Get a variety of gadgets ranging from <span onClick={() => navigateTo('/shop/mobiles-&-tablets')}>mobiles</span>, <span onClick={() => navigateTo('/shop/laptops')}>laptops</span> and <span onClick={() => navigateTo('/shop')}>more</span>...</h2>

                <Button 
                    buttonType='blue'
                    buttonText='Shop Now' 
                    onClick={() => navigateTo('/shop')}
                />
            </div>
        </div>
    )
}

export default Banner;

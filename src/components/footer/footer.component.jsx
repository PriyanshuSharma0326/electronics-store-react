import React from 'react';
import './footer.style.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGithub, faInstagram, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link, useLocation } from 'react-router-dom';

function Footer() {
    const location = useLocation();

    const isShopRoute = location.pathname.includes('shop');
    
    return (
        <div className='footer'>
            <div className="footer-useful-links">
                <h1 className="section-title">Useful Links</h1>
                <ul className="links-container">
                    <li>
                        <Link 
                            to='/products' 
                            className='link' 
                        >
                        Shop Products
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to='/shop' 
                            className='link' 
                        >
                        Explore categories
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to='/account' 
                            className='link' 
                        >
                        Your Account
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to='/cart' 
                            className='link' 
                        >
                        Your Cart
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to={isShopRoute ? 'mobiles-&-tablets' : 'shop/mobiles-&-tablets'} 
                            className='link' 
                        >
                        Mobiles & Tablets
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to={isShopRoute ? 'televisions' : 'shop/televisions'} 
                            className='link' 
                        >
                        Televisions
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to={isShopRoute ? 'laptops' : 'shop/laptops'} 
                            className='link' 
                        >
                        Laptops
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to={isShopRoute ? 'accessories' : '/shop/accessories'} 
                            className='link' 
                        >
                        Accessories
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="social-links-container">
                <a href="https://www.facebook.com/xtechilad" className="social-link fa-facebook" target='_blank' rel='noreferrer'>
                    <FontAwesomeIcon className='fa-social' icon={faFacebookF} />
                </a>

                <a href="https://www.twitter.com/xtechilad" className="social-link fa-twitter" target='_blank' rel='noreferrer'>
                    <FontAwesomeIcon className='fa-social' icon={faXTwitter} />
                </a>

                <a href="https://www.instagram.com/xtechilad" className="social-link fa-instagram" target='_blank' rel='noreferrer'>
                    <FontAwesomeIcon className='fa-social' icon={faInstagram} />
                </a>

                <a href="https://www.github.com/priyanshusharma0326" className="social-link fa-github" target='_blank' rel='noreferrer'>
                    <FontAwesomeIcon className='fa-social' icon={faGithub} />
                </a>

                <a href="https://www.linkedin.com/in/priyanshusharma0326" className="social-link fa-linkedin" target='_blank' rel='noreferrer'>
                    <FontAwesomeIcon className='fa-social' icon={faLinkedinIn} />
                </a>
            </div>

            <p className="footer-credits">
                ©Priyanshu Sharma 2023
            </p>
        </div>
    );
}

export default Footer;

import React from 'react';
import './footer.style.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGithub, faInstagram, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <div className='footer'>
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

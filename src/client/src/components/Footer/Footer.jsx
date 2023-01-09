import React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'assets/svg/logo.svg';
import './Footer.css';

function Footer() {
  return (

    <div className="footer-container">

      {/* Subscription */}
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join our newsletter to receive our best articles
        </p>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
        <div className="input-area">
          <form>
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Your Email"
            />
            <a href="sign-in" className=" btn-outline">Subscribe</a>
          </form>
        </div>

      </section>
      {/* End Subscription */}

      {/* Footer links */}
      <div className="footer-link-wrapper">
        <div className="footer-link-items">
          <h2>Discover</h2>
          <Link to="/">Homepage</Link>
          <Link to="/trending">Treding</Link>
        </div>
        <div className="footer-link-items">
          <h2>Membership</h2>
          <Link to="/premium">Become Premium Member</Link>
        </div>
        <div className="footer-link-items">
          <h2>Social Media</h2>
          <Link to="/">Instagram</Link>
          <Link to="/">Facebook</Link>
          <Link to="/">Youtube</Link>
          <Link to="/">Twitter</Link>
          <Link to="/">LinkedIn</Link>
        </div>
      </div>
      {/* End Footer links */}

      {/* Social media info */}
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              <img
                alt="BytesGo"
                src={Logo}
                style={{
                  width: 20,
                }}
              />
              <span className="logo">BytesGo</span>
            </Link>
          </div>
          <small className="website-rights">BytesGo © 2022</small>
          <div className="social-icons">
            <Link
              className="social-icon-link"
              to="/"
              target="_blank"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </Link>
            <Link
              className="social-icon-link"
              to="/"
              target="_blank"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </Link>
            <Link
              className="social-icon-link"
              to="/"
              target="_blank"
              aria-label="Youtube"
            >
              <i className="fab fa-youtube" />
            </Link>
            <Link
              className="social-icon-link"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter" />
            </Link>
            <Link
              className="social-icon-link"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </section>
      {/* End Social media info */}
    </div>
  );
}

export default Footer;

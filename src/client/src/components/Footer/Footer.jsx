import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div id="mainFooterXL" className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-3 main-footer-container">
            <ul>
              <li>
                <img className="footer-logo" src="/Style Library/img/signature-gray.png" alt="Cegedim" />
                <p>
                  137 rue dAguesseau
                  <br />
                  92100 Boulogne-Billancourt
                  <br />
                  France
                </p>
                <p>
                  <img className="misc-img" src="https://api.thegreenwebfoundation.org/greencheckimage/cegedim.com?nocache=true" alt="This website is hosted Green - checked by thegreenwebfoundation.org" />
                </p>
              </li>

            </ul>
          </div>
          <div className="col-md-3 col-sm-3 main-footer-container">
            <ul className="my-footer-links">
              <li className="title">Solutions</li>
              <li>
                <a href="https://www.cegedim.com/solutions/Pages/default.aspx?SA=MP&amp;SA=ES">
                  Healthcare sector
                </a>
              </li>
              <li>
                <a href="https://www.cegedim.com/solutions/Pages/insurance-mutual.aspx?SA=AS">
                  Insurance
                </a>
              </li>
              <li>
                <a href="https://www.cegedim.com/finance/profile/Pages/profile.aspx?SA=DE">
                  Digitization sector
                </a>
              </li>
              <li>
                <a href="https://www.cegedim.com/solutions/Pages/default.aspx?SA=RHP">
                  HR sector
                </a>
              </li>
              <li>
                <a href="https://www.cegedim.com/solutions/Pages/default.aspx?SA=TS">
                  For any sectors
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-3 main-footer-container buttons">
            <a href="https://www.cegedim.com/contact/Pages/contacts.aspx" className="btn">
              Contact us
            </a>
            <a target="blank" href="https://careers.cegedim.com/fr" className="btn">
              Join us
            </a>
          </div>
          <div className="col-md-3 col-sm-3 main-footer-container social">
            <a target="_blank" href="https://www.facebook.com/CegedimGroup/" className="link-fb" rel="noreferrer">
              <i className="fa fa-facebook" />
            </a>
            <a target="_blank" href="https://twitter.com/cegedimgroup" className="link-tw" rel="noreferrer">
              <i className="fa fa-twitter" />
            </a>
            <a target="_blank" href="https://www.linkedin.com/company/cegedim/" className="link-in" rel="noreferrer">
              <i className="fa fa-linkedin" />
            </a>
            <a target="_blank" href="https://www.instagram.com/cegedimgroup/" className="link-ig" rel="noreferrer">
              <i className="fa fa-instagram" />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mycopyright">
            © 2023 Cegedim group
            &nbsp;
            <a target="blank" href="https://www.cegedim.com/Pages/legacy-policy.aspx">
              Legacy policy
            </a>
                        &nbsp;
            <a href="https://www.cegedim.com/Pages/GCU.aspx">
              GCU
            </a>
                        &nbsp;
            <a href="https://www.cegedim.com/Pages/data-privacy.aspx">
              Data privacy
            </a>
            <a id="tarteaucitronManagerLink" onClick="tarteaucitron.userInterface.openPanel();" href="#tarteaucitronManagerLink">
              Management of cookies
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Footer;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { url } from '../../util';

function Home() {

    const scrolledRef = React.useRef(false);
    const { hash } = useLocation();
    const hashRef = React.useRef(hash);

    React.useEffect(() => {
        if (hash) {
          // We want to reset if the hash has changed
          if (hashRef.current !== hash) {
            hashRef.current = hash;
            scrolledRef.current = false;
          }
    
          // only attempt to scroll if we haven't yet (this could have just reset above if hash changed)
          if (!scrolledRef.current) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
              scrolledRef.current = true;
            }
          }
        }
    });

    return (
        <div>
            <div className="bg-white" id="page-header">
                <div className="shadow bg-white py-2 mb-1">
                    <div className="container bg-transparent text-center">
                        <div className="row">
                            <div className="col-md-4 col-6 d-none d-md-block"></div>
                            <div className="col-md-4 col-6 px-0 px-md-2">
                                <div className="py-2 small">
                                    <Link className="my-text-primary" to="login" style={{ textDecoration: 'none' }}>
                                        <i className="fa fa-user-plus me-md-1"></i>
                                        <span>Login</span>
                                    </Link>
                                    <Link className="btn btn-sm btn-primary text-white ms-1 ms-md-2 small pt-0 py-1" to="register">
                                        <span className="small">Register</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-4 col-6">
                                <div className="small">
                                    <Link className="my-text-primary text-decoration-underline me-2" to="#"  onClick={() => window.location = `tel:${process.env.REACT_APP_TEL}`}>
                                        Call
                                    </Link>
                                    or
                                    <Link
                                        className="my-text-primary text-decoration-underline ms-2"
                                        to="#"  onClick={() => window.location = `https://api.whatsapp.com/send?phone=${process.env.REACT_APP_TEL}`}
                                    >
                                        Whatsapp
                                    </Link>
                                </div>
                                <div className="small mt-md-1">
                                    <strong>{process.env.REACT_APP_TEL}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-white py-0 px-2" id="header">
                    <div className="container-fluid">
                        <Link className="navbar-brand fw-bold my-text-primary" to="#">
                            <img src={`${url()}img/logo.png`} alt="" style={{ width: 60 }} />
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto me-2 mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link mx-md-3 active" to="login">
                                       Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mx-md-3 active" to="register">
                                       Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mx-md-3 active" to="#our-services">
                                        Our Services
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mx-md-3" to="#how-it-works">
                                        How it Works
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mx-md-3" to="privacy-policy">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mx-md-3" to="terms-and-condition">
                                        Terms and Condition
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="content">
                <main className="">
                    <div className="position-relative">
                        <img src={`${url()}img/banner.jpg`} alt="GigNg banner" className="img-responsive img-fluid" style={{ minHeight: 250 }} />
                        <div className="fs-4 ps-2" id="screen-page-text">
                            <div className="text-center">
                                <div style={{maxWidth: 250}}>Browse the internet seamlessly with</div>
                                <div style={{ color: '#6BD2FF' }}>{process.env.REACT_APP_NAME}</div>
                                <Link to="register" role='button' className='btn btn-primary btn-lg mt-4 rounded'>Get Started</Link>
                            </div>
                        </div>
                    </div>
                    <div className="px-3 px-md-5 py-4">
                        <div className="container py-3">
                            <div className="my-text-primary text-center mb-4" style={{ fontSize: 30, lineHeight: 2 }}>
                                <strong>
                                    Buy Data and Airtime of every Nigerian Network (MTN, Glo, Airtel and 9mobile) at cheap rates.
                                </strong>
                            </div>
                            <div className="row">
                                <div className="col-6 col-md-3 mt-2">
                                    <div className="px-2 px-md-3 mx-auto network-img-div">
                                        <img src={`${url()}img/mtn_circle.png`} alt="" className="img-fluid" />
                                    </div>
                                </div>
                                <div className="col-6 col-md-3 mt-2">
                                    <div className="px-2 px-md-3 mx-auto network-img-div">
                                        <img src={`${url()}img/airtel_circle.png`} alt="" className="img-fluid" />
                                    </div>
                                </div>
                                <div className="col-6 col-md-3 mt-2">
                                    <div className="px-2 px-md-3 mx-auto network-img-div">
                                        <img src={`${url()}img/glo_circle.png`} alt="" className="img-fluid" />
                                    </div>
                                </div>
                                <div className="col-6 col-md-3 mt-2">
                                    <div className="px-2 px-md-3 mx-auto network-img-div">
                                        <img src={`${url()}img/9mobile_circle.png`} alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="">
                        <div className="container py-5">
                            <div className="row my-md-3">
                                <div className="col-md-6">
                                    <div className="py-3 my-text-primary fw-bold h5">
                                        <br className="d-none d-md-block" />
                                        <br className="d-none d-md-block" />
                                        <div>
                                            Subscribe for Cable TV(DStv,Gotv, and Startimes) at affordable rates.. <br />
                                            Also pay for your Electricity bills without stress.
                                        </div>
                                        <br />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <img src={`${url()}img/bills.png`} alt="" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <hr /> 
                <section id="our-services" className="px-3 px-md-5 py-3">
                    <div className="container bg-transparent py-5">
                        <div className="h3 fw-bold text-center my-text-primary m-0">Our Services</div>
                        <div className="mx-auto mb-3 mb-md-5" style={{ width: 155 }}>
                            <div className="my-bg-primary" style={{ width: 60, height: 4, borderRadius: 2 }}></div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 text-center mt-4 mt-md-0">
                                <div className="px-3">
                                    <div className="circle-point mx-auto my-bg-primary">
                                        <img src={`${url()}img/security.svg`} alt="" className="img-fluid" />
                                    </div>
                                    <div>
                                        {process.env.REACT_APP_NAME} 
                                        is the final bus stop for cheap MTN, GLO, Airtel and 9Mobile data bundles and Airtime Topups across Nigeria
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-center mt-4 mt-md-0">
                                <div className="px-3">
                                    <div className="circle-point mx-auto my-bg-primary">
                                        <img src={`${url()}img/award.svg`} alt="" className="img-fluid" />
                                    </div>
                                    <div>
                                        We offer the cheapest rates for all the Networks in Nigeria. You can also generate data pins and sell offline.
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-center mt-4 mt-md-0">
                                <div className="px-3">
                                    <div className="circle-point mx-auto my-bg-primary">
                                        <img src={`${url()}img/receipt.svg`} alt="" className="img-fluid" />
                                    </div>
                                    <div>
                                        You can always trust us to handle your Electricity Bill payments, DStv, Gotv and Startimes
                                        subscriptions.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <hr />
                <section id="how-it-works" className="px-3 px-md-5 py-3">
                    <div className="container bg-transparent">
                        <div className="h3 fw-bold text-center my-text-primary">How it Works</div>
                        <div className="mx-auto mb-3 mb-md-5" style={{ width: 155 }}>
                            <div className="my-bg-primary" style={{ width: 60, height: 4, borderRadius: 2 }}></div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 text-center mt-5 mt-md-0">
                                <div className="px-3">
                                    <div className="circle-point mx-auto my-text-primary">
                                        <span>1</span>
                                    </div>
                                    <div className="my-3">
                                        <strong>Create an Account</strong>
                                    </div>
                                    <div>
                                        Registration is simple and fast. Click on the sign up button, input the required details and submit.
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-center mt-5 mt-md-0">
                                <div className="px-3">
                                    <div className="circle-point mx-auto my-text-primary">
                                        <span>2</span>
                                    </div>
                                    <div className="my-3">
                                        <strong>Fund Your Wallet</strong>
                                    </div>
                                    <div>
                                        There are different methods of wallet funding. These includes the Auto Transfer option, Credit Card
                                        method and then the Bank transfer option. You can always choose the most preferred option.
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-center mt-5 mt-md-0">
                                <div className="px-3">
                                    <div className="circle-point mx-auto my-text-primary">
                                        <span>3</span>
                                    </div>
                                    <div className="my-3">
                                        <strong>Place Order</strong>
                                    </div>
                                    <div>
                                        You can start placing orders once you have funded your wallet. Data purchase, Airtime Top ups, Bill
                                        payments, Cable TV subscription s and Data pins are always available for purchase 24/7. We are
                                        committed to offer you a great service.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                    </div>
                </section>
            </div>

            <footer
                className="pt-3 pt-md-4 pb-2 pb-md-3 px-2 px-md-4 w-100 clearfix text-white"
                id="footer"
                style={{ backgroundColor: '#15002B' }}
            >
                <div className="row mx-0" id="contact">
                    <div className="col-md-6">
                        <div className="float-start pl-1">
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <Link className="text-light" to="https://web.facebook.com/#">
                                        <i className="fab fa-facebook"></i>
                                    </Link>
                                </li>
                                <li className="list-inline-item ml-2">
                                    <Link className="text-light" to="https://twitter.com/#">
                                        <i className="fab fa-twitter"></i>
                                    </Link>
                                </li>
                                <li className="list-inline-item ml-2">
                                    <Link className="text-light" to="">
                                        <i className="fab fa-instagram"></i>
                                    </Link>
                                </li>
                                <li className="list-inline-item ml-2">
                                    <Link className="text-light" to="">
                                        <i className="fab fa-google-plus"></i>
                                    </Link>
                                </li>
                            </ul>
                            <div className="mt-1">
                                <Link className="text-white" to="#">
                                    <small>Home</small>
                                </Link>
                                <span className="divider mx-2">|</span>
                                <Link className="text-white" to="privacy-policy">
                                    <small>Privacy Policy</small>
                                </Link>
                                <span className="divider mx-2">|</span>
                                <Link className="text-white" to="terms-and-condition">
                                    <small>Terms and Conditions</small>
                                </Link>
                            </div>
                            <div className="mt-2" style={{opacity: 0.7}}>
                                {process.env.REACT_APP_ADDRESS}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 clearfix mt-3 mt-md-0">
                        <div>
                            <div className="float-end">
                                <Link onClick={() => window.location = `mailto:${process.env.REACT_APP_EMAIL}`} to='#' className="mt-1 small text-white">
                                    <i className="fa fa-envelope pr-2"></i> {process.env.REACT_APP_EMAIL}
                                </Link>
                                <div className="mt-1 small">
                                    <Link to="#" onClick={() => window.location = `tel:${process.env.REACT_APP_TEL}`} className="mt-1 small text-white">
                                        <i className="fa fa-phone pr-2"></i> {process.env.REACT_APP_TEL}
                                    </Link>
                                </div>
                                <div className="mt-1 small">
                                    <Link className="text-white pr-2" to="#"  onClick={() => window.location = `https://api.whatsapp.com/send?phone=${process.env.REACT_APP_TEL}`}>
                                        <i className="fab fa-whatsapp"></i> Chat us on Whatsapp
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center copyright mt-3 small">{process.env.REACT_APP_NAME} &copy; {process.env.REACT_APP_YEAR}. All Rights Reserved.</div>
            </footer>
        </div>
    );
}

export default Home;

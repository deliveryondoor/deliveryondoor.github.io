import {Navbar, Button, Modal, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/logo.gif'
import AOS from 'aos';
import 'aos/dist/aos.css';
import './index.css'
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendarCheck, faMapMarkedAlt, faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons'

function App() {

    var curr = new Date();
    curr.setDate(curr.getDate() + 3);
    var date = curr.toISOString().substr(0, 10);

    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);

    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);

    const handleShow2 = () => setShow2(true);
    const handleClose2 = () => setShow2(false);

    const handleShow3 = () => setShow3(true);
    const handleClose3 = () => setShow3(false);

    const handleShow4 = () => setShow4(true);
    const handleClose4 = () => setShow4(false);

    function disableButton() {
        setTimeout(() => {
            var btn = document.getElementById('orderBtn');
            if (btn) {
                btn.disabled = true;
            }
        }, 50)
        setTimeout(enableButton, 4000);
    }

    function enableButton() {
        var btn = document.getElementById('orderBtn');
        btn.disabled = false;
    }

    useEffect(() => {

        AOS.init({
            duration: 2000
        });

        const scriptURL = process.env.REACT_APP_API_URL
        const form = document.forms['google-sheet']

        if (form) {
            form.addEventListener('submit', e => {
                const name = document.getElementById("name").value
                const address = document.getElementById("address").value
                const landmark = document.getElementById("landmark").value
                const ward = document.getElementById("ward").value
                const phone1 = document.getElementById("phone1").value
                const items = document.getElementById("items").value

                e.preventDefault()

                if (name !== "" && address !== "" && landmark !== "" && ward !== "" && phone1 !== "" && items !== "") {
                    fetch(scriptURL, {method: 'POST', body: new FormData(form)})
                        .then(() => {
                            handleClose2();
                            handleShow3();
                        })
                        .catch(error => console.error('Error!', error.message))
                }
            })
        }
    })

    return (
        <div>
            <div data-aos="fade-right" className="home">
                {/*Navbar*/}
                <Navbar bg="light" expand="lg">
                    <Container>
                        <img className="logo-brand" src={logo} alt="logo"/>
                        <Button onClick={handleShow1} data-aos="zoom-in" data-aos-delay="2000" variant="info"
                                className="contact-btn"
                                id="contact">Contact Us.</Button>{' '}
                    </Container>
                </Navbar>

                <Modal centered show={show1} onHide={handleClose1}>
                    <Modal.Header closeButton>Feel free to contact us anytime. </Modal.Header>
                    <Modal.Body>
                        <p><FontAwesomeIcon className="tick1" icon={faMapMarkedAlt}/> Near Durga Sthan, Ward No. - 22,
                            Indupur, Barahiya.</p>
                        <p><FontAwesomeIcon className="tick1" icon={faEnvelope}/> deliveryondoors@gmail.com</p>
                        <p><FontAwesomeIcon className="tick1" icon={faPhone}/> +91 89861 53857</p>
                    </Modal.Body>
                </Modal>

                <div className="tag">
                    <h1 data-aos="zoom-in">Get items on your doorstep.</h1>
                    <h5 data-aos="zoom-in">We always deliver more than expected.</h5>
                    <p data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500"><FontAwesomeIcon
                        className="tick2" icon={faCalendarCheck}/> Faster Services.</p>
                    <p data-aos="fade-up" data-aos-duration="1300" data-aos-delay="700"><FontAwesomeIcon
                        className="tick2" icon={faCalendarCheck}/> 24x7 Facilities.</p>
                    <p data-aos="fade-up" data-aos-duration="1500" data-aos-delay="900"><FontAwesomeIcon
                        className="tick2" icon={faCalendarCheck}/> COD option.</p>
                    <p data-aos="fade-up" data-aos-duration="1800" data-aos-delay="1300">So what are you waiting for
                        ?</p>
                    <button onClick={handleShow2} data-aos="zoom-in" data-aos-delay="2500" type="button"
                            className="btn btn-success">Order Now!
                    </button>
                    <button onClick={handleShow4} data-aos="zoom-in" data-aos-delay="2500" type="button"
                            className="btn btn-warning help-btn">Help?
                    </button>

                    <Modal centered show={show2} onHide={handleClose2}>
                        <Modal.Header closeButton> Enter Your Details</Modal.Header>
                        <Modal.Body>
                            <form id="form" name="google-sheet">
                                <input id="name" type="text" name="Name" className="form-control form-group"
                                       placeholder="Full Name *" required/>
                                <input id="address" type="text" name="Address" className="form-control form-group"
                                       placeholder="Address *" required/>
                                <input id="landmark" type="text" name="Landmark" className="form-control form-group"
                                       placeholder="Landmark *" required/>
                                <input id="ward" type="number" name="Ward" className="form-control form-group"
                                       placeholder="Ward Number *" required/>
                                <input id="phone1" type="number" name="Phone1" className="form-control form-group"
                                       placeholder="Contact Number 1*" required/>
                                <input type="number" name="Phone2" className="form-control form-group"
                                       placeholder="Contact Number 2"/>
                                <textarea id="items" name="Item" className="form-control form-group" rows="3"
                                          placeholder="Enter items to be ordered..." required/>
                                <input id="datePicker" type="date" className="form-control form-group" name="Date"
                                       defaultValue={date}/>
                                <input id="orderBtn" type="submit" name="submit" className="btn btn-primary order-btn"
                                       onClick={disableButton} value="Order Now"/>
                            </form>
                        </Modal.Body>
                    </Modal>

                    <Modal size="sm" centered show={show3} onHide={handleClose3}>
                        <Modal.Body>
                            <p style={{marginBottom:0}}>
                                <center>We will deliver your product soon.<br/> Thank You!</center>
                            </p>
                        </Modal.Body>
                        <Button className="order-ack" variant="success" onClick={handleClose3}>
                            Okay
                        </Button>
                    </Modal>

                    <Modal size="lg" centered show={show4} onHide={handleClose4}>
                        <Modal.Header closeButton>Placing an Order...</Modal.Header>
                        <Modal.Body>
                            <iframe className="video-frame" src="https://www.youtube.com/embed/K1QICrgxTjA"
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen>
                            </iframe>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default App;

import React,{useRef} from "react";
import '../../style/Home.css';
import { Carousel, Form, Button, FloatingLabel } from "react-bootstrap";
import src from "../../assets/images/health.svg";
import { useState, useEffect } from "react";
import MainNav from "../Nav/MainNav";
import emailjs from "emailjs-com";

// photos of the slider src and time intervals 
const Photos = [
  {
    interval: 1000,
    alt: "First slide",
    src: "https://wallpaperaccess.com/full/185899.jpg",
  },
  {
    interval: 500,
    alt: "Second slide",
    src: "https://wallpaperaccess.com/full/6890245.jpg",
  },
  {
    interval: 100,
    alt: "Third slide",
    src: "https://media.istockphoto.com/photos/female-doctor-future-touch-screen-pulse-trace-medical-digital-picture-id475182445?k=20&m=475182445&s=612x612&w=0&h=IkCjEbBZiQdLV4LZcTFjh_NF6mwCj_CQTAA-tXCyWDI=",
  },
];
function Home() {
  const [index, setIndex] = useState(0);
  const form = useRef();

  const send_email = (e) =>{
      e.preventDefault();
      emailjs.sendForm('service_jsvwrap', 'template_6y07sra', form.current, 'user_XE2DNXIsyHS8NWRVKktZP')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
  }
  useEffect(() => {
    const items = document.querySelectorAll(".accordion button");

    function toggleAccordion() {
      const itemToggle = this.getAttribute("aria-expanded");

      for (var i = 0; i < items.length; i++) {
        items[i].setAttribute("aria-expanded", "false");
      }

      if (itemToggle == "false") {
        this.setAttribute("aria-expanded", "true");
      }
    }

    items.forEach((item) => item.addEventListener("click", toggleAccordion));
  }, []);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <MainNav/>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {Photos.map((res, inde) => {
          return (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={res.src}
                alt={res.alt}
                key={inde}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
      <div className="main_frontend_middle">
        <div className="main_frontend_middle_center">
          <h1>
            <span>Health</span> is Wealth :
          </h1>
        </div>
        <div className="main_frontend_middle_text">
          <h3>
            To maintain a healthy mind and body, one must eat clean and healthy
            food, balance your diet with the right promotion of essential
            minerals, exercise regularly, consume lots of fruits and veggies,
            drink lots of water, sleep early and adequately for 8 hours. Proper
            8 hours help stimulates adequate growth. A healthy body stays
            positive and healthy by eliminating all negativity. A healthy diet
            and lifestyle keep one positive, fit, and happy. Regularly brushing
            your teeth twice a day and washing hands before meals will keep you
            healthy.
          </h3>
          <h3>
            A healthy and active mind important to balance our everyday goals.
            It is highly relevant to balance one’s work and life at all times.
            In today’s world, the greed for luxury and wealth creation has
            caused health-related hazards.
          </h3>
          <h3>
            Health is like money; we learn it’s the value when it’s lost. A
            Healthy person can achieve happiness and success quickly than a weak
            and unhealthy person. Staying fit and healthy is truly a blessing.
          </h3>
        </div>
        <div className="main_frontend_middle_center heading_two">
          <h1>
            About This <span>App</span> :
          </h1>
        </div>
        <div className="main_frontend_middle_about_app">
          <div className="about_app_div">
            <div>
              <ol>
                <li>
                  We Provides The Appontment Facilities So that any one can book
                  their appoint-ment to hteir near hospital.
                </li>
                <li>
                  We have the dieces pradictor so that any one can predict what
                  happent to him/her.
                </li>
                <li>
                  We have also facility of personal talk, so that any one can
                  chat privately with doctors.
                </li>
                <li>Also We have token pradictor.</li>
              </ol>
            </div>

            <div>
              <img src={src} />
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="main_workings_of_app">
          <div>
            <i class="fas fa-calendar-check"></i>
          </div>
          <div>
            <i class="fas fa-flushed"></i>
          </div>
          <div>
            <i class="fas fa-person-booth"></i>
          </div>
        </div>
        <div className="line"></div>
        <div class="container" id="qanda">
          <h2>Frequently Asked Questions</h2>
          <div class="accordion">
            <div class="accordion-item">
              <button id="accordion-button-1" aria-expanded="false">
                <span class="accordion-title">
                  What are the uses of this web app ?
                </span>
                <span class="icon" aria-hidden="true"></span>
              </button>
              <div class="accordion-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Elementum sagittis vitae et leo duis ut. Ut tortor pretium
                  viverra suspendisse potenti.
                </p>
              </div>
            </div>
            <div class="accordion-item">
              <button id="accordion-button-2" aria-expanded="false">
                <span class="accordion-title">
                  What are the security safeties ?
                </span>
                <span class="icon" aria-hidden="true"></span>
              </button>
              <div class="accordion-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Elementum sagittis vitae et leo duis ut. Ut tortor pretium
                  viverra suspendisse potenti.
                </p>
              </div>
            </div>
            <div class="accordion-item">
              <button id="accordion-button-3" aria-expanded="false">
                <span class="accordion-title">Will our data is safe ?</span>
                <span class="icon" aria-hidden="true"></span>
              </button>
              <div class="accordion-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Elementum sagittis vitae et leo duis ut. Ut tortor pretium
                  viverra suspendisse potenti.
                </p>
              </div>
            </div>
            <div class="accordion-item">
              <button id="accordion-button-4" aria-expanded="false">
                <span class="accordion-title">How To use this website ?</span>
                <span class="icon" aria-hidden="true"></span>
              </button>
              <div class="accordion-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Elementum sagittis vitae et leo duis ut. Ut tortor pretium
                  viverra suspendisse potenti.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="contact_us_form">
          <div className="contact_us_form_head">
            <h1>Contact-Us</h1>
          </div>
          <div className="contact_us_form_body">
            <Form onSubmit={(e)=>send_email(e)} ref={form}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Your Mobile no.."
                  name = "from_number"
                />
                <Form.Text className="text-muted">
                  We'll never share your number with anyone else.
                </Form.Text>
              </Form.Group>
              <FloatingLabel controlId="floatingTextarea2" label="Comments">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  name = "message"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
              <Form.Group className="mb-3" controlId="formBasicEmail" >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter you Name.." name="from_name"/>
              </Form.Group>
              <Button variant="primary" type="submit" id="front_submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

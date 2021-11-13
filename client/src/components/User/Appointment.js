import React, { useEffect, useState } from "react";
import "../../style/Selected.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
import axios from "axios";
let box = false;
const cough_item = [
  "Select",
  "No Cough & Cold",
  "Moderate Cough & Cold",
  "Heavy Cough & Fever",
];
const fever_item = ["Select", "No Fever", "Moderate Fever", "High Fever"];
const pain_item = [
  "Select",
  "No Pain in Body",
  "Moderate Pain in Body",
  "High Pain in Body",
];

function Appointment(props) {
  const [predicted, setPredicted] = useState(0);

  const DataHospital = [
    {
      src: "https://content3.jdmagicbox.com/comp/vadodara/n4/0265px265.x265.140723145818.i7n4/catalogue/dr-paresh-mehta-dermacare-clinic-raopura-vadodara-dermatologists-261ipok.jpg?clr=1c1c4a",
      name: "Derma-Care Clinic",
      doc_name: "Dr. Paresh Mehta",
      Contact: "+91-265-2421182",
      dayTime: "11:00 AM To 2:00 PM",
      noonTime: "5:00 PM To 8:00 PM",
      drQualification: "M.D.(SKIN & V.D)",
      tretments: "Laser, Alergy, Skin, Cosmetology",
      predicted,
    },
    {
      src: "https://images1-fabric.practo.com/practices/1209632/icure-heart-and-diet-clinic-vadodara-5edf2b7084a11.jpg",
      name: "Derma-Care Clinic",
      doc_name: "Dr. Paresh Mehta",
      Contact: "+91-265-2421182",
      dayTime: "11:00 AM To 2:00 PM",
      noonTime: "5:00 PM To 8:00 PM",
      drQualification: "M.D.(SKIN & V.D)",
      tretments: "Laser, Alergy, Skin, Cosmetology",
      predicted,
    },
  ];
  const [cough, setCough] = useState("Select");
  const [fever, setFever] = useState("Select");
  const [pain, setPain] = useState("Select");
  const [hospital, setHospital] = useState(props.hospital);
  const [account, setAccount] = useState(props.account);

  useEffect(async () => {
    const time = await hospital.methods.time().call();
    setPredicted(time / 100);
  }, []);

  const Booking = async (e) => {
    e.preventDefault();
    let account = props.account;
    let hospital = props.hospital;
    let final = cough + "," + fever + "," + pain;
    axios
      .post("/py", {
        message: final,
      })
      .then(async (res) => {
        let t = res.data.value;
        t = t.substring(0, 4);
        t = parseFloat(t);
        t = t * 100;
        t = parseInt(t);
        console.log(t);
        console.log(account, hospital);
        await hospital.methods
          .bookAppointments(t)
          .send({ from: account })
          .once("confirmation", () => {})
          .then(async () => {
            const time = await hospital.methods.time().call();
            setPredicted(time / 100);
          });
      });
  };

  return (
    <div className="appointment_page_user">
      {DataHospital.map((res) => {
        return (
          <div className="appointment_box">
            <div className="appointment_box_top">
              <div className="appointment_box_top_img">
                <img src={res.src} />
              </div>
              <div className="appointment_box_top_data">
                <h2>{res.name}</h2>
                <h3>{res.doc_name}</h3>
                <h3>{res.drQualification}</h3>
                <h4>{res.dayTime}</h4>
                <h4>{res.noonTime}</h4>
                <div className="treatments">
                  <h3>{res.tretments}</h3>
                </div>
                <h3>Contact : {res.Contact}</h3>
              </div>
            </div>

            <div className="appointment_box_end" id="box">
              <div className="appointment_box_select">
                <DropdownButton
                  id="dropdown-basic"
                  variant="success"
                  title={cough}
                  className="but"
                >
                  {cough_item.map((res) => {
                    return (
                      <Dropdown.Item as="button" onClick={() => setCough(res)}>
                        {res}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
                <DropdownButton
                  id="dropdown-basic"
                  variant="success"
                  title={fever}
                  className="but"
                >
                  {fever_item.map((res) => {
                    return (
                      <Dropdown.Item as="button" onClick={() => setFever(res)}>
                        {res}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
                <DropdownButton
                  id="dropdown-basic"
                  variant="success"
                  title={pain}
                  className="but"
                >
                  {pain_item.map((res) => {
                    return (
                      <Dropdown.Item as="button" onClick={() => setPain(res)}>
                        {res}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              </div>
            </div>
            <div className="turn_box">
              <h4>your turn will be in next {res.predicted} minutes</h4>
            </div>
            <div className="appointment_box_end_final_submit">
              <button onClick={Booking}>Fix-Appointment</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Appointment;

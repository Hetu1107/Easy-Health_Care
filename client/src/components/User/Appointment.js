import React, { useState } from "react";
import "../../style/Selected.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
const DataHospital = [
  {
    src: "https://www.pngall.com/wp-content/uploads/8/Hospital-PNG-Image-HD.png",
    name: "Derma-Care Clinic",
    doc_name: "Dr. Paresh Mehta",
    Contact: "+91-265-2421182",
    dayTime: "11:00 AM To 2:00 PM",
    noonTime: "5:00 PM To 8:00 PM",
    drQualification: "M.D.(SKIN & V.D)",
    tretments: "Laser, Alergy, Skin, Cosmetology",
  },
  {
    src: "https://www.pngall.com/wp-content/uploads/8/Hospital-PNG-Image-HD.png",
    name: "Derma-Care Clinic",
    doc_name: "Dr. Paresh Mehta",
    Contact: "+91-265-2421182",
    dayTime: "11:00 AM To 2:00 PM",
    noonTime: "5:00 PM To 8:00 PM",
    drQualification: "M.D.(SKIN & V.D)",
    tretments: "Laser, Alergy, Skin, Cosmetology",
  },
];
let box = false;
const cough_item = [
  { type: "Select", count: 0 },
  { type: "No Cough & Cold", count: 0 },
  { type: "Moderate Cough & Cold", count: 1 },
  { type: "Heavy Cough & Fever", count: 2 },
];
const fever_item = [
  { type: "Select", count: 0 },
  { type: "No Fever", count: 0 },
  { type: "Moderate Fever", count: 1 },
  { type: "High Fever", count: 2 },
];
const pain_item = [
  { type: "Select", count: 0 },
  { type: "No Pain in Body", count: 0 },
  { type: "Moderate Pain in Body", count: 1 },
  { type: "High Pain in Body", count: 2 },
];

function Appointment() {
  const [cough, setCough] = useState("Select");
  const [coughCount, setCoughCount] = useState(0);
  const [fever, setFever] = useState("Select");
  const [feverCount, setFeverCount] = useState(0);
  const [pain, setPain] = useState("Select");
  const [painCount, setPainCount] = useState(0);
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
                  title={cough}
                  className="but"
                >
                  {cough_item.map((res) => {
                    return (
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setCough(res.type);
                          setCoughCount(res.count);
                        }}
                      >
                        {res.type}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
                <DropdownButton
                  id="dropdown-basic"
                  title={fever}
                  className="but"
                >
                  {fever_item.map((res) => {
                    return (
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setFever(res.type);
                          setFeverCount(res.count);
                        }}
                        id="but"
                      >
                        {res.type}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
                <DropdownButton
                  id="dropdown-basic"
                  title={pain}
                  className="but"
                >
                  {pain_item.map((res) => {
                    return (
                      <Dropdown.Item
                        as="button"
                        onClick={() => {
                          setPain(res.type);
                          setPainCount(res.count);
                        }}
                      >
                        {res.type}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              </div>
            </div>
            <div className="turn_box">
              <h4>your turn will be in next 10min</h4>
            </div>
            <div className="appointment_box_end_final_submit">
              <button>Fix-Appointment</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Appointment;

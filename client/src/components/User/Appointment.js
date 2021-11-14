import React, { useEffect, useState } from "react";
import "../../style/Selected.css";
import axios from "axios";
import { DropdownButton, Dropdown } from "react-bootstrap";
import AppointMentAdmin from "./AppointMentAdmin";
import db from "../../FireBase";

let box = false;
const cough_item = [
  { type: "Select", count: 0 },
  { type: "No Cough & Cold", count: 0 },
  { type: "Moderate Cough & Cold", count: 1 },
  { type: "Heavy Cough & Cold", count: 2 },
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

function Appointment(props) {
  const [predicted, setPredicted] = useState(0);

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
      predicted,
    },
  ];
  const [cough, setCough] = useState("Select");
  const [coughCount, setCoughCount] = useState(0);
  const [fever, setFever] = useState("Select");
  const [feverCount, setFeverCount] = useState(0);
  const [pain, setPain] = useState("Select");
  const [painCount, setPainCount] = useState(0);
  const [F, setF] = useState(0);
  const [hospital, setHospital] = useState(props.hospital);
  const [account, setAccount] = useState(props.account);
  const [firebase, setFirebase] = useState("");

  // useEffect(async () => {
  //     const time = await hospital?.methods?.time().call();
  //     setPredicted(time / 100);
  // }, [firebase]);

  useEffect(() => {
    db.collection("time").onSnapshot((snap) => {
      console.log(snap.docs[0].data().time);
      setPredicted(snap.docs[0].data().time);
    });
  });

  useEffect(async () => {
    const t = await props.hospital.methods?.tokenStart().call();
    const total = await props.hospital.methods?.tokenNum().call();
    let num = 0;
    let flag = 0;
    for (let i = t; i <= total; i++) {
      const user = await props.hospital.methods?.patients(i).call();
      if (user[2] === props.account) {
        setF(1);
      }
    }
  }, []);

  const Booking = async (e) => {
    e.preventDefault();
    let account = props.account;
    let hospital = props.hospital;
    let final = coughCount + "," + feverCount + "," + painCount;
    if (F === 1) {
      window.alert(
        "You have already booked your appointment, please go to Activity Section"
      );
    } else {
      axios
        .post("/py", {
          message: final,
        })
        .then(async (res) => {
          let t = res.data.value;
          t = t.substring(0, 4);
          t = parseFloat(t);
          t = Math.round(t);
          t = t * 100;
          t = parseInt(t);
          console.log("rounded", t);
          console.log(account, hospital);
          await hospital.methods
            ?.bookAppointments(t)
            .send({ from: account })
            .once("confirmation", () => {})
            .then(async () => {
              const time = await hospital.methods?.time().call();
              setPredicted(time / 100);
              db.collection("time")
                .doc("BlRD2Dn5dljXLvCdflUz")
                .update({
                  time: time / 100,
                });
            });
        });
    }
  };
  useEffect(() => {
    if (props.account === "0x34c9C9F9191b0c215F8654064BDF2A35aa755e8D") {
      document.getElementsByClassName(
        "appointment_page_user"
      )[0].style.hidden = true;
    }
  });

  return (
    <div className="appointment_page_user">
      {props.account !== "0x34c9C9F9191b0c215F8654064BDF2A35aa755e8D" ? (
        DataHospital.map((res) => {
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
                <h4>your turn will be in next <span>{res.predicted}</span> minutes</h4>
              </div>
              <div className="appointment_box_end_final_submit">
                <button onClick={Booking}>Fix-Appointment</button>
              </div>
            </div>
          );
        })
      ) : (
        <AppointMentAdmin
          zero={predicted}
          predicted={setPredicted}
          hospital={props.hospital}
          account={props.account}
        />
      )}
    </div>
  );
}

export default Appointment;

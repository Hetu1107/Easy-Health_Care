import React,{useState} from "react";
import Appointment from "./Appointment";
import PrivateChat from "./PrivateChat";
import YourActivity from "./YourActivity";
import '../../style/User.css'
import src from '../../assets/images/nav.svg'


let drop = false;
let id = "one_div";
function User() {
  const [select, setSelect] = useState(<Appointment/>);
  function dropDown() {
    if (!drop) {
      document.getElementById("profile_head").style.height = "320px";
      document.getElementById("drop_icon").style.transform = "rotateX(-180deg)";
      drop = true;
    } else {
      document.getElementById("profile_head").style.height = "70px";
      document.getElementById("drop_icon").style.transform = "rotateX(0deg)";
      drop = false;
    }
  }
  return (
    <div className="Profile_page_of_users">
      <div className="Profile_page_of_users_heading" id="profile_head">
        <div
          className="Profile_page_of_users_top_head"
          onClick={() => dropDown()}
        >
          <div className="Profile_page_of_users_top_head_name">
            <h2><img src={src}/></h2>
          </div>
          <div className="Profile_page_of_users_top_head_dropdown">
            <i class="fas fa-chevron-down" id="drop_icon"></i>
          </div>
        </div>
        <div className="Profile_page_of_users_middle_content">
          <div className="Profile_page_of_users_middle_content_about">
            <div className="name_div">
              <h3>
                Name : <span>Name of User</span>
              </h3>
            </div>
            <div className="age_blood_div">
              <div className="blood">
                <h3>
                  Blood_Group : <span>B+</span>
                </h3>
              </div>
              <div className="age">
                <h3>
                  Age : <span>19</span>
                </h3>
              </div>
            </div>
            <div className="contact_div">
              <h3>
                Contact-No. : <span>1234567890</span>
              </h3>
            </div>
          </div>
          <div className="Profile_page_of_users_middle_head">
            <div className="Profile_page_of_users_middle_head_div_one">
              <button>Global-Chat</button>
              <button>Predictor</button>
            </div>
            <div className="Profile_page_of_users_middle_head_div_two">
              <button>
                Log-out <i class="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="user_main_content_main_div">
        <div className="user_main_content_main_div_select">
          <div
            id="one_div"
            className="active"
            onClick={(e) => {
              if (id != "one_div") {
                document.getElementById(id).classList.remove("active");
                document.getElementById("one_div").classList.add("active");
                id = "one_div";
                setSelect(<Appointment/>);
              }
            }}
          >
            <h3>Appoint-ments</h3>
          </div>
          <div
            id="two_div"
            onClick={(e) => {
              if (id != "two_div") {
                document.getElementById(id).classList.remove("active");
                document.getElementById("two_div").classList.add("active");
                id = "two_div";
                setSelect(<PrivateChat/>);
              }
            }}
          >
            <h3>Private-Talk</h3>
          </div>
          <div
            id="three_div"
            onClick={(e) => {
              if (id != "three_div") {
                document.getElementById(id).classList.remove("active");
                document.getElementById("three_div").classList.add("active");
                id = "three_div";
                setSelect(<YourActivity/>);
              }
            }}
          >
            <h3>Your-Activity</h3>
          </div>
        </div>
        <div className="main_selected_item">{select}</div>
      </div>
    </div>
  );
}

export default User;

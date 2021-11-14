import React, { useState } from "react";

const activity = [
  {
    time: 10,
    num: 1,
    hospital: "Hospital name",
  },
];
function YourActivity() {
    const [active,setActive] = useState(activity);
  return (
    <div className="appointment_page_user">
      {activity.map((res,index) => {
        return (
          <div className="appointment_box">
            <div className="appointment_admin_top">
              <div>
                <h2>
                  Your Token No. :<span> {res.num}</span>
                </h2>
                <h2>{res.hospital}</h2>
              </div>
              <div>
                <h3>
                  Your Turn Can be in : <span>{res.time}</span>
                </h3>
              </div>
            </div>
            <div className="appointment_admin_middle">
              <button onClick={()=>{
                  const demo = active;
                  demo.splice(index,1);
                  setActive(demo);
              }}>Cancel-Token</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default YourActivity;

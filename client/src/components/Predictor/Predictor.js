import React, { useState ,useEffect} from 'react'
import Diseases_Data from './DiseasesData'



import { Modal ,Button, Nav} from 'react-bootstrap'
import axios from 'axios'
import Load from '../Load';
let output;

function Predictor(props) {
    const [data,setData] = useState(Diseases_Data)
    const [selected,setSelected] = useState([]);
    const [out,setOut] = useState(data);
    const [search,setSearch] = useState('');

    const [lo,setLo] = useState(null);
    const [ard,setArd] = useState([]);
    const Predict = async () =>{
        setLo(<Load/>);
       await axios.post("/predict",{
            dat : selected
        })
        .then((res)=>{
            // output = res.data.value[0][0];
            // res.split(',')
            // JSON.parse(res.data.key[1]);
            var s = "";
            const ne =  res.data.key;
            const ar = ne.split(',');
            let st = ar[0].replace('[','');
            st = st.replace("'","");
            st = st.replace("'","");
            output = st;
            let rArray = [];
            let sop = ar[1];
            sop = sop.replace('[','');
            sop = sop.replace("'","");
            sop = sop.replace("'","");
            rArray.push(sop);
            sop = ar[2];
            sop = sop.replace("'","");
            sop = sop.replace("'","");
            rArray.push(sop);
            sop = ar[3];
            sop = sop.replace("'","");
            sop = sop.replace("'","");
            rArray.push(sop);
            sop = ar[4];
            sop = sop.replace(']','');
            sop = sop.replace("'","");
            sop = sop.replace("'","");
            rArray.push(sop);
            console.log(rArray);
            setArd(rArray);
            setLo(null);
        })
    }

    const searchFilter = () =>{
        setOut([]);
        data.map(val=>{
           if( val.toLowerCase().trim().includes(search.toLowerCase().trim()))
           {
               setOut((o)=>[...o,val]);
           }
        })
    }


    return (
        <>
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        {
            lo
        }
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Diseases Predictor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <div className="search_box">
                <input type="text" placeholder="search here..." onChange={(e)=>{
                    setSearch(e.target.value)
                    
                }}/>
            </div>
            <div className="diseases_box">
                <div className="diseases_box_main">
                    {
                        out.map((res,index)=>{
                            return(
                                <div className="diseases_box_main_boxes" onClick={()=>{
                                    setSelected([...selected,res]);
                                    const demo = data;
                                    demo.splice(index,1);
                                    setData(demo);
                                }}>
                                    <h4>{res}</h4>
                                    <i class="fas fa-plus"></i>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="diseases_box_selected">
                    <div className="diseases_box_selected_top">
                        <h3>Selected Diseses</h3>
                    </div>
                    <div className="diseases_box_selected_middle">
                            {
                                selected.map((res,index)=>{
                                    return(
                                        <h4>{res}  <i class="fas fa-times" onClick={
                                            ()=>{
                                                const demo = selected;
                                                demo.splice(index,1);
                                                setSelected(demo);
                                                setData([...data,res]);
                                            }
                                        } ></i></h4>
                                    )
                                })
                            }
                    </div>
            </div>
            <div className="diseases_box_selected">
            <div className="diseases_box_selected_top">
                        <h3 id="thro">Predicted Disese</h3>
                    </div>
                    <div className="diseases_box_selected_middle" id="sco">
                        <h4>{output}</h4>
                    </div>
            </div>
            <div className="diseases_box_selected">
            <div className="diseases_box_selected_top">
                        <h3 id="thro">Precautions To be Taken</h3>
                    </div>
                    <div className="diseases_box_selected_middle" id="sco">
                    {
                        ard.map(res=>{
                            return(

                        <h4>{res}</h4>
                            )
                        })
                    }
                    </div>
            </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={Predict}>Predict Diseases</Button>

      </Modal.Footer>
    </Modal>
    </>
    )
}

export default Predictor

import React, { useState } from 'react'
import Diseases_Data from './DiseasesData'
import { Modal ,Button} from 'react-bootstrap'
function Predictor(props) {
    const [data,setData] = useState(Diseases_Data)
    const [selected,setSelected] = useState([]);
    const [search,setSearch] = useState('');
    return (
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
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
                        data.map((res,index)=>{
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
      </Modal.Body>
      <Modal.Footer>
        <Button>Predict Diseases</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default Predictor

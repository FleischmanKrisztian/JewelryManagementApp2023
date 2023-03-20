import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {variables} from '../../Variables';

const TypeEdit = () => {
    const { typeid } = useParams();

    useEffect(() => {
        fetch(variables.API_URL+"jewelrytype/edit/" + typeid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp[0].Id);
            namechange(resp[0].Name);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const[Id,idchange]=useState("");
    const[Name,namechange]=useState("");
    const[validation,valchange]=useState(false);

    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const typedata={Id,Name};
      
      fetch(variables.API_URL+"jewelrytype",{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(typedata)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/jewelrytypes');
      }).catch((err)=>{
        console.log(err.message)
      })

    }

    return (
        <div>

            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Editeaza Tip de bijuterie</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>ID</label>
                                        <input value={Id} disabled="disabled" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input required value={Name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                    {Name.length===0 && validation && <span className="text-danger">Enter the name</span>}
                                    </div>
                                </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                           <button className="btn btn-success" type="submit">Save</button>
                                           <Link to="/JewelryTypes" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default TypeEdit;
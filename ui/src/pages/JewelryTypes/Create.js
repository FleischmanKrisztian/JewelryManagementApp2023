import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {variables} from '../../Variables';

const TypeCreate = () => {
    const[Name,namechange]=useState("");
    const[validation,valchange]=useState(false);

    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const typedata={Name};
      
      fetch(variables.API_URL+"jewelrytype",{
        method:"POST",
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
                                <h2>Create Tip de bijuterie</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
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

export default TypeCreate;
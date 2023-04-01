import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {variables} from '../../Variables';

const TypeCreate = () => {
    const[Name,namechange]=useState("");
    const[IsUnique,IsUniquechange]=useState(true);
    const[PricePerG,pricechange]=useState("");
    const[validationName,valchange1]=useState(false);
    const[validationPrice,valchange2]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const typedata={Name,IsUnique,PricePerG};
      
      fetch(variables.API_URL+"jewelrytype",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(typedata)
      }).then((res)=>{
        if(res.status === 400) {
            navigate('/jewelrytypes?success=false');
        }
        else{
            navigate('/jewelrytypes?success=true');
        }
      }).catch((err)=>{
        console.log(err.message)
      })
    }

    const pegramchange =()=>{
        IsUniquechange(true);
        var pricePerGDiv = document.getElementById("PretPerG");
        pricePerGDiv.style.display = "block";
    }

    const pebucatachange =()=>{
        pricechange(0);
        IsUniquechange(false);
        var pricePerGDiv = document.getElementById("PretPerG");
        pricePerGDiv.style.display = "none";
    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Creaţi Tip de bijuterie</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="form-group" style={{marginBottom:'20px'}}>
                                        <div className="form-group">
                                            <label>Nume</label>
                                            <input required value={Name} onMouseDown={e=>valchange1(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                        {Name.length===0 && validationName && <span className="text-danger">Introduceţi Numele</span>}
                                        </div>
                                    </div>
                                    <div className="form-group" style={{marginBottom:'20px'}}>
                                        <div className="form-group">
                                            <label>Se vinde</label>
                                            <br></br>
                                            <div>
                                                <input type="radio" name="test" id="pegram" value="true" onChange={e=>pegramchange()} /> Pe gram
                                                <br></br>
                                                <input type="radio" name="test" id="pebucata" value="false" onChange={e=>pebucatachange()} /> Pe bucata
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12" id="PretPerG" >
                                        <div className="form-group">
                                            <label>Preţ per Gram</label>
                                            <input type={"number"} min={0} required step={0.00001} value={PricePerG} onBlur={e=>valchange2(true)} onChange={e=>pricechange(e.target.value)} className="form-control"></input>
                                        {PricePerG.length===0 && validationPrice && <span className="text-danger">Introduceţi Preţul per Gram</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                           <button className="btn btn-success" type="submit">Salvaţi</button>
                                           <Link to="/JewelryTypes" className="btn btn-danger">Înapoi</Link>
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
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {variables} from '../../Variables';

const JewelryCreate = () => {
    const[typeiddata, typedatachange] = useState([]);

    const[ShopId,shopidchange]=useState("");
    const[Weight,weightchange]=useState("0");
    const[TypeId,typechange]=useState(0);
    const[Quantity,quantitychange]=useState("");
    const[Price,pricechange]=useState("");
    const[PhotoFileName,photochange]=useState("default.png");
    const[IsUnique,uniquechange]=useState(true);

    const[validation2,valchange2]=useState(false);
    const[validation3,valchange3]=useState(false);
    const[validation4,valchange4]=useState(false);

    const PhotoPath = variables.PHOTO_URL;

    const navigate=useNavigate();

    useEffect(() => {
        fetch(variables.API_URL+"jewelrytype").then((res) => {
            return res.json();
        }).then((resp) => {
            typedatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    const filechange=(e)=>{
        imageUpload(e);
        setTimeout(() => {
            photochange(e.target.files[0].name);
        }, 1000);     
    }

    const imageUpload=(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);

        fetch(variables.API_URL+'jewelry/savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
    }

    const handlesubmit=(e)=>{
      e.preventDefault();
      const jewelrydata={ShopId,Weight,TypeId,Price,Quantity,PhotoFileName,IsUnique};
      fetch(variables.API_URL+"jewelry",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(jewelrydata)
      }).then((res)=>{
        if(res.status === 400) {
            navigate('/jewelries?success=false');
        }
        else{
            navigate('/jewelries?success=true');
        }
      }).catch((err)=>{
        console.log(err.message)
      })
    }

    function updatePriceField() {
        const weightValue = document.getElementById("weightinput").value;
        if(weightValue.length < 1){
            return;
        }
        const dropdownOption = document.getElementById("dropdowninput");
        const pricePerG = dropdownOption.options[dropdownOption.selectedIndex].getAttribute("priceperg");
        pricechange(parseFloat(weightValue)*parseFloat(pricePerG).toFixed(2).toString());
    }

    const typechangefunc=(e)=>{
        typechange(e);
        const dropdownOption = document.getElementById("dropdowninput");
        const isUnique = dropdownOption.options[dropdownOption.selectedIndex].getAttribute("isunique");
        var isTrueSet = (isUnique === 'true');
        var quantityDiv = document.getElementById("quantityDiv");
        var weightDiv = document.getElementById("weightDiv");
        var priceDiv = document.getElementById("priceDiv");
        var priceInput = document.getElementById("priceInput");
        if(isTrueSet)
        {       
            quantityDiv.style.display = "none";
            weightDiv.style.display = "block";
            priceDiv.style.display = "block";
            priceInput.setAttribute("disabled", true);
            quantitychange(1);
            uniquechange(true);
        }
        else
        {
            quantityDiv.style.display = "block";
            weightDiv.style.display = "none";
            priceDiv.style.display = "block";
            priceInput.removeAttribute("disabled");
            uniquechange(false);      
        }
        updatePriceField();
    }

    const weightchangefunc=(e)=>{
        weightchange(e);
        updatePriceField();
    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Creaţi model de bijuterie</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Cod</label>
                                            <input value={ShopId} onChange={e=>shopidchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Tip De Bijuterie</label>
                                            <select id="dropdowninput" defaultValue={""} required onBlur={e=>valchange3(true)} onChange={e=>typechangefunc(e.target.value)} className="form-control">
                                            <option disabled value={""}>Selectaţi Tipul</option>
                                                {
                                                    typeiddata.map(result=>(<option key={result.Id} priceperg={result.PricePerG} isunique={result.IsUnique.toString()} value={result.Id}>{result.Name}</option>))
                                                }
                                            </select>
                                            {TypeId==="" && validation3 && <span className="text-danger">Introduceţi Tipul</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12" id="weightDiv" style={{"display":"none"}}>
                                        <div className="form-group">
                                            <label>Greutate</label>
                                            <input id="weightinput" type={"number"} min={0} step={0.00001} required value={Weight} onBlur={e=>valchange2(true)} onChange={e=>weightchangefunc(e.target.value)} className="form-control"></input>
                                        {Weight.length===0 && validation2 && <span className="text-danger">Introduceţi Greutatea</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12" id="priceDiv" style={{"display":"none"}}>
                                        <div className="form-group">
                                            <label>Pret</label>
                                            <input id="priceInput" type={"number"} min={0} step={0.00001} disabled value={Price} onChange={e=>pricechange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12" id="quantityDiv" style={{"display":"none"}}>
                                        <div className="form-group">
                                            <label>Cantitate</label>
                                            <input type={"number"} required min={1} value={Quantity} onBlur={e=>valchange4(true)} onChange={e=>quantitychange(e.target.value)} className="form-control"></input>
                                        {Quantity.length===0 && validation4 && <span className="text-danger">Introduceţi Cantitatea</span>}
                                        </div>
                                    </div>
                                    <div className="p-2 w-50 bd-highlight">
                                        <img width="250px" height="250px"
                                        src={PhotoPath+PhotoFileName}/>
                                        <input className="form-control" type="file" onChange={e=>filechange(e)}/>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                           <button className="btn btn-success" type="submit">Salvaţi</button>
                                           <Link to="/Jewelries" className="btn btn-danger">Înapoi</Link>
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

export default JewelryCreate;
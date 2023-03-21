import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {variables} from '../../Variables';

const JewelryCreate = () => {
    const[typeiddata, typedatachange] = useState([]);

    const[ShopId,shopidchange]=useState("");
    const[Name,namechange]=useState("");
    const[Weight,weightchange]=useState("");
    const[TypeId,typechange]=useState(0);
    const[Quantity,quantitychange]=useState("");
    const[Price,pricechange]=useState("");
    const[PhotoFileName,photochange]=useState("default.png");

    const[validation1,valchange1]=useState(false);
    const[validation2,valchange2]=useState(false);
    const[validation3,valchange3]=useState(false);
    const[validation4,valchange4]=useState(false);
    const[validation5,valchange5]=useState(false);

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
      const jewelrydata={ShopId,Name,Weight,TypeId,Quantity,Price,PhotoFileName};
      fetch(variables.API_URL+"jewelry",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(jewelrydata)
      }).then((res)=>{
        if(res.status === 400) {
            alert("Create Failed!");
        }
        else{
            alert("Saved Successfully!");
        }
        navigate('/jewelries');
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
                                <h2>Creati model de bijuterie</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>ShopId</label>
                                        <input value={ShopId} onChange={e=>shopidchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={Name} onBlur={e=>valchange1(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                        {Name.length===0 && validation1 && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Greutate</label>
                                            <input type={"number"} min={0} step={0.00001} required value={Weight} onBlur={e=>valchange2(true)} onChange={e=>weightchange(e.target.value)} className="form-control"></input>
                                        {Weight.length===0 && validation2 && <span className="text-danger">Enter the Weight</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Tip De Bijuterie</label>
                                            <select defaultValue={""} required onBlur={e=>valchange3(true)} onChange={e=>typechange(e.target.value)} className="form-control">
                                            <option disabled value={""}>Choose a Type</option>
                                                {
                                                    typeiddata.map(result=>(<option onChange={e=>typechange(e.target.value)} key={result.Id} value={result.Id}>{result.Name}</option>))
                                                }
                                            </select>
                                            {TypeId==="" && validation3 && <span className="text-danger">Enter the Type</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Quantity</label>
                                            <input type={"number"} required min={0} value={Quantity} onBlur={e=>valchange4(true)} onChange={e=>quantitychange(e.target.value)} className="form-control"></input>
                                        {Quantity.length===0 && validation4 && <span className="text-danger">Enter the Quantity</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Price</label>
                                            <input type={"number"} required min={0} step={0.00001} value={Price} onBlur={e=>valchange5(true)} onChange={e=>pricechange(e.target.value)} className="form-control"></input>
                                        {Price.length===0 && validation5 && <span className="text-danger">Enter the Price</span>}
                                        </div>
                                    </div>
                                    <div className="p-2 w-50 bd-highlight">
                                        <img width="250px" height="250px"
                                        src={PhotoPath+PhotoFileName}/>
                                        <input className="form-control" type="file" onChange={e=>filechange(e)}/>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                           <button className="btn btn-success" type="submit">Save</button>
                                           <Link to="/Jewelries" className="btn btn-danger">Back</Link>
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
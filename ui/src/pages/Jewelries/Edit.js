import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {variables} from '../../Variables';

const JewelryEdit = () => {
    const { jewelryid } = useParams();
    const[Typedata, typedatachange] = useState([]);
    const PhotoPath = variables.PHOTO_STORAGE;


    useEffect(() => {
        Promise.all([
          fetch(variables.API_URL+"jewelry/edit/" + jewelryid),
          fetch(variables.API_URL+"jewelrytype"),
        ])
          .then(([jewelryDetails, typeDetails]) => 
            Promise.all([jewelryDetails.json(), typeDetails.json()])
          )
          .then(([jewelryData, typeData]) => {
            idchange(jewelryData[0].Id);
            shopidchange(jewelryData[0].ShopId);
            weightchange(jewelryData[0].Weight);
            typechange(jewelryData[0].TypeId);
            quantitychange(jewelryData[0].Quantity);
            pricechange(jewelryData[0].Price);
            photochange(jewelryData[0].PhotoFilename);
            typedatachange(typeData);
        }).catch((err) => {
            console.log(err.message);
          });
      }, []);

    const[Id,idchange]=useState("");
    const[ShopId,shopidchange]=useState("");
    const[Weight,weightchange]=useState("");
    const[TypeId,typechange]=useState("");
    const[Quantity,quantitychange]=useState("");
    const[Price,pricechange]=useState("");
    const[PhotoFileName,photochange]=useState("default.png");

    const[validation2,valchange2]=useState(false);
    const[validation3,valchange3]=useState(false);
    const[validation4,valchange4]=useState(false);
    const[validation5,valchange5]=useState(false);

    const navigate=useNavigate();

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
      const jewelryData={Id,ShopId,Weight,TypeId,Quantity,Price,PhotoFileName};
      
      fetch(variables.API_URL+"jewelry",{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(jewelryData)
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
                                        <label>ShopId</label>
                                        <input value={ShopId} onChange={e=>shopidchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Greutate</label>
                                            <input type={"number"} required  min={0} step={0.00001} value={Weight} onBlur={e=>valchange2(true)} onChange={e=>weightchange(e.target.value)} className="form-control"></input>
                                        {Weight.length===0 && validation2 && <span className="text-danger">Enter the Weight</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Tip De Bijuterie</label>
                                            <select value={TypeId} required onBlur={e=>valchange3(true)} onChange={e=>typechange(e.target.value)} className="form-control">
                                            <option disabled value={""}>Choose a Type</option>
                                                {
                                                    Typedata.map(result=>(<option onChange={e=>typechange(e.target.value)} key={result.Id} value={result.Id}>{result.Name}</option>))
                                                }
                                            </select>
                                            {TypeId==="" && validation3 && <span className="text-danger">Enter the Type</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Quantity</label>
                                            <input type={"number"} required  min={1} value={Quantity} onBlur={e=>valchange4(true)} onChange={e=>quantitychange(e.target.value)} className="form-control"></input>
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

export default JewelryEdit;
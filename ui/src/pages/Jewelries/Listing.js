import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import {variables} from '../../Variables';

const Listing = () => {
    const[jewelrydata, jewelrydatachange] = useState(null);
    const[typedata, typedatachange] = useState([]);
    const[typeFilter,valchange1]=useState("");
    const[generalFilter,valchange2]=useState("");
    const[weightSort,setWeightSort]=useState(false);
    const[typeSort,setTypeSort]=useState(false);
    const[quantitySort,setQuantitySort]=useState(false);
    const[priceSort,setPriceSort]=useState(false);
    const[searchParams] = useSearchParams();
    const[defaultObject,setDefaultObject] = useState(null);

    const navigate = useNavigate();

    const LoadEdit = (id) => {
        navigate("/jewelries/edit/" + id);
    }

    const Sellfunction = (item) => {
        console.log(variables.API_URL+"sales/" + item.Id);
        if(item.Quantity < 1) {
            toast.error("Acest Produs nu este pe stoc!")  
            return;        
        }
        fetch(variables.API_URL+"sales/" + item.Id, {
            method: "POST",
        }).then((res) => {
            if(res.status === 400) {
                navigate('/jewelries?success=false');
            }
            else{
                navigate('/jewelries?success=true');
            }
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })   
    }

    const toastHandler = (success) => {
        if(success === null)
        {
            return;
        }
        if(success === "true"){
            toast.success("Salvat cu Succes!");
        }
        else{
            toast.error("A aparut o eroare!");
        }
    }

    const onWeightSort = () =>{
        const condition = weightSort?1:-1;
        const sortedArray = jewelrydata?.sort((a,b)=>{
            return a.Weight>b.Weight? condition:-condition
        })  
        setWeightSort(!weightSort);
        jewelrydatachange([...sortedArray]);
    }
    
    const onTypeSort = () =>{
        const condition = typeSort?1:-1;
        const sortedArray = jewelrydata?.sort((a,b)=>{
            return a.Type>b.Type? condition:-condition
        })  
        setTypeSort(!typeSort);
        jewelrydatachange([...sortedArray]);
    }
    
    const onQuantitySort = () =>{
        const condition = quantitySort?1:-1;
        const sortedArray = jewelrydata?.sort((a,b)=>{
            return a.Quantity>b.Quantity? condition:-condition
        })  
        setQuantitySort(!quantitySort);
        jewelrydatachange([...sortedArray]);
    }
    
    const onPriceSort = () =>{
        const condition = priceSort?1:-1;
        const sortedArray = jewelrydata?.sort((a,b)=>{
            return a.Price>b.Price? condition:-condition
        })  
        setPriceSort(!priceSort);
        jewelrydatachange([...sortedArray]);
    }

    const fetchRowDetails = (item) => {
        var table = document.getElementById("topTable")
        table.removeAttribute("hidden");
        setDefaultObject(item);
    }

    useEffect(() => {
        toastHandler(searchParams.get("success"));
        Promise.all([
          fetch(variables.API_URL+"jewelry"),
          fetch(variables.API_URL+"jewelrytype"),
        ])
          .then(([jewelryDetails, typeDetails]) => 
            Promise.all([jewelryDetails.json(), typeDetails.json()])
          )
          .then(([jewelryData, typeData]) => {
            jewelrydatachange(jewelryData);
            typedatachange(typeData);
        }).catch((err) => {
            console.log(err.message);
          });
      }, []);

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Bijuterii</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="/jewelries/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <br></br>
                    <Toaster/>
                    <br></br>
                    <table id="topTable" hidden className="table table-striped table-bordered table-align">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Photo</td>
                                <td>Shop Id</td>
                                <td>Weight</td>
                                <td>Type</td>
                                <td>Quantity</td>
                                <td>Price</td>
                                <td>Optiuni</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img src={variables.PHOTO_STORAGE+defaultObject?.PhotoFileName} border={1} height={50} width={50}></img></td>
                                <td>{defaultObject?.ShopId}</td>
                                <td>{defaultObject?.Weight}</td>
                                <td>{defaultObject?.Type}</td>
                                <td>{defaultObject?.Quantity}</td>
                                <td>{defaultObject?.Price}</td>
                                <td>
                                    <button onClick={() => { LoadEdit(defaultObject?.Id) }} className="btn btn-primary">Edit</button>
                                    {/* <button onClick={() => { Removefunction(defaultObject?.Id) }} className="btn btn-danger">Remove</button> */}
                                    <button onClick={() => { Sellfunction(defaultObject) }} className="btn btn-success">Sell one</button>
                                </td>
                            </tr>   
                        </tbody>
                    </table>
                    <hr></hr>
                    <div style={{display:'flex',marginBottom:'20px',justifyContent:'space-evenly',width:'100%'}}>
                        <div className="col-lg-4" >
                            <div className="form-group">
                                <label>Tip De Bijuterie:</label>
                                <select defaultValue={""} onChange={e=>valchange1(e.target.value)} className="form-control">
                                <option value={""}>Toate</option>
                                    {
                                        typedata.map(result=>(<option onChange={e=>valchange1(e.target.value)} key={result.Id} value={result.Name}>{result.Name}</option>))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label>Cauta:</label>
                                <input value={generalFilter} onChange={e=>valchange2(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-bordered table-align">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Photo</td>
                                <td>Shop Id</td>
                                <td style={{cursor:"pointer"}} onClick={onWeightSort}>Weight</td>
                                <td style={{cursor:"pointer"}} onClick={onTypeSort}>Type</td>
                                <td style={{cursor:"pointer"}} onClick={onQuantitySort}>Quantity</td>
                                <td style={{cursor:"pointer"}} onClick={onPriceSort}>Price</td>
                            </tr>
                        </thead>
                        <tbody>
                            {jewelrydata &&
                                jewelrydata.map(item => ((item.Quantity > 0) && (item.Type === typeFilter || typeFilter==="") && (generalFilter==="" || item.Weight.toLowerCase().includes(generalFilter.toLowerCase()) || item.ShopId.toLowerCase().includes(generalFilter.toLowerCase())) ?
                                    <tr onClick={()=>fetchRowDetails(item)} key={item.Id}>
                                        <td><img src={variables.PHOTO_STORAGE+item.PhotoFileName} border={1} height={50} width={50}></img></td>
                                        <td>{item.ShopId}</td>
                                        <td>{item.Weight}</td>
                                        <td>{item.Type}</td>
                                        <td>{item.Quantity}</td>
                                        <td>{item.Price}</td>

                                    </tr>
                                    : null
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Listing;
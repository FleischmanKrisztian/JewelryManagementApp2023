import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {variables} from '../../Variables';

const Listing = () => {
    const [jewelrydata, jewelrydatachange] = useState(null);
    const[typedata, typedatachange] = useState([]);
    const[typeFilter,valchange1]=useState("");
    const[generalFilter,valchange2]=useState("");

    const navigate = useNavigate();

    const LoadEdit = (id) => {
        navigate("/jewelries/edit/" + id);
    }

    const Removefunction = (id) => {
        console.log(typeFilter);
        if (window.confirm('Do you want to remove?')) {
            fetch(variables.API_URL+"jewelry/" + id, {
                method: "DELETE"
            }).then((res) => {
                if(res.status === 400) {
                    alert("Failed to Remove!");
                }
                else{
                    alert("Removed Successfully");
                }
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    const Sellfunction = (id) => {
        fetch(variables.API_URL+"sales/" + id, {
            method: "POST",
        }).then((res) => {
            if(res.status === 400) {
                alert("Creating Sale Failed!");
            }
            else{
                alert("Sold Successfully");
            }
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })   
    }

    useEffect(() => {
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
                    <br></br>
                    <hr></hr>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Tip De Bijuterie:</label>
                            <select defaultValue={""} onChange={e=>valchange1(e.target.value)} className="form-control">
                            <option value={""}>Toate</option>
                                {
                                    typedata.map(result=>(<option onChange={e=>valchange1(e.target.value)} key={result.Id} value={result.Name}>{result.Name}</option>))
                                }
                            </select>
                            <label>Cauta:</label>
                            <input value={generalFilter} onChange={e=>valchange2(e.target.value)} className="form-control"></input>
                        </div>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Photo</td>
                                <td>Shop Id</td>
                                <td>Name</td>
                                <td>Weight</td>
                                <td>Type</td>
                                <td>Quantity</td>
                                <td>Price</td>
                                <td>Optiuni</td>
                            </tr>
                        </thead>
                        <tbody>
                            {jewelrydata &&
                                jewelrydata.map(item => ((item.Type === typeFilter || typeFilter==="") && (generalFilter==="" || item.Name.toLowerCase().includes(generalFilter.toLowerCase()) || item.ShopId.toLowerCase().includes(generalFilter.toLowerCase())) ?
                                    <tr key={item.Id}>
                                        <td><img src={variables.PHOTO_STORAGE+item.PhotoFileName} border={1} height={50} width={50}></img></td>
                                        <td>{item.ShopId}</td>
                                        <td>{item.Name}</td>
                                        <td>{item.Weight}</td>
                                        <td>{item.Type}</td>
                                        <td>{item.Quantity}</td>
                                        <td>{item.Price}</td>
                                        <td>
                                            <button onClick={() => { LoadEdit(item.Id) }} className="btn btn-primary">Edit</button>
                                            <button onClick={() => { Removefunction(item.Id) }} className="btn btn-danger">Remove</button>
                                            <button onClick={() => { Sellfunction(item.Id) }} className="btn btn-success">Sell one</button>
                                        </td>
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
import { useEffect, useState } from "react";
import {variables} from '../../Variables';

const Listing = () => {
    const [salesdata, salesdatachange] = useState(null);
    const[typedata, typedatachange] = useState([]);
    const[typeFilter,valchange1]=useState("");
    const[generalFilter,valchange2]=useState("");
    const[soldAfter,valchange3]=useState(new Date(new Date().setDate(new Date().getDate()-30)).toISOString().split('T')[0]);
    const[soldBefore,valchange4]=useState(new Date(new Date().setDate(new Date().getDate()+1)).toISOString().split('T')[0]);

    const Removefunction = (id) => {
        console.log(typeFilter);
        if (window.confirm('Do you want to Revert?')) {
            fetch(variables.API_URL+"sales/" + id, {
                method: "DELETE"
            }).then((res) => {
                if(res.status === 400) {
                    alert("Revert Failed!");
                }
                else{
                    alert("Sale Reverted Successfully");
                }
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        Promise.all([
          fetch(variables.API_URL+"sales"),
          fetch(variables.API_URL+"jewelrytype"),
        ])
          .then(([salesDetails, typeDetails]) => 
            Promise.all([salesDetails.json(), typeDetails.json()])
          )
          .then(([salesData, typeData]) => {
            salesdatachange(salesData);
            typedatachange(typeData);
        }).catch((err) => {
            console.log(err.message);
          });
      }, []);

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Vanzari</h2>
                </div>
                <div className="card-body">
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
                            <label>Vandut Dupa:</label>
                            <input type={"date"}value={soldAfter} onChange={e=>valchange3(e.target.value)} className="form-control"></input>
                            <label>Vandut inainte de:</label>
                            <input type={"date"} value={soldBefore} onChange={e=>valchange4(e.target.value)} className="form-control"></input>
                        </div>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Photo</td>
                                <td>Shop Id</td>
                                <td>Name</td>
                                <td>Price</td>
                                <td>Date</td>
                                <td>Type</td>
                                <td>Weight</td>
                                <td>Optiuni</td>
                            </tr>
                        </thead>
                        <tbody>
                            {salesdata &&
                                salesdata.map(item => ((soldAfter > item.DateOfTransaction < soldBefore) || (item.Type === typeFilter || typeFilter==="") && (generalFilter==="" || item.Name.toLowerCase().includes(generalFilter.toLowerCase()) || item.ShopId.toLowerCase().includes(generalFilter.toLowerCase())) ?
                                    <tr key={item.Id}>
                                        <td><img src={variables.PHOTO_STORAGE+item.PhotoFilename} border={1} height={50} width={50}></img></td>
                                        <td>{item.ShopId}</td>
                                        <td>{item.Name}</td>
                                        <td>{item.PriceAtSale}</td>
                                        <td>{item.DateOfTransaction}</td>
                                        <td>{item.Type}</td>
                                        <td>{item.Weight}</td>
                                        <td>
                                            <button onClick={() => { Removefunction(item.JewelryId) }} className="btn btn-danger">Revert</button>
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
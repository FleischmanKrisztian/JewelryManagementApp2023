import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {variables} from '../../Variables';

const Listing = () => {
    const [jewelrydata, jewelrydatachange] = useState(null);
    const navigate = useNavigate();

    const LoadEdit = (id) => {
        navigate("/jewelries/edit/" + id);
    }

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch(variables.API_URL+"jewelry/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
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
            alert('Sold successfully.')
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })   
    }

    useEffect(() => {
        fetch(variables.API_URL+"jewelry").then((res) => {
            return res.json();
        }).then((resp) => {
            jewelrydatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
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
                                jewelrydata.map(item => (
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
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {variables} from '../../Variables';

const Listing = () => {
    const [typedata, typedatachange] = useState(null);
    const navigate = useNavigate();

    const LoadEdit = (id) => {
        navigate("/jewelrytypes/edit/" + id);
    }
    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch(variables.API_URL+"jewelrytype/" + id, {
                method: "DELETE"
            }).then((res) => {
                if(res.status === 400) {
                    alert("Remove Failed!");
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

    useEffect(() => {
        fetch(variables.API_URL+"jewelrytype").then((res) => {
            return res.json();
        }).then((resp) => {
            typedatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Tipuri de Bijuterii</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="/jewelryTypes/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Name</td>
                                <td>Total_Quantity</td>
                                <td>Total_Weight</td>
                                <td>Optiuni</td>
                            </tr>
                        </thead>
                        <tbody>

                            {typedata &&
                                typedata.map(item => (
                                    <tr key={item.Id}>
                                        <td>{item.Name}</td>
                                        <td>{item.Total_Quantity}</td>
                                        <td>{item.Total_Weight}</td>
                                        <td>
                                            <button onClick={() => { LoadEdit(item.Id) }} className="btn btn-primary">Edit</button>
                                            <button onClick={() => { Removefunction(item.Id) }} className="btn btn-danger">Remove</button>
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
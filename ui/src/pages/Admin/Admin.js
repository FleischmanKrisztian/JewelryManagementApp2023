import {variables} from '../../Variables';
import { useState } from "react";

const Admin = () => {
    const CreateBackup = () => {
        if (window.confirm('Do you want to create backup?')) {
            fetch(variables.API_URL+"admin/", {
                method: "GET"
            }).then((res) => {
            if(res.status === 400) {
                alert("Backup Failed!");
            }
            else{
                alert("Backed up Successfully");
            }
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    const[RestoreLocation,restorelocationchange]=useState("");

    const RestoreFromBackup = () => {
        if (window.confirm('Do you want to Restore?')) {
            fetch(variables.API_URL+"admin/"+RestoreLocation, {
                method: "Post",
            }).then((res) => {
            if(res.status === 400) {
                alert("Restore Failed!");
            }
            else{
                alert("Restored Successfully");
            }
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Administrator Page</h2>
                </div>
                <div className="card-body">
                    <hr></hr>
                    <div className="p-2 w-50 bd-highlight">
                        <input className="form-control" type="file" onChange={e=>restorelocationchange(e.target.files[0].name)}/>
                        <button onClick={() => { RestoreFromBackup() }} className="btn btn-danger">Restore Database</button>
                    </div>
                    <div className="col-lg-12">
                        <button onClick={() => { CreateBackup() }} className="btn btn-primary">Create Database backup</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
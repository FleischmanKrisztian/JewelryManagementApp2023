import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {variables} from '../../Variables';
import toast, {Toaster} from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'

const Listing = () => {
    const[salesdata, salesdatachange] = useState(null);
    const[typedata, typedatachange] = useState([]);
    const[typeFilter,valchange1]=useState("");
    const[generalFilter,valchange2]=useState("");
    const[weightSort,setWeightSort]=useState(false);
    const[typeSort,setTypeSort]=useState(false);
    const[dateSort,setDateSort]=useState(false);
    const[priceSort,setPriceSort]=useState(false);
    const[soldAfter,valchange3]=useState(new Date(new Date().setDate(new Date().getDate()-30)).toISOString().split('T')[0]);
    const[soldBefore,valchange4]=useState(new Date(new Date().setDate(new Date().getDate()+1)).toISOString().split('T')[0]);
    const[searchParams] = useSearchParams();

    const navigate = useNavigate();
    
    const downloadPdf=()=>{
        const doc = new jsPDF();
        autoTable(doc, { 
         html: '#my-table',
         theme: 'striped', 
         columns: 
         [
          {header: '0', dataKey: 'photo'},
          {header: '1', dataKey: 'shopid'},
          {header: '2', dataKey: 'name'},
          {header: '3', dataKey: 'price'},
          {header: '4', dataKey: 'date'},
          {header: '5', dataKey: 'type'},
          {header: '6', dataKey: 'weight'},
        ],    
        });
    doc.save('Sales-' + new Date().toLocaleDateString().split('T')[0] + '.pdf');
    }

    const Removefunction = (id) => {
        console.log(typeFilter);
        if (window.confirm('Do you want to Revert?')) {
            fetch(variables.API_URL+"sales/" + id, {
                method: "DELETE"
            }).then((res) => {
                if(res.status === 400) {
                    navigate('/sales?success=false');
                }
                else{
                    navigate('/sales?success=true');
                }
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    const onWeightSort = () =>{
        const condition = weightSort?1:-1;
        const sortedArray = salesdata?.sort((a,b)=>{
            return a.Weight>b.Weight? condition:-condition
        })  
        setWeightSort(!weightSort);
        salesdatachange([...sortedArray]);
    }
    
    const onTypeSort = () =>{
        const condition = typeSort?1:-1;
        const sortedArray = salesdata?.sort((a,b)=>{
            return a.Type>b.Type? condition:-condition
        })  
        setTypeSort(!typeSort);
        salesdatachange([...sortedArray]);
    }
    
    const onDateSort = () =>{
        const condition = dateSort?1:-1;
        const sortedArray = salesdata?.sort((a,b)=>{
            return a.DateOfTransaction>b.DateOfTransaction? condition:-condition
        })  
        setDateSort(!dateSort);
        salesdatachange([...sortedArray]);
    }
    
    const onPriceSort = () =>{
        const condition = priceSort?1:-1;
        const sortedArray = salesdata?.sort((a,b)=>{
            return a.PriceAtSale>b.PriceAtSale? condition:-condition
        })  
        setPriceSort(!priceSort);
        salesdatachange([...sortedArray]);
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

    useEffect(() => {
        toastHandler(searchParams.get("success"));
        Promise.all([
          fetch(variables.API_URL+"sales"),
          fetch(variables.API_URL+"jewelrytype"),
        ])
        .then(([salesDetails, typeDetails]) => 
            Promise.all([salesDetails.json(), typeDetails.json()])
        )
        .then(([salesData, typeData]) => {
            const condition = dateSort?1:-1;
            const sortedArray = salesData?.sort((a,b)=>{
                return a.DateOfTransaction>b.DateOfTransaction? condition:-condition
            })  
            setDateSort(!dateSort);
            salesdatachange([...sortedArray]);
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
                    <Toaster/>
                    <div style={{display:'flex',marginBottom:'20px',justifyContent:'space-evenly',width:'100%'}}>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <label>Tip De Bijuterie:</label>
                                <select defaultValue={""} onChange={e=>valchange1(e.target.value)} className="form-control">
                                    <option value={""}>Toate</option>
                                    {
                                        typedata.map(result=>(<option onChange={e=>valchange1(e.target.value)} key={result.Id} value={result.Name}>{result.Name}</option>))
                                    }
                                </select>
                                <label>Vandut Dupa:</label>
                                <input type={"date"}value={soldAfter} onChange={e=>valchange3(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <label>Cauta:</label>
                            <input value={generalFilter} onChange={e=>valchange2(e.target.value)} className="form-control"></input>
                            <label>Vandut inainte de:</label>
                            <input type={"date"} value={soldBefore} onChange={e=>valchange4(e.target.value)} className="form-control"></input>
                        </div>
                    </div>
                    <button className="btn btn-primary" style={{marginBottom:'20px'}} onClick={downloadPdf}>PDF</button>
                    <table id="my-table" className="table table-bordered table-align">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Photo</td>
                                <td>Shop Id</td>
                                <td>Name</td>
                                <td style={{cursor:"pointer"}} onClick={onPriceSort}>Price</td>
                                <td style={{cursor:"pointer"}} onClick={onDateSort}>Date</td>
                                <td style={{cursor:"pointer"}} onClick={onTypeSort}>Type</td>
                                <td style={{cursor:"pointer"}} onClick={onWeightSort}>Weight</td>
                                <td>Optiuni</td>
                            </tr>
                        </thead>
                        <tbody>
                            {salesdata &&
                                salesdata.map(item => ((new Date(soldAfter) < new Date(item.DateOfTransaction) && new Date(soldBefore) > new Date(item.DateOfTransaction)) && (item.Type === typeFilter || typeFilter==="") && (generalFilter==="" || item.Name.toLowerCase().includes(generalFilter.toLowerCase()) || item.ShopId.toLowerCase().includes(generalFilter.toLowerCase())) ?
                                    <tr key={item.Id}>
                                        <td><img src={variables.PHOTO_STORAGE+item.PhotoFilename} border={1} height={50} width={50}></img></td>
                                        <td>{item.ShopId}</td>
                                        <td>{item.Name}</td>
                                        <td>{item.PriceAtSale}</td>
                                        <td>{new Date(item.DateOfTransaction).toLocaleDateString().split('T')[0]}</td>
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
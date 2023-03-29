import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import {variables} from '../../Variables';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'

const Listing = () => {
    const[jewelrydata, jewelrydatachange] = useState(null);
    const[typedata, typedatachange] = useState([]);
    const[typeFilter,valchange1]=useState("");
    const[generalFilter,valchange2]=useState("");
    const[addedAfter,valchange3]=useState(new Date(new Date().setDate(new Date().getDate()-1000)).toISOString().split(':')[0]+':00');
    const[addedBefore,valchange4]=useState(new Date(new Date().setDate(new Date().getDate()+1)).toISOString().split(':')[0]+':00');
    const[weightSort,setWeightSort]=useState(false);
    const[typeSort,setTypeSort]=useState(false);
    const[quantitySort,setQuantitySort]=useState(false);
    const[priceSort,setPriceSort]=useState(false);
    const[dateSort,setDateSort]=useState(false);
    const[searchParams] = useSearchParams();
    const[defaultObject,setDefaultObject] = useState(null);

    const navigate = useNavigate();

    const LoadEdit = (id) => {
        navigate("/jewelries/edit/" + id);
    }

    const downloadPdf=()=>{
        const doc = new jsPDF();
        var finalY = 0
        doc.text('Stoc Magazin: ' + addedAfter.toLocaleString() + ' - ' + addedBefore.toLocaleString(), 40, finalY + 15)
        doc.autoTable({
            startY: finalY + 20,
            head: headRows(),
            body: bodyRows(),
        })
        doc.save('Stoc-' + new Date().toLocaleDateString().split('Z')[0] + '.pdf');
    }

    function headRows() {
        return [
          { number: 'Numar', shopid: 'Cod', weight: 'Greutate', type:'Tip', quantity: 'Cantitate', price: 'Pret', date: 'Data Adaugarii'},
        ]
      }

      function bodyRows() {
        var table = document.getElementById('my-table');
        var tBody = table.getElementsByTagName('tbody')[0];
        var tableRow = tBody.getElementsByTagName('tr');
        var body = []
        for (var j = 1; j <= tableRow.length; j++) {
          body.push({
            number: j,
            shopid: table.rows[j].cells[1].innerHTML,
            weight: table.rows[j].cells[2].innerHTML,
            type: table.rows[j].cells[3].innerHTML,
            quantity: table.rows[j].cells[4].innerHTML,
            price: table.rows[j].cells[5].innerHTML,
            date: table.rows[j].cells[6].innerHTML,
          })
        }      
        return body
    }

    const Sellfunction = (item) => {
        if(item.Quantity < 1) {
            toast.error("Acest produs nu este pe stoc!")  
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

    const Maintenancefunction = (item) => {
        if(item.Quantity < 1) {
            toast.error("Acest produs nu este pe stoc!")  
            return;        
        }
        fetch(variables.API_URL+"maintenance/" + item.Id, {
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
            toast.error("A apărut o eroare!");
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
            return a.PricePerG*a.Weight>b.PricePerG*b.Weight? condition:-condition
        })  
        setPriceSort(!priceSort);
        jewelrydatachange([...sortedArray]);
    }

    const onDateSort = () =>{
        const condition = priceSort?1:-1;
        const sortedArray = jewelrydata?.sort((a,b)=>{
            return a.DateAdded>b.DateAdded? condition:-condition
        })  
        setDateSort(!dateSort);
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
                    <h2>Stoc</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="/jewelries/create" className="btn btn-success">Adaugă (+)</Link>
                    </div>
                    <br></br>
                    <Toaster/>
                    <br></br>
                    <table id="topTable" hidden className="table table-striped table-bordered table-align">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Photo</td>
                                <td>Cod</td>
                                <td>Greutate</td>
                                <td>Tip</td>
                                <td>Cantitate</td>
                                <td>Preţ</td>
                                <td>Data Adăugării</td>
                                <td>Opţiuni</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img src={variables.PHOTO_URL+defaultObject?.PhotoFileName} border={1} height={50} width={50}></img></td>
                                <td>{defaultObject?.ShopId}</td>
                                <td>{(defaultObject?.Total_Quantity * defaultObject?.PricePerG).toFixed(2)}</td>
                                <td>{defaultObject?.Type}</td>
                                <td>{defaultObject?.Quantity}</td>
                                <td>{(defaultObject?.PricePerG * defaultObject?.Weight).toFixed(2)}</td>
                                <td>{new Date(defaultObject?.DateAdded).toLocaleString('ro-RO')}</td>
                                <td>
                                    <button onClick={() => { LoadEdit(defaultObject?.Id) }} className="btn btn-primary">Editează</button>
                                    <button onClick={() => { Sellfunction(defaultObject) }} className="btn btn-success">Vinde</button>
                                    <button onClick={() => { Maintenancefunction(defaultObject) }} className="btn btn-warning">Avizează</button>
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
                                <label>Adăugat După:</label>
                                <input type={"datetime-local"}value={addedAfter} onChange={e=>valchange3(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="form-group">
                                <label>Cauta:</label>
                                <input value={generalFilter} onChange={e=>valchange2(e.target.value)} className="form-control"></input>
                                <label>Adăugat înainte de:</label>
                                <input type={"datetime-local"} value={addedBefore} onChange={e=>valchange4(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary" style={{marginBottom:'20px'}} onClick={downloadPdf}>PDF</button>
                    <table id="my-table" className="table table-striped table-bordered table-align">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Photo</td>
                                <td>Cod</td>
                                <td style={{cursor:"pointer"}} onClick={onWeightSort}>Greutate</td>
                                <td style={{cursor:"pointer"}} onClick={onTypeSort}>Tip</td>
                                <td style={{cursor:"pointer"}} onClick={onQuantitySort}>Cantitate</td>
                                <td style={{cursor:"pointer"}} onClick={onPriceSort}>Preţ</td>
                                <td style={{cursor:"pointer"}} onClick={onDateSort}>Data Adăugării</td>
                            </tr>
                        </thead>
                        <tbody>
                            {jewelrydata &&
                                jewelrydata.map(item => ((new Date(addedAfter) < new Date(item.DateAdded) && new Date(addedBefore) > new Date(item.DateAdded)) && (item.Quantity > 0) && (item.Type === typeFilter || typeFilter==="") && (generalFilter==="" || item.Weight.toString().includes(generalFilter.toLowerCase()) || item.Price.toString().includes(generalFilter.toLowerCase()) || item.ShopId.toLowerCase().includes(generalFilter.toLowerCase())) ?
                                    <tr onClick={()=>fetchRowDetails(item)} key={item.Id}>
                                        <td><img src={variables.PHOTO_URL+item.PhotoFileName} border={1} height={50} width={50}></img></td>
                                        <td>{item.ShopId}</td>
                                        <td>{item.Weight}</td>
                                        <td>{item.Type}</td>
                                        <td>{item.Quantity}</td>
                                        <td>{(item.PricePerG * item.Weight).toFixed(2)}</td>
                                        <td>{new Date(item.DateAdded).toLocaleString('ro-RO')}</td>
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
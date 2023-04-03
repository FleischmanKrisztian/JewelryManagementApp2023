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
    const[soldAfter,valchange3]=useState(new Date("2023-01-01").toISOString().split(':')[0]+':00');
    const[soldBefore,valchange4]=useState(new Date(new Date().setDate(new Date().getDate()+1)).toISOString().split(':')[0]+':00');
    const[weightSort,setWeightSort]=useState(false);
    const[typeSort,setTypeSort]=useState(false);
    const[dateSort,setDateSort]=useState(false);
    const[priceSort,setPriceSort]=useState(false);
    const[searchParams] = useSearchParams();
    const[defaultObject,setDefaultObject] = useState(null);
    
    const navigate = useNavigate();
    
    function headRows() {
        return [
          { number: 'Numar', shopid: 'Cod', price: 'Pret', date: 'Data vânzarii', type: 'Tip de Bijuterie', weight: 'Greutate' },
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
            price: table.rows[j].cells[2].innerHTML,
            date: table.rows[j].cells[3].innerHTML,
            type: table.rows[j].cells[4].innerHTML,
            weight: table.rows[j].cells[5].innerHTML,
          })
        }      
        return body
    }

    function getTotalPrice(){
        var table = document.getElementById("my-table"), sumVal = 0;   
        for(var i = 1; i < table.rows.length; i++)
        {
            sumVal = sumVal + parseFloat(table.rows[i].cells[2].innerHTML);
        }      
        return sumVal.toFixed(2);
    }

    function getTotalWeight(){
        var table = document.getElementById("my-table"), sumVal = 0;      
        for(var i = 1; i < table.rows.length; i++)
        {
            sumVal = sumVal + parseFloat(table.rows[i].cells[5].innerHTML);
        }
        return sumVal.toFixed(2);
    }

    const downloadPdf=()=>{
        const doc = new jsPDF();
        var finalY = 0
        doc.text('Intervalul Vânzarilor: ' + soldAfter.toLocaleString() + ' - ' + soldBefore.toLocaleString(), 40, finalY + 15)
        doc.autoTable({
            startY: finalY + 20,
            head: headRows(),
            body: bodyRows(),
            foot: [['Total:', '',getTotalPrice(),'','',getTotalWeight()]],
        })
        doc.save('Sales-' + new Date().toLocaleDateString().split('Z')[0] + '.pdf');
    }

    const Removefunction = (saleid,jewelryid) => {
        console.log(typeFilter);
        if (window.confirm('Sigur vreti să faceţi retur?')) {
            fetch(variables.API_URL+"sales/" + saleid + "/" + jewelryid, {
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

    const fetchRowDetails = (item) => {
        var table = document.getElementById("topTable")
        table.removeAttribute("hidden");
        setDefaultObject(item);
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
            toast.success("Retur cu Succes!");
        }
        else{
            toast.error("A apărut o eroare!");
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
                    <h2>Vânzări</h2>
                </div>
                <div className="card-body">
                    <table id="topTable" hidden className="table table-striped table-bordered table-align">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Photo</td>
                                <td>Cod</td>
                                <td>Preţ</td>
                                <td>Data vânzării</td>
                                <td>Tip</td>
                                <td>Greutate</td>
                                <td>Opţiuni</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={defaultObject?.Id}>
                                <td><img src={variables.PHOTO_URL+defaultObject?.PhotoFilename} border={1} height={50} width={50}></img></td>
                                <td>{defaultObject?.ShopId}</td>
                                <td>{defaultObject?.PriceAtSale}</td>
                                <td>{new Date(defaultObject?.DateOfTransaction).toLocaleString('ro-RO')}</td>
                                <td>{defaultObject?.Type}</td>
                                <td>{defaultObject?.Weight}</td>
                                <td>
                                    <button onClick={() => { Removefunction(defaultObject?.Id,defaultObject?.JewelryId) }} className="btn btn-danger">Retur</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr></hr>
                    <Toaster/>
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
                                <label>Vândut după:</label>
                                <input type={"datetime-local"}value={soldAfter} onChange={e=>valchange3(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <label>Caută:</label>
                            <input value={generalFilter} onChange={e=>valchange2(e.target.value)} className="form-control"></input>
                            <label>Vândut inainte de:</label>
                            <input type={"datetime-local"} value={soldBefore} onChange={e=>valchange4(e.target.value)} className="form-control"></input>
                        </div>
                    </div>
                    <button className="btn btn-primary" style={{marginBottom:'20px'}} onClick={downloadPdf}>PDF</button>
                    <table id="my-table" className="table table-striped table-bordered table-align">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Photo</td>
                                <td>Cod</td>
                                <td style={{cursor:"pointer"}} onClick={onPriceSort}>Preţ</td>
                                <td style={{cursor:"pointer"}} onClick={onDateSort}>Data vânzării</td>
                                <td style={{cursor:"pointer"}} onClick={onTypeSort}>Tip</td>
                                <td style={{cursor:"pointer"}} onClick={onWeightSort}>Greutate</td>
                            </tr>
                        </thead>
                        <tbody>
                            {salesdata &&
                                salesdata.map(item => ((new Date(soldAfter) < new Date(item.DateOfTransaction) && new Date(soldBefore) > new Date(item.DateOfTransaction)) && (item.Type === typeFilter || typeFilter==="") && (generalFilter==="" || item.Weight.toString().includes(generalFilter.toLowerCase()) || item.PriceAtSale.toString().includes(generalFilter.toLowerCase()) || item.ShopId.toLowerCase().includes(generalFilter.toLowerCase())) ?
                                    <tr onClick={()=>fetchRowDetails(item)} key={item.Id}>
                                        <td><img src={variables.PHOTO_URL+item.PhotoFilename} border={1} height={50} width={50}></img></td>
                                        <td>{item.ShopId}</td>
                                        <td>{item.PriceAtSale.toFixed(2)}</td>
                                        <td>{new Date(item.DateOfTransaction).toLocaleString('ro-RO')}</td>
                                        <td>{item.Type}</td>
                                        <td>{item.Weight}</td>
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
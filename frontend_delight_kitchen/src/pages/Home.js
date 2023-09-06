import axios from "axios";
import SideBar from "../components/SideBar"
import NavBar from "../components/NavBar"
import {URL} from "../config"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import '../css/Home.css'


// Defining the Home component as a functional component
const Home = () =>
{
    //state initialization
    const [tableData, setTableData]=useState([]);       
    const [BillData,setBillData]=useState([]);          //initializing the state variable BillData with an empty object ({}).

    // Function to fetch table data from the API
    const getTableData = ()=>
    {
        axios.get(`${URL}/tables`).then((response)=>
        {
            const result = response.data

            if (result['status'] === 'success')
            {
                setTableData(result['data'])
            }
            else
            {
                toast.error( "Error occured while getting table details" )
            }
        })
    }

    // Function to fetch billing amount data from the API
    const getAmountData = ()=>
    {
        const url =`${URL}/bill/data`

        axios.get(url).then((response)=>
        {
            const result = response.data

            if (result['status'] === 'success')
            {
                setBillData(result['data'])
            }
            else
            {
                toast.error( "Error occured while getting Bill details" )
            }
        })
    }

    // useEffect hook to fetch initial data on component mount
    useEffect(() => {
        getTableData();
        getAmountData();
    }, []);
    
    
    return (
    <>
        {/* Sidebar and navigation bar components */}
        <SideBar>
            <NavBar></NavBar>
            

            {/* Information section */}
            <div className="info1">
                <div className="info2">
                    {/* Today's billing amount */}
                    <div style={{ marginLeft: "0px" }} className="rectangle">
                        <p className="textinfo1"> Today </p>
                        <p className="textinfo2"> Rs. {BillData.today}</p>
                    </div>

                    {/* Yesterday's billing amount */}
                    <div className="rectangle">
                        <p className="textinfo1"> Yesterday </p>
                        <p className="textinfo2"> Rs. {BillData.yesterday}</p>
                    </div>

                    {/* Last 7 days' billing amount */}
                    <div className="rectangle">
                        <p className="textinfo1"> Last 7 Days </p>
                        <p className="textinfo2"> Rs. {BillData.week}</p>
                    </div>
                </div>
            </div>

            {/* Table information */}
            <div className="tableinfo">
                <h3>Table Information</h3>
                <hr></hr>
                <div className="tableinfo2">
                    <div className="table-wrapper-scroll-y my-custom-scrollbar">
                        {/* Table for displaying table data */}
                        <table className="table table-bordered table-hover mb-0">
                            <thead>
                                <tr className="tablerow">
                                    <th scope="col">Name</th>
                                    <th scope="col">Capacity</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Mapping over tableData to create table rows */}

                                {tableData.map((table, i) => {
                                    return (
                                    <tr key={table.tableId}>
                                        <th scope="row">  {table.tableName}  </th>
                                        <td>{table.tableCapacity}</td>
                                        <td>{table.tableStatus}</td>
                                    </tr>
                                    );
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SideBar>
    </>
    );
};
        
export default Home;  // Exporting the Home component as the default export


import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { URL } from "../config";
import '../css/Order.css';

const Orders = () => {
  const role = sessionStorage['role'];
  const userId = sessionStorage['userId'];

  // State variables Initialization
  const [orderId, setOrderId] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [orderItemData, setOrderItemData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [productId, setProductId] = useState(0);
  const [flag, setFlag] = useState(false);

  // Fetch table data based on user role
  const getTableData = () => {
    if (role === "manager") {
      axios.get(`${URL}/tables/active`).then((response) => {
        const result = response.data;
        setTableData(result.data);
      });
    } else {
      axios.get(`${URL}/tables/${userId}`).then((response) => {
        const result = response.data;
        setTableData(result.data);
      });
    }
  };

  // Fetch order details or create new order
  const getOrder = (tableId) => {
    setFlag(true);

    axios.get(`${URL}/orders/find/${tableId}`).then((response) => {
      const result = response.data;
      const { orderId } = result['data'];

      if (orderId === 0) {
        addOrder(tableId);
      } else {
        setOrderId(orderId);
        getOrderItem(orderId);
      }
    });
  };

  // Fetch order item details
  const getOrderItem = (orderId) => {
    axios.get(`${URL}/item/${orderId}`).then((response) => {
      const result = response.data;
      setOrderItemData(result.data);
    });
  };

  // Fetch active categories
  const getCategory = () => {
    axios.get(`${URL}/categories/active`).then((response) => {
      const result = response.data;
      setCategoryData(result.data);
    });
  };

  // Fetch products by category
  const getProduct = (id) => {
    axios.get(`${URL}/products/bycategory/${id}`).then((response) => {
      const result = response.data;
      setProductData(result.data);
    });
  };

  // Create a new order
  const addOrder = (tableId) => {
    const body = {
      "orderServicePersonId": userId,
      "orderTableId": tableId
    };

    axios.post(`${URL}/orders`, body).then((response) => {
      const result = response.data;
      const { orderId } = result.data;
      addBill(orderId);
      setOrderId(orderId);
      getOrderItem(orderId);
    });
  };

  // Add bill for an order
  const addBill = (orderId) => {
    const body = {
      "billOrderId": orderId
    };

    axios.post(`${URL}/bill`, body).then((response) => {
    });
  };

  // Add a new order item
  const addOrderItem = () => {
    if (productId === 0 || quantity === 0) {
      toast.warning("Enter all details");
    } else {
      const body = {
        "orderItemOrderId": orderId,
        "orderItemProductId": productId,
        "orderItemQuantity": quantity
      };

      axios.post(`${URL}/item`, body).then((response) => {
        getOrderItem(orderId);
      });
    }
  };

  // Update quantity of an order item
  const updateOrderItem = (id, quantity) => {
    if (quantity !== "") {
      const body = {
        "orderItemQuantity": quantity
      };
      axios.patch(`${URL}/item/${id}`, body).then((response) => {
        getOrderItem(orderId);
      });
    }
  };

  // Delete an order item
  const deleteOrderItem = (id) => {
    axios.delete(`${URL}/item/${id}`).then((response) => {
      getOrderItem(orderId);
    });
  };

  // Initial table data fetch
  useEffect(getTableData, []);

  return (
    <SideBar>
      <div className="title">
        <NavBar />
  
        {/* Add Order Modal */}
        <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fs-3 fw-bold" id="exampleModalLabel">Add Order</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <label style={{ marginRight: "5px", marginTop: "5px" }} className="fs-5">Category:</label>
                  <select className="form-select" onChange={(e) => { getProduct(e.target.value); }}>
                    <option disabled selected value>-- Choose Category --</option>
                    {categoryData.map((cat) => (
                      <option value={cat.categoryId} key={cat.categoryId}>{cat.categoryName}</option>
                    ))}
                  </select>
  
                  <label style={{ marginRight: "5px", marginTop: "5px" }} className="fs-5">Product:</label>
                  <select defaultValue="choose" className="form-select" onChange={(e) => { setProductId(e.target.value); }}>
                    <option disabled selected value>-- Choose Product --</option>
                    {productData.map((pro) => (
                      <option value={pro.productId} key={pro.productId}>{pro.productName}</option>
                    ))}
                  </select>
  
                  <label style={{ marginRight: "5px" }} className="fs-5">Quantity:</label>
                  <input onChange={(e) => { setQuantity(e.target.value); }} className="form-control" type="number" />
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={addOrderItem} type="button" className="btn btn-primary" data-bs-dismiss="modal">Add</button>
              </div>
            </div>
          </div>
        </div>
  
        {/* Main Order Details */}
        <div className="mainelementord">
          <h2 style={{ textAlign: "center" }}>Order Details</h2>
          <hr />
          <div className="subelementord">
            <div className="tabselector">
              {/* Table Selection */}
              <h4 style={{ marginBottom: "10px" }} className="text-decoration-underline">Choose Table:</h4>
              <div className="row">
                <div className="col">
                  <select className="form-select" onChange={(e) => { getOrder(e.target.value); }}>
                    <option disabled selected value>-- Choose Table --</option>
                    {tableData.map((tab) => (
                      <option value={tab.tableId} key={tab.tableId}>{tab.tableName}</option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  {flag ? (
                    <button data-bs-toggle="modal" data-bs-target="#addModal" onClick={getCategory} className="btn btn-success btn-md">Add</button>
                  ) : (
                    <button disabled data-bs-toggle="modal" data-bs-target="#addModal" onClick={getCategory} className="btn btn-success btn-md">Add</button>
                  )}
                </div>
              </div>
            </div>
  
            {/* Order Items Table */}
            <table id="ordtableid" style={{ textAlign: "center" }} className="table table-bordered table-hover mb-0">
              <thead>
                <tr className="tableroword">
                  <th scope="col">Product Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {orderItemData.map((oitem) => (
                  <tr key={oitem.orderItemId}>
                    <td scope="col">{oitem.orderItemName}</td>
                    <td style={{ width: "110px" }} scope="col">
                      <input
                        min="1"
                        style={{ width: "100px", textAlign: "center" }}
                        className="form-control"
                        defaultValue={oitem.orderItemQuantity}
                        onChange={(e) => {
                          updateOrderItem(oitem.orderItemId, e.target.value);
                        }}
                        type="number"
                      />
                    </td>
                    <td scope="col">{oitem.orderItemRate}</td>
                    <td scope="col">{oitem.orderItemAmount}</td>
                    <td>
                      <button
                        onClick={() => deleteOrderItem(oitem.orderItemId)}
                        className="btn btn-warning btn-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SideBar>
  );
}  

export default Orders;
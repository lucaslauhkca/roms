import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../utils/orderFetch";
import moment from "moment";

const LiveOrderPage = () => {
  const [orderData, setOrderData] = useState([]);
  const [filterState] = useState("today");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/v1/orders/");
      const resultData = result.data.orders;
      setOrderData(resultData);
    };
    fetchData();
    const interval = setInterval(() => {
      console.log("call api");
      fetchData();
    }, 10000);
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mt-5">Live Order</h2>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr className="text-center">
                  <th>Reference Number</th>
                  <th>Order Type</th>
                  <th>Ordered Time</th>
                  <th>Reserved Time</th>
                  <th className="text-end">View Order</th>
                </tr>
              </thead>
              <tbody>
                {orderData
                  .filter((order) => {
                    let todayF = moment(new Date()).format("YYYY-MM-DD");
                    if (
                      filterState == "today" &&
                      todayF.valueOf() ==
                        moment(order.createdAt)
                          .format("YYYY-MM-DD")
                          .valueOf() &&
                      order.status == "ACCEPTED"
                    ) {
                      return order;
                    }
                  })
                  .map((order, i) => (
                    <tr key={i} className="text-center">
                      <td>{order.referenceNumber}</td>
                      {order.orderType === "TAKE_OUT" ? (
                        <td>Take Out</td>
                      ) : (
                        <td>Dine In</td>
                      )}
                      <td>{moment(order.createdAt).format("lll")}</td>
                      <td>{moment(order.reserveTime).format("lll")}</td>
                      <td className="text-end">
                        <Link to={`../ViewOrder/${order._id}`}>
                          <Button size="sm">View </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveOrderPage;

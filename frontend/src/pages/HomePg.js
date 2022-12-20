import React from 'react';
import Button from 'react-bootstrap/Button';


function HomePg(){
    return (
        <div className="container">
            <div className="row">
                <h1 align="center"> Please Choose </h1>

                <br/>
                <br/>
                <br/>
                <br/>
                <table border="0">
                    <tr>&nbsp;</tr>
                    <tr>

                        <td align="center">
                        <img src='assets/dine.jpg'  alt="dine in" height="200" width="200" />
                        <div className="col-12" align="center">
                               <Button variant="outline-success">
                                       Dine In
                               </Button></div>  
                        </td>

                        <td align="center">
                        <img src='assets/take2.jpg' alt="takeaway" height="225"  width="225"/>
                        <div className="col-12" align="center">
                               <Button variant="outline-success">
                                       TakeAway
                               </Button></div>  
                        </td>
                    </tr>
                </table>

                <br/>
                <br/>
                <br/>

                <h1 align="center"> Other Services </h1>
                <table border="0">
                    <tr>&nbsp;</tr>
                    <tr>

                        <td align="center">
                        <img src='assets/customer.jpg'  alt="dine in" height="200" width="200" />
                        <div className="col-12" align="center">
                               <Button variant="outline-success">
                                      Customer Service
                               </Button></div>  
                        </td>

                        <td align="center">
                        <img src='assets/deals.jpg' alt="takeaway" height="225"  width="225"/>
                        <div className="col-12" align="center">
                               <Button variant="outline-success">
                                       Deals
                               </Button></div>  
                        </td>
                    </tr>
                </table>
            </div>
        </div>
             
       
    )
}






  
  export default HomePg;
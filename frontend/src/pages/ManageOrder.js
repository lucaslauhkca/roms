import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,  
  Button,
  Table,
  Form,
  Dropdown,
  DropdownButton,
  Card,
} from 'react-bootstrap';
import axios from '../utils/orderFetch';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ManageOrder = () => {
  const [orderData, setOrderData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterState, setFilterState] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/v1/orders/');
      const resultData = result.data.orders;
      setOrderData(resultData);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h2 className='pt-5 text-center'>Manage Order</h2>
      <Form.Label className='mb-1'>
        {' '}
        Search by Reference Number or Status{' '}
      </Form.Label>
      <Row>
        <Col sm='6'>
          <Form.Control
            className='mb-3'
            type='text'
            placeholder='e.g.: 637e6778 or Accepted'
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
          />
        </Col>
        <Col sm='6'>
          <DropdownButton
            id='dropdown-basic-button'
            className='mb-3'
            variant='success'
            title={
              filterState == 'all'
                ? 'All Orders'
                : filterState == 'today'
                ? "Today's Orders"
                : 'Past Orders'
            }
            onSelect={(e) => setFilterState(e)}
          >
            <Dropdown.Item eventKey='all'>All Orders</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey='today'>Today's Orders </Dropdown.Item>
            <Dropdown.Item eventKey='past'>Past Orders</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      <Card>
        <Card.Body>
          <Table striped hover>
          <thead>
            <tr>
              <th className='text-center'>Reference Number</th>
              <th className='text-center'>Order Type</th>
              <th className='text-center'>Status</th>
              <th className='text-center'>Ordered Time</th>
              <th className='text-center'>Reserved Time</th>
              <th className='text-end'>View Order</th>
            </tr>
          </thead>
          <tbody>
            {orderData
              .filter((order) => {
                let todayF = moment(new Date()).format('YYYY-MM-DD');
                if (filterState == 'all') {
                  if (
                    order.referenceNumber == searchKeyword ||
                    order.status == searchKeyword.toUpperCase()
                  )
                    return order;
                  else if (searchKeyword.length === 0) return order;
                } else if (
                  filterState == 'today' &&
                  todayF.valueOf() ==
                    moment(order.createdAt).format('YYYY-MM-DD').valueOf()
                ) {
                  if (
                    order.referenceNumber == searchKeyword ||
                    order.status == searchKeyword.toUpperCase()
                  )
                    return order;
                  else if (searchKeyword.length === 0) return order;
                } else if (
                  filterState == 'past' &&
                  todayF.valueOf() >
                    moment(order.createdAt).format('YYYY-MM-DD').valueOf()
                ) {
                  if (
                    order.referenceNumber == searchKeyword ||
                    order.status == searchKeyword.toUpperCase()
                  )
                    return order;
                  else if (searchKeyword.length === 0) return order;
                }
              })
              .map((order, i) => (
                <tr key={i}>
                  <td className='text-center'>{order.referenceNumber}</td>
                  {order.orderType === 'TAKE_OUT' ? (
                    <td className='text-center'>Take Out</td>
                  ) : (
                    <td className='text-center'>Dine In</td>
                  )}
                  <td className='text-center'>{order.status}</td>
                  <td className='text-center'>{moment(order.createdAt).format('lll')}</td>
                  <td className='text-center'>{moment(order.reserveTime).format('lll')}</td>
                  <td className='text-end'>
                    <Link to={`../ViewOrder/${order._id}`}>
                      <Button size='sm'>View </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ManageOrder;

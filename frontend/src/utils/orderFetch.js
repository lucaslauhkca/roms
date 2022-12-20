import axios from 'axios';

const getBaseUrl = () => {
  //will use the url of the backend later
  return '';
};

const orderFetch = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: "application/json"
});

//orderFetch.get('/api/v1/orders')

export default orderFetch;

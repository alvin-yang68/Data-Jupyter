import axios from 'axios';

const client = axios.create({
  validateStatus: (status) => status < 300,
});

export default client;

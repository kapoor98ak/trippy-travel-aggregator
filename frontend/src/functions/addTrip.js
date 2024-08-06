import axios from 'axios';
import axiosInstance from '../api/Axios';


const sendDataToBackend = async (data) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'files') {
        data[key].forEach(file => formData.append('files', file));
      } else {
        formData.append(key, data[key]);
      }
    });
  
    try {
      const response = await axiosInstance.get('/trips/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Response:', response);
    } catch (error) {
      console.error('Error sending data to backend:', error);
      throw error;
    }
  };
  
  export default sendDataToBackend;




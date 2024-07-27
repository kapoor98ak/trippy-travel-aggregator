import axios from 'axios';

const sendDataToBackend = async (data) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        if (key === 'files') {
            data[key].forEach(file => formData.append('files', file));
        } else if (typeof data[key] === 'object') {
            formData.append(key, JSON.stringify(data[key])); // Handle nested objects like amenities
        } else {
            formData.append(key, data[key]);
        }
    });
    console.log("Form data prepared successfully");

    try {
        const response = await axios.post('http://localhost:3000/api/trips/create', formData, {
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

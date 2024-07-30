import axios from 'axios';


const sendDataToBackendForEditTrip = async (data, id) => {
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
        const response = await axios.put(`http://localhost:3000/api/trips/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Response:', response);
        return response.data;
    } catch (error) {
        console.error('Error sending data to backend:', error);
        throw error;
    }
};

export default sendDataToBackendForEditTrip;
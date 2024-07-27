const sendDataToBackend = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        if (key === 'files') {
            data[key].forEach(file => formData.append('files', file));
        } else {
            formData.append(key, data[key]);
        }
    });

    try {
        const response = await axios.post('http://localhost:3000/api/trips/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('Response:', response);
    } catch (error) {
        console.error('Error sending data to backend:', error);
        throw error;
    }
};

export default sendDataToBackend;
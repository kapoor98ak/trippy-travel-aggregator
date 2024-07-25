// Spinner.jsx
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress style={{ color: 'blue' }} thickness={5} />
            </Box>
    );
}

export default Spinner;

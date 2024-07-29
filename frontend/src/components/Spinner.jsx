import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = () => {
    return (
        <Box 
            sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <CircularProgress color="info" aria-label="Info spinner example" />
        </Box>
    );
};

export default Spinner;

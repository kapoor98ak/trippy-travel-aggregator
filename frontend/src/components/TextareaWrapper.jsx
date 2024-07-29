import React from 'react';
import { TextareaAutosize } from '@mui/material';
import { FormControl } from '@mui/material';

const TextareaWrapper = ({ value, onChange, error, helperText, ...props }) => {
    return (
        <FormControl fullWidth error={!!error}>
            <TextareaAutosize
                minRows={8}
                style={{ width: '100%' }}
                value={value}
                onChange={onChange}
                {...props}
            />
            {helperText && <p style={{ color: 'red' }}>{helperText}</p>}
        </FormControl>
    );
};

export default TextareaWrapper;

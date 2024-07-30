import React, { useState, useEffect, useContext } from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/Axios.jsx';
import { AuthContext } from "../context/AuthContext";

function DisplayRequests() {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('');
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchRequests = async () => {
            if (auth && auth.user && auth.token) {

            try {
                   
                const userRole = auth.user.role;
                const userId = auth.user._id;
                const token = auth.token;

                let url = '';
                if (userRole === 'traveler') {
                    url = `travelrequests/traveler/${userId}`;
                } else if (userRole === 'agent') {
                    url = `travelrequests/agent/${userId}`;
                }

                const response = await axiosInstance.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.data) {
                    setRequests(response.data);
                } else {
                    alert('No requests found');
                }
            }
           
            catch (error) {
                console.error('Error fetching requests:', error);
                alert('Error fetching requests');
            } } 
            // else{
            //     alert("User not logged in. Please log in.");
            //     navigate('/login');
            //     return;
            // }
        };

        fetchRequests();
    }, [auth, navigate]);

    const handleApprove = async (id) => {
        try {
            const token = auth.token;
            await axiosInstance.put(`travelrequests/request/${id}/approve`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setRequests(requests.filter(request => request._id !== id));
            alert('Request approved successfully.');
        } catch (error) {
            console.error('Error approving request:', error);
            alert('Error approving request.');
        }
    };

    const handleReject = async (id) => {
        try {
            const token = auth.token;
            await axiosInstance.put(`travelrequests/request/${id}/reject`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setRequests(requests.filter(request => request._id !== id));
            alert('Request rejected successfully.');
        } catch (error) {
            console.error('Error rejecting request:', error);
            alert('Error rejecting request.');
        }
    };
    if (!auth || !auth.user) {
        return <Typography>Loading...</Typography>;
    }

    // Filter requests based on role
    const filteredRequests = auth.user.role === 'agent'
        ? requests.filter(request => request.status === 'pending')
        : requests;

    // Render table for traveler and accordion for agent
    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        {auth.user.role  === 'agent' ? 'Manage Travel Requests' : 'Your Travel Requests'}
                    </Typography>
                    {auth.user.role === 'agent' ? (
                        filteredRequests.length > 0 ? (
                            filteredRequests.map((request) => (
                                <Accordion key={request._id}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>{request.title} - {request.status}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>Source: {request.source}</Typography>
                                        <Typography>Destination: {request.destination}</Typography>
                                        <Typography>Start Date: {request.startDate}</Typography>
                                        <Typography>End Date: {request.endDate}</Typography>
                                        <Typography>Budget: ${request.budget}</Typography>
                                        <Typography>Number of Travellers: {request.numOfTravellers}</Typography>
                                        <Typography>Amenities: {request.amenities.join(', ')}</Typography>
                                        <Grid container spacing={2} sx={{ mt: 2 }}>
                                            <Grid item>
                                                <Button variant="contained" color="primary" onClick={() => handleApprove(request._id)}>
                                                    Approve
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" color="secondary" onClick={() => handleReject(request._id)}>
                                                    Reject
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        ) : (
                            <Typography>No travel requests found.</Typography>
                        )
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Source</TableCell>
                                        <TableCell>Destination</TableCell>
                                        <TableCell>Start Date</TableCell>
                                        <TableCell>End Date</TableCell>
                                        <TableCell>Budget</TableCell>
                                        <TableCell>Number of Travellers</TableCell>
                                        <TableCell>Amenities</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {requests.length > 0 ? (
                                        requests.map((request) => (
                                            <TableRow key={request._id}>
                                                <TableCell>{request.title}</TableCell>
                                                <TableCell>{request.source}</TableCell>
                                                <TableCell>{request.destination}</TableCell>
                                                <TableCell>{request.startDate}</TableCell>
                                                <TableCell>{request.endDate}</TableCell>
                                                <TableCell>${request.budget}</TableCell>
                                                <TableCell>{request.numOfTravellers}</TableCell>
                                                <TableCell>{request.amenities.join(', ')}</TableCell>
                                                <TableCell>{request.status}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={8}>No travel requests found.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Container>
            </Box>
        </Box>
    );
}

export default DisplayRequests;

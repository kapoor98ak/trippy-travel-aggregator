import React, { useEffect, useState } from 'react';
import { Box, Grid, InputLabel, MenuItem, Paper, Select, Typography, FormControl } from '@mui/material';
import { styled } from '@mui/system';
import axios from "axios";
import { BarChart } from '@mui/x-charts';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
}));

const getMonthWiseUserURL = "/admin/getMonthWiseTravellerCountForYear";
const getMonthWiseAgentURL = "/admin/getMonthWiseAgentCountForYear";
const getTotalUsersURL = "/admin/getTotalTravellers";
const getTotalAgentsURL = "/admin/getTotalAgents";
const getTotalActiveTripURL = "/admin/getActiveTripCount";
const getAgentsApprovalRatioURL = "/admin/getAgentsApprovalRatio";
const getYearsListURL = "/admin/getUniqueYearsFromUsers"

export default function AdminHomePage() {
    const [yearsList, setYearsList] = useState([])
    const [selectedYear, setSelectedYear] = useState(2024)

    const [monthWiseUserChart, setMonthWiseUserChart] = useState([]);
    const [monthWiseAgentChart, setMonthWiseAgentChart] = useState([]);
    const [totalUsersCount, setTotalUsersCount] = useState(0);
    const [totalAgentsCount, setTotalAgentsCount] = useState(0);
    const [totalActiveTripsCount, setTotalActiveTripsCount] = useState(0);
    const [agentApprovalRatio, setAgentApprovalRatio] = useState(0);

    useEffect(() => {
        GetYearsList();

        GetMonthWiseUserByYear();
        GetMonthWiseAgentByYear();
        GetTotalUserCount();
        GetTotalAgentCount();
        GetTotalActiveTripsCount();
        GetAgentApprovalRatio();
    }, []);

    useEffect(() => {
        GetMonthWiseUserByYear();
        GetMonthWiseAgentByYear();
    }, [selectedYear]);

    async function GetMonthWiseUserByYear() {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}${getMonthWiseUserURL}/${selectedYear}`);
        setMonthWiseUserChart(response.data);
    }

    async function GetMonthWiseAgentByYear() {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}${getMonthWiseAgentURL}/${selectedYear}`);
        setMonthWiseAgentChart(response.data);
    }

    async function GetTotalUserCount() {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}${getTotalUsersURL}`);
        setTotalUsersCount(response.data.totalCount);
    }

    async function GetTotalAgentCount() {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}${getTotalAgentsURL}`);
        setTotalAgentsCount(response.data.totalCount);
    }

    async function GetTotalActiveTripsCount() {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}${getTotalActiveTripURL}`);
        setTotalActiveTripsCount(response.data.totalCount);
    }

    async function GetAgentApprovalRatio() {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}${getAgentsApprovalRatioURL}`);
        setAgentApprovalRatio(response.data.ratio);
    }

    async function GetYearsList() {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}${getYearsListURL}`);
        setYearsList(response.data);
    }

    async function handleSelectedYearChange(event) {
        setSelectedYear(event.target.value)
        // console.log(`Incoming year: ${event.target.value}`)
        // console.log(`Set year: ${selectedYear}`)
        // GetMonthWiseUserByYear();
        // GetMonthWiseAgentByYear();
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Item>
                        Total users
                        <Typography variant="h3" component="h3">{totalUsersCount}</Typography>
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        Total agents
                        <Typography variant="h3" component="h3">{totalAgentsCount}</Typography>
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        Total active trips
                        <Typography variant="h3" component="h3">{totalActiveTripsCount}</Typography>
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>
                        Agent approval ratio
                        <Typography variant="h3" component="h3">{agentApprovalRatio} %</Typography>
                    </Item>
                </Grid>
            </Grid>
            <Box sx={{ ml: 7, mt: 2 }}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedYear}
                        label="Age"
                        onChange={handleSelectedYearChange}
                    >
                        {
                            yearsList.map(year => (
                                <MenuItem key={year} value={year}>{year}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item>
                        <BarChart
                            width={700}
                            height={300}
                            dataset={monthWiseUserChart}
                            xAxis={[{
                                scaleType: 'band',
                                dataKey: 'month',
                                label: `Month wise new users - ${selectedYear}`,
                            }]}
                            yAxis={[{
                                label: 'Count'
                            }]}
                            series={[{
                                dataKey: 'count',
                                label: 'Users',
                                showLabel: true,
                            }]}
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <BarChart
                            width={700}
                            height={300}
                            dataset={monthWiseAgentChart}
                            xAxis={[{
                                scaleType: 'band',
                                dataKey: 'month',
                                label: `Month wise new agents - ${selectedYear}`,
                            }]}
                            yAxis={[{
                                label: 'Count'
                            }]}
                            series={[{
                                dataKey: 'count',
                                label: 'Agents',
                                showLabel: true,
                            }]}
                        />
                    </Item>
                </Grid>
            </Grid>
        </>
    );
}
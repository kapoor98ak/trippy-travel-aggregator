import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  FormControl,
  Button,
  Snackbar,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { BarChart } from "@mui/x-charts";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
}));

const getMonthWiseUserURL = "/admin/getMonthWiseTravellerCountForYear";
const getMonthWiseAgentURL = "/admin/getMonthWiseAgentCountForYear";
const getTotalUsersURL = "/admin/getTotalTravellers";
const getTotalAgentsURL = "/admin/getTotalAgents";
const getTotalActiveTripURL = "/admin/getActiveTripCount";
const getAgentsApprovalRatioURL = "/admin/getAgentsApprovalRatio";
const getYearsListURL = "/admin/getUniqueYearsFromUsers";
const getUnapprovedAgentListURL = "/admin/getUnApprovedAgentsList";
const approveAgentURL = "/admin/approveAgentById";
const rejectAgentURL = "/admin/rejectAgentById";

export default function AdminDashboard() {
  const [yearsList, setYearsList] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [monthWiseUserChart, setMonthWiseUserChart] = useState([]);
  const [monthWiseAgentChart, setMonthWiseAgentChart] = useState([]);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [totalAgentsCount, setTotalAgentsCount] = useState(0);
  const [totalActiveTripsCount, setTotalActiveTripsCount] = useState(0);
  const [agentApprovalRatio, setAgentApprovalRatio] = useState(0);

  const [unApprovedAgentsList, setUnApprovedAgentsList] = useState([]);

  useEffect(() => {
    GetYearsList();

    GetMonthWiseUserByYear();
    GetMonthWiseAgentByYear();
    GetTotalUserCount();
    GetTotalAgentCount();
    GetTotalActiveTripsCount();
    GetAgentApprovalRatio();
    GetUnApprovedAgentsList();
  }, []);

  useEffect(() => {
    GetMonthWiseUserByYear();
    GetMonthWiseAgentByYear();
  }, [selectedYear]);

  // useEffect(() => {
  //   GetAgentApprovalRatio();
  //   GetUnApprovedAgentsList();
  // }, [unApprovedAgentsList])

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastVisible(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleToastClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  async function GetMonthWiseUserByYear() {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}${getMonthWiseUserURL}/${selectedYear}`
    );
    setMonthWiseUserChart(response.data);
  }

  async function GetMonthWiseAgentByYear() {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}${getMonthWiseAgentURL}/${selectedYear}`
    );
    setMonthWiseAgentChart(response.data);
  }

  async function GetTotalUserCount() {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}${getTotalUsersURL}`
    );
    setTotalUsersCount(response.data.totalCount);
  }

  async function GetTotalAgentCount() {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}${getTotalAgentsURL}`
    );
    setTotalAgentsCount(response.data.totalCount);
  }

  async function GetTotalActiveTripsCount() {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}${getTotalActiveTripURL}`
    );
    setTotalActiveTripsCount(response.data.totalCount);
  }

  async function GetAgentApprovalRatio() {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}${getAgentsApprovalRatioURL}`
    );
    setAgentApprovalRatio(response.data.ratio);
  }

  async function GetYearsList() {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}${getYearsListURL}`
    );
    setYearsList(response.data);
  }

  async function handleSelectedYearChange(event) {
    setSelectedYear(event.target.value);
  }

  async function GetUnApprovedAgentsList(id) {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}${getUnapprovedAgentListURL}`,
      { id: id }
    );
    setUnApprovedAgentsList(response.data);
    console.log(response.data);
  }

  const columns = [
    // {
    //   field: "name",
    //   headerName: "Name",
    //   width: 200,
    // },
    {
      field: "firstName",
      headerName: "First name",
      width: 200,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    { field: "createdAt", headerName: "Creation time", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: 8 }}
            onClick={() => handleApprove(params.id)}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleReject(params.id)}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  const handleApprove = async (id) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}${approveAgentURL}`,
      { id: id }
    );
    if (response.data.status) {
      setToastMessage("Agent approved !");
    } else {
      setToastMessage("Agent approve failed !");
    }
    setToastVisible(true);
    GetUnApprovedAgentsList();
    GetAgentApprovalRatio();
  };

  const handleReject = async (id) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}${rejectAgentURL}`,
      { id: id }
    );
    if (response.data.status) {
      setToastMessage("Agent rejected !");
    } else {
      setToastMessage("Agent rejection failed !");
    }
    setToastVisible(true);
    GetUnApprovedAgentsList();
    GetAgentApprovalRatio();
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} sm={6}>
          <Item>
            Total users
            <Typography variant="h3" component="h3">
              {totalUsersCount}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <Item>
            Total agents
            <Typography variant="h3" component="h3">
              {totalAgentsCount}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <Item>
            Total active trips
            <Typography variant="h3" component="h3">
              {totalActiveTripsCount}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <Item>
            Agent approval ratio
            <Typography variant="h3" component="h3">
              {agentApprovalRatio} %
            </Typography>
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
            {yearsList.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sm={12}>
          <Item>
            <Box sx={{ width: "100%", height: { xs: 300, md: 400 } }}>
              <BarChart
                dataset={monthWiseUserChart}
                xAxis={[
                  {
                    scaleType: "band",
                    dataKey: "month",
                    label: `Month wise new users - ${selectedYear}`,
                  },
                ]}
                yAxis={[
                  {
                    label: "Count",
                  },
                ]}
                series={[
                  {
                    dataKey: "count",
                    label: "Users",
                    showLabel: true,
                  },
                ]}
              />
            </Box>
          </Item>
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <Item>
            <Box sx={{ width: "100%", height: { xs: 300, md: 400 } }}>
              <BarChart
                dataset={monthWiseAgentChart}
                xAxis={[
                  {
                    scaleType: "band",
                    dataKey: "month",
                    label: `Month wise new agents - ${selectedYear}`,
                  },
                ]}
                yAxis={[
                  {
                    label: "Count",
                  },
                ]}
                series={[
                  {
                    dataKey: "count",
                    label: "Agents",
                    showLabel: true,
                  },
                ]}
              />
            </Box>
          </Item>
        </Grid>
      </Grid>

      <Typography
        variant="h3"
        component="h3"
        sx={{ paddingLeft: "30px", paddingTop: "50px", marginBottom: "30px" }}
      >
        Agent approval requests:
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid
          item
          xs={12}
          sm={12}
          md={10}
          lg={7}
          xl={7}
          sx={{
            width: {
              xs: "100%", // 100% width for extra-small screens
              sm: "100%", // 90% width for small screens
              md: "100%", // 80% width for medium screens
              lg: "50%", // 70% width for large screens
              xl: "50%", // 60% width for extra-large screens
            },
            margin: "auto",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              height: 400,
              width: "100%",
              margin: "auto",
              p: 2, // padding
            }}
          >
            <DataGrid
              rows={unApprovedAgentsList}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              getRowId={(row) => row._id}
            />
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={toastVisible}
        autoHideDuration={6000}
        onClose={handleToastClose}
        message={toastMessage}
        action={action}
      />
    </>
  );
}

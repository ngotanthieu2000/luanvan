import React, { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import InventoryIcon from "@mui/icons-material/Inventory";
import {activeUser, disableUser, getAllUser, validAdmin } from "../../api/auth";
import {
  Tooltip,
  Box,
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  IconButton,
  Typography,
  Avatar,
  Modal,
  Grid,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/system";
import { showErrorToastMessage } from "../../utils/toast.alert";

export default function ListUser({ showUpdateProduct }) {
  let navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [updateUser, setUpdateUser] = useState({});
  const [openValidChangeStatus, setOpenValidChangeStatus] = useState(false);
  const handleCloseValidChangeStatus = () => setOpenValidChangeStatus(false);

  // product handle
  const [users, setUsers] = useState();
  useEffect(() => {
    async function fetchData() {
      const { element } = await getAllUser();
      console.log("getAllUser", element);
      setUsers(element);
    }
    fetchData();
    console.log("users", users);
  }, []);
  // modal controll
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  // fetch data Type
  // const [item, setItem] = useState({});
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
const handleDisableUser = async (id)=>{
  const res = await disableUser({_id:id});
  console.log('res diableUser:', res)
  if(res.status === "Success"){
    setUsers(users.map((element)=>{
      return element._id == res.element._id
      ? { ...element, status: res.element.status }
      : element;
    }))
  }
}
const handleActiveUser = async (id)=>{
  const res = await activeUser({_id:id});
  console.log('res acriveUser:', res)
  if(res.status === "Success"){
    setUsers(users.map((element)=>{
      return element._id == res.element._id
      ? { ...element, status: res.element.status }
      : element;
    }))
  }
}
const handleChangeStatusUser = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  console.log({ passsword: data.get("password"),email:localStorage.getItem('email')});
  const res = await validAdmin({ password: data.get("password"),email:localStorage.getItem('email')})
  console.log("res valid:",res)
  if(res.status === "Success"){
    if(updateUser?.status === 'active')
    {
      handleDisableUser(updateUser._id)
    }else {
      handleActiveUser(updateUser._id)
    }
  }
  else{
    showErrorToastMessage(res.msg)
  }

  handleCloseValidChangeStatus()
};
  const columns = [
    { field: '_id', headerName: 'ID', width: 300 },
    {
      field: 'avatar',
      headerName: 'Avatar',
      renderCell:(params)=>{
        return (
          <Stack direction='row' alignItems="center" spacing ={1}>
              <Avatar
                alt="Remy Sharp"
                src={
                  params.row.avatar && params.row.avatar != 'unknown'
                    ? `http://localhost:5000/static/public/users/${params.row.avatar}`
                    : require("../../public/image/avatardefault.png")
                }
              />
              {/* <Typography>{params.row.name}</Typography> */}
          </Stack>
        )
      },
      width: 100,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Full Name',
      width: 250,
      editable: false,
    },
    {
      field: 'phone',
      headerName: 'Phone number',
      width: 200,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'number',
      width: 250,
      editable: false,
    },
    {
      field: 'role',
      headerName: 'Role',
      type: 'number',
      width: 150,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell:(params)=>{
        return (
          <>
            <Typography
              color={
                params.row.status === "active" ? "primary" : "error"
              }
              name={params.row.status === "active" ? 'Active':'Disable'}
            >
              {params.row.status}
            </Typography>
          </>
        )
      },
      width: 200,
      editable: false,
    },
    {
      headerName: 'Control',
      renderCell:(params)=>{
        return (
          <>
          {params.row.status === "active" ? 
          (<Stack direction={'row'} spacing={1}>
              <Button variant="outlined" 
              onClick={()=>{
                setOpenValidChangeStatus(true)
                setUpdateUser(params.row)
                }} 
                color="error">Disable</Button>
            </Stack>)
            :(
              <Button variant="outlined" onClick={()=>{
                setOpenValidChangeStatus(true)
                setUpdateUser(params.row)
                }} 
                >Active</Button>
            )
            }
          </>
        )
      },
      width: 400  ,
      editable: false,
    },
  ];
  return (
    <>
    <Box sx={{
          "& > :not(style)": {
            m: 1,
            width: "100%",
            height:650  
          },
        }}>
      <DataGrid
        rows={users ? users : []}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        // disableSelectionOnClick
        // columnVisibilityModel={columnVisibilityModel}
        // onColumnVisibilityModelChange={(newModel) =>
        //   setColumnVisibilityModel(newModel)
        // }
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row) => row._id}
      />
    </Box> 
    <Modal
      open={openValidChangeStatus}
      onClose={handleCloseValidChangeStatus}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          You really want to continue ?
        </Typography>
        
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
        >
        Please enter your password to continue.
        </Typography>
          <Box
          id="modal-modal-description"
          component="form"
          noValidate
          onSubmit={(e)=>handleChangeStatusUser(e)}
          sx={{ mt: 3 }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyItems: "center",
            }}
          >
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="password"
                name="password"
                fullWidth
                id="password"
                label="Input Password"
                type='password'
                autoFocus
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Continue
          </Button>
        </Box>

      </Box>
    </Modal>
   </>
  );
}

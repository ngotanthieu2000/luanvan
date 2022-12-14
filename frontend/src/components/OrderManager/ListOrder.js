import React, { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import {approveOrder, getAllOrder, getAllUser, rejectOrder } from "../../api/auth";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/system";

export default function ListOrder() {
  let navigate = useNavigate();
  // product handle
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await getAllOrder();
      console.log("getAll order", res);
      setOrders(res.element);
    }
    fetchData();
  }, []);

  // handle
  const handleApproveOrder = async(id)=>{
    const res = await approveOrder({_id:id});
    console.log("res approveOrder:",res)
    if(res.status === "Success"){
      setOrders(orders.map((element)=>{
        return element._id == res.element._id
        ? { ...element, status: res.element.status }
        : element;
      }))
    }
  }
  const handleRejectOrder = async(id)=>{
    const res = await rejectOrder({_id:id});
    console.log("res rejectOrder:",res)
    if(res.status === "Success"){
      setOrders(orders.map((element)=>{
        return element._id == res.element._id
        ? { ...element, status: res.element.status }
        : element;
      }))
    }
  }
  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'user',
      headerName: 'User',
      renderCell:(params)=>{
        return (
          <Stack direction='row' alignItems="center" spacing ={1}>
              <Avatar
                alt="Remy Sharp"
                src={
                  params.row.user.avatar
                    ? `http://localhost:5000/static/public/users/${params.row.user.avatar}`
                    : require("../../public/image/avatardefault.png")
                }
              />
              <Typography>{params.row.user.name}</Typography>
          </Stack>
        )
      },
      width: 200,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: false,
    },
    {
      field: 'subTotal',
      headerName: 'Subtotal',
      width: 100,
      editable: false,
    },
    {
      field: 'amount_shipping',
      headerName: 'Amount Shipping',
      type: 'number',
      width: 150,
      editable: false,
    },
    {
      field: 'amount_discount',
      headerName: 'Amount Discount',
      type: 'number',
      width: 150,
      editable: false,
    },
    {
      field: 'checkout',
      headerName: 'Checkout',
      renderCell:(params)=>{
        return (
          <Typography>{params.row.checkout.session_checkout}</Typography>
        )
      },
      width: 200,
      editable: false,
    },
    {
      field: 'payment',
      headerName: 'Payment',
      renderCell:(params)=>{
        return (
          <Typography>{params.row.payment.payment_intent}</Typography>
        )
      },
      width:200,
      editable: false,
    },
    {
      // field: 'updatedAt',
      headerName: 'Control',
      renderCell:(params)=>{
        return (
          <>
          {params.row .status === "Pending" ? 
          (<Stack direction={'row'} spacing={1}>
              <Button variant="outlined" onClick={()=>handleApproveOrder(params.row._id)}>Aprrove</Button>
              <Button variant="outlined" onClick={()=>handleRejectOrder(params.row._id)} color="error">Reject</Button>
            </Stack>)
            :undefined
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
            height:600  
          },
        }}>
      <DataGrid
        rows={orders}
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
   </>
  );
}

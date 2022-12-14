import React, { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import InventoryIcon from "@mui/icons-material/Inventory";
import { DataGrid } from '@mui/x-data-grid';
import {
  getAllProducts,
  getCategories,
  getProducts,
} from "../../api/api_instance";
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
  TextField,
  Grid,
  Typography,
  Modal,
} from "@mui/material";
import { customers } from "../../__mocks__/customers";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { activeProduct, disableProduct, updateInventory, validAdmin } from "../../api/auth";
import { showErrorToastMessage, showSuccessToastMessage } from "../../utils/toast.alert";
import OverallRating from "./OverallRating";
import StatusButton from "./StatusButton";
import Avatar from "./Avatar";
import { useLayoutEffect } from "react";

export default function ListType({ showUpdateProduct ,processLoading}) {
  let navigate = useNavigate();
  const [openUpdateInventory, setOpenUpdateInventory] = useState(false);
  const [openValidChangeStatus, setOpenValidChangeStatus] = useState(false);
  const handleCloseValidChangeStatus = () => setOpenValidChangeStatus(false);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [productUpdate, setProductUpdate] = useState({});
  const [updateInventoryProduct, setUpdateInventoryProduct] = useState();
  // product handle
  const [products, setProducts] = useState([]);
  async function fetchData() {
    const { element } = await getAllProducts();
    console.log("product_fetch", element);
    setProducts(element);
  }
  useEffect(() => {
    fetchData();
    // console.log("products", products);
  }, []);
  // modal controll
  const [modalProductUpdate, setModalProductUpdate] = useState(false);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  // fetch data Type
  const [type, setType] = useState([]);
  const [isType, setIsType] = useState("");
  const handleChangeType = (event) => {
    // console.log("Change Type:::",event.target.value)
    setIsType(event.target.value);
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     const { element } = await getCategories();
  //     console.log("categories fetch data:::",element)
  //   }
  //   fetchData();
  // }, []);
  // controll atributes
  const [attributes, setAttributes] = useState([]);
  // const [item, setItem] = useState({});
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleAddAtribute = async (event) => {
    event.preventDefault();
    let item = { key, value };
    if (item?.key && item?.value) {
      setAttributes((current) => [...current, item]);
    }
    // console.log("item:", item);
    // console.log("attributes:", attributes);
  };
  const handleGetType = async () => {
    const { element } = await getCategories();
    setType(element);
  };
  //change image
  const [image, setImage] = useState();
  const handleChangeImage = async (event) => {
    setImage(event.target.files);
    console.log("file", event.target.files);
  };
  // update product
  const [indexUpdate, setIndexUpdate] = useState();
  const handleUpdateProduct = async (index) => {
    console.log("Data product current:::", products[index]);
  };

  //inventory
  const handleCloseUpdateInventory = () => setOpenUpdateInventory(false);

  const [qty, setQty] = useState();
  function setNewProducts(value) {
    setProducts(value);
  }
  const handleSubmitUpdateInventory = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("_id", updateInventoryProduct);
    console.log({ _id: data.get("_id"), qty: data.get("quantity") });
    const res = await updateInventory({
      _id: data.get("_id"),
      quantity: data.get("quantity"),
    });
    if(res.status === "Success"){
      console.log(`Res update inventory ${updateInventoryProduct} :::`,res)
      let temp = products.map((element)=>{
        if(element._id == updateInventoryProduct){
          element.inventory[0].quantity = res.element.quantity;
          return element;
        }
        return element;
      })
      console.log({temp})
      setProducts(temp)
      // await fetchData();
    }
    setOpenUpdateInventory(false);
  };
  const handleChangeStatusProduct = async (event,index) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({ passsword: data.get("password"),email:localStorage.getItem('email')});
    const res = await validAdmin({ password: data.get("password"),email:localStorage.getItem('email')})
    console.log("res valid:",res)
    if(res.status === "Success"){
      if (productUpdate?.status === "Active") {
        showSuccessToastMessage("Disable Product");
        const res = await disableProduct({ _id: productUpdate?._id });
        if (res.status === "Success") {
          setProducts(
            products.map((element) => {
              return element._id == productUpdate?._id
                ? { ...element, status: res.element.status }
                : element;
            })
          );
        }
        console.log("Res disable product:", res);
      } else {
        showSuccessToastMessage("Active Product");
        const res = await activeProduct({ _id: productUpdate?._id });
        if (res.status === "Success") {
          setProducts(
            products.map((element) => {
              return element._id == productUpdate?._id
                ? { ...element, status: res.element.status }
                : element;
            })
          );
        }
        console.log("Res active product:", res);
      }
    }
    else{
      showErrorToastMessage(res.msg)
    }

    handleCloseValidChangeStatus()
  };

const handleChangeStatus = async ()=>{
  setOpenValidChangeStatus(true)
}

  // data grid
  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'attachments',
      headerName: 'Avatar',
      renderCell:Avatar,
      width: 80,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Product name',
      renderCell:(params)=>{
        return (
          <Typography onClick={()=>{
            navigate(`/detail-product/${params.row.name}/${params.row._id}`,{state:{product:params.row,productId:params.row._id}} ,{target:"_blank"})}
          }>{params.row.name}</Typography>
        )
      },
      width: 350, 
      editable: false,
    },
    {
      field: 'categories',
      headerName: 'Categories name',
      width: 150,
      editable: false,
    },
    {
      field: 'type',
      headerName: 'Type name',
      // type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'brand',
      headerName: 'Brand name',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'sale',
      headerName: 'Sale',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'sold',
      headerName: 'Sold',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'view',
      headerName: 'View',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'overallReview',
      headerName: 'Overall Rating',
      // type: 'number',
      renderCell: OverallRating,
      width: 170,
      editable: false,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 100,
      editable: false,
    },
    {
      field: 'sku',
      headerName: 'SKU',
      width: 150,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell:(params)=>{
        return (
          <Typography
          color={
            params.row.status === "Active" ? "primary" : "error"
          }
          name={params.row.status}
        >
          {params.row.status}
        </Typography>
        )
      },
      width: 100,
      editable: false,
    },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      type:'date',
      width: 150,
      editable: false,
    },
    {
      field: 'updatedAt',
      headerName: 'UpdatedAt',
      type:'date',
      width: 150,
      editable: false,
    },
    {
      field: 'inventory',
      headerName: 'Inventory',
      type:'number',
      renderCell:(params)=>{
        return (
          <>
            <Typography>{params.row.inventory[0].quantity}</Typography>
          </>
        )
      },
      width: 100,
      editable: false,
    },
    {
      // field: 'updatedAt',
      headerName: 'Control',
      renderCell:(params)=>{
        return (
          <>
          <Tooltip
            title="Update Product"
            onClick={() => {
              showUpdateProduct(params.row);
            }}
          >
            <IconButton
              aria-label="delete"
              size="small"
              color="primary"
            >
              <UpgradeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Update Inventory"
            onClick={() => {
              setOpenUpdateInventory(true);
              setUpdateInventoryProduct(params.row._id);
            }}
          >
            <IconButton
              aria-label="delete"
              size="small"
              color="primary"
            >
              <InventoryIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="outlined"
            color={
              params.row.status === "Active" ?  "error" : "primary"
            }
            name={params.row.status == "Active" ? 'Disable':"Active"}
          
            size="small"
            onClick={() => {
              handleChangeStatus();
              setProductUpdate(params.row)
            }}
          >
            {params.row.status == "Active" ? 'Disable':"Active"}
          </Button>
          </>
        )
      },
      width: 250,
      editable: false,
    },
  ];
  

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    view: false,
    sold: false,
    sale: false,
    createdAt:false,
    updatedAt:false,
    sku:false
  });

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
        rows={products}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        // disableSelectionOnClick
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
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
          onSubmit={(e)=>handleChangeStatusProduct(e)}
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
    <Modal
      open={openUpdateInventory}
      onClose={handleCloseUpdateInventory}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,
          bgcolor: "background.paper",
          border: "1px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Update Inventory
        </Typography>
        <Box
          id="modal-modal-description"
          component="form"
          noValidate
          onSubmit={handleSubmitUpdateInventory}
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
                autoComplete="quantity"
                name="quantity"
                // value={qty}
                fullWidth
                id="quantity"
                label="Input Quantity"
                autoFocus
                // onChange={(e) => {
                //   setQty(e.target.value);
                // }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            //   fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
    </>
  );
}

import React, { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import InventoryIcon from "@mui/icons-material/Inventory";
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import {
  checkAdmin,
  getBrands,
  getCategories,
} from "../../api/api_instance";
import {
  Tooltip,
  Box,
  Button,
  IconButton,
  TextField,
  Grid,
  Typography,
  Modal,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {validAdmin } from "../../api/auth";
import { showErrorToastMessage, showSuccessToastMessage } from "../../utils/toast.alert";

export default function ListBrand() {
  let navigate = useNavigate();
  const [openValidModal, setOpenValidModal] = useState(false);
  const handleCloseValidModal = () => setOpenValidModal(false);
  const [isCategories,setIsCategories] = useState({})
  const [brandUpdate, setBrandUpdate] = useState({});
  const [categories,setCategories] = useState([])
  // product handle
  const [brand, setBrand] = useState([]);
  async function fetchData() {
    const { element } = await getBrands();
    console.log("product_fetch", element);
    setBrand(element);
  }
  async function fetchDataCategories() {
    const { element } = await getCategories();
    console.log("categories_fetch", element);
    setCategories(element);
  }
  async function checkRoleAdmin(){
    const res = await checkAdmin({_id:localStorage.getItem('_id')})
    if(res.status=== 'Success') return true
    else return false
  }
  useEffect(() => {
    if(localStorage.getItem('_id') && checkRoleAdmin()){
      fetchData();
      fetchDataCategories();
    }
    else{
      navigate("/abc")
    }
  }, []);
  useEffect(() => {
    setIsCategories(brandUpdate.categories)
  }, [brandUpdate]);
  // modal controll
  const [modalBrandUpdate, setModalBrandUpdate] = useState(false);
 

  
  const handleSubmitUpdateBrand = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      categories:data.get('categories'),
      brand:data.get("brand")
    })
  };
  const handleSubmitValidModal = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({ passsword: data.get("password"),email:localStorage.getItem('email')});
    const res = await validAdmin({ password: data.get("password"),email:localStorage.getItem('email')})
    console.log("res valid:",res)
    if(res.status === "Success"){
      // modalBrandUpdate
    }
    else{
      showErrorToastMessage(res.msg)
    }

    handleCloseValidModal()
  };

const handleCloseUpdateBrand = async ()=>{
  setModalBrandUpdate(false)
}

  // data grid
  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Brand name',
      renderCell:(params)=>{
        return (
          <Typography>{params.row.name}</Typography>
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
      headerName: 'Control',
      renderCell:(params)=>{
        return (
          <>
          <Tooltip
            title="Update Brand"
          >
            <IconButton
              aria-label="delete"
              size="small"
              color="primary"
              onClick={()=>{
                  setBrandUpdate(params.row)
                  setModalBrandUpdate(true)
                }
              }
            >
              <UpgradeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Delete Brand"
          >
            <IconButton
              aria-label="delete"
              size="small"
              color="primary"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          </>
        )
      },
      width: 250,
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
        rows={brand}
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
      open={openValidModal}
      onClose={handleCloseValidModal}
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
          onSubmit={(e)=>handleSubmitValidModal(e)}
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
      open={modalBrandUpdate}
      onClose={handleCloseUpdateBrand}
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
          Update Brand
        </Typography>
        <Box
          id="modal-modal-description"
          component="form"
          noValidate
          onSubmit={handleSubmitUpdateBrand}
          sx={{ mt: 3 }}
        >
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyItems: "center" }}
          >
            <Grid item xs={6} sm={6}>
              <TextField
                autoComplete="categories"
                name="categories"
                select
                value={isCategories}
                fullWidth
                id="categories"
                label="Select Categories"
                autoFocus
                onChange={(e) => {
                  setIsCategories(e.target.value);
                }}
              >
                {categories?.map((option, index) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                fullWidth
                id="brand"
                defaultValue={brandUpdate.name}
                label="Brand Name"
                name="brand"
                autoComplete="brand"
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

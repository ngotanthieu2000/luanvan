import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import {
  createCategories,
  updateCategories,
  createBrand,
} from "../../api/auth";
import { checkAdmin, getAllProducts, getBrands, getCategories, getProducts } from "../../api/api_instance";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  Modal,
  TextField,
  MenuItem,
} from "@mui/material";
import { Stack } from "@mui/system";
import CreateProduct from "./CreateProduct";
import ListProduct from "./ListProduct";
import UpdateProduct from "./UpdateProduct";
import { ToastContainer } from "react-toastify";
import { showErrorToastMessage } from "../../utils/toast.alert";
import ProcessLoadingModal from "./ProcessLoadingModal";
import { ConstructionOutlined } from "@mui/icons-material";
export default function ProductManager() {
  let navigate = useNavigate();
  const [openProcessLoading,setOpenProcessLoading] = useState(false);
  const hanldShowOrHideProcessLoading = (bool)=>{
    console.log({bool})
    setOpenProcessLoading(bool)
  }
  const [view, setView] = useState("ListProduct");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [productUpdate, setProductUpdate] = useState();
  // product handle
  //brand
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState();
  async function fetchDataCategories() {
    const { element } = await getCategories();
    console.log("categories fetch data:::", element);
    setCategories(element);
    setIsCategories(element[0].name);
  }
  async function fetchDataBrand(){
    const { element } = await getBrands();
      console.log("brand_fetch", element);
      setBrands(element);
  }
  async function fetchDataProducts() {
    const { element } = await getAllProducts();
    console.log("product_fetch", element);
    setProducts(element);
  }
  async function checkRoleAdmin(){
    const res = await checkAdmin({_id:localStorage.getItem('_id')})
    if(res.status=== 'Success') {
      fetchDataProducts();
        fetchDataBrand();
        fetchDataCategories();
    }
    else {
      navigate("/abc")
      
    }
  }
  useEffect(() => {
    if(!localStorage.getItem('_id')){
      navigate("/abc")
    }
    else {
      checkRoleAdmin()
    }
  }, []);
  // modal controll
  const [modalProduct, setModalProduct] = useState(false);
  const [modalProductUpdate, setModalProductUpdate] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [modalBrand, setModalBrand] = useState(false);
  const [newType, setNewType] = useState(false);
  const handleOpen = () => setModalProduct(true);
  const handleClose = () => setModalProduct(false);
  const handleOpenCreateType = () => setModalType(true);
  const handleCloseCreateType = () => setModalType(false);
  const handleOpenCreateBrand = () => setModalBrand(true);
  const handleCloseCreateBrand = () => setModalBrand(false);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  // fetch data Type
  const [type, setType] = useState([]);
  const [isType, setIsType] = useState("");
  const [categories, setCategories] = useState();
  const [isCategories, setIsCategories] = useState(0);
  const handleChangeType = (event) => {
    // console.log("Change Type:::",event.target.value)
    setIsType(event.target.value);
  };
  const handleChangeCategories = (event) => {
    let temp = categories[event.target.value].types;
    // console.log("Change Categories:::",event.target.value)
    // console.log("temp:::",temp)
    setIsCategories(event.target.value);
    setType(temp);
  };
  // useEffect(() => {
  //   fetchDataCategories();
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
  // submit create new type
  const handleSubmitCreateType = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("categories", isCategories);
    console.log({
      isNewCategories: newType,
      name: data.get("categories"),
      newCate: data.get("newCategories"),
      type: data.get("type"),
    });

    if (newType) {
      console.log("Create new categories");
      var res = await createCategories({
        name: data.get("newCategories"),
        type: data.get("type"),
      });
      console.log("RES::::", res);
    } else {
      console.log("Create new type in categories");
      var res = await updateCategories({
        name: data.get("categories"),
        type: data.get("type"),
      });
    }
    fetchDataCategories();
    handleCloseCreateType();
  };
  // submit create brand
  const handleSubmitCreateBrand = async (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({name:data.get('brand')})
    var res = await createBrand({name:data.get('brand'),categories:data.get('categories')})
    console.log("res create brand", res)
    if(res.status === "Success"){
      setBrands([...brands,res.element])
      handleCloseCreateBrand();
    }else{
      showErrorToastMessage(res.msg)
    }
  }
  // update product
  const handleShowUpdateProduct = (product) => {
    setProductUpdate(product);
    setView("UpdateProduct");
  };
  const [indexUpdate, setIndexUpdate] = useState();
  const handleUpdateProduct = async (index) => {
    console.log("Data product current:::", products[index]);
  };
  // handle change view
  const hanldeChangeView = (view)=>{
    setView(view)
  }
  return (
    <>
      <Navbar />
      <br />
      <Divider />
      <br />
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent={"center"}
      >
        <Grid item xs={10}>
          <Box
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "100%",
                height: 100,
              },
            }}
          >
            <Paper elevation={1} sx={{ display: "grid", alignItems: "center" }}>
              <Stack
                direction="row"
                justifyContent={"space-between"}
                spacing={2}
                mx={5}
              >
                <Box>
                  <Typography variant="h5">Product Manager</Typography>
                </Box>
                <Stack direction={"row"} spacing={2}>
                  <Button
                    startIcon={<ListIcon />}
                    variant="contained"
                    onClick={() => {
                      setView("ListProduct");
                    }}
                  >
                    List Product
                  </Button>
                  <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={() => {
                      setView("CreateProduct");
                    }}
                  >
                    New Product
                  </Button>
                  <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={handleOpenCreateType}
                  >
                    New Type
                  </Button>
                  <Modal
                    open={modalType}
                    onClose={handleCloseCreateType}
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
                        Create New Type
                      </Typography>
                      <Box
                        id="modal-modal-description"
                        component="form"
                        noValidate
                        onSubmit={handleSubmitCreateType}
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
                              disabled={newType}
                              onChange={(e) => {
                                setIsCategories(e.target.value);
                              }}
                              // defaultValue={isCategories}
                            >
                              {categories?.map((option, index) => (
                                <MenuItem key={option.name} value={option.name}>
                                  {option.name}
                                </MenuItem>
                              ))}
                              <MenuItem
                                key={"Add new"}
                                value={"Add new"}
                                onClick={() => {
                                  setNewType(true);
                                }}
                              >
                                Add new
                              </MenuItem>
                            </TextField>
                          </Grid>
                          <Grid item xs={6} sm={6}>
                            <TextField
                              autoComplete="newCategories"
                              name="newCategories"
                              required
                              fullWidth
                              id="newCategories"
                              label="New Categories"
                              autoFocus
                              disabled={!newType}
                              onFocus={() => {
                                setNewType(true);
                              }}
                              onBlur={(e) => {
                                if (!e.target.value) setNewType(false);
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              id="type"
                              label="Type Name"
                              name="type"
                              autoComplete="type"
                            />
                          </Grid>
                        </Grid>
                        <Button
                          type="submit"
                          //   fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Create
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                  <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={handleOpenCreateBrand}
                  >
                    New Brand
                  </Button>
                  <Modal
                    open={modalBrand}
                    onClose={handleCloseCreateBrand}
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
                        Create New Brand
                      </Typography>
                      <Box
                        id="modal-modal-description"
                        component="form"
                        noValidate
                        onSubmit={handleSubmitCreateBrand}
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
                          Create
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </Stack>
              </Stack>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={10}>
          {view === "CreateProduct" ? (
            <CreateProduct listCategories={categories} changeView = {hanldeChangeView} />
          ) : view === "UpdateProduct" ? (
            <UpdateProduct product={productUpdate} listCategories={categories} changeView = {hanldeChangeView} />
          ) : (
            <ListProduct
              showUpdateProduct={handleShowUpdateProduct}
              showUpdateInventory={handleShowUpdateProduct}
              setProductUpdate
              processLoading={hanldShowOrHideProcessLoading}
            />
          )}
        </Grid>
      </Grid>
      <ToastContainer style={{ width: "fit-content" }} />
      {/* <Footer /> */}
      <ProcessLoadingModal parentOpen={openProcessLoading} />

    </>
  );
}

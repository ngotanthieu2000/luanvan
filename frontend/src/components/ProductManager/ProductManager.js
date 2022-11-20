import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import PerfectScrollbar from "react-perfect-scrollbar";
import { format } from "date-fns";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import InventoryIcon from "@mui/icons-material/Inventory";
import ListIcon from "@mui/icons-material/List";
import {
  createProduct,
  createCategories,
  updateCategories,
} from "../../api/auth";
import { getCategories, getProducts } from "../../api/api_instance";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  Box,
  Button,
  Card,
  CardActions,
  CardActionArea,
  FormControl,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  Modal,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  CardMedia,
} from "@mui/material";
import { customers } from "../../__mocks__/customers";
import { Stack } from "@mui/system";
import CreateProduct from "./CreateProduct";
import ListProduct from "./ListProduct";
import UpdateProduct from "./UpdateProduct";
export default function ProductManager() {
  let navigate = useNavigate();
  const [view, setView] = useState("ListProduct");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [productUpdate, setProductUpdate] = useState();
  // product handle
  const [products, setProducts] = useState();
  useEffect(() => {
    async function fetchData() {
      const { element } = await getProducts();
      console.log("product_fetch", element);
      setProducts(element);
    }
    fetchData();
    console.log("products", products);
  }, []);
  // modal controll
  const [modalProduct, setModalProduct] = useState(false);
  const [modalProductUpdate, setModalProductUpdate] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [newType, setNewType] = useState(false);
  const handleOpen = () => setModalProduct(true);
  const handleClose = () => setModalProduct(false);
  const handleOpenCreateType = () => setModalType(true);
  const handleCloseCreateType = () => setModalType(false);
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

  useEffect(() => {
    async function fetchData() {
      const { element } = await getCategories();
      console.log("categories fetch data:::", element);
      setCategories(element);
      setIsCategories(element[0].name);
    }
    fetchData();
  }, []);
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
    setCategories(
      [...categories].map((object) => {
        if (object.name === data.get("categories")) {
          return {
            ...object,
            ...res.element,
          };
        } else return object;
      })
    );
    handleCloseCreateType();
  };
  // update product
  const handleShowUpdateProduct = (product) => {
    setProductUpdate(product);
    setView("UpdateProduct");
  };
  const [indexUpdate, setIndexUpdate] = useState();
  const handleUpdateProduct = async (index) => {
    console.log("Data product current:::", products[index]);
  };
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
                </Stack>
              </Stack>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={10}>
          {view === "CreateProduct" ? (
            <CreateProduct />
          ) : view === "UpdateProduct" ? (
            <UpdateProduct product={productUpdate} categories />
          ) : (
            <ListProduct
              showUpdateProduct={handleShowUpdateProduct}
              showUpdateInventory={handleShowUpdateProduct}
              setProductUpdate
            />
          )}
        </Grid>
      </Grid>

      {/* <Footer /> */}
    </>
  );
}

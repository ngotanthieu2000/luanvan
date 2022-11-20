import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import PerfectScrollbar from "react-perfect-scrollbar";
import { format } from "date-fns";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import InventoryIcon from "@mui/icons-material/Inventory";
import { getCategories, getProducts } from "../../api/api_instance";
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
} from "@mui/material";
import { customers } from "../../__mocks__/customers";
import { Stack } from "@mui/system";
import UpdateInventory from "./UpdateInventory";
import { useNavigate } from "react-router-dom";

export default function ListProduct({ showUpdateProduct }) {
  let navigate = useNavigate();
  const [openUpdateInventory,setOpenUpdateInventory] = useState(false)
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
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
  return (
    <Box
      sx={{
        "& > :not(style)": {
          m: 1,
          width: "100%",
        },
      }}
    >
      <Paper elevation={1} sx={{ display: "grid", alignItems: "center" }}>
        <PerfectScrollbar>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell
                    width={"10%"}
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                    align="center"
                  >
                    Attachment
                  </TableCell>
                  <TableCell
                    width={"50%"}
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                    align="center"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    width={"10%"}
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                    align="center"
                  >
                    Price
                  </TableCell>
                  <TableCell
                    width={"10%"}
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                    align="center"
                  >
                    Sale
                  </TableCell>
                  <TableCell
                    width={"10%"}
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                    align="center"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    width={"10%"}
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                    align="center"
                  >
                    Control
                  </TableCell>
                </TableRow>
              </TableHead>
              {products && products?.length > 0 ? (
                <TableBody>
                  {products.map((element, index) => {
                    let img_url = `${process.env.REACT_APP_URL_IMAGE_PRODUCT}/${element.attachments[0]}`;
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row" display={"flex"} onClick={()=>{navigate('/detail-product',{state:{product:element}})}} >
                          <Card
                            sx={{
                              maxWidth: 150,
                              display: "flex",
                              width: "100px",
                              height: "100px",
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              width="auto"
                              height="100%"
                              style={{
                                display: "inline",
                                margin: "0 auto",
                                height: "100%",
                                width: "auto",
                              }}
                              src={
                                element.attachments[0]
                                  ? img_url
                                  : `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`
                              }
                            />
                          </Card>
                        </TableCell>
                        <TableCell align="center">{element.name}</TableCell>
                        <TableCell align="center">
                          {element.price.toLocaleString()} $
                        </TableCell>
                        <TableCell align="center">
                          {element.sale ? element.sale.toLocaleString() : "-"} $
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            color={
                              element.status === "Active" ? "primary" : "error"
                            }
                            size="small"
                          >
                            {element.status}
                          </Button>
                        </TableCell>
                        <TableCell width={150} align="center">
                          <Tooltip
                            title="Update Product"
                            onClick={() => {
                              showUpdateProduct(element);
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
                          <UpdateInventory openUpdateInventory={openUpdateInventory} closeUpdateInventory={()=>{setOpenUpdateInventory(false)}} product_id={element._id}/>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              ) : (
                undefined
              )}
            </Table>
          </TableContainer>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={customers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
    </Box>
  );
}

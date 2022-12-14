import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import {
  createCategories,
  trainingRecommender,
  updateCategories,
} from "../../api/auth";
import { checkAdmin, getCategories, getProducts } from "../../api/api_instance";
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
import ListUser from "./ListUser";
import ProcessLoadingModal from "../ProductManager/ProcessLoadingModal";
export default function UserManager() {
  let navigate = useNavigate();
  const [openProcessLoading,setOpenProcessLoading] = useState(false);

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
async function fetchData() {
      const { element } = await getCategories();
      console.log("categories fetch data:::", element);
      setCategories(element);
      setIsCategories(element[0].name);
    }
  async function checkRoleAdmin(){
    const res = await checkAdmin({_id:localStorage.getItem('_id')})
    if(res.status=== 'Success') {
      fetchData();
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
  const handleTrainningRecommender = async()=>{
    setOpenProcessLoading(true)
    const res = await trainingRecommender();
    console.log("res trainingRecommender:",res)
    setOpenProcessLoading(false)
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
                  <Typography variant="h5">User Manager</Typography>
                </Box>
                <Stack direction={"row"} spacing={2}>
                  <Button
                    startIcon={<ModelTrainingIcon />}
                    variant="contained"
                    onClick={() => {
                      handleTrainningRecommender()
                    }}
                  >
                    Training Recommender
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={10}>
          
            <ListUser
              // showUpdateProduct={handleShowUpdateProduct}
              // showUpdateInventory={handleShowUpdateProduct}
              // setProductUpdate
            />
        </Grid>
      </Grid>
      <ProcessLoadingModal parentOpen={openProcessLoading} />
      {/* <Footer /> */}
    </>
  );
}

import {
  Button,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Link,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  ButtonGroup,
  Typography,
  Pagination,
  Alert,
} from "@mui/material";
import moment from "moment";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Stack } from "@mui/system";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import ButtonChangeImage from "./ButtonChangeImage";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Footer from "../Footer/Footer";
import RelatedProduct from "../RelatedProduct/RelatedProduct";
import { checkAuthReview, getInventory, getListProductFeatured, getProductById, getReviews, updateBehavioursByView } from "../../api/api_instance";
import { createReview, postAddToCart } from "../../api/auth";
import { toast } from "react-toastify";
import { TypeSpecimenRounded } from "@mui/icons-material";
import Navbar from "../Navbar/Navbar";
export default function DetailProduct() {
  const location = useLocation();
  const {id} = useParams();
  let navigate = useNavigate();
  const [product,setProduct] = useState({})
  const [type,setType] = useState('')
  const [categories,setCategories] = useState('')
  async function fetchDataProduct(){
    const res = await getProductById({_id:id})
    console.log("res getProductById:",res)
    setProduct(res.element)
  }
  function handleUpdateAfterChangeProduct(){
    console.log({type:product?.type,categories:product?.categories})
    setType(product?.type)
    setCategories(product?.categories)
    setDescription(product?.description?.split("\r\n"))
    setAttachments(product ? product.attachments : undefined)
    setValueRating(product?.overallReview)
    setCurrentImage(product?.attachments
      ? `${process.env.REACT_APP_URL_IMAGE_PRODUCT}/${product?.attachments[0]}`
      : require("../../public/product/product1.jpg"))
  }
  useEffect(() => {
    fetchDataProduct()
  }, [id]);

  useEffect(() => {
    fetchCheckValidReview();
    fetchDataReview();
    fetchInventory();
    handleUpdateAfterChangeProduct()
    var scrollingElement = document.scrollingElement || document.documentElement;
        scrollingElement.scrollTop = 0;
    console.log('set product change')
  }, [product]);

  const [description, setDescription] = useState([]);
    // check valid review 
    const [checkReview,setCheckReview] = useState(false)
    async function fetchCheckValidReview(){
      if(localStorage.getItem('_id')){
        const res = await checkAuthReview({userId:localStorage.getItem('_id'),productId:product?._id})
        console.log('res checkAuthReview:',res)
        if(res.status==="Success"){
          setCheckReview(true)
        }
      }
    }
  const [detail, setDetail] = useState();
  const [attachments, setAttachments] = useState([]);
  const [valueRating, setValueRating] = useState(0);
  const [currentImage, setCurrentImage] = useState();
  const [alignment, setAlignment] = useState("specification");
  const [optionReview, setOptionReview] = useState("specification");
  const [contentReview, setContentReview] = useState("");
  const handleChangeAlignment = (event, newAlignment) => {
    if (newAlignment) {
      setOptionReview(newAlignment);
      setAlignment(newAlignment);
    }
  };
  const [numPageReview, setNumPageReview] = useState(0);
  const [page, setPage] = useState({});
  const [reviews, setReviews] = useState([]);
  const [ratingReview, setRatingReview] = useState(0);
  async function fetchDataReview() {
    const res = await getReviews({ _id: product?._id });
    // console.log("Res:::",res)
    if (res.element) {
      setPage(res.element[numPageReview]);
      setReviews(res.element);
    }
  }
  const [inventory, setInventory] = useState();
  async function fetchInventory() {
    const res = await getInventory({ _id: product?._id });
    // console.log("Res:::",res)
    if (res.element) {
      setInventory(res.element.quantity);
    } else {
      setInventory(0);
    }
  }
  useEffect(() => {
    if(!id) return window.location('/abc')
    else{
      fetchDataProduct()
    }
  }, []);

  useEffect(() => {
    if (reviews[numPageReview - 1]) {
      setPage(reviews[numPageReview - 1]);
    } else {
      setPage([]);
    }
  }, [numPageReview]);

  const handleSubmitNewReview = async (event) => {
    event.preventDefault();
    var data = new FormData();
    data.append("author", localStorage.getItem("name"));
    data.append("userId", localStorage.getItem("_id"));
    data.append("body", contentReview);
    data.append("rating", ratingReview);
    data.append("product", product?._id);
    // console.log({body:data.get('body'),rating:data.get('rating'),product:data.get('product'),author:data.get('author')})
    var res = await createReview({
      body: data.get("body"),
      rating: data.get("rating"),
      product: data.get("product"),
      author: data.get("author"),
      userId: data.get('userId')
    });
    console.log("Ress create new review:::",res)
    product.overallReview = res.product.overallReview
    setValueRating(res.product.overallReview)
    product.countReview = res.product.countReview
    fetchDataReview();
    setContentReview("");
    setRatingReview(0);
  };
  const [qty, setQty] = useState();
  const [updateCart, setUpdateCart] = useState();
  const showSuccessToastMessage = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const showErrorToastMessage = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleAddToCart = async (event) => {
    event.preventDefault();
    // console.log(qty)
    if(!localStorage.getItem('_id')){
      navigate('/login')
    }
    await fetchInventory()
    if(qty > inventory){
      return showErrorToastMessage('The product you wanted to buy is out of stock.')
    }
    // console.log(qty);
    if (localStorage.getItem("_id")) {
      var res = await postAddToCart({
        userId: localStorage.getItem("_id"),
        productId: product?._id,
        qty,
      });
      console.log('Res update cart:', res)
      setUpdateCart(res.element);
      setInventory(res.inventory.quantity)
    } else if (
      localStorage.getItem("cart") &&
      localStorage.getItem("cart") !== "undefined"
    ) {
      var cart = JSON.parse(localStorage.getItem("cart"));
      let productExist = false;
      for (let i = 0; i < cart.products.length; i++) {
        // console.log('index',i)
        if (cart.products[i] && cart.products[i].item._id === product._id) {
          productExist = true;
          let temp = parseInt(cart.products[i].qty) + parseInt(qty);
          cart.products[i].qty = temp;
          break;
        } else {
          productExist = false;
        }
      }
      if (!productExist) {
        cart.products.push({ item: product, qty });
      }

      setUpdateCart(cart);
    } else {
      const obj = {
        user: "id_clone",
        status: "saved",
        products: [{ id: product._id, qty }],
      };
      setUpdateCart(obj);
    }
  };

  const handleChangeQty = async(event)=>{
    let {value} = event.target
    if(value > inventory){
      value = inventory;
    }
    else if(value <=0){
      value =1;
    }
    return setQty(value);
  }

  useEffect(() => {
    setTimeout(()=>{
      if(localStorage.getItem('_id') &&  localStorage.getItem('_id') !== 'undefined'){
        updateBehavioursByView({value:3, productId:product?._id,userId:localStorage.getItem('_id')})
      }
    },1500000
    )
  }, []);
  return (
    <div>
      <Navbar updateCart={updateCart} />
      <Stack
        direction={"row"}
        paddingX={"11%"}
        justifyContent={"flex-start"}
        spacing={2}
        height={50}
      >
        <Link href="/shop" underline="none" color={"black"}>
          Home
        </Link>
        <NavigateNextIcon />
        <Typography  underline="none" color={"black"}>
          {product?.categories}
        </Typography>
        <NavigateNextIcon />
        <Typography  underline="none" color={"black"}
          sx={{cursor:'pointer'}}
          onClick={()=>{navigate(`/collection/${product?.categories}/${product?.type}`)}}
        >
          {product?.type}
        </Typography>
        <NavigateNextIcon />
        <Typography>{product?.name}</Typography>
      </Stack>
      <Stack direction={"row"} display={"block"} mt={2} height={'100%'}>
        <Grid container spacing={2} direction="row" justifyContent={"center"}>
          <Grid item xs={12} md={5} lg={5} paddingLeft={"0 !important"}>
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                alignContent: "space-around",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItem: "center",
                  mt: 4,
                  flexDirection: "column",
                }}
              >
                {attachments?.map((element) => {
                  return (
                    <ButtonChangeImage
                      srcImage={element}
                      setCurrentImage={setCurrentImage}
                    />
                  );
                })}
              </Box>
              <Box
                // height={"100%"}
                // width={"100%"}
                textAlign={"center"}
                sx={{
                  // maxWidth: 150,
                  display: "flex",
                  justifyContent:"center",
                  alignItems: "center",
                  width: "600px",
                  height: "600px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={currentImage}
                  alt={"currentImage"}
                  style={{
                    // height: "600",
                    // width: "90%",
                    marginX: "5%",
                    display: "inline",
                    maxHeight: "600px",
                    maxWidth: "600px",
                    height: "auto",
                    width: "auto",
                  }}
                />
              </Box>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            lg={5}
            // bgcolor={"yellow"}
            paddingLeft={"0 !important"}
          >
            <Paper elevation={0}>
              <Stack
                height={"100%"}
                width={"100%"}
                direction={"column"}
                spacing={1}
              >
                <Chip
                  label={product?.type}
                  component="a"
                  // href="#basic-chip"
                  clickable
                  sx={{ width: "fit-content" }}
                  onClick={()=>{navigate(`/collection/${product?.categories}/${product?.type}`)}}
                />
                <Stack spacing={1}>
                  <Typography variant="h5">{product?.name}</Typography>
                  <Stack direction={"row"}>
                    <Rating
                      readOnly
                      name="simple-controlled"
                      value={valueRating}
                      precision={0.01}
                      // onChange={(event, newValueRating) => {
                      //   setValueRating(newValueRating);
                      // }}
                    />
                    <Typography variant="caption" mt={0.5}>
                      ({product?.countReview} customer reviews)
                    </Typography>
                  </Stack>
                </Stack>
                <Divider />

                <Stack direction={"column"} spacing={1} paddingTop={2}>
                  {description?.map((element) => {
                    return <Typography variant="body2">* {element}</Typography>;
                  })}
                  {/* <Typography variant="subtitle1">
                    {productData.shortDescription}
                  </Typography> */}
                  <Typography variant="h6">SKU:{product.sku}</Typography>
                  <Stack direction={"row"} spacing={2}>
                    <Typography variant="h3">
                      ${product?.price?.toLocaleString()}
                    </Typography>
                    {/* <Typography
                      variant="h5"
                      sx={{ textDecoration: "line-through", color: "#848484" }}
                    >
                      ${productData.oldPrice.toLocaleString()}
                    </Typography> */}
                  </Stack>
                </Stack>

                <Divider />

                <Stack
                  direction={"row"}
                  height={50}
                  alignItems={"center"}
                  spacing={0.5}
                >
                  <Typography>Inventory:</Typography>
                  <Typography>{inventory}</Typography>

                  {/* <Box sx={{ minWidth: 300 }}>
                    <Select
                      variant="filled"
                      id="demo-simple-select"
                      value={1}
                      label="Age"
                      defaultValue={1}
                      onChange={handleChange}
                      sx={{
                        borderRadius: "45",
                      }}
                    >
                      {productData.listOptionDepent.map((element, index) => {
                        return <MenuItem value={index}>{element}</MenuItem>;
                      })}
                    </Select>
                  </Box> */}
                </Stack>
                <Divider />
                <Stack direction="column">
                  {inventory > 0 ? (
                    <>
                      <Typography>Quantity</Typography>
                      <Stack direction={"row"} spacing={2}>
                        <TextField
                          mr={1}
                          id="qty"
                          name="qty"
                          type="number"
                          value={qty}
                          onChange={(e) => {
                            handleChangeQty(e)
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{ inputProps: { min: 1, max: {inventory},step : 1 } }}
                        />
                        <Button
                          variant="contained"
                          color="success"
                          size={"medium"}
                          onClick={(e) => {
                            handleAddToCart(e);
                          }}
                        >
                          Add to Cart
                        </Button>
                      </Stack>
                    </>
                  ) : (
                    <Typography>Het Hang</Typography>
                  )}
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
      <br/>
      <br/>
      <br/>
      <Stack direction={"column"} sx={{ justifyContent: "center" }}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChangeAlignment}
          aria-label="Platform"
          sx={{
            justifyContent: "center",
          }}
        >
          <ToggleButton value="specification">Specification</ToggleButton>
          <ToggleButton value="review">Reviews</ToggleButton>
        </ToggleButtonGroup>
        <Box
          direction={"column"}
          width={"80%"}
          justifyContent={"center"}
          ml={"10%"}
          minHeight={600}
        >
          <Paper elevation={6}>
            <Stack direction={"column"} spacing={2} padding={5}>
              {/* attributes */}
              <Box
                display={optionReview === "specification" ? "block" : "none"}
              >
                <Stack direction={"column"} spacing={2}>
                  <Box>
                    <Typography variant="h5">
                      Technical Specifications
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          {product.attributes
                            ? product.attributes.map((element, index, arr) => {
                                let lastIndex;
                                if (arr.length - 1 === index) {
                                  lastIndex = true;
                                }
                                return (
                                  <TableRow hover>
                                    <TableCell
                                      width="50%"
                                      sx={{
                                        fontWeight: "bold",
                                        borderBottom: lastIndex
                                          ? "none"
                                          : undefined,
                                      }}
                                    >
                                      {element.key}
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        borderBottom: lastIndex
                                          ? "none"
                                          : undefined,
                                      }}
                                    >
                                      {element.value}
                                    </TableCell>
                                  </TableRow>
                                );
                              })
                            : undefined}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Stack>
              </Box>
              {/* review box */}
              <Box display={optionReview === "review" ? "block" : "none"}>
                  {page?.lists?.length > 0 ?
                  (
                  <Stack direction={"column"} spacing={3}>
                    <Stack direction={"column"} spacing={2}>
                    {page?.lists?.map((element) => {
                      return (
                        <Stack direction={"column"} spacing={1}>
                          <Rating defaultValue={element.rating} readOnly />
                          <Typography>{element.body}</Typography>
                          <Stack direction="row" spacing={2}>
                            <Typography fontWeight={"bold"}>
                              {element.author}
                            </Typography>
                            <Typography variant="caption" lineHeight={2}>
                              {moment(element.createdAt).format("MMM Do YY")}
                            </Typography>
                          </Stack>
                          <Divider />
                        </Stack>
                      );
                    })}
                  </Stack>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Pagination
                      count={reviews?.length}
                      value={numPageReview}
                      onChange={(event, value) => {
                        setNumPageReview(value);
                      }}
                    />
                  </Box>
                </Stack>
                  ) : (<Typography variant="h5">There is no review for this product, be the first one to review this product.</Typography>)
                  }
                
                {checkReview  ? 
                (
                  <Stack direction="column" spacing={2}>
                  <Typography variant="h5">Add a review</Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-start"
                    alignItems={"center"}
                  >
                    <Typography flexGrow={1} fontWeight={"bold"}>
                      Your review
                    </Typography>
                    <Box flexGrow={3} width={"80%"}>
                      <Rating
                        sx={{ marginLeft: "16px" }}
                        value={ratingReview}
                        defaultValue={0}
                        onChange={(e, newValue) => {
                          setRatingReview(newValue);
                        }}
                      />
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems={"center"}>
                    <Typography flexGrow={1} fontWeight={"bold"}>
                      Your review
                    </Typography>
                    <TextareaAutosize
                      flexGrow={3}
                      name="content"
                      id="content"
                      aria-label="minimum height"
                      minRows={3}
                      maxRows={10}
                      value={contentReview}
                      onChange={(e) => {
                        setContentReview(e.target.value);
                      }}
                      style={{
                        width: "80%",
                        resize: "vertical",
                        borderRadius: "10px",
                        padding: "5px",
                        color: "#848484",
                      }}
                    />
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        handleSubmitNewReview(e);
                      }}
                      sx={{
                        textTransform: "unset !important",
                        borderRadius: "20px",
                      }}
                    >
                      Add Review
                    </Button>
                  </Stack>
                </Stack>
                )
                :
                 !localStorage.getItem('_id') ?
                (
                <Button
                  variant="contained"
                  onClick={(e) => {
                    navigate('/login')
                  }}
                  sx={{
                    textTransform: "unset !important",
                    borderRadius: "20px",
                  }}
                >
                  Login to continue
                </Button>): undefined
                }
                
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Stack>
      {/* Related Product */}
      <RelatedProduct type ={type} categories={categories} />
      <Footer />
    </div>
  );
}

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
import { useLocation } from "react-router-dom";
import { Box, Stack } from "@mui/system";
import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import ButtonChangeImage from "./ButtonChangeImage";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Footer from "../Footer/Footer";
import RelatedProduct from "../RelatedProduct/RelatedProduct";
import { getReviews } from "../../api/api_instance";
import { createReview, postAddToCart } from "../../api/auth";
export default function DetailProduct() {
  const location = useLocation();
  let { product } = location.state;
  const [description, setDescription] = useState(
    product?.description.split("\r\n")
  );
  // console.log("description:::",description)
  // console.log("Product data:::", product);
  const [attachments, setAttachments] = useState(
    product ? product.attachments : undefined
  );
  const [valueRating, setValueRating] = useState(product?.overallReview);
  const [currentImage, setCurrentImage] = useState(
    attachments
      ? `${process.env.REACT_APP_URL_IMAGE_PRODUCT}/${attachments[0]}`
      : require("../../public/product/product1.jpg")
  );
  const [alignment, setAlignment] = useState("description");
  const [optionReview, setOptionReview] = useState("description");
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
    setReviews(res.element);
    setPage(res.element[numPageReview]);
  }
  useEffect(() => {
    fetchDataReview();
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
    data.append("body", contentReview);
    data.append("rating", ratingReview);
    data.append("product", product?._id);
    // console.log({body:data.get('body'),rating:data.get('rating'),product:data.get('product'),author:data.get('author')})
    var res = await createReview({
      body: data.get("body"),
      rating: data.get("rating"),
      product: data.get("product"),
      author: data.get("author"),
    });
    // console.log("Ress create new review:::",res)
    fetchDataReview();
    setContentReview("");
    setRatingReview(0);
  };
  const changeOptionReview = () => {};
  const [qty, setQty] = useState();
  const [updateCart,setUpdateCart] = useState();
  const handleAddToCart = async (event) => {
    event.preventDefault();
    console.log(qty);
    if(localStorage.getItem('_id')){
      var res = await postAddToCart({ userId:localStorage.getItem('_id'), productId:product?._id, qty})
      console.log('Res update cart:', res)
      setUpdateCart(res.element)
    }
    else if(localStorage.getItem('cart') && localStorage.getItem('cart')!=='undefined'){
      var cart = JSON.parse(localStorage.getItem('cart'));
      cart.products.push({id:product._id,qty})
      setUpdateCart(cart)
    }
    else{
      const obj = {
        user:'id_clone',
        status:'saved',
        products:[{id:product._id,qty}]
      }
      setUpdateCart(obj)
    }
  };
  const productData = {
    technicalProperties: [
      "4.5 inch HD Touch Screen (1280 x 720)",
      "Android 4.4 KitKat OS",
      "1.4 GHz Quad Core™ Processor",
      "20 MP Electro and 28 megapixel CMOS rear camera",
      "4.5 inch HD Touch Screen (1280 x 720)",
      "Android 4.4 KitKat OS",
      "1.4 GHz Quad Core™ Processor",
      "20 MP Electro and 28 megapixel CMOS rear camera",
    ],
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
    code: "FW511948218",
    newPrice: 1999,
    oldPrice: 2299,
    optionDepend: "Color",
    listOptionDepent: ["Red", "Green", "Blue"],
    description: [
      {
        name: "Perfectly Done",
        detail:
          "Praesent ornare, ex a interdum consectetur, lectus diam sodales elit, vitae egestas est enim ornare nisl. Nullam in lectus nec sem semper viverra. In lobortis egestas massa. Nam nec massa nisi. Suspendisse potenti. Quisque suscipit vulputate dui quis volutpat. Ut id elit facilisis, feugiat est in, tempus lacus. Ut ultrices dictum metus, a ultricies ex vulputate ac. Ut id cursus tellus, non tempor quam. Morbi porta diam nisi, id finibus nunc tincidunt eu.",
      },
      {
        name: "Wireless",
        detail:
          "Fusce vitae nibh mi. Integer posuere, libero et ullamcorper facilisis, enim eros tincidunt orci, eget vestibulum sapien nisi ut leo. Cras finibus vel est ut mollis. Donec luctus condimentum ante et euismod.",
      },
      {
        name: "Fresh Design",
        detail:
          "Integer bibendum aliquet ipsum, in ultrices enim sodales sed. Quisque ut urna vitae lacus laoreet malesuada eu at massa. Pellentesque nibh augue, pellentesque nec dictum vel, pretium a arcu. Duis eu urna suscipit, lobortis elit quis, ullamcorper massa.",
      },
    ],
    specification: [
      {
        default: [
          { name: "Weight", value: "7.25kg" },
          { name: "Dimensions", value: "90 x 60 x 90 cm" },
          { name: "Size", value: "One Size Fits all" },
          { name: "color", value: "Black with Red, White with Gold" },
          { name: "Guarantee", value: "5 years" },
        ],
        technical: [
          { name: "Brand", value: "Apple" },
          { name: "Item Height", value: "18 Millimeters" },
          { name: "Item Width", value: "31.4 Centimeters" },
          { name: "Screen Size", value: "13 Inches" },
          { name: "Item Weight", value: "1.6 Kg" },
          { name: "Product Dimensions", value: "21.9 x 31.4 x 1.8 cm" },
          { name: "Item model number", value: "MF841HN/A" },
          { name: "Processor Brand", value: "Intel" },
          { name: "Processor Type", value: "Core i5" },
          { name: "Processor Speed", value: "2.9 GHz" },
          { name: "RAM Size", value: "8 GB" },
          { name: "Hard Drive Size", value: "512 GB" },
          { name: "Hard Disk Technology", value: "Solid State Drive" },
          { name: "Graphics Coprocessor", value: "Intel Integrated Graphics" },
          {
            name: "Graphics Card Description",
            value: "Integrated Graphics Card",
          },
          { name: "Hardware Platform", value: "Mac" },
          { name: "Operating System", value: "Mac OS" },
          { name: "Average Battery Life (in hours)", value: "9" },
        ],
      },
    ],
  };

  var relatedProduct = [
    {
      name: "Tablet White EliteBook Revolve 810 G2",
      price: 9000,
      oldPrice: 2299,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img2.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      oldPrice: 2299,
      rated: 4,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Smartphone 6S 32GB LTE",
      price: 499,
      oldPrice: 2299,
      rated: 2,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img4.jpg",
      category: "Smartphone",
    },
    {
      name: "Widescreen NX Mini F1 SMART NX",
      price: 699,
      oldPrice: 2299,
      rated: 5,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img5.jpg",
      category: "Camera",
    },
    {
      name: "Camera C430W 4k Waterproof",
      price: 799,
      oldPrice: 2299,
      rated: 5,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img8.jpg",
      category: "Camera",
    },
    {
      name: "Camera C430W 4k Waterproof",
      price: 799,
      oldPrice: 2299,
      rated: 4,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img8.jpg",
      category: "Camera",
    },
  ];
  return (
    <div>
      <Header updateCart={updateCart}/>
      <Stack
        direction={"row"}
        paddingX={"11%"}
        justifyContent={"flex-start"}
        spacing={2}
        height={50}
      >
        <Link href="#" underline="none" color={"black"}>
          Home
        </Link>
        <NavigateNextIcon />
        <Link href="#" underline="none" color={"black"}>
          Accessories
        </Link>
        <NavigateNextIcon />
        <Link href="#" underline="none" color={"black"}>
          Headphones
        </Link>
        <NavigateNextIcon />
        <Typography>{product?.name}</Typography>
      </Stack>
      <Stack direction={"row"} display={"block"} mt={2} height={900}>
        <Grid container spacing={2} direction="row" justifyContent={"center"}>
          <Grid item xs={12} md={5} lg={5} paddingLeft={"0 !important"}>
            <Stack direction={"column"}>
              <Box
                height={"100%"}
                width={"100%"}
                // bgcolor={"red"}
                textAlign={"center"}
              >
                <CardMedia
                  component="img"
                  image={currentImage}
                  alt={"currentImage"}
                  style={{
                    height: "600",
                    width: "90%",
                    marginLeft: "5%",
                  }}
                />
              </Box>
              <Box
                sx={{
                  height: 128,
                  width: "90%",
                  display: "flex",
                  justifyContent: "center",
                  alignItem: "center",
                  mt: 1,
                  flexDirection: "row",
                  // bgcolor: "#c7dfff",
                  marginLeft: "5%",
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
                height={800}
                width={"100%"}
                direction={"column"}
                spacing={1}
              >
                <Chip
                  label={product?.type}
                  component="a"
                  href="#basic-chip"
                  clickable
                  sx={{ width: "fit-content" }}
                />
                <Stack spacing={1}>
                  <Typography variant="h5">{product?.name}</Typography>
                  <Stack direction={"row"}>
                    <Rating
                      readOnly
                      name="simple-controlled"
                      value={valueRating}
                      // onChange={(event, newValueRating) => {
                      //   setValueRating(newValueRating);
                      // }}
                    />
                    <Typography variant="caption" mt={0.5}>
                      ({product?.coutReview} customer reviews)
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
                      ${product.price.toLocaleString()}
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
                  <Typography>12</Typography>

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
                  <Typography>Quantity</Typography>
                  <Stack direction={"row"} spacing={2}>
                    <TextField
                      mr={1}
                      id="qty"
                      name="qty"
                      type="number"
                      value={qty}
                      onChange={(e) => {
                        setQty(e.target.value);
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{ inputProps: { min: 1, max: 10 } }}
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
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
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
          <ToggleButton value="description">Description</ToggleButton>
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
              <Box display={optionReview === "description" ? "block" : "none"}>
                {productData.description.map((element) => {
                  return (
                    <>
                      <Box paddingY={5}>
                        <Typography variant="h5"> {element.name} </Typography>
                        <Typography variant="body1">
                          {element.detail}
                        </Typography>
                      </Box>
                    </>
                  );
                })}
              </Box>
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
                          {product?.attributes.map((element, index, arr) => {
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
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Stack>
              </Box>
              {/* review box */}
              <Box display={optionReview === "review" ? "block" : "none"}>
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
                  {/* <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{justifyContent:"center"}}>
                    <Button startIcon={<ArrowBackIcon/>} >Previous page</Button>
                    <Button endIcon={<ArrowForwardIcon/>}>Next page</Button>
                  </ButtonGroup> */}
                </Stack>
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
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Stack>
      {/* Related Product */}
      <RelatedProduct data={relatedProduct} />
      <Footer />
    </div>
  );
}

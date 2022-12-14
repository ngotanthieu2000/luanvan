import {
  Card,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ClearIcon from "@mui/icons-material/Clear";
import RelatedProduct from "../RelatedProduct/RelatedProduct";
import { Stack, Box, keyframes } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { removeItemCart } from "../../api/auth";
export default function Order() {
  const location = useLocation();
  let navigate = useNavigate();
  const [updateCart, setUpdateCart] = useState({});
  const [cart, setCart] = useState(location.state.cart || undefined);
  const [totalCart, setTotalCart] = useState(
    location.state.totalCart || undefined
  );
  // console.log( { cart, totalCart } )
  const [currentImage, setCurrentImage] = useState(
    require("../../public/product/product1.jpg")
  );
  const [listProduct, setListProduct] = useState([]);
  async function fetchListProduct() {
    var arr = [];
    if (cart && cart !== "undefined") {
      arr = cart.products;
    }
    setListProduct(arr);
    // console.log("listproduct:",arr)
  }
  useEffect(() => {
    fetchListProduct();
  }, [cart]);
  function handleChangeQuantity(event, index) {
    let tempArray = [...listProduct];
    tempArray[index].quantity = event.target.value;
    tempArray[index].total = tempArray[index].price * tempArray[index].quantity;
    setListProduct(tempArray);
    // alert(listProduct[index].quantity)
  }
  const hanleRemoveItemCart = async (element) => {
    // console.log(element)
    console.log({
      userId: localStorage.getItem("_id"),
      productId: element?.item._id,
    });
    const res = await removeItemCart({
      userId: localStorage.getItem("_id"),
      productId: element?.item._id,
    });
    console.log("Res remove item::", res);
    updateTotalPriceCart(res.element);
    setCart(res.element);
    setUpdateCart(res.element);
    console.log("listProduct:", listProduct);
    console.log("cart:", cart);
  };
  // update total price cart
  async function updateTotalPriceCart(data) {
    var total = 0;
    if (data && data.products.length > 0) {
      data.products.map((element) => {
        total += element.item.price * element.qty;
      });
    }
    setTotalCart(total);
  }

  // keyframes effect
  const shadowDropBottom = keyframes`
      0% {
        -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
      }
      100% {
        -webkit-box-shadow: 0 12px 20px -12px rgba(0, 0, 0, 0.35);
                box-shadow: 0 12px 20px -12px rgba(0, 0, 0, 0.35);
      }
    `;
  return (
    <>
      <Header updateCart={updateCart} />
      {/* <Stack
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
          <Typography>Cart</Typography>
        </Stack> */}

      <Grid container justifyContent={"center"}>
        <Grid item xs={10} md={10}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h4" textAlign={"center"}>
              Checkout Cart
            </Typography>
            <Grid container justifyContent={"center"} spacing={1}>
              <Grid item xs={5.5} md={5.5}>
                <Typography variant="subtitle1">Product</Typography>
              </Grid>
              <Grid item xs={1.5} md={1.5}>
                <Typography variant="subtitle1">Price</Typography>
              </Grid>
              <Grid item xs={1.5} md={1.5}>
                <Typography variant="subtitle1">Quantity</Typography>
              </Grid>
              <Grid item xs={1.5} md={1.5}>
                <Typography variant="subtitle1">Total</Typography>
              </Grid>
            </Grid>
            <Divider />
            {listProduct.length > 0
              ? listProduct.map((element, index) => {
                  return (
                    <Grid container justifyContent={"center"} spacing={1}>
                      <Grid item xs={5.5} md={5.5}>
                        <Stack
                          direction={"row"}
                          spacing={5}
                          alignItems={"center"}
                          justifyContent={"flex-start"}
                        >
                          <Box width={128} height={128} marginX={0.5}>
                            <Card
                              sx={{
                                // maxWidth: 150,
                                display: "flex",
                                alignItems: "center",
                                width: 128,
                                height: 128,
                                position: "relative",
                                overflow: "hidden",
                              }}
                            >
                              <CardMedia
                                component="img"
                                height="128"
                                width="128"
                                image={`${process.env.REACT_APP_URL_IMAGE_PRODUCT}/${element.item.attachments[0]}`}
                                alt={element.item.name}
                                // onClick={handleChangeCurrentImage}
                                sx={{
                                  marginX: "5%",
                                  display: "inline",
                                  // margin: "0 auto",
                                  height: "auto",
                                  width: "100%",
                                }}
                              />
                            </Card>
                          </Box>
                          <Typography
                            underline="none"
                            variant="h6"
                            color={"black"}
                            onClick={() => {
                              navigate("/detail-product", {
                                state: { product: element.item },
                              });
                            }}
                          >
                            {element.item.name}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={1.5} md={1.5} display={"flex"}>
                        <Box display={"flex"} alignItems={"center"}>
                          <Typography variant="h6" fontWeight={"bold"}>
                            ${element.item.price.toLocaleString()}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={1.5} md={1.5} display={"flex"}>
                        <Box display={"flex"} alignItems={"center"}>
                          <TextField
                            type="number"
                            size="small"
                            defaultValue={element.qty}
                            onChange={(e) => handleChangeQuantity(e, index)}
                            InputProps={{
                              inputProps: {
                                max: 1000,
                                min: 0,
                              },
                              readOnly: true,
                            }}
                            onInput={(e) => {
                              e.target.value = Math.max(
                                0,
                                parseInt(e.target.value)
                              )
                                .toString()
                                .slice(0, 12);
                            }}
                            sx={{
                              width: "100%",
                              borderRadius: "50px !important",
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderRadius: `90px`,
                                },
                              },
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={1.5} md={1.5} display={"flex"}>
                        <Box display={"flex"} alignItems={"center"}>
                          <Typography variant="h6" fontWeight={"bold"}>
                            $
                            {(
                              element.qty * element.item.price
                            ).toLocaleString()}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  );
                })
              : undefined}

            <Divider />
            <br />
          </Stack>
        </Grid>
        <Grid item xs={10} md={10}>
          <Stack direction="column" spacing={0}>
            <Box
              component="form"
              noValidate
              // onSubmit={handleUpdateProduct}
              sx={{ mt: 3 }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems:"center"
                }}
              >
                <Grid item xs={10} sm={10}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Product Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={10} sm={10}>
                  <TextField
                    required
                    fullWidth
                    id="sku"
                    label="SKU"
                    name="sku"
                    autoComplete="sku"
                  />
                </Grid>
                <Grid item xs={10} sm={10}>
                  <TextField
                    required
                    fullWidth
                    name="price"
                    label="Price"
                    id="price"
                    autoComplete="price"
                  />
                </Grid>
                
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginY:1
                }}
              >
                <Button
                    variant="contained"
                    sx={{
                      borderRadius: "50px",
                    }}
                  >
                    Order
                  </Button>
              </Box>
                
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />

      {/* <RelatedProduct data={relatedProduct} /> */}

      <Footer />
    </>
  );
}

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
import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ClearIcon from "@mui/icons-material/Clear";
import RelatedProduct from "../RelatedProduct/RelatedProduct";
import { Stack, Box, keyframes } from "@mui/system";

export default function Cart() {
  const [currentImage, setCurrentImage] = React.useState(
    require("../../public/product/product1.jpg")
  );

  const [listProduct, setListProduct] = React.useState([
    {
      name: "Tablet White EliteBook Revolve 810 G2",
      price: 9000,
      oldPrice: 2299,
      quantity: 12,
      total: 999,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img2.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      oldPrice: 2299,
      quantity: 12,
      rated: 4,
      total: 999,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Smartphone 6S 32GB LTE",
      price: 499,
      oldPrice: 2299,
      quantity: 12,
      rated: 2,
      total: 999,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img4.jpg",
      category: "Smartphone",
    },
    {
      name: "Widescreen NX Mini F1 SMART NX",
      price: 699,
      oldPrice: 2299,
      quantity: 12,
      rated: 5,
      total: 999,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img5.jpg",
      category: "Camera",
    },
    {
      name: "Camera C430W 4k Waterproof",
      price: 799,
      oldPrice: 2299,
      quantity: 12,
      rated: 5,
      total: 999,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img8.jpg",
      category: "Camera",
    },
    {
      name: "Camera C430W 4k Waterproof",
      price: 799,
      oldPrice: 2299,
      quantity: 12,
      rated: 4,
      total: 999,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img8.jpg",
      category: "Camera",
    },
  ]);

  function handleChangeQuantity(event, index) {
    let tempArray = [...listProduct];
    tempArray[index].quantity = event.target.value;
    tempArray[index].total = tempArray[index].price * tempArray[index].quantity;
    setListProduct(tempArray);
    // alert(listProduct[index].quantity)
  }


  //related product data
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
  `
  return (
    <>
      <Header />
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
        <Typography>Cart</Typography>
      </Stack>

      <Grid container justifyContent={"center"}>
        <Grid item xs={10} md={10}>
          <Stack direction="column" spacing={2}>
            <Typography variant="h4" textAlign={"center"}>
              Cart
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
            {listProduct
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
                          <IconButton aria-label="delete" size="small">
                            <ClearIcon />
                          </IconButton>
                          <Box width={128} height={128} marginX={0.5}>
                            <Card>
                              <CardMedia
                                component="img"
                                height="128"
                                width="128"
                                image={element.avatar}
                                alt={element.name}
                                // onClick={handleChangeCurrentImage}
                              />
                            </Card>
                          </Box>
                          <Link
                            href="#"
                            underline="none"
                            variant="h6"
                            color={"black"}
                          >
                            {element.name}
                          </Link>
                        </Stack>
                      </Grid>
                      <Grid item xs={1.5} md={1.5} display={"flex"}>
                        <Box display={"flex"} alignItems={"center"}>
                          <Typography variant="h6" fontWeight={"bold"}>
                            ${element.price.toLocaleString()}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={1.5} md={1.5} display={"flex"}>
                        <Box display={"flex"} alignItems={"center"}>
                          <TextField
                            type="number"
                            size="small"
                            defaultValue={element.quantity}
                            onChange={(e) => handleChangeQuantity(e, index)}
                            InputProps={{
                              inputProps: {
                                max: 1000,
                                min: 0,
                              },
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
                            ${element.total.toLocaleString()}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  );
                })
              : undefined}

            <Divider />
            <Stack direction="row" spacing={0} justifyContent={'space-between'} sx={{paddingX:20}}>
              <Stack direction='row'>
                <TextField
                  id="outlined-basic"
                  placeholder="Coupon code"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        // borderRadius: `90px`,
                        borderTopLeftRadius: "45px",
                        borderBottomLeftRadius: "45px",
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  disableRipple
                  sx={{
                    backgroundColor:'#333e48',
                    color:'white',
                    borderTopRightRadius:'50px',
                    borderBottomRightRadius:'50px',
                    "&:hover":{
                      backgroundColor:'#333e48',
                      animation: `${shadowDropBottom} 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`
                    }
                  }}
                >
                  Contained
                </Button>
              </Stack>
                <Button
                    variant="contained"
                    sx={{
                      borderRadius:'50px'
                    }}
                  >
                    Proceed to checkout
                </Button>
            </Stack>
            <Grid container justifyContent={'flex-end'}>
              <Grid item xs={6} md={4} >
                <Stack direction='column' paddingX={2} spacing={2}>
                  <Typography variant='h5' fontWeight={'bold'}>Card Total</Typography>
                  <Divider/>
                  <Box sx={{display:'flex', flexDirection:'row' , justifyContent:'space-between'}} paddingX={2}>
                    <Typography fontWeight={'bold'} variant='subtitle1'>Subtotal</Typography>
                    <Typography variant='subtitle1'>$ 9999</Typography>
                  </Box>
                  <Divider/>
                  <Box sx={{display:'flex', flexDirection:'row' , justifyContent:'space-between'}} paddingX={2}>
                    <Typography fontWeight={'bold'} variant='subtitle1'>Shipping</Typography>
                      <Typography variant='subtitle1'>Flat Rate: $300.00</Typography>
                    {/* <Box sx={{display:'flex', flexDirection:'column',alignItems:'flex-end'}} >
                      <Link href='#' variant='caption' fontWeight={'bold'} sx={{textDecoration:'underline'}} >Calculate Shipping</Link>
                    </Box> */}
                  </Box>
                  <Divider/>
                  <Box sx={{display:'flex', flexDirection:'row' , justifyContent:'space-between'}} paddingX={2}>
                    <Typography fontWeight={'bold'} variant='subtitle1'>Total</Typography>
                    <Typography variant='h6' fontWeight={'bold'}>$ 9999</Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
      <RelatedProduct data={relatedProduct} />

      <Footer />
    </>
  );
}

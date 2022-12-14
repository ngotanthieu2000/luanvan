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
import React ,{useState,useEffect}from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ClearIcon from "@mui/icons-material/Clear";
import RelatedProduct from "../RelatedProduct/RelatedProduct";
import { Stack, Box, keyframes } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { checkOutStripe, removeItemCart } from "../../api/auth";
import Navbar from "../Navbar/Navbar";
export default function Cart() {
  const location = useLocation();
  let navigate = useNavigate();
  const [updateCart,setUpdateCart] = useState({})
  const [cart,setCart] = useState({})
  const [totalCart,setTotalCart] = useState()
  // console.log( { cart, totalCart } )
  const [currentImage, setCurrentImage] = useState(
    require("../../public/product/product1.jpg")
  );
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    if(location.state && location.state.cart){
      console.log(location.state.cart)
      setCart(location.state.cart)
    }else if(localStorage.getItem('cart')){
      setCart(JSON.parse(localStorage.getItem('cart')))
    }
    else {
      setCart({})
    }
  }, []);
  useEffect(() => {
    if(location.state && location.state.totalCart){
      setTotalCart(location.state.totalCart)
    }
    else {
      setTotalCart(0)
    }
  }, []);
  async function fetchListProduct(){
    var arr =[]
    if(cart && cart !== 'undefined')
    {
      arr = cart.products
    }
    setListProduct(arr)
    // console.log("listproduct:",arr)
  }
  useEffect(() => {
    fetchListProduct()
  }, [cart]);
  function handleChangeQuantity(event, index) {
    let tempArray = [...listProduct];
    tempArray[index].quantity = event.target.value;
    tempArray[index].total = tempArray[index].price * tempArray[index].quantity;
    setListProduct(tempArray);
    // alert(listProduct[index].quantity)
  }
const hanleRemoveItemCart = async(element)=>{
  // console.log(element)
  console.log({userId:localStorage.getItem('_id'),productId:element?.item._id})
  const res = await removeItemCart({userId:localStorage.getItem('_id'),productId:element?.item._id,qty:element?.qty})
  console.log("Res remove item::",res)
  updateTotalPriceCart(res.element)
  setCart(res.element)
  setUpdateCart(res.element)
  console.log("listProduct:",listProduct)
  console.log("cart:",cart)
}
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

//handle checkout
const handleCheckOut = async()=>{
  if(cart&& cart.products.length>0){
    let cartItems = cart.products.map((element)=>{
      return {
        id:element.item._id,
        name:element.item.name,
        price:element.item.price,
        // images:`http://localhost:5000/static/public/products/${element.item.attachments[0]}`,
        images:element.item.clouds[0],
        quantity:element.qty
      }
    }) 
    console.log("Checkout cartItem:",cartItems)
  
    const res = await checkOutStripe({cartItems:cartItems,userId:localStorage.getItem('_id'),cartId:cart._id});
    if(res.url){
      window.location.href = res.url
      // window.open(res.url, '_blank');
    }
    console.log("Checkout res:",res)

  }
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
      <Navbar updateCart={updateCart}/>
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
            {listProduct && listProduct.length > 0
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
                          <IconButton aria-label="delete" size="small" onClick={()=>{hanleRemoveItemCart(element)}}>
                            <ClearIcon />
                          </IconButton>
                          <Box width={128} height={128} marginX={0.5}>
                            <Card
                            sx={{
                              // maxWidth: 150,
                              display: "flex",
                              alignItems:'center',
                              justifyContent:"center",
                              width: "125px",
                              height: "125px",
                              position: "relative",
                              overflow: "hidden",
                              // marginY:0.5,
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
                                    // height: "600",
                                    // width: "90%",
                                    marginX: "5%",
                                    // margin: "0 auto",
                                    maxHeight:'100px',
                                    maxWidth:'100px',
                                    height: "auto",
                                    width: "auto",  
                                }}
                              />
                            </Card>
                          </Box>
                          <Typography
                            underline="none"
                            variant="h6"
                            color={"black"}
                            onClick={()=>{navigate('/detail-product',{state:{product:element.item}})}}
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
                            ${(element.qty * element.item.price).toLocaleString()}
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
                    display:'none',
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
                    display:'none',
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
                    // onClick={()=>{navigate('/order',{state:{cart:cart}})}}
                    onClick={()=>{handleCheckOut()}}
                  >
                    Checkout
                </Button>
            </Stack>
            <Grid container justifyContent={'flex-end'}>
              <Grid item xs={6} md={4} >
                <Stack direction='column' paddingX={2} spacing={2}>
                  <Typography variant='h5' fontWeight={'bold'}>Card Total</Typography>
                  <Divider/>
                  <Box sx={{display:'flex', flexDirection:'row' , justifyContent:'space-between'}} paddingX={2}>
                    <Typography fontWeight={'bold'} variant='subtitle1'>Subtotal</Typography>
                    <Typography variant='subtitle1'>$ {totalCart?.toLocaleString()}</Typography>
                  </Box>
                  <Divider/>
                  <Box sx={{display:'flex', flexDirection:'row' , justifyContent:'space-between'}} paddingX={2}>
                    <Typography fontWeight={'bold'} variant='subtitle1'>Total</Typography>
                    <Typography variant='h6' fontWeight={'bold'}>$ {totalCart ? (totalCart+ 300).toLocaleString() : 0} </Typography>
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

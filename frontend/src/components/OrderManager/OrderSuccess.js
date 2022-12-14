import {
  CardMedia,
  Box,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
  Card,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createOrder,
  getCart,
  getOrderByPaymentIntent,
  retrieveSessionCheckOut,
} from "../../api/auth";
import Navbar from "../Navbar/Navbar";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { session, cart, user } = useParams();
  const [listProduct, setListProduct] = useState([]);
  const [sessionCheckout, setSessionCheckout] = useState({});
  const [paymentIntent, setPaymentIntent] = useState({});
  const [order, setOrder] = useState();
  const [updateCart,setUpdateCart] = useState({});
  async function fetchSessionCheckout() {
    const res = await retrieveSessionCheckOut({ id: session });
    console.log("res retrieveSessionCheckOut:", res);
    if (res.status === "Success") {
      setSessionCheckout(res.session);
      setPaymentIntent(res.payment_intent);
    }
  }
  async function fetchDataProducts() {
    // console.log({userId:user,shippingAddress:paymentIntent.shipping.address,amount_shipping:sessionCheckout.total_details.amount_shipping,payment:{payment_intent:sessionCheckout.payment_intent,},subTotal:sessionCheckout.amount_subtotal})
    const getOrder = await getOrderByPaymentIntent({
      payment_intent: sessionCheckout.payment_intent,
    });
    if (getOrder.status === "Success") {
      setOrder(getOrder.element);
      setListProduct(getOrder.element.items);
      console.log("getorder :::", getOrder);
    } else {
      const res = await createOrder({
        userId: user,
        shippingAddress: paymentIntent.shipping.address,
        amount_shipping: sessionCheckout.total_details.amount_shipping,
        payment: { payment_intent: sessionCheckout.payment_intent },
        checkout:{ session_checkout: sessionCheckout.id },
        subTotal: sessionCheckout.amount_subtotal,
      });
      setOrder(res.element);
      setUpdateCart(res.cart);
      setListProduct(res.element.items);
      console.log("res createOrder:", res);
    }
  }
  useEffect(() => {
    fetchSessionCheckout();
  }, []);
  useEffect(() => {
    fetchDataProducts();
  }, [sessionCheckout, paymentIntent]);
  // hdndle
  const handleCreateOrder = async () => {
    console.log({
      userId: user,
      shippingAddress: paymentIntent.shipping.address,
      amount_shipping: sessionCheckout.total_details.amount_shipping,
      payment: { payment_intent: sessionCheckout.payment_intent },
      subTotal: sessionCheckout.amount_subtotal,
    });
    const getOrder = await getOrderByPaymentIntent({
      payment_intent: sessionCheckout.payment_intent,
    });
    if (getOrder.status === "Success") {
      setListProduct(getOrder.element.items);
      console.log("getorder :::", getOrder);
    } else {
      const res = await createOrder({
        userId: user,
        shippingAddress: paymentIntent.shipping.address,
        amount_shipping: sessionCheckout.total_details.amount_shipping,
        payment: { payment_intent: sessionCheckout.payment_intent },
        subTotal: sessionCheckout.amount_subtotal,
      });
      setListProduct(res.element.items);
      console.log("res createOrder:", res);
    }
  };
  return (
    <>
      <Navbar updateCart={updateCart}/>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent={"center"}
        mt={3}
      >
        <Grid container justifyContent={"center"} spacing={5}>
          <Grid item xs={10} md={10}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h4" textAlign={"center"}>
                Detail Order
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
                            <Box width={128} height={128} marginX={0.5}>
                              <Card
                                sx={{
                                  // maxWidth: 150,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
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
                                  image={`${process.env.REACT_APP_URL_IMAGE_PRODUCT}/${element.product.attachments[0]}`}
                                  alt={element.product.name}
                                  // onClick={handleChangeCurrentImage}
                                  sx={{
                                    // height: "600",
                                    // width: "90%",
                                    marginX: "5%",
                                    // margin: "0 auto",
                                    maxHeight: "100px",
                                    maxWidth: "100px",
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
                              onClick={()=>{navigate(`/detail-product/${element.product.name.replace("/", "-")}/${element.product._id}`)}}
                            >
                              {element.product.name}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1.5} md={1.5} display={"flex"}>
                          <Box display={"flex"} alignItems={"center"}>
                            <Typography variant="h6" fontWeight={"bold"}>
                              ${element.product.price.toLocaleString()}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={1.5} md={1.5} display={"flex"}>
                          <Box display={"flex"} alignItems={"center"}>
                            <TextField
                              type="number"
                              size="small"
                              defaultValue={element.quantity}
                              InputProps={{
                                inputProps: {
                                  max: 1000,
                                  min: 0,
                                  readOnly: true,
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
                              $
                              {(
                                element.quantity * element.product.price
                              ).toLocaleString()}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    );
                  })
                : undefined}
                <Typography variant="h6" textAlign={"center"}>
                Subtotal : {sessionCheckout?.amount_subtotal?.toLocaleString("en-US", {style:"currency", currency:"USD",maximumFractionDigits:0})}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={10} md={10}>
            <Typography variant="h5">Infomation</Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow hover>
                    <TableCell
                      width="50%"
                      sx={{
                        fontWeight: "bold",
                        // borderBottom: lastIndex
                        //   ? "none"
                        //   : undefined,
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={
                        {
                          // borderBottom: lastIndex
                          //   ? "none"
                          //   : undefined,
                        }
                      }
                    >
                      {order?.status}
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell
                      width="50%"
                      sx={{
                        fontWeight: "bold",
                        // borderBottom: lastIndex
                        //   ? "none"
                        //   : undefined,
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      sx={
                        {
                          // borderBottom: lastIndex
                          //   ? "none"
                          //   : undefined,
                        }
                      }
                    >
                      {sessionCheckout?.customer_details?.email}
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell
                      width="50%"
                      sx={{
                        fontWeight: "bold",
                        // borderBottom: lastIndex
                        //   ? "none"
                        //   : undefined,
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={
                        {
                          // borderBottom: lastIndex
                          //   ? "none"
                          //   : undefined,
                        }
                      }
                    >
                      {sessionCheckout?.customer_details?.name}
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell
                      width="50%"
                      sx={{
                        fontWeight: "bold",
                        // borderBottom: lastIndex
                        //   ? "none"
                        //   : undefined,
                      }}
                    >
                      Phone
                    </TableCell>
                    <TableCell
                      sx={
                        {
                          // borderBottom: lastIndex
                          //   ? "none"
                          //   : undefined,
                        }
                      }
                    >
                      {sessionCheckout?.customer_details?.phone}
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell
                      width="50%"
                      sx={{
                        fontWeight: "bold",
                        // borderBottom: lastIndex
                        //   ? "none"
                        //   : undefined,
                      }}
                    >
                      Currency
                    </TableCell>
                    <TableCell
                      sx={
                        {
                          // borderBottom: lastIndex
                          //   ? "none"
                          //   : undefined,
                        }
                      }
                    >
                      {sessionCheckout?.currency}
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell
                      width="50%"
                      sx={{
                        fontWeight: "bold",
                        // borderBottom: lastIndex
                        //   ? "none"
                        //   : undefined,
                      }}
                    >
                      Shipping
                    </TableCell>
                    <TableCell
                      sx={
                        {
                          // borderBottom: lastIndex
                          //   ? "none"
                          //   : undefined,
                        }
                      }
                    >
                      {sessionCheckout?.total_details?.amount_shipping}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h5">Address</Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow hover>
                    <TableCell
                      width="50%"
                      sx={{
                        fontWeight: "bold",
                        // borderBottom: lastIndex
                        //   ? "none"
                        //   : undefined,
                      }}
                    >
                      City
                    </TableCell>
                    <TableCell
                      sx={
                        {
                          // borderBottom: lastIndex
                          //   ? "none"
                          //   : undefined,
                        }
                      }
                    >
                      {sessionCheckout?.customer_details?.address?.city}
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell
                      width="50%"
                      sx={{
                        fontWeight: "bold",
                        // borderBottom: lastIndex
                        //   ? "none"
                        //   : undefined,
                      }}
                    >
                      Country
                    </TableCell>
                    <TableCell
                      sx={
                        {
                          // borderBottom: lastIndex
                          //   ? "none"
                          //   : undefined,
                        }
                      }
                    >
                      {sessionCheckout?.customer_details?.address?.country}
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell
                      width="50%"
                      sx={{
                        fontWeight: "bold",
                        // borderBottom: lastIndex
                        //   ? "none"
                        //   : undefined,
                      }}
                    >
                      Streets 1
                    </TableCell>
                    <TableCell
                      sx={
                        {
                          // borderBottom: lastIndex
                          //   ? "none"
                          //   : undefined,
                        }
                      }
                    >
                      {sessionCheckout?.customer_details?.address?.line1}
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell
                      width="50%"
                      sx={{
                        fontWeight: "bold",
                        // borderBottom: lastIndex
                        //   ? "none"
                        //   : undefined,
                      }}
                    >
                      Streets 2
                    </TableCell>
                    <TableCell
                      sx={
                        {
                          // borderBottom: lastIndex
                          //   ? "none"
                          //   : undefined,
                        }
                      }
                    >
                      {sessionCheckout?.customer_details?.address?.line2}
                    </TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell
                      width="50%"
                      sx={{
                        fontWeight: "bold",
                        // borderBottom: lastIndex
                        //   ? "none"
                        //   : undefined,
                      }}
                    >
                      Postal code
                    </TableCell>
                    <TableCell
                      sx={
                        {
                          // borderBottom: lastIndex
                          //   ? "none"
                          //   : undefined,
                        }
                      }
                    >
                      {sessionCheckout?.customer_details?.address?.postal_code}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

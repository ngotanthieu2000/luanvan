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
  import { checkOutStripe, getAllOderByUser, removeItemCart } from "../../api/auth";
import Navbar from "../Navbar/Navbar";
  export default function ListOrderUser() {
    const location = useLocation();
    let navigate = useNavigate();
    
    const [listOrder, setListOrder] = useState([]);
    async function fetchListOrder(){
        if(localStorage.getItem('_id')){
            const res = await getAllOderByUser({userId:localStorage.getItem('_id')})
            if(res.status==="Success"){
                console.log(res.element)
                setListOrder(res.element)
            }
        }
        else{
            return navigate('/login')
        }
    }
    useEffect(() => {
        fetchListOrder()
    }, []);
  
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
        <Navbar />
        <Grid container justifyContent={"center"}>
          <Grid item xs={10} md={10}>
            <Stack direction="column" spacing={2}>
              <Typography variant="h4" textAlign={"center"}>
                List Order
              </Typography>
              <Grid container justifyContent={"center"} spacing={1}>
                <Grid item xs={5.5} md={5.5}>
                  <Typography variant="subtitle1">Id</Typography>
                </Grid>
                <Grid item xs={1.5} md={1.5}>
                  <Typography variant="subtitle1">Total</Typography>
                </Grid>
                <Grid item xs={1.5} md={1.5}>
                  <Typography variant="subtitle1">Staus</Typography>
                </Grid>

              </Grid>
              <Divider />
              {listOrder && listOrder.length > 0
                ? listOrder.map((element, index) => {
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
                                  image={require("../../public/image/cart.png")}
                                  alt={element._id}
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
                              onClick={()=>{navigate(`/profile/detail-order/${element._id}`,{state:{id:element._id}})}}
                            >
                              {element._id}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={1.5} md={1.5} display={"flex"}>
                          <Box display={"flex"} alignItems={"center"}>
                            <Typography variant="h6" fontWeight={"bold"}>
                              {element.subTotal.toLocaleString("en-US", {style:"currency", currency:"USD",maximumFractionDigits:0})}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={1.5} md={1.5} display={"flex"} alignItems="center">
                        <Typography
                              underline="none"
                              variant="h6"
                              color={"black"}
                            >
                              {element.status}
                            </Typography>
                        </Grid>
                      </Grid>
                    );
                  })
                : undefined}
  
              <Divider />
            </Stack>
          </Grid>
        </Grid>


      </>
    );
  }
  
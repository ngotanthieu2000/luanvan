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
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
  } from "@mui/material";
  import React from "react";
  import Footer from "../Footer/Footer";
  import Header from "../Header/Header";
  import NavigateNextIcon from "@mui/icons-material/NavigateNext";
  import ClearIcon from "@mui/icons-material/Clear";
  import RelatedProduct from "../RelatedProduct/RelatedProduct";
  import { Stack, Box, keyframes } from "@mui/system";
  
  export default function CreateProduct() {
 
  
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
          <Typography>CreateProduct</Typography>
        </Stack>
  
        <Grid container justifyContent={"center"}>
          <Grid item xs={10} md={10} bgcolor="red" paddingX={50}>
            <FormControl variant='outline' >
                <InputLabel htmlFor="my-input" sx={{width:'100%'}}>Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
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
  
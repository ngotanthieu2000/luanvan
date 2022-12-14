import { Box } from "@mui/system";
import { Card, CardMedia, Grid, Paper } from "@mui/material";
import React from "react";

export default function ButtonChangeImage({srcImage,setCurrentImage}) {

    function handleChangeCurrentImage(){
      setCurrentImage(`${process.env.REACT_APP_URL_IMAGE_PRODUCT}/${srcImage}`)
    }
  return (
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
          marginY:0.5,
        }}
        >
          <CardMedia
            component="img"
            image={srcImage ? `${process.env.REACT_APP_URL_IMAGE_PRODUCT}/${srcImage}` : undefined}
            alt={srcImage}
            onClick={handleChangeCurrentImage}
            style={{
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
  );
}

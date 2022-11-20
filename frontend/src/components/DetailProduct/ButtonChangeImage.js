import { Box } from "@mui/system";
import { Card, CardMedia, Grid, Paper } from "@mui/material";
import React from "react";

export default function ButtonChangeImage({srcImage,setCurrentImage}) {

    function handleChangeCurrentImage(){
      setCurrentImage(`${process.env.REACT_APP_URL_IMAGE_PRODUCT}/${srcImage}`)
    }
  return (
      <Box width={128} height={128} marginX={0.5}>
        <Card>
          <CardMedia
            component="img"
            height="128"
            width="128"
            image={srcImage ? `${process.env.REACT_APP_URL_IMAGE_PRODUCT}/${srcImage}` : undefined}
            alt={srcImage}
            onClick={handleChangeCurrentImage}
          />
        </Card>
      </Box>
  );
}

import React from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box } from "@mui/system";

export default function CardProductFeatured({data}) {

    var dataProduct = data ? data : 
        {
          name: "Purple Solo 2 Wireless",
          price: 685,
          avatar:
            "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
          category: "Speakers",
        }
    
  return (
    <div>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: 840,
          padding: "0 3",
          "&:hover":{
            boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.2)'
          }
        }}
      >
        <CardContent sx={{height:160}}>
          <Chip label={dataProduct.category} size="small" />
          <Typography mt={0.5} gutterBottom variant="subtitle1" component="div" color={"blue"}>
            {dataProduct.name}
          </Typography>
        </CardContent>
        <Box height={480} bgcolor="blue" >
            <CardMedia
            component="img"
            height="100%"
            image={dataProduct.avatar}
            alt="green iguana"
            />
        </Box>
        <CardContent sx={{ display: "flex" ,justifyContent:'space-between' ,  bottom:'5'}}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color={"black"}
            left={0}
          >
            ${data.price.toLocaleString()}
          </Typography>
          <IconButton color="warning" aria-label="add to shopping cart">
            <AddShoppingCartIcon />
          </IconButton>
        </CardContent>
      </Card>
    </div>
  );
}

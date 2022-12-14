import React from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Box, keyframes } from "@mui/system";
import { useNavigate } from "react-router-dom";
export default function CardProduct({ data }) {
  let navigate = useNavigate()
  var dataProduct = {
        name: data?.name || "Purple Solo 2 Wireless",
        price: data?.price || 0,
        avatar: data?.attachments ? `${process.env.REACT_APP_URL_IMAGE_PRODUCT}/${data.attachments[0]}` : 
          "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
        type: data?.type || "Uknow",
      };
  const slideInRight = keyframes`
      0% {
        -webkit-transform: translateX(1000px);
                transform: translateX(1000px);
        opacity: 0;
      }
      100% {
        -webkit-transform: translateX(0);
                transform: translateX(0);
        opacity: 1;
      }
      `;
  return (
    <div>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: 420,
          padding: "0 3",
          "&:hover": {
            boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.2)",
            cursor:"pointer"
          },
          animation: `${slideInRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
        }} 
        onClick={()=>{navigate(`/detail-product/${data.name.replace("/", "-")}/${data._id}`)}}
      >
        <CardContent sx={{ height: 80 }}>
          <Chip
            label={dataProduct.type}
            size="small"
            // clickable
            onClick={()=>{navigate(`/collection/${dataProduct?.categories}/${dataProduct?.type}`)}}
          />
          <Typography
            mt={0.5}
            gutterBottom
            variant="subtitle1"
            component="div"
            color={"blue"}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace:'nowrap',
            }}
          >
            {dataProduct.name}
          </Typography>
        </CardContent>
        <Box height={240} 
          sx={{
            display: "flex",
            justifyContent:'center',
            alignItems:'center',
            width: "100%",
            height: "70%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            // height="100%"
            image={dataProduct.avatar}
            alt="green iguana"
            sx={{
              display: "inline",
              // margin: "0 auto",
              maxWidth: "100%",
              maxHeight: "70%",
              height: "auto",
              width: "auto",  
            }}
          />
        </Box>
        <CardContent
          sx={{ display: "flex", justifyContent: "space-between", bottom: "5" }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color={"black"}
            left={0}
          >
            ${data?.price.toLocaleString()}
          </Typography>
          <IconButton color="warning" aria-label="add to shopping cart">
            <AddShoppingCartIcon />
          </IconButton>
        </CardContent>
      </Card>
    </div>
  );
}

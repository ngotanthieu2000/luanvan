import React from "react";
import { Rating, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box, Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function TopRatedCard({data}) {
  const navigate = useNavigate()
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
          flexDirection: "row",
          justifyContent:'flex-start',
          alignItems:'center',
          height: 100,
        //   padding: "0 3",
          "&:hover":{
            cursor:"pointer",
            boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.2)'
          }
        }}
        onClick={()=>{navigate(`/detail-product/${data?.name.replace("/", "-")}/${data?._id}`)}}

      >
        <Box  
        sx={{
          display: "flex",
          justifyContent:'center',
          alignItems:'center',
          width: "20%",
          height: "90%",
          position: "relative",
          overflow: "hidden",
        }}
        >
            <CardMedia
            component="img"
            height="100"
            width="100s"
            image={data.attachments ? `${process.env.REACT_APP_URL_IMAGE_PRODUCT}/${data.attachments[0]}` : 
            "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg"}
            alt="green iguana"
            sx={{
              display: "inline",
              maxWidth: "100%",
              maxHeight: "100%",
              height: "auto",
              width: "auto",  
            }}
            />
        </Box>
        <Box  sx={{display:'flex', flexDirection:'column',width:"80%"}}>
            <CardContent>
                <Typography mt={0.5} gutterBottom variant="subtitle1" component="div" color={"blue"}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace:'nowrap',
                }}
                >
                    {dataProduct.name}
                </Typography>
                <Stack direction={"row"} spacing={1}>
                    <Rating
                      readOnly
                      name="simple-controlled"
                      value={data.overallReview}
                      precision={0.1}
                    />
                    <Typography variant="caption" mt={0.5}>
                      {data.overallReview.toFixed(2)}
                    </Typography>
                    <Typography variant="caption" mt={0.5}>
                      ({data?.countReview} customer reviews)
                    </Typography>
                  </Stack>
                <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    color={"black"}
                    left={0}
                >
                    ${data.price.toLocaleString()}
                </Typography>
            </CardContent>
        </Box>
      </Card>
    </div>
  );
}

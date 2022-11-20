import React from "react";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box, Stack } from "@mui/system";

export default function OnsaleCard({data}) {

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
      >
        <Box bgcolor='blue' width={100}>
            <CardMedia
            component="img"
            height="100"
            width="100s"
            image={dataProduct.avatar}
            alt="green iguana"
            />
        </Box>
        <Box  sx={{display:'flex', flexDirection:'column'}}>
            <CardContent>
                <Typography mt={0.5} gutterBottom variant="subtitle1" component="div" color={"blue"}>
                    {dataProduct.name}
                </Typography>
                <Stack direction={'row'} spacing={2}>
                    <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                        color={"black"}
                        left={0}
                    >
                        ${data.price.toLocaleString()}
                    </Typography>
                    <Typography color={'#8f9dbe'} sx={{textDecoration:'line-through'}} variant="subtitle2">${data.oldPrice.toLocaleString()}</Typography>
                </Stack>
            </CardContent>
        </Box>
      </Card>
    </div>
  );
}

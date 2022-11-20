import {
    Divider,
    Grid,
    Typography,
  } from "@mui/material";
  import { Stack } from "@mui/system";
  import React, { useEffect } from "react";
  import CardProduct from "../Home/CardProduct";
  import FeaturedCard from "./FeaturedCard";
  import OnsaleCard from "./OnsaleCard";
  import TopRatedCard from "./TopRatedCard";
export default function RelatedProduct({data}) {
    var relatedProduct = data ? data : 
    {
        name: "Tablet White EliteBook Revolve 810 G2",
        price: 9000,
        oldPrice: 2299,
        avatar:
          "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img2.jpg",
        category: "Speakers",
    }
  return (
    <div>
        <Stack direction={"column"} paddingY={3} alignItems="center">
        <Stack direction="column" width={"80%"} spacing={2}>
          <Typography variant="h5" fontWeight="bold">
            Related product
          </Typography>
          <Divider />
          <Stack>
            <Grid container spacing={2}>
              {relatedProduct.map((element) => {
                return (
                  <Grid item xs={2}>
                    <CardProduct data={element} />
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
        </Stack>

        <Stack direction="row" width={"80%"}>
          <Grid container spacing={2} marginY={3} paddingTop={"0 !important"}>
            <Grid item xs={4} md={4} lg={4}>
              <Stack direction="column" spacing={1}>
                <Typography>Featured Products</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                {relatedProduct.map((element) => {
                  return <FeaturedCard data={element} />;
                })}
              </Stack>
            </Grid>
            <Grid item xs={4} md={4} lg={4} >
              <Stack direction="column" spacing={1}>
                <Typography>Onsale Products</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                {relatedProduct.map((element) => {
                  return <OnsaleCard data={element} />;
                })}
              </Stack>
            </Grid>
            <Grid item xs={4} md={4} lg={4} >
              <Stack direction="column" spacing={1}>
                <Typography>Top Rated Products</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                {relatedProduct.map((element) => {
                  return <TopRatedCard data={element} />;
                })}
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </div>
  )
}

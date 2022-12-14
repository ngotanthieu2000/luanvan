import {
    Divider,
    Grid,
    Typography,
  } from "@mui/material";
  import { Stack } from "@mui/system";
  import React, { useEffect, useState } from "react";
import { getListProductFeatured, getProductsByRating, getProductsBySold, getProductsByType } from "../../api/api_instance";
  import CardProduct from "../Home/CardProduct";
  import FeaturedCard from "./FeaturedCard";
  import OnsaleCard from "./OnsaleCard";
  import TopRatedCard from "./TopRatedCard";
export default function RelatedProduct({type,categories}) {

  const [featured,setFeatured] = useState([]);
  const [rating,setRating] = useState([]);
  const [sold,setSold] = useState([]);
  const [relatedProduct,setRelatedProduct] = useState([]);
  async function fetchListFeaturedProduct(){
    const res = await  getListProductFeatured();
    console.log('res getListProductFeatured:',res)
    setFeatured(res.element)
  }
  
  async function fetchListProductByRating(){
    const res = await  getProductsByRating();
    console.log('res getProductsByRating:',res)
    setRating(res.element)
  }
  async function fetchListProductBySold(){
    const res = await  getProductsBySold();
    console.log('res getProductsByRating:',res)
    setSold(res.element)
  }
  async function fetchListProductRelated(){
    console.log({type,categories})
    const res = await getProductsByType({type,categories})
    console.log('res fetchListProductRelated:',res)
    setRelatedProduct(res.element)
  }
  useEffect(() => {
    fetchListFeaturedProduct();
    fetchListProductRelated();
    fetchListProductByRating()
    fetchListProductBySold();
  }, []);
  useEffect(() => {
    fetchListProductRelated();
  }, [type,categories]);
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
              {relatedProduct ? 
              (
                relatedProduct?.map((element) => {
                  return (
                    <Grid item xs={2}>
                      <CardProduct data={element} />
                    </Grid>
                  );
                })
              ): undefined
              }
            </Grid>
          </Stack>
        </Stack>

        <Stack direction="row" width={"80%"}>
          <Grid container spacing={2} marginY={3} paddingTop={"0 !important"}>
            <Grid item xs={4} md={4} lg={4}>
              <Stack direction="column" spacing={1}>
                <Typography>Featured Products</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                {featured.map((element) => {
                  return <FeaturedCard data={element} />;
                })}
              </Stack>
            </Grid>
            <Grid item xs={4} md={4} lg={4} >
              {/* <Stack direction="column" spacing={1}>
                <Typography>Onsale Products</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                {featured.map((element) => {
                  return <OnsaleCard data={element} />;
                })}
              </Stack> */}
              <Stack direction="column" spacing={1}>
                <Typography>Top sold Products</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                {sold.map((element) => {
                  return <FeaturedCard data={element} />;
                })}
              </Stack>
            </Grid>
            <Grid item xs={4} md={4} lg={4} >
              <Stack direction="column" spacing={1}>
                <Typography>Top Rated Products</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                {rating.map((element) => {
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

import {
    Grid,
    Link,
    Typography,
  } from "@mui/material";
  import { Stack } from "@mui/system";
  import React,{useState,useEffect} from "react";
  import NavigateNextIcon from "@mui/icons-material/NavigateNext";
  import Footer from "../Footer/Footer";
  import CardProduct from "../Home/CardProduct";
  import {getProductsByName } from "../../api/api_instance";
  import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
  export default function Search() {
    const navigate = useNavigate();
    const { name} = useParams();
    const [products,setProducts] = useState()
    async function fetchListProduct(name){
        console.log({name})
      const res = await getProductsByName({name});
      setProducts(res.element)
    }
    useEffect(() => {
        if( !name || name === undefined || name === ''){
            navigate('/abc')
        }else{
            fetchListProduct(name)
        }
    }, []);
    useEffect(() => {
      fetchListProduct(name)
  }, [name]);
    return (
      <>
        <Navbar />
        <Stack
          direction={"row"}
          paddingX={"11%"}
          justifyContent={"flex-start"}
          spacing={2}
          height={50}
        >
          <Link href="/shop" underline="none" color={"black"}>
            Home
          </Link>
          <NavigateNextIcon />
          <Typography color={"black"}>Search</Typography>
        </Stack>
        <Grid container justifyContent={"center"} spacing={1}>
          <Grid item md={8}>
            <Stack direction="column" width={"100%"} spacing={2}>
              <Stack direction={"row"} justifyContent="space-between">
                <Typography variant="h5">The search results of {name}</Typography>
              </Stack>
              <Grid container spacing={1} rowGap={2}>
                {products && products.length > 0 ? 
                // products.splice(startCount,endCount).map((element)=>{
                  products.map((element)=>{
                  return (
                    <Grid item md={2.4}>
                      <CardProduct data={element} />
                    </Grid>
                  )
                }):"Not found"}
              </Grid>
            </Stack>
          </Grid>
        </Grid>
  
        <Footer />
      </>
    );
  }
  
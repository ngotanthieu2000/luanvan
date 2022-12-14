import {
    Grid,
    Link,
    Typography,
  } from "@mui/material";
  import { Stack } from "@mui/system";
  import React,{useState,useEffect} from "react";
  import NavigateNextIcon from "@mui/icons-material/NavigateNext";
  import Footer from "../Footer/Footer";
  import Navbar from "../Navbar/Navbar";
import {  useNavigate, useParams } from "react-router-dom";
import { getProductsByCategoriesAndType } from "../../api/api_instance";
import CardProduct from "../Home/CardProduct";
  export default function TypeProduct() {
    const navigate = useNavigate();
    const { categories,type} = useParams();
    const [products,setProducts] = useState()
    async function fetchListProductByCategoriesAndType(){
        const res = await getProductsByCategoriesAndType({categories,type});
        setProducts(res.element)
        if(res.element.length <= 0){
          navigate('/not_found')
        }
    }
    useEffect(() => {
        fetchListProductByCategoriesAndType()
    }, []);
    useEffect(() => {
      fetchListProductByCategoriesAndType()
  }, [categories,type]);
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
          <Typography color={"black"}>{categories}</Typography>
          <NavigateNextIcon />
          <Typography color={"black"}>{type}</Typography>
        </Stack>
        <Grid container justifyContent={"center"} spacing={1}>
          <Grid item md={8}>
            <Stack direction="column" width={"100%"} spacing={2}>
              <Stack direction={"row"} justifyContent="space-between">
                {/* <Typography variant="h5">The search results of </Typography> */}
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
  
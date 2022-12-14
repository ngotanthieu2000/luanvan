import {
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  Pagination,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React,{useState,useEffect} from "react";
import Header from "../Header/Header";
import InputLabel from "@mui/material/InputLabel";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Footer from "../Footer/Footer";
import RelatedProduct from "../RelatedProduct/RelatedProduct";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CardProduct from "../Home/CardProduct";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AppsIcon from "@mui/icons-material/Apps";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ViewListIcon from "@mui/icons-material/ViewList";
import { getBrands, getBrandsByCategories, getCategories, getProductFilterBrand, getProducts } from "../../api/api_instance";
import Navbar from "../Navbar/Navbar";
import { getRecommenders } from "../../api/auth";
import { useNavigate } from "react-router-dom";
export default function Shop() {
  const navigate = useNavigate()
  const [brand, setBrand] = React.useState([]);
  const [brandFilter, setBrandFilter] = React.useState([]);
  const [products,setProducts] = useState()
  const [categories,setCategories] = useState([])
  const [categoriesFilter,setCategoriesFilter] = useState([])
  // recommender
  const [recommenders,setRecommenders] = useState()
  async function fetchRecommenders(){
    const res = await getRecommenders({_id:localStorage.getItem('_id')})
    if(res.status==='Success'){
      console.log('res getRecommenders:',res)
      setRecommenders(res.element.recommenders.map(element=>{
        if(element.item !== null) return element;
      }));
    }
  }
  useEffect(() => {
    if(localStorage.getItem('_id') && localStorage.getItem('_id') !== 'undefined'){
     fetchRecommenders();
    }
  }, []);
  async function fetchCategories(){
    const res = await getCategories();
    console.log("res fetch categories::",res)
    if(res.status=== "Success"){

      setCategories(res.element.map((element)=>{
        return {...element, checked:false}
      }))
    }
  }
  async function fetchBrands(){
    const res = await getBrands();
    const temp = {}
    res.element.map((element)=>{
      let name = element.name
      element.checked = false
      return temp[`${name}`] = false
    })
    setBrand(temp)
    console.log(temp)
  }
  async function fetchListProduct(){
    const res = await getProducts();
    setProducts(res.element)
  }
  useEffect(() => {
    // fetchBrands();
    fetchCategories();
   fetchListProduct()
  }, []);

  useEffect(() => {
    var arr = []
    Object.keys(brand).map((key, index)=>{
      if(brand[key]){
        return arr.push(key)
      }
    })
    console.log({arr})
    setBrandFilter(arr)
  }, [brand]);
 async function handleFilterProducts(){
    console.log({brandFilter:JSON.stringify(brandFilter)})
    console.log({categoriesFilter:JSON.stringify(categoriesFilter)})
      const res = await getProductFilterBrand({brandFilter:JSON.stringify(brandFilter),categoriesFilter:JSON.stringify(categoriesFilter),priceFilter:JSON.stringify(priceFilter)})
      console.log('brand fileter lisproduct:',res)
      setProducts(res.element)
 }
  const handleChangeBrand =async (event) => {
    setBrand({...brand,[event.target.name]:event.target.checked});

  };
  const handleCheckCategoriesFilter = async (event)=> {
    setCategories(categories.map((element)=>{
      return element.name == event.target.name
      ? { ...element, checked: event.target.checked }
      : element;
    }))
    
  };
  async function fetchBrandsByCategories(){
    var arr = []
    categories.map((element, index)=>{
      if(element.checked){
        return arr.push(element.name)
      }
    })
    setCategoriesFilter(arr)
    console.log("arr fetchBrandsByCategories:",arr)
    const res = await getBrandsByCategories({categories:JSON.stringify(arr)})
    console.log("res fetchBrandsByCategories:",res)
    if(res.status==="Success"){
    const temp = {}
      res.element.map((element)=>{
        let name = element.name
        element.checked = false
        return temp[`${name}`] = false
      })
      setBrand(temp)
    }
    else{
      setBrand([])
    }
  }

  async function fetchProductByCategories(){
    console.log('fetchProductByCategories:',res)
    const res = await getProductFilterBrand({brandFilter:JSON.stringify(brandFilter),categoriesFilter:JSON.stringify(categoriesFilter)})
    console.log('fetchProductByCategories:',res)
    setProducts(res.element)
  }
  useEffect(() => {
    fetchBrandsByCategories()
  }, [categories]);

  var dataRecommedation = {
    name: "Purple Solo 2 Wireless",
    price: 685,
    avatar:
      "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
    category: "Speakers",
  };
  const [alignment, setAlignment] = useState("grid");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  
  const [sort, setSort] = useState(20);
  const [numberPage,setNumberPage] = useState(1)
  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };
  const [show, setShow] = useState(20);

  const handleChangeShow = (event) => {
    setShow(event.target.value);
    setCountShow(event.target.value);
    setNumberPage(listProducts.length/countShow);
  };
  const [countShow,setCountShow] = useState(20)
  const [startCount,setStartCount] = useState(0)
  const [endCount,setEndCount] = useState(startCount+countShow)
  useEffect(() => {
    setEndCount(startCount+countShow);
  }, [countShow]);

  
  
  const listProducts = [
    {
      name: "Purple Solo 2 Wireless Purple Solo 2 Wireless Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
  ];
  const [priceFilter, setPriceFilter] = React.useState([0, 0]);

  const handleChange = (event, newValue) => {
    setPriceFilter(newValue);
    console.log({newValue})
  };
  const [numPageReview, setNumPageReview] = useState(1);

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
        <Link href="#" underline="none" color={"black"}>
          Home
        </Link>
        <NavigateNextIcon />
        <Typography color={"black"}>Shop</Typography>
      </Stack>
      <Grid container justifyContent={"center"} spacing={1}>
        <Grid item md={2} lg={2}>
          <Stack direction="column" spacing={5}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Box
                // flexGrow={1}
                width={"100%"}
                // height={"400px"}
                // maxWidth={"fit-content"}
              >
                <Accordion
                  width="200px"
                  height={30}
                  sx={{ margin: "0 !important" }}
                >
                  <AccordionDetails sx={{ padding: "8px 16px" }}>
                    <Typography textAlign={"center"}>
                      Browse Categories
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                {categories.map((element) => {
                  return (
                    <Accordion
                      width="200px"
                      height={30}
                      sx={{ margin: "0 !important" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>
                          {element.name}
                        </Typography>
                      </AccordionSummary>
                      {element.types.map((elementChild) => {
                        return (
                          <AccordionDetails>
                            <Typography underline="none" sx={{
                              color:"blue",
                              cursor:'pointer'
                            }}
                            onClick={()=>{navigate(`/collection/${element.name}/${elementChild.name}`,{state:{categories:element.name,type:elementChild.name}})}}
                            >
                              {elementChild.name}
                            </Typography>
                          </AccordionDetails>
                        );
                      })}
                    </Accordion>
                  );
                })}
              </Box>
            </Stack>
            <Stack direction="column" spacing={1}>
              <Typography variant="subtitle1">Filters</Typography>
              <Divider />
              <Box >
                <Typography variant="subtitle2">Price</Typography>
                <Slider
                  getAriaLabel={() => 'Temperature range'}
                  value={priceFilter}
                  min={0}
                  max={5000}
                  step={100}
                  onChange={handleChange}
                  valueLabelDisplay="on"
                  // getAriaValueText={valuetext}
                />
              </Box>
              <Box>
                <FormControl
                  sx={{ m: 1 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Categories</FormLabel>
                  <FormGroup>
                    {categories  ? 
                    (
                      categories.map((element, index)=>{
                        return (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={element.checked}
                                onChange={handleCheckCategoriesFilter}
                                name={element.name}
                              />
                            }
                            label={element.name}
                          />
                        )
                      })
                    ) : undefined
                  } 
                    
                  </FormGroup>
                  {/* <FormHelperText>Be careful</FormHelperText> */}
                </FormControl>
              </Box>
              <Divider />
              <Box>
                <FormControl
                  sx={{ m: 1 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Brand</FormLabel>
                  <FormGroup>
                    {brand  ? 
                    (
                      Object.keys(brand).map((key, index)=>{
                        return (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={brand[key]}
                                onChange={handleChangeBrand}
                                name={key}
                              />
                            }
                            label={key}
                          />
                        )
                      })
                    ) : undefined
                  } 
                    
                  </FormGroup>
                  {/* <FormHelperText>Be careful</FormHelperText> */}
                </FormControl>
              </Box>
              <Divider />
              <Button variant="outline" 
              onClick={()=>{handleFilterProducts()}}
              >Filters</Button>

            </Stack>
          </Stack>
        </Grid>

        <Grid item md={8}>
          {
            recommenders && recommenders.length > 0 ? 
            (
              <Stack direction="column" width={"100%"} spacing={2}>
                <Stack direction="row" justifyContent={"space-between"}>
                  <Typography variant="h5">Recommended Products</Typography>
                  {/* <Box>
                    <IconButton sx={{ padding: "0px !important" }}>
                      <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton sx={{ padding: "0px !important" }}>
                      <NavigateNextIcon />
                    </IconButton>
                  </Box> */}
                  </Stack>
                  <Divider />
                  <Grid
                    container
                    spacing={1}
                    wrap={"nowrap"}
                    sx={{
                      whiteSpace: "nowrap",
                      overflowX: "auto",
                      // scrollBehavior: "smooth",
                    }}
                  >
                    {
                    recommenders?.map((element)=>{
                      if(element){
                          return (
                          <Grid item md={2.4}>
                            <CardProduct data={element.item} />
                          </Grid>
                          )
                      }
                    })
                    }
                  </Grid>
              </Stack>
            ):
            undefined
          }
          <Stack direction="column" width={"100%"} spacing={2}>
            <Stack direction={"row"} justifyContent="space-between">
              <Typography variant="h5">Shop</Typography>
            </Stack>
            <Grid container spacing={1} rowGap={2} justifyContent='center'>
              {products && products.length > 0 ? 
              // products.splice(startCount,endCount).map((element)=>{
                products.slice(10*(numPageReview-1),10*numPageReview).map((element)=>{
                return (
                  <Grid item md={2.4}>
                    <CardProduct data={element} />
                  </Grid>
                )
              }):"Not found"}
            </Grid>
            <Box  sx={{ display: "flex", justifyContent: "center" }}>
                    <Pagination
                      count={Math.ceil(products?.length / 10)}
                      value={numPageReview}
                      onChange={(event, value) => {
                        setNumPageReview(value);
                        console.log({value})
                      }}
                    />
                  </Box>
          </Stack>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}

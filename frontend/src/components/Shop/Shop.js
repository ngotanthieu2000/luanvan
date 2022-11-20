import {
  Divider,
  Grid,
  IconButton,
  Link,
  Select,
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
import { getProducts } from "../../api/api_instance";
export default function Shop() {
  const [brand, setBrand] = React.useState({
    adidas: false,
    newBalance: false,
    nike: false,
  });
  const { adidas, newBalance, nike } = brand;
  const handleChangeBrand = (event) => {
    setBrand({
      ...brand,
      [event.target.name]: event.target.checked,
    });
  };
  var relatedProduct = [
    {
      name: "Tablet White EliteBook Revolve 810 G2",
      price: 9000,
      oldPrice: 2299,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img2.jpg",
      category: "Speakers",
    },
    {
      name: "Purple Solo 2 Wireless",
      price: 685,
      oldPrice: 2299,
      rated: 4,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img3.jpg",
      category: "Speakers",
    },
    {
      name: "Smartphone 6S 32GB LTE",
      price: 499,
      oldPrice: 2299,
      rated: 2,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img4.jpg",
      category: "Smartphone",
    },
    {
      name: "Widescreen NX Mini F1 SMART NX",
      price: 699,
      oldPrice: 2299,
      rated: 5,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img5.jpg",
      category: "Camera",
    },
    {
      name: "Camera C430W 4k Waterproof",
      price: 799,
      oldPrice: 2299,
      rated: 5,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img8.jpg",
      category: "Camera",
    },
    {
      name: "Camera C430W 4k Waterproof",
      price: 799,
      oldPrice: 2299,
      rated: 4,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img8.jpg",
      category: "Camera",
    },
  ];
  const categories = [
    {
      name: "Cameras & Photography",
      quantityChild: 1,
      children: [{ name: "Cameras", quantity: 23 }],
    },
    {
      name: "Computer Compounents",
      quantityChild: 1,
      children: [{ name: "Computer Cases", quantity: 11 }],
    },
    {
      name: "Gadgets",
      quantityChild: 2,
      children: [
        { name: "Smartwatches", quantity: 9 },
        { name: "Wearables", quantity: 7 },
      ],
    },
    {
      name: "Home Entertaiment",
      quantityChild: 1,
      children: [{ name: "Tvs", quantity: 14 }],
    },
  ];

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

  const [products,setProducts] = useState([])
  async function fetchListProduct(){
    const res = await getProducts();
    setProducts(res.element)
  }
  useEffect(() => {
   fetchListProduct()
  }, []);
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
  
  return (
    <>
      <Header />
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
                          {element.name} ({element.quantityChild})
                        </Typography>
                      </AccordionSummary>
                      {element.children.map((elementChild) => {
                        return (
                          <AccordionDetails>
                            <Link href="#" underline="none">
                              {elementChild.name} ({elementChild.quantity})
                            </Link>
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
              <Box>
                <FormControl
                  sx={{ m: 1 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Brand</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={adidas}
                          onChange={handleChangeBrand}
                          name="adidas"
                        />
                      }
                      label="Adidas"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={newBalance}
                          onChange={handleChangeBrand}
                          name="newBalance"
                        />
                      }
                      label="New Balance"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={nike}
                          onChange={handleChangeBrand}
                          name="nike"
                        />
                      }
                      label="Nike"
                    />
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
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={adidas}
                          onChange={handleChangeBrand}
                          name="adidas"
                        />
                      }
                      label="Adidas"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={newBalance}
                          onChange={handleChangeBrand}
                          name="newBalance"
                        />
                      }
                      label="New Balance"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={nike}
                          onChange={handleChangeBrand}
                          name="nike"
                        />
                      }
                      label="Nike"
                    />
                  </FormGroup>
                  {/* <FormHelperText>Be careful</FormHelperText> */}
                </FormControl>
              </Box>
            </Stack>
          </Stack>
        </Grid>

        <Grid item md={8}>
          <Stack direction="column" width={"100%"} spacing={2}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h5">Recommended Products</Typography>
              <Box>
                <IconButton sx={{ padding: "0px !important" }}>
                  <NavigateBeforeIcon />
                </IconButton>
                <IconButton sx={{ padding: "0px !important" }}>
                  <NavigateNextIcon />
                </IconButton>
              </Box>
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
              <Grid item md={2.4}>
                <CardProduct data={dataRecommedation} />
              </Grid>
              <Grid item md={2.4}>
                <CardProduct data={dataRecommedation} />
              </Grid>
              <Grid item md={2.4}>
                <CardProduct data={dataRecommedation} />
              </Grid>
              <Grid item md={2.4}>
                <CardProduct data={dataRecommedation} />
              </Grid>
              <Grid item md={2.4}>
                <CardProduct data={dataRecommedation} />
              </Grid>
            </Grid>
            <Divider />
            <Stack direction={"row"} justifyContent="space-between">
              <Typography variant="h5">Shop</Typography>
              <Typography variant="subtitle1">
                Show 1-25 of 56 result
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              height={50}
              alignItems="center"
            >
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                <ToggleButton value="grid" aria-label="left aligned" onClick={()=>{console.log("List Products:",products)}}>
                  <AppsIcon />
                </ToggleButton>
                <ToggleButton value="headline" aria-label="centered">
                  <ViewHeadlineIcon />
                </ToggleButton>
                <ToggleButton value="list" aria-label="right aligned">
                  <ViewListIcon />
                </ToggleButton>
              </ToggleButtonGroup>
              <Box maxHeight={"100%"}>
                <FormControl
                  sx={{ m: 1, minWidth: 120, maxHeight: 50 }}
                  size="small"
                >
                  <Select
                    value={sort}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    onChange={handleChangeSort}
                    sx={{
                      borderRadius: "50px !important",
                    }}
                  >
                    <MenuItem value="">
                     Default sorting
                    </MenuItem>
                    <MenuItem value={"populatity"}>Sort by populatity</MenuItem>
                    <MenuItem value={"rating"}>Sort by average rating</MenuItem>
                    <MenuItem value={"lates"}>Sort by lates</MenuItem>
                    <MenuItem value={"priceUp"}>
                      Sort by price:low to hight
                    </MenuItem>
                    <MenuItem value={"priceDown"}>
                      Sort by price:hight to low
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  sx={{ m: 1, minWidth: 120, maxHeight: 50 }}
                  size="small"
                >
                  <Select
                    value={show}
                    onChange={handleChangeShow}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      borderRadius: "50px !important",
                    }}
                  >
                    <MenuItem value={20}>
                      Show 20
                    </MenuItem>
                    <MenuItem value={40}>Show 40</MenuItem>
                    <MenuItem value={"all"}>Show All</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box display="flex" flexDirection={"row"} alignItems="center">
                <TextField
                  type="number"
                  size="small"
                  InputProps={{
                    inputProps: { 
                        max: 100, min: 1 
                    }
                  }}
                  onInput = {(e) =>{
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
                  }}
                  sx={{
                    width: 80,
                    borderRadius: "50px !important",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: `90px`,
                      },
                    },
                  }}
                />
                <Typography>of {numberPage}</Typography>
                <IconButton>
                  <ArrowRightAltIcon />
                </IconButton>
              </Box>
            </Stack>
            <Divider />
            <Grid container spacing={1} rowGap={2}>
              {products.splice(startCount,endCount).map((element)=>{
                return (
                  <Grid item md={2.4}>
                    <CardProduct data={element} />
                  </Grid>
                )
              })}
            </Grid>
          </Stack>
        </Grid>
      </Grid>

      <RelatedProduct data={relatedProduct} />
      <Footer />
    </>
  );
}

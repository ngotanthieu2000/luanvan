import { Box, Stack } from "@mui/system";
import React from "react";
import Header from "../Header/Header";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Grid, Pagination } from "@mui/material";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ChatBot from "react-simple-chatbot";

import Carousel from "react-material-ui-carousel";
import silde1 from "../../public/image/slideshow_1.webp";
import silde2 from "../../public/image/slideshow_2.webp";
import silde3 from "../../public/image/slideshow_3.webp";
import cardCamera from "../../public/image/card_camera.png";
import CardProduct from "./CardProduct";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../Footer/Footer";
// import ChatbotProduct from "../Chatbot/ChatbotProduct";
export default function Home() {
  const itemSlide = [
    { name: "slide1", src: silde1 },
    { name: "slide2", src: silde2 },
    { name: "slide3", src: silde3 },
  ];

  //data product
  var dataProduct = [
    {
      name: "Tablet White EliteBook Revolve 810 G2",
      price: 9000,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img2.jpg",
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
      name: "Smartphone 6S 32GB LTE",
      price: 499,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img4.jpg",
      category: "Smartphone",
    },
    {
      name: "Widescreen NX Mini F1 SMART NX",
      price: 699,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img5.jpg",
      category: "Camera",
    },
    {
      name: "Camera C430W 4k Waterproof",
      price: 799,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img8.jpg",
      category: "Camera",
    },
    {
      name: "Camera C430W 4k Waterproof",
      price: 799,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img8.jpg",
      category: "Camera",
    },
    {
      name: "Tablet White EliteBook Revolve 810 G2",
      price: 9000,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img2.jpg",
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
      name: "Smartphone 6S 32GB LTE",
      price: 499,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img4.jpg",
      category: "Smartphone",
    },
    {
      name: "Widescreen NX Mini F1 SMART NX",
      price: 699,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img5.jpg",
      category: "Camera",
    },
    {
      name: "Camera C430W 4k Waterproof",
      price: 799,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img8.jpg",
      category: "Camera",
    },
    {
      name: "Camera C430W 4k Waterproof",
      price: 799,
      avatar:
        "https://transvelo.github.io/electro-html/2.0/assets/img/212X200/img8.jpg",
      category: "Camera",
    },
  ];

  const [index, setIndex] = React.useState(0);

  const handleChange = (cur, prev) => {
    setIndex(cur);
    // console.log(cur, prev);
  };

  const [alignment, setAlignment] = React.useState("featured");

  const handleChangeToggle = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [dataUserInput,setDataUserInput] = React.useState('null')
  var temp
  function chatbotData(dataUserInput) {
    return <div>{dataUserInput}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <Header />
      {/* silde item featured */}
      <Stack spacing={5} direction={'column'}>
        <Box width={"100%"} height="500px" position="relative" zIndex={1}>
          <Carousel
            index={index}
            onChange={handleChange}
            interval={3000}
            animation="slide"
            indicators={false}
            stopAutoPlayOnHover
            swipe
            className="my-carousel"
            navButtonsAlwaysVisible
          >
            {itemSlide.map((item) => (
              <img
                src={item.src}
                alt={item.name}
                width="100%"
                height={"500px"}
                // style={{ marginLeft: "11%" }}
              />
            ))}
          </Carousel>
        </Box>
        <Stack
          direction={"row"}
          height={"180px"}
          width={"100%"}
          sx={{justifyContent: "center" }}
        >
          <Card sx={{ height: 160, maxWidth: 345, display: "flex", marginX: 3 }}>
            <CardMedia
              component="img"
              height="140"
              image={cardCamera}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Camera Chính Hãng
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ưu đãi lên đến 40%
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ height: 160, maxWidth: 345, display: "flex", marginX: 3 }}>
            <CardMedia
              component="img"
              height="140"
              image={cardCamera}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Camera Chính Hãng
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ưu đãi lên đến 40%
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ height: 160, maxWidth: 345, display: "flex", marginX: 3 }}>
            <CardMedia
              component="img"
              height="140"
              image={cardCamera}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Camera Chính Hãng
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ưu đãi lên đến 40%
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ height: 160, maxWidth: 345, display: "flex", marginX: 3 }}>
            <CardMedia
              component="img"
              height="140"
              image={cardCamera}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Camera Chính Hãng
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ưu đãi lên đến 40%
              </Typography>
            </CardContent>
          </Card>
        </Stack>
        <Stack direction={"column"} maxHeight={"950px"} width={"100%"}>
          <Stack
            direction={"row"}
            width={"100%"}
            height={"50px"}
            justifyContent="center"
            // bgcolor={'#c7dfff'}
          >
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChangeToggle}
              aria-label="Platform"
            >
              <ToggleButton variant="text" value="featured">
                Featured
              </ToggleButton>
              <ToggleButton value="onsales">On Sales</ToggleButton>
              <ToggleButton value="toprated">Top Rated</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Stack ml={"10%"} mr={"10%"} maxHeight={850}>
            <Grid container spacing={2}>
              {dataProduct.map((element) => {
                return (
                  <Grid item xs={2}>
                    <CardProduct data={element} />
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
        </Stack>

        <Stack
          direction={"column"}
          height={"1000px"}
          width={"100%"}
          position="relative"
        >
          <Stack
            direction={"row"}
            width={"100%"}
            height={"50px"}
            justifyContent="center"
            // bgcolor={'#c7dfff'}
          >
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChangeToggle}
              aria-label="Platform"
            >
              <ToggleButton value="speakers">Speakers</ToggleButton>
              <ToggleButton value="smartphone">Smartphone</ToggleButton>
              <ToggleButton value="laptop">Laptop</ToggleButton>
              <ToggleButton value="desktop">Desktop</ToggleButton>
              <ToggleButton value="display">Display</ToggleButton>
              <ToggleButton value="apple">Apple</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Stack ml={"10%"} mr={"10%"} maxHeight={850}>
            <Grid container spacing={2}>
              {dataProduct.map((element) => {
                return (
                  <Grid item xs={2}>
                    <CardProduct data={element} />
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
          <Stack direction={"row"} justifyContent={"center"} mt={3}>
            <Pagination color="primary" count={10} mt={3} size="large" />
          </Stack>
        </Stack>
        <Footer />

        {/* <Box>
          <ChatBot
            width="500px"
            height="700px"
            floating
            steps={[
              {
                id: "1",
                message: "You can add custom components",
                trigger: "2",
              },
              {
                id: "2",
                user: true,
                trigger: "3", 
              },
              {
                id: "3",
                message:  ({ previousValue, steps }) => {
                  return `Value input = ${previousValue}`
                },
                trigger: "4",
              },
              {
                id: "4",
                component:<ChatbotProduct />,
                // waitAction: true,
                trigger: "5",
              },
              {
                id: "5",
                user: true,
                trigger: "6", 
              },
              {
                id: "6",
                message: "Bye :wake:",
                end: true,
              },
            ]}
          />
        </Box> */}
      </Stack>
      {/* <ChatbotProduct name={temp}/> */}
      <ScrollToTop smooth style={{top:24,right:32}} />
    </div>
  );
}

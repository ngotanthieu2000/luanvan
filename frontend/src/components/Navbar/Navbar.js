import React from "react";
import { useState,useEffect } from "react";
import Stack from "@mui/material/Stack";
import { NavLink,useNavigate  } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Button, Box, Grid ,IconButton,Tooltip,Menu,MenuItem} from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import { getCart } from "../../api/auth";
export default function Navbar({updateCart}) {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  let navigate = useNavigate()
  const [cart,setCart] = useState();
  const [totalCart,setTotalCart] = useState();
  useEffect(() => {
    if(updateCart)
    {
      console.log("updateCart:::",updateCart)
      setCart(updateCart)
      localStorage.setItem('cart',JSON.stringify(updateCart))
    }
  }, [updateCart]);
  async function fetchDataCart(){
    const flag = localStorage.getItem("cart")
    var data 
    if(localStorage.getItem("_id")){
      var res = await getCart({userId:localStorage.getItem("_id")})
      // console.log("Res getCart:",res)
      data=res.element
    }
    else if(flag && flag !== 'undefined'){
      data= JSON.parse(localStorage.getItem("cart"))
      setCart(cart);
    }
    else{
      data = {
        user:'id_clone',
        status:'saved',
        products:[]
      }
      
    }
    setCart( prev => Object.assign({},data))
    localStorage.setItem('cart',JSON.stringify(data))
    updateTotalPriceCart(data)
  }
  useEffect(() => {
    fetchDataCart();
    
  }, []);
  
  // update total price cart
  async function updateTotalPriceCart(data){
    var total = 0;
    if(data && data.products.length > 0){
      data.products.map((element)=>{
        total += element.item.price * element.qty
      })
    }
    setTotalCart(total)
  }
  useEffect(() => {
    updateTotalPriceCart(cart);
    console.log('Total::',totalCart)
  }, [cart]);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleToCart =()=>{
    return navigate('/cart')
  }
  const handleToProfile =()=>{
    return navigate('/profile')
  }
  const handleLogout =()=>{
    localStorage.removeItem('name');
    localStorage.removeItem('avatar');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('address');
    localStorage.removeItem('_id');
    localStorage.removeItem('timeExpired');
    localStorage.removeItem('cart');
    setAvatar(undefined)
    setName(undefined)
    fetchDataCart()
    navigate('/')
  }
  const [name,setName] = useState(localStorage.getItem("name") || undefined);
  const [avatar,setAvatar] = useState(localStorage.getItem("avatar") === 'unknown' ? undefined : localStorage.getItem("avatar"));
  useEffect(() => {
    setAvatar(localStorage.getItem("avatar"))
  }, [localStorage.getItem("avatar")]);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -4,
      top: 14,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Button
        variant="text"
        sx={{ textTransform: "capitalize", fontWeight: "bold" }}
      >
        LOGO
      </Button>
      <List>
        {["Value of day", "Top 100 Offers", "New Arrivals"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText sx={{ fontWeight: "bold" }} primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" mt={0}>
        <Typography
          flex={2}
          variant="h6"
          paddingLeft={3}
          justifyContent="center"
        >
          {" "}
          Welcom to website Electrolic Store
        </Typography>
        <Stack flex={1} direction="row" justifyContent="center">
          <Box direction="row" bgcolor="#ffffff">
            <Button
              variant="text"
              sx={{ textTransform: "capitalize" }}
              startIcon={<LocationOnIcon />}
            >
              Store Locator
            </Button>
          </Box>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Box direction="row" bgcolor="#ffffff">
            <Button
              variant="text"
              sx={{ textTransform: "capitalize" }}
              startIcon={<LocalShippingIcon />}
            >
              Track Your Order
            </Button>
          </Box>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Box direction="row" bgcolor="#ffffff" display={"inline-flex"}>
            {name ? (
              <>
                <Button variant="text" sx={{ textTransform: "capitalize" }}>
                  {name}
                </Button>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          avatar
                            ? `http://localhost:5000/static/public/users/${avatar}`
                            : require('../../public/image/avatardefault.png')
                        }
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
              sx={{ mt: '25px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={'Profile'} onClick={handleToProfile}>
                  <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem key={"Cart"} onClick={handleToCart}>
                <Typography textAlign="center">Cart</Typography>
              </MenuItem>
              <MenuItem key={'Logout'} onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
                </Box>
              </>
            ) : (
              <Button
                variant="text"
                sx={{ textTransform: "capitalize" }}
                startIcon={<PermIdentityIcon />}
                to="/login"
              >
                <NavLink
                  to="/login"
                  style={(isActive) => ({
                    color: isActive ? "blue" : "blue",
                    textDecoration: "none",
                  })}
                >
                  Register or Sign in
                </NavLink>
              </Button>
            )}
          </Box>
        </Stack>
      </Stack>
      <Divider />
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={6} md={10} lg={10} justifySelf="center">
          <Stack
            direction="row"
            justifyContent="center"
            alignContent="center"
            mt={0}
            marginLeft="1rem"
            marginRight="1rem"
            sx={{
              // backgroundColor: "red",
              alignItems: "center",
            }}
          >
            <Box marginRight={3}>
              <Link underline="none" component="button" color={"black"}>
                <Typography
                  variant="h3"
                  align="center"
                  sx={{ fontFamily: "Garamond" }}
                  onClick={()=>{return navigate('/')}}
                >
                  Electro Shop
                </Typography>
              </Link>
            </Box>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 1000,
                color: "yellow",
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                {["left"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                      <MenuIcon />
                    </Button>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >
                      {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                ))}
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for Products"
                inputProps={{ "aria-label": "search for products" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <Stack direction="row" justifyContent="space-between" ml={10}>
              <Box>
                <IconButton aria-label="cart" 
                // onClick={()=>{navigate('/cart')}}
                onClick={()=>{console.log("Cart::",cart)}}
                
                >
                  <StyledBadge badgeContent={cart?.products?.length} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                  <Typography ml={3} mt={"auto"}>
                    {totalCart}
                  </Typography>
                </IconButton>
              </Box>
              {/* <Box>
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={100} color="primary" mt={5}>
                    <FavoriteIcon color="action" />
                  </StyledBadge>
                </IconButton>
              </Box> */}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}

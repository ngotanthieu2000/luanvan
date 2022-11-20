import React from "react";
import Navbar from "../Navbar/Navbar";
import Stack from "@mui/material/Stack";
import { Box, Button, Divider, Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MenuDepartment from "./MenuDepartment";
export default function Header({updateCart}) {
  // Menu department
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isShow, setIsShow] = React.useState(false);

  // console.log("IS SHOW:", isShow);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    document.getElementById("myMenuContent").style.visibility = "hidden";
    setAnchorEl(null);
  };
  const handleShowDetail = () => {
    document.getElementById("myMenuContent").style.visibility = "visible";
  };
  const handleHiddenDetail = () => {
    if (isShow)
      return (document.getElementById("myMenuContent").style.visibility =
        "visible");
    return (document.getElementById("myMenuContent").style.visibility =
      "hidden");
  };

  return (
    <>
      <Navbar updateCart={updateCart} />
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={6} md={10} lg={10} justifySelf="center" >
          <Stack
            direction={"row"}
            mt={0}
            justifyContent={"start"}
            marginX={"2.5%"}
            marginY={'5px'}
            height={50  }
          >
            <Box>
              <Button
                aria-controls={open ? "menu_department" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                disableRipple="true"
                variant="text"
                id="menu_all_department"
                startIcon={<MenuIcon />}
                sx={{
                  fontSize: "16x",
                  fontWeight: "500",
                  backgroundColor: "#fed700",
                  color: "black",
                  height: "50px",
                  width: "300px",
                  justifyContent: "flex-start",
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "#fed700",
                  },
                }}
              >
                All Department
              </Button>
              <Menu
                id="menu_department"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "menu_all_department",
                }}
                PaperProps={{
                  style: {
                    width: 300,
                  },
                }}
              >
                <MenuItem onClick={handleClose} sx={{ fontWeight: "700" }}>
                  Value of the Day
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose} sx={{ fontWeight: "700" }}>
                  Top 100 Offers
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose} sx={{ fontWeight: "700" }}>
                  New Arrivals
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleHiddenDetail();
                  }}
                  onMouseEnter={handleShowDetail}
                  onMouseLeave={handleHiddenDetail}
                >
                  Laptop
                  <NavigateNextIcon
                    sx={{ opacity: "0.5", marginLeft: "200px" }}
                  />
                  <div
                    style={{
                      backgroundColor: "red",
                      width: "20px",
                      height: "100%",
                    }}
                  ></div>
                </MenuItem>
                <Divider />
              </Menu>
            </Box>
            <Box>
              <Button
                disableRipple
                variant="outline"
                justifyContent={"flex-start"}
                endIcon={<ExpandMoreIcon />}
                sx={{
                  height: "50px",
                  width: "150px",
                  color: "#f44336",
                  "&.MuiButtonBase-root:hover": {
                    background: "none",
                    color: "#d32f2f",
                  },
                }}
              >
                Super Deal
              </Button>
            </Box>
            <Box>
              <Button
                disableRipple
                variant="outline"
                justifyContent={"flex-start"}
                sx={{
                  height: "50px",
                  width: "200px",
                  color: "black",
                  "&.MuiButtonBase-root:hover": {
                    background: "none",
                  },
                }}
              >
                Featured Brands
              </Button>
            </Box>
            <Box>
              <Button
                disableRipple
                variant="outline"
                justifyContent={"flex-start"}
                sx={{
                  height: "50px",
                  width: "200px",
                  color: "black",
                  "&.MuiButtonBase-root:hover": {
                    background: "none",
                  },
                }}
              >
                Trending Styles
              </Button>
            </Box>
            <Box>
              <Button
                disableRipple
                variant="outline"
                justifyContent={"flex-start"}
                sx={{
                  height: "50px",
                  width: "200px",
                  color: "black",
                  "&.MuiButtonBase-root:hover": {
                    background: "none",
                  },
                }}
              >
                Gift Cards
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <MenuDepartment showMenu={setIsShow} />
    </>
  );
}

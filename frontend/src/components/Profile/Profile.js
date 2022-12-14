import {
  Avatar,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Button,
  Modal,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/system";
import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import { updateUser, refreshToken, changeAvatar } from "../../api/auth.js";
import { DatePicker, DesktopDatePicker } from "@mui/x-date-pickers";
import Navbar from "../Navbar/Navbar";
export default function Profile() {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [isModify, setIsModify] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") === "unknown"
      ? undefined
      : localStorage.getItem("avatar")
  );
  const [userId, setUserId] = useState(
    localStorage.getItem("_id") || undefined
  );
  //birdth day
  const [birthday, setBirthday] = useState(
    JSON.parse(localStorage.getItem("user")).birthday || "2000-01-01"
  );

  const handleChangeBirthday = (newValue) => {
    setBirthday(newValue);
  };
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // async function fetchUser(){
  //   if(localStorage.getItem("user") && localStorage.getItem("user") != 'undefined'){
  //     setUser(JSON.parse(localStorage.getItem("user")))
  //   }
  //   else if(localStorage.getItem("_id" && localStorage.getItem("_id") != 'undefined')){
  //     const res = await
  //   }
  // }
  useEffect(() => {
    setAvatar(localStorage.getItem("avatar"));
  }, [localStorage.getItem("avatar")]);

  useEffect(() => {
    setAvatar(localStorage.getItem("avatar"));
  }, [localStorage.getItem("avatar")]);
  // handle change image and show image
  const handleChangeImage = async (event) => {
    if (event.target.value) {
      var output = document.getElementById("imageChange");
      output.src = URL.createObjectURL(event.target.files[0]);
    }
  };
  // handle submit change avatar

  const handleChangeAvatar = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("_id", userId);
    data.append("name", localStorage.getItem("name") || "Unown");
    data.append("avatar", event.target[0].files[0]);
    // console.log("Form Data:::",data)
    const res = await changeAvatar(data);
    // console.log("RESPONSE:::",res)
    localStorage.setItem("avatar", res.element);
    setOpen(false);
  };
  // handle submit
  const handleSubmitUpdate = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("birthday", birthday);
    console.log({
      name: data.get("name"),
      address: data.get("address"),
    });
    let body = {
      _id: userId,
      name: data.get("name"),
      phone: data.get("phone"),
      gender: data.get("gender"),
      birthday: data.get("birthday"),
      email: data.get("email"),
      address: data.get("address"),
    };
    console.log(body);

    const res = await updateUser(body);
    console.log("updateUser:::", res);
    setUser(res.element);
  };
  const handleRefreshToken = async () => {
    const res = await refreshToken();
    console.log("refreshToken:::", res);
  };
  return (
    <>
      <Navbar />
      <Grid
        my={5}
        container
        spacing={2}
        direction="row"
        justifyContent={"center"}
      >
        <Grid item xs={12} md={4.5} lg={2.5} paddingLeft={"0 !important"}>
          <Stack
            direction={"column"}
            spacing={2}
            alignItems={"center"}
            sx={{ marginX: "auto !inportant" }}
          >
            <Stack>
              <Avatar
                alt="Remy Sharp"
                src={
                  avatar
                    ? `http://localhost:5000/static/public/users/${avatar}`
                    : require("../../public/image/avatardefault.png")
                }
                sx={{
                  width: 340,
                  height: 340,
                }}
              />
              <Button onClick={handleOpen} className="changeAvatar">
                Change Avatar
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 600,
                    height: 750,
                    bgcolor: "white",
                    border: "0.5px solid #000",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Choose image file
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box
                      id="transition-modal-title"
                      mx={2}
                      component="form"
                      direction={"column"}
                      onSubmit={handleChangeAvatar}
                      noValidate
                      sx={{ mt: 1 }}
                      alignItems={"center"}
                    >
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="avatar"
                        name="avatar"
                        autoComplete="avatar"
                        type="file"
                        onChange={handleChangeImage}
                      />
                      <img
                        id="imageChange"
                        style={{
                          overflow: "hidden",
                          maxWidth: "100%",
                          maxHeight: "70%",
                        }}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Update
                      </Button>
                    </Box>
                  </Typography>
                </Box>
              </Modal>
            </Stack>
            <Stack direction={"row"} spacing={4}>
              <Tooltip
                title="Update Profile"
                onClick={() => {
                  setIsModify(true);
                }}
              >
                <IconButton sx={{ width: 100, height: 100 }} size="large">
                  <ManageAccountsIcon sx={{ width: 50, height: 50 }} />
                </IconButton>
              </Tooltip>
              {user.role && user.role === "admin" ? (
                <>
                  <Tooltip
                    title="Product Management"
                    onClick={() => {
                      navigate("/product-manager");
                    }}
                  >
                    <IconButton sx={{ width: 100, height: 100 }} size="large">
                      <InventoryIcon sx={{ width: 50, height: 50 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="Order Management"
                    onClick={() => {
                      navigate("/order-manager");
                    }}
                  >
                    <IconButton sx={{ width: 100, height: 100 }} size="large">
                      <ShoppingCartIcon sx={{ width: 50, height: 50 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="User Management"
                    onClick={() => {
                      navigate("/user-manager");
                    }}
                  >
                    <IconButton sx={{ width: 100, height: 100 }} size="large">
                      <PeopleIcon sx={{ width: 50, height: 50 }} />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Tooltip
                  title="List Order"
                  onClick={() => {
                    navigate("/profile/list-order");
                  }}
                >
                  <IconButton sx={{ width: 100, height: 100 }} size="large">
                    <ShoppingCartIcon sx={{ width: 50, height: 50 }} />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={4.5}
          lg={6.5}
          paddingLeft={"0 !important"}
          alignItems={"center"}
        >
          <Stack
            mx={10}
            direction={"column"}
            spacing={4}
            sx={{ mt: 1 }}
            alignItems={"center"}
            display={isModify ? "none" : "flex"}
          >
            <Typography variant="h5">Infomation User</Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow hover>
                    <TableCell
                      width="50%"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell
                      width="50%"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      Phone Number
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell
                      width="50%"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      Full Name
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell
                      width="50%"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      Gender
                    </TableCell>
                    <TableCell>{user.gender}</TableCell>
                  </TableRow>
                  <TableRow hover>
                    <TableCell
                      width="50%"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      Birthday
                    </TableCell>
                    <TableCell>{user.birthday}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
          <Stack
            mx={10}
            component="form"
            direction={"column"}
            onSubmit={handleSubmitUpdate}
            noValidate
            alignItems={"flex-start"}
            sx={{ mt: 1 }}
            display={!isModify ? "none" : "flex"}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              defaultValue={user.email}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="phone"
              defaultValue={user.phone}
              autoFocus
            />
            {/* <Typography variant="h4">Email: {user.email}</Typography>
            <Typography variant="h4">Phone Number: {user.phone}</Typography> */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              defaultValue={user.name}
              autoFocus
            />
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                sx={{ marginRight: 2 }}
              >
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
                defaultValue={user?.gender}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              name="birthday"
              label="Birthday"
              type="date"
              value={birthday}
              autoFocus
              onChange={(e) => handleChangeBirthday(e.target.value)}
            />
            <Box direction="row">
              <Button
                type="submit"
                // fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  marginRight: 1,
                  width: "fit-content !important",
                }}
                onClick={() => {
                  setIsModify(false);
                }}
              >
                Update
              </Button>
              <Button
                // fullWidth
                variant="contained"
                color="error"
                sx={{
                  mt: 3,
                  mb: 2,
                  marginLeft: 1,
                  width: "fit-content !important",
                }}
                onClick={() => {
                  setIsModify(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}

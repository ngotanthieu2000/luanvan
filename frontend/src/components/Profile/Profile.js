import {
  Avatar,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import { useNavigate  } from "react-router-dom";
import { Box, Stack } from "@mui/system";
import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { updateUser, refreshToken, changeAvatar } from "../../api/auth.js";
export default function Profile() {
  let navigate = useNavigate()
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
  const [user, setUser] = useState({
    email: localStorage.getItem("email"),
    phone: localStorage.getItem("phone"),
    address: localStorage.getItem("address")
      ? localStorage.getItem("address")
      : " Unknown",
    name: localStorage.getItem("name"),
  });
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
    console.log({
      name: data.get("name"),
      address: data.get("address"),
    });
    let body = {
      _id: userId,
      name: data.get("name"),
      address: data.get("address"),
    };
    const res = await updateUser(body);
    console.log("updateUser:::", res);
    setUser({...user,name:res.element.name,address:res.element.address})
  };
  const handleRefreshToken = async () => {
    const res = await refreshToken();
    console.log("refreshToken:::", res);
  };
  return (
    <>
      <Header />
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
                title="Manager Account"
                onClick={() => {
                  setIsModify(true);
                }}
              >
                <IconButton sx={{ width: 100, height: 100 }} size="large">
                  <ManageAccountsIcon sx={{ width: 50, height: 50 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Manager Product" onClick={()=>{navigate('/product-manager')}}>
                <IconButton sx={{ width: 100, height: 100 }} size="large">
                  <InventoryIcon sx={{ width: 50, height: 50 }} />
                </IconButton>
              </Tooltip>
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
            <Typography variant="h4">Email: {user.email}</Typography>
            <Typography variant="h4">Phone Number: {user.phone}</Typography>
            <Typography variant="h4">Full Name: {user.name}</Typography>
            <Typography variant="h4">Address: {user.address}</Typography>
          </Stack>
          <Stack
            mx={10}
            component="form"
            direction={"column"}
            onSubmit={handleSubmitUpdate}
            noValidate
            sx={{ mt: 1 }}
            alignItems={"center"}
            display={!isModify ? "none" : "flex"}
          >
            {/* <TextField
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
            /> */}
            <Typography variant="h4">Email: {user.email}</Typography>
            <Typography variant="h4">Phone Number: {user.phone}</Typography>
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
            <TextField
              margin="normal"
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              defaultValue={user.address}
              autoFocus
            />
            <Box direction="row">
              <Button
                type="submit"
                // fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "fit-content !important" }}
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
                sx={{ mt: 3, mb: 2, width: "fit-content !important" }}
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

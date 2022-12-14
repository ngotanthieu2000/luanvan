import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login, postUpdateCartClone } from "../../api/auth";
import { NavLink, useNavigate } from "react-router-dom";
const theme = createTheme();

export default function SignIn() {
  let navigate = useNavigate();

  const showErrorToastMessage = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const showSuccessToastMessage = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    var cart = JSON.parse(localStorage.getItem('cart'))
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    // const{status, element ,msg ,accessToken,refreshToken} = await login(data.get("email"),data.get("password"))
    const res = await login({
      email: data.get("email"),
      password: data.get("password"),
    });
    // console.log(`Status:::${status} , Element:::${element}`)
    console.log("Res:::", res);

    if (res.status === "Error") {
      showErrorToastMessage(res.msg);
    } else {
      await showSuccessToastMessage(res.msg);
      localStorage.setItem("user", JSON.stringify(res.element));
      localStorage.setItem("name", res.element.name);
      localStorage.setItem("avatar", res.element.avatar ? res.element.avatar : '');
      localStorage.setItem("email", res.element.email);
      localStorage.setItem("phone", res.element.phone);
      localStorage.setItem("_id", res.element._id);
      localStorage.setItem("address", res.element.address ? res.element.address : '');
      localStorage.setItem("timeExpired", res.timeExpired);
      if(cart && cart.products.length >0)
      {
        const updateClone = await postUpdateCartClone({userId:res.element._id,listProduct:cart.products})
        console.log("Update clone cart:",updateClone.element)
      }
      navigate("/shop");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <NavLink
                  to="#"
                  variant="body2"
                  style={(isActive) => ({
                    color: isActive ? "#2978d2" : "#2978d2",
                    textDecoration: "none",
                  })}
                >
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink
                  to="/register"
                  style={(isActive) => ({
                    color: isActive ? "#2978d2" : "#2978d2",
                    textDecoration: "none",
                  })}
                >
                  Don't have an account? Sign Up
                </NavLink>
                {/* <Link href="/register" variant="body2" replace>
                  {"Don't have an account? Sign Up"}
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer style={{ width: "fit-content" }} />
    </ThemeProvider>
  );
}

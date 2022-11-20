import { IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import React from "react";

export default function () {
  return (
    <div style={{backgroundColor:'#eaeaea'}}>
      <Stack
        direction={"row"}
        justifyContent="center"
        height={200}
        bgcolor={'#eaeaea'}
        width={"100%"}
        position="absolute"
      >
        <Box justifyContent={'center'}  mt={3} >
          <Typography variant="h5">Contact</Typography>
          <Typography variant="h6">Address: Hem Lien To 3/4, Nguyen Van Cu, An Khanh, Ninh Kieu, Can Tho</Typography>
          <Stack direction={'row'} >
            <IconButton aria-label="delete">
              <FacebookIcon fontSize="large" />
            </IconButton>
            <IconButton aria-label="delete">
              <GoogleIcon fontSize="large" />
            </IconButton>
            <IconButton aria-label="delete">
              <TwitterIcon fontSize="large" />
            </IconButton>
            <IconButton aria-label="delete">
              <GitHubIcon fontSize="large" />
            </IconButton>
          </Stack>
        </Box>
        {/* <Box mt={3}>
          <Typography variant="h5">Login</Typography>
        </Box>
        <Box mt={3}>
          <Typography variant="h5">Home</Typography>
        </Box> */}
      </Stack>
    </div>
  );
}

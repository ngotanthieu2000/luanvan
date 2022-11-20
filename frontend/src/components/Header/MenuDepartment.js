import React from "react";
import { Box, Grid, Paper, Typography ,Link  } from "@mui/material";
import { Stack } from "@mui/system";
export default function MenuDepartment({showMenu}) {
  const handleHoverMenu = (isShow)=>{
    showMenu(isShow)
  }
  // console.log("Menu isshow:",showMenu)
  return (
    <div>
      <Paper
        id="myMenuContent"
        elevation={3}
        onMouseEnter={handleHoverMenu(true)}
        onMouseLeave={handleHoverMenu(false)}
        sx={{
          width: "600px",
          height: "500px",
          position: "absolute",
          marginLeft: "32.2rem",
          visibility: "hidden",
          zIndex: 100,
        }}
      >
        <Box>
          <Grid container spacing={2} paddingX={5} paddingTop={2}>
            <Grid item xs={6} textAlign={'center'}>
              <Stack direction={'column'}>
                <Typography variant="h7" fontWeight={'bold'}>Thương Hiệu</Typography>
                <Link href="#" underline="hover" color={'black'}>
                  Apple
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={6} textAlign={'center'}>
              <Typography variant="h7" fontWeight={'bold'}>Giá Bán</Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}

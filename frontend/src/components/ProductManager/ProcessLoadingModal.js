import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";

export default function ProcessLoadingModal({ parentOpen }) {
  const [openProcessLoading, setOpenProcessLoading] = useState(false);
  const handleCloseProcessLoading = () => {
    setOpenProcessLoading(false);
  };
  useEffect(() => {
    setOpenProcessLoading(parentOpen);
  }, [parentOpen]);
  return (
    <>
      <Modal
        open={openProcessLoading}
        // onClose={handleCloseProcessLoading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            p: 4,
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop:'-50px',
              marginLeft: '-200px',
            }}
            width={400}
            height={50}
          >
            <CircularProgress size={60} thickness={5}/>
            <Typography
              // id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Please wait, the data are processed ...
            </Typography>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

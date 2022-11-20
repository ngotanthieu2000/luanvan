import React from "react";
import { Box, Zoom, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useScrollTrigger from "@mui/material/useScrollTrigger";
export default function ScrollToTop() {
  const trigger = useScrollTrigger({
    target: document.body,
    disableHysteresis: true,
    threshold: 100,
  });

  const scrollToTop = React.useCallback(() => {
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Zoom in={trigger}>
        <Box
          role="presentation"
          sx={{
            position: "fixed",
            top: 0,
            right: 32,
            zIndex: 1,
          }}
        >
          <Fab
            onClick={scrollToTop}
            color="primary"
            size="small"
            aria-label="scroll back to top"
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Box>
      </Zoom>
    </>
  );
}

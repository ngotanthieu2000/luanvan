import React, { useState, useEffect } from "react";
import {
  updateInventory,
} from "../../api/auth";
import {
  Box,
  Button,
  Grid,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
export default function UpdateInventory({openUpdateInventory,closeUpdateInventory,product_id}) {
  console.log(
    'Update Inventory',
    openUpdateInventory
  )
  const [qty, setQty] = useState();
  const handleSubmitUpdateInventory = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append('_id',product_id)
    // console.log({_id:data.get('_id'),qty:data.get('quantity')});
    const res = await updateInventory({_id:data.get('_id'),quantity:data.get('quantity')})
    closeUpdateInventory(false)
  };
  return (
    <Modal
      open={openUpdateInventory}
      onClose={closeUpdateInventory}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,
          bgcolor: "background.paper",
          border: "1px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Inventory
        </Typography>
        <Box
          id="modal-modal-description"
          component="form"
          noValidate
          onSubmit={handleSubmitUpdateInventory}
          sx={{ mt: 3 }}
        >
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyItems: "center" }}
          >
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="quantity"
                name="quantity"
                // value={qty}
                fullWidth
                id="quantity"
                label="Input Quantity"
                autoFocus
                // onChange={(e) => {
                //   setQty(e.target.value);
                // }}
              />
               
            </Grid>
          </Grid>
          <Button
            type="submit"
            //   fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

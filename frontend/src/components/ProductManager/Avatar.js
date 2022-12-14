import { Card } from '@mui/material'
import React from 'react'

export default function Avatar (params) {
    let img_url = `${process.env.REACT_APP_URL_IMAGE_PRODUCT}/${params.row.attachments[0]}`;
  return (
    <>
    <Card
        sx={{
        maxWidth: 50,
        display: "flex",
        width: "50px",
        height: "50px",
        position: "relative",
        overflow: "hidden",
        }}
    >
        <img
        width="auto"
        height="100%"
        style={{
            display: "inline",
            margin: "0 auto",
            height: "auto",
            width: "100%",
        }}
        src={
            params.row.attachments[0]
            ? img_url
            : `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`
        }
        />
    </Card>
    </>

  )
}

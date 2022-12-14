import { Rating, Typography } from '@mui/material'
import React from 'react'

export default function OverallRating(params) {
  return (
    <>
        <Rating
            readOnly
            name="simple-controlled"
            value={params.value}
            precision={0.01}
           
        />
        <Typography variant="caption" mt={0.5}>
            {params.value.toFixed(2)}
        </Typography>
    </>
  )
}

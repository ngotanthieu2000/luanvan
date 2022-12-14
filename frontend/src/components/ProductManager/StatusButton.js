import { Button} from '@mui/material'
import React from 'react'

export default function StatusButton({params,handleChangeStatus,handleUpdateProductStatus}) {
  const handleChangeStatusProduct = async (event)=>{
    event.preventDefault();
    handleChangeStatus(event.target.name)
    // console.log(handleChangeStatus)
  }
  return (
    <>
        
    </>
  )
}

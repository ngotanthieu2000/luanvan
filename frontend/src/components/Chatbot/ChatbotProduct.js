import React, { useState, useEffect } from 'react';
import  axios from 'axios'

export default function ChatbotProduct(props) {
    const steps = props?.steps || ""
    const [dataUserInput,setDataUserInput] = useState(steps[2]?.value || '')
    const [product,setProduct] = useState(dataUserInput)
    console.log("steps Props:::", dataUserInput)
    // console.log("previousStep Props:::",previousStep)
    useEffect(() => {
        try {
          axios.get(`http://localhost:5000/product/get/all`).then((response) => {
            console.log("Response Data :::",response)
            setProduct(response.data);
          });
        } catch (error) {
          console.log(error)
        }
    }, [dataUserInput]);
   
      return (
    <div>{dataUserInput || "No data" }</div>
  )
}

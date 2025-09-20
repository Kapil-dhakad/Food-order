import React from 'react'
import { useState } from 'react'

const Verify = () => {
    const [searchParams, setSearchParams] = useState();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    console.log(success, orderId)
  return (
    <div>
      
    </div>
  )
}

export default Verify

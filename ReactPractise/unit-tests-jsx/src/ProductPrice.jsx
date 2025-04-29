import React from 'react'

export default function ProductPrice() {
    const [price] = React.useState(12.00);

  return (
     <p>Price: {price.toFixed(2)}</p>
  )
}

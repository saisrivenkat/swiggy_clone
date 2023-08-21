import React from 'react'
import Skeleton from '@mui/material/Skeleton';

function LoadingShimmer(props) {
  return (
    <Skeleton variant={props.variant} width={props.width} height={props.height}  />
  )
}

export default LoadingShimmer
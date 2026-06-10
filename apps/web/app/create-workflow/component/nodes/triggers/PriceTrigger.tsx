import { Handle,Position } from '@xyflow/react'
import React from 'react'

export type priceTriggerMetaData = {
    asset : string,
    price : number
}

export function PriceTrigger({data,isConnectable}: {
    data : {
        metadata : priceTriggerMetaData
    },
    isConnectable : boolean
}) {
  return (
    <div className="p-4 border">
        <h2>{data.metadata.asset}</h2>
        <p>{data.metadata.price}</p>
        <Handle type="source" position={Position.Right}></Handle>
    </div>
  )
}

export default PriceTrigger
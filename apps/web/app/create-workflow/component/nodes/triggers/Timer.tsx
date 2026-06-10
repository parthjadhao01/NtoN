import { Handle,Position } from '@xyflow/react'
import React from 'react'

export type timeNodeMetaData = {
    time : number
}

export function Timer({data,isConnectable}: {
    data : {
        metadata : timeNodeMetaData
    },
    isConnectable : boolean
}) {
  return (
    <div className='p-4 border'>
        Every { data.metadata.time / 3600} seconds
        <Handle type="source" position={Position.Right}></Handle>
    </div>
  )
}

export default Timer
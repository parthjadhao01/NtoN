import { Handle,Position } from '@xyflow/react'
import { TrendingUp } from 'lucide-react'
import React from 'react'
import { priceTriggerMetaData } from "common/types"


export function PriceTrigger({data,isConnectable}: {
    data : {
        metadata : priceTriggerMetaData
    },
    isConnectable : boolean
}) {
  return (
    <div className="min-w-50 rounded-xl border border-border bg-card text-card-foreground shadow-lg shadow-black/40">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-amber-500/15 text-amber-400">
                <TrendingUp className="size-3.5" />
            </div>
            <span className="text-xs font-medium">Price Trigger</span>
        </div>
        <div className="px-3 py-2.5 text-sm text-muted-foreground">
            When <span className="font-medium text-foreground uppercase">{data.metadata.asset}</span> hits <span className="font-medium text-foreground">${data.metadata.price}</span>
        </div>
        <Handle
            type="source"
            position={Position.Right}
            isConnectable={isConnectable}
            className="size-2.5! border-2! border-background! bg-amber-400!"
        />
    </div>
  )
}

export default PriceTrigger

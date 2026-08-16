import { Handle, Position } from '@xyflow/react'
import { Clock } from 'lucide-react'
import { timeNodeMetaData} from "common/types"
import React from 'react'

export function Timer({data,isConnectable}: {
    data : {
        metadata : timeNodeMetaData
    },
    isConnectable : boolean
}) {
  return (
    <div className="min-w-50 rounded-xl border border-border bg-card text-card-foreground shadow-lg shadow-black/40">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-400">
                <Clock className="size-3.5" />
            </div>
            <span className="text-xs font-medium">Time Trigger</span>
        </div>
        <div className="px-3 py-2.5 text-sm text-muted-foreground">
            Every <span className="font-medium text-foreground">{data.metadata.time}</span> sec
        </div>
        <Handle
            type="source"
            position={Position.Right}
            isConnectable={isConnectable}
            className="size-2.5! border-2! border-background! bg-emerald-400!"
        />
    </div>
  )
}

export default Timer

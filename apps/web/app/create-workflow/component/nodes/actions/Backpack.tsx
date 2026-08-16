import { cn } from "@/lib/utils";
import { Handle,Position } from '@xyflow/react'
import { Package } from 'lucide-react'
import { TradingMetaData } from 'common/types'

export function Backpack({data} : {
    data : {
        metadata : TradingMetaData
    }
}){
    return <div className="min-w-50 rounded-xl border border-border bg-card text-card-foreground shadow-lg shadow-black/40">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-pink-500/15 text-pink-400">
                <Package className="size-3.5" />
            </div>
            <span className="text-xs font-medium">Backpack Trade</span>
        </div>
        <div className="space-y-1 px-3 py-2.5 text-sm">
            <div className="flex items-center gap-1.5">
                <span className={cn(
                    "rounded px-1.5 py-0.5 text-xs font-medium",
                    data.metadata.type === "Long" ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
                )}>
                    {data.metadata.type}
                </span>
                <span className="font-medium text-foreground uppercase">{data.metadata.symbol}</span>
            </div>
            <div className="text-xs text-muted-foreground">Qty: <span className="text-foreground">{data.metadata.qty}</span></div>
        </div>
        <Handle type="target" position={Position.Left} className="size-2.5! border-2! border-background! bg-pink-400!" />
        <Handle type="source" position={Position.Right} className="size-2.5! border-2! border-background! bg-pink-400!" />
    </div>
}

export default Backpack

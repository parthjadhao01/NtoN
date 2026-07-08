"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { nodeKind, nodeMetaData } from "../page"
import { timeNodeMetaData } from "@/app/create-workflow/component/nodes/triggers/Timer"
import { priceTriggerMetaData } from './nodes/triggers/PriceTrigger'
import { TradingMetaData } from './nodes/actions/Lighter'
import { SUPPORTED_ASSETS } from './triggersheet'
import { ArrowLeftRight, Zap, Package } from 'lucide-react'

const SUPPORTED_ACTION = [{
    id: "hyperliquid",
    name: "Hyperliquid",
    description: "place a trade on hyperliquid",
    icon: Zap,
}, {
    id: "lighter",
    name: "Lighter",
    description: "place a trade on lighter",
    icon: ArrowLeftRight,
}, {
    id: "backpack",
    name : "Backpack",
    description : "place a trade on backpack",
    icon: Package,
}
]

const SUPPORTED_SYMBOLS = ["sol","btc","eth","usdc"]

function Actionsheet({ onSelect }: { onSelect: (type: nodeKind, metadata: nodeMetaData | priceTriggerMetaData | timeNodeMetaData | TradingMetaData,) => void }) {

    const [metadata, setMetaData] = useState<Partial<TradingMetaData>>({});
    const [selectedAction, setselectedAction] = useState<nodeKind>(SUPPORTED_ACTION[0]?.id as nodeKind);

    return (
        <Sheet open={true}>
            <SheetContent className="dark border-l border-border bg-card">
                <SheetHeader>
                    <SheetTitle>Select Action</SheetTitle>
                    <SheetDescription>
                        Choose what should happen next.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                        <Label className="text-muted-foreground">Action type</Label>
                        <Select value={selectedAction} onValueChange={(value) => setselectedAction(value as nodeKind)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Action" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {SUPPORTED_ACTION.map((trigger) => (
                                        <SelectItem key={trigger.id} value={trigger.id}>
                                            <trigger.icon className="size-3.5 text-muted-foreground" />
                                            {trigger.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {(selectedAction === "hyperliquid" || selectedAction === "lighter" || selectedAction === "backpack") &&
                        <>
                            <div className="grid gap-3">
                                <Label className="text-muted-foreground">Side</Label>
                                <Select onValueChange={(value) => setMetaData(metadata => ({
                                    ...metadata,
                                    type : value as "Long" | "Short",
                                }))}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Side" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem key="Long" value="Long">
                                                Long
                                            </SelectItem>
                                            <SelectItem key="Short" value="Short">
                                                Short
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-3">
                                <Label className="text-muted-foreground">Symbol</Label>
                                <Select onValueChange={(value) => setMetaData(metadata => ({
                                    ...metadata,
                                    symbol : value as typeof SUPPORTED_SYMBOLS[number],
                                }))}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Symbol" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {SUPPORTED_SYMBOLS.map((symbol, id) => (
                                                <SelectItem key={id} value={symbol}>
                                                    {symbol.toUpperCase()}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-3">
                                <Label className="text-muted-foreground">Quantity</Label>
                                <Input type="number" placeholder="e.g. 1" onChange={(e) => setMetaData(metadata => ({
                                    ...metadata,
                                    qty : Number(e.target.value)
                                }))} />
                            </div>
                        </>
                    }
                </div>
                <SheetFooter>
                    <Button className="w-full" onClick={() => onSelect(selectedAction, metadata as TradingMetaData)}>Create Node</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Actionsheet

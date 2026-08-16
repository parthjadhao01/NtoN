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
import { timeNodeMetaData } from "common/types"
import { priceTriggerMetaData } from "common/types"
import { Clock, TrendingUp } from 'lucide-react'

const SUPPORTED_TRIGGERS = [{
    id: "price-trigger",
    name: "Price Trigger",
    icon: TrendingUp,
}, {
    id: "time-trigger",
    name: "Time Trigger",
    icon: Clock,
}]

export const SUPPORTED_ASSETS = ["sol","btc","eth","usdc"]

function Triggersheet({ onSelect }: { onSelect: (type: nodeKind, metadata: nodeMetaData | priceTriggerMetaData | timeNodeMetaData,) => void }) {

    const [metadata, setMetaData] = useState<nodeMetaData | priceTriggerMetaData | timeNodeMetaData>({ name: '', description: '' });
    const [selectedTrigger, setSelectedTrigger] = useState<nodeKind>(SUPPORTED_TRIGGERS[0]?.id as nodeKind);

    return (
        <Sheet open={true}>
            <SheetContent className="dark border-l border-border bg-card">
                <SheetHeader>
                    <SheetTitle>Select Trigger</SheetTitle>
                    <SheetDescription>
                        Choose what should start this workflow.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                        <Label className="text-muted-foreground">Trigger type</Label>
                        <Select value={selectedTrigger} onValueChange={(value) => setSelectedTrigger(value as nodeKind)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Trigger" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {SUPPORTED_TRIGGERS.map((trigger) => (
                                        <SelectItem key={trigger.id} value={trigger.id}>
                                            <trigger.icon className="size-3.5 text-muted-foreground" />
                                            {trigger.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {selectedTrigger === "time-trigger" &&
                        <div className="grid gap-3">
                            <Label className="text-muted-foreground">Time (sec)</Label>
                            <Input type="number" placeholder="e.g. 60" onChange={(e) => setMetaData(metadata => ({
                                ...metadata,
                                time : Number(e.target.value)
                            }))} />
                        </div>
                    }

                    {selectedTrigger === "price-trigger" &&
                        <>
                            <div className="grid gap-3">
                                <Label className="text-muted-foreground">Price</Label>
                                <Input type="number" placeholder="e.g. 99" onChange={(e) => setMetaData(metadata => ({
                                    ...metadata,
                                    price : Number(e.target.value)
                                }))} />
                            </div>

                            <div className="grid gap-3">
                                <Label className="text-muted-foreground">Asset</Label>
                                <Select value={SUPPORTED_ASSETS[0]} onValueChange={(value) => setMetaData(metadata => ({
                                    ...metadata,
                                    asset : value as string,
                                }))}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Asset" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {SUPPORTED_ASSETS.map((assets,id) => (
                                                <SelectItem key={id} value={assets}>
                                                    {assets.toUpperCase()}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    }
                </div>
                <SheetFooter>
                    <Button className="w-full" onClick={() => onSelect(selectedTrigger, metadata)}>Create Node</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Triggersheet

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

const SUPPORTED_TRIGGERS = [{
    id: "price-trigger",
    name: "Price Trigger"
}, {
    id: "time-trigger",
    name: "Time Trigger"
}]

const SUPPORTED_ASSETS = ["sol","btc","eth","usdc"]

function Triggersheet({ onSelect }: { onSelect: (type: nodeKind, metadata: nodeMetaData | priceTriggerMetaData | timeNodeMetaData,) => void }) {
    const [metadata, setMetaData] = useState<nodeMetaData | priceTriggerMetaData | timeNodeMetaData>({ name: '', description: '' });
    const [selectedTrigger, setSelectedTrigger] = useState<nodeKind>(SUPPORTED_TRIGGERS[0]?.id as nodeKind);
    return (
        <Sheet open={true}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Select Trigger</SheetTitle>
                    <SheetDescription>
                        Select types of trigger you need.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <Select value={selectedTrigger} onValueChange={(value) => setSelectedTrigger(value as nodeKind)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Trigger" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {SUPPORTED_TRIGGERS.map((trigger) => (
                                    <SelectItem key={trigger.id} value={trigger.id}>
                                        {trigger.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {selectedTrigger === "time-trigger" && 
                        <div className="grid gap-3">
                            <Label>time</Label>
                            <Input placeholder="time in sec" onChange={(e) => setMetaData(metadata => ({
                                ...metadata,
                                time : Number(e.target.value)
                            }))} />
                        </div>
                    }

                    {selectedTrigger === "price-trigger" &&
                        <>
                            <div className="grid gap-3">
                                <Label>price</Label>
                                <Input placeholder="99" onChange={(e) => setMetaData(metadata => ({
                                    ...metadata,
                                    price : Number(e.target.value)
                                }))} />
                            </div>
                            
                            <Select value={SUPPORTED_ASSETS[0]} onValueChange={(value) => setMetaData(metadata => ({
                                ...metadata,
                                asset : value as string,
                            }))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Trigger" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {SUPPORTED_ASSETS.map((assets,id) => (
                                            <SelectItem key={id} value={assets}>
                                                {assets}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            
                        </>
                    }
                </div>
                <SheetFooter>
                    <Button onClick={() => onSelect(selectedTrigger, metadata)}>Create Node</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Triggersheet
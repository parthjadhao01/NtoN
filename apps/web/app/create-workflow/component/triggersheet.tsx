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
import { nodeTypes, nodeKind, nodeMetaData } from "../page"

const SUPPORTED_TRIGGERS = [{
    id: "price-trigger",
    name: "Price Trigger"
}, {
    id: "time-trigger",
    name: "Time Trigger"
}, {
    id: "hyperliquid",
    name: "Hyperliquid"
}, {
    id: "backpack",
    name: "Backpack"
}, {
    id: "lighter",
    name: "Lighter"
}]

function Triggersheet({ onSelect }: { onSelect: (kind: nodeKind, metadata: nodeMetaData, label : string) => void }) {
    const [metadata, setMetaData] = useState<nodeMetaData>({ name: '', description: '' });
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
                    <Select value={selectedTrigger} onValueChange={(value)=>setSelectedTrigger(value as nodeKind)}>
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
                </div>
                <SheetFooter>
                    <Button onClick={() => onSelect(selectedTrigger, metadata)}>Create Node</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Triggersheet
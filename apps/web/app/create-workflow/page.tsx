"use client"
import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Triggersheet from "./component/triggersheet"
import { Timer, timeNodeMetaData } from "@/app/create-workflow/component/nodes/triggers/Timer"
import { PriceTrigger, priceTriggerMetaData } from '@/app/create-workflow/component/nodes/triggers/PriceTrigger'

const nodeTypes1 = {
    "time-trigger": Timer,
    "price-trigger": PriceTrigger
}
export type nodeTypes = "action" | "trigger"
export type nodeKind = "price-trigger" | "time-trigger" | "hyperliquid" | "backpack" | "lighter"
export type nodeMetaData = {
    name: string,
    description: string
}
interface NodeType {
    type: nodeKind,
    data: {
        kind: "action" | "trigger",
        metadata: nodeMetaData | timeNodeMetaData | priceTriggerMetaData
    },
    id: string,
    position: {
        x: number,
        y: number
    }
}

interface EdgeType {
    id: string,
    source: string,
    target: string
}

export default function CreateWorkflow() {
    const [nodes, setNodes] = useState<NodeType[]>([]);
    const [edges, setEdges] = useState<EdgeType[]>([]);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {!nodes.length &&
                <Triggersheet onSelect={(type, metadata) => {
                    setNodes([...nodes, {
                        id: Math.random().toString(),
                        type,
                        data: {
                            kind : "trigger",
                            metadata,
                        },
                        position: { x: 0, y: 0 },


                    }])
                }} />
            }
            
            {nodes.length > 0 &&
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    nodeTypes={nodeTypes1}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    color='dark'
                    fitView
                />}
        </div>
    );
}
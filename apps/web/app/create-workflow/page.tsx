"use client"
import { useState, useCallback } from 'react';
import { ReactFlow, ReactFlowProvider, Background, BackgroundVariant, Controls, Panel, applyNodeChanges, applyEdgeChanges, addEdge, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Triggersheet from "./component/triggersheet"
import { Timer, timeNodeMetaData } from "@/app/create-workflow/component/nodes/triggers/Timer"
import { PriceTrigger, priceTriggerMetaData } from '@/app/create-workflow/component/nodes/triggers/PriceTrigger'
import { Lighter, TradingMetaData } from './component/nodes/actions/Lighter';
import { Hyperliquid } from './component/nodes/actions/Hyperliquid';
import { Backpack } from './component/nodes/actions/Backpack';
import Actionsheet from "./component/actionsheet"

const nodeTypes1 = {
    "time-trigger": Timer,
    "price-trigger": PriceTrigger,
    "lighter" : Lighter,
    "hyperliquid" : Hyperliquid,
    "backpack" : Backpack
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
        metadata: nodeMetaData | timeNodeMetaData | priceTriggerMetaData | TradingMetaData
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

function Flow() {
    const { screenToFlowPosition } = useReactFlow();
    const [nodes, setNodes] = useState<NodeType[]>([]);
    const [edges, setEdges] = useState<EdgeType[]>([]);
    const [selectAction, setSelectAction] = useState<{
        position: {
            x: number,
            y: number,
        },
        startingNodeId : string,
    } | null>(null);

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

    const onConnectEnd = useCallback(
        (event: any, connectionState: any) => {
            if(!connectionState.isValid){
                const { clientX, clientY } = 'changedTouches' in event ? event.changedTouches[0] : event;
                setSelectAction({
                    position : screenToFlowPosition({ x: clientX, y: clientY }),
                    startingNodeId : connectionState.fromNode.id
                })
            }
        }, [screenToFlowPosition]
    )

    return (
        <div className="dark" style={{ width: '100vw', height: '100vh', background: 'var(--background)' }}>
            {!nodes.length &&
                <Triggersheet onSelect={(type, metadata) => {
                    setNodes([...nodes, {
                        id: Math.random().toString(),
                        type,
                        data: {
                            kind: "trigger",
                            metadata,
                        },
                        position: { x: 0, y: 0 },


                    }])
                }} />
            }

            {selectAction && <Actionsheet onSelect={(type, metadata) => {
                let actionNodeId = Math.random().toString();
                setNodes([...nodes, {
                    id : actionNodeId,
                    type,
                    data: {
                        kind: "action",
                        metadata,
                    },
                    position : selectAction.position
                }])
                setEdges([...edges,{
                    id : `${selectAction.startingNodeId}-${actionNodeId}`,
                    source : selectAction.startingNodeId,
                    target : actionNodeId
                }])
                setSelectAction(null)
            }} />}
            
            
            {nodes.length > 0 &&
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    nodeTypes={nodeTypes1}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onConnectEnd={onConnectEnd}
                    colorMode="dark"
                    defaultEdgeOptions={{ style: { stroke: 'var(--muted-foreground)', strokeWidth: 1.5 } }}
                    fitView
                >
                    <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--border)" />
                    <Controls position='bottom-right'/>
                    <Panel position="top-left" className="m-3! rounded-lg border border-border bg-card/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur">
                        Workflow Editor
                    </Panel>
                </ReactFlow>}
        </div>
    );
}

export default function CreateWorkflow() {
    return (
        <ReactFlowProvider>
            <Flow />
        </ReactFlowProvider>
    );
}
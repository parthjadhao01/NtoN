"use client"
import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Triggersheet from "./component/triggersheet" 

export type nodeTypes = "action" | "trigger"
export type nodeKind = "price-trigger" | "time-trigger" | "hyperliquid" | "backpack" | "lighter"
export type nodeMetaData = {
    name : string,
    description : string
}
interface NodeType {
    data : {
        type : nodeTypes,
        kind : nodeKind,
        metadata : nodeMetaData
        label : string,
    },
    id : string,
    position : {
        x : number,
        y : number
    }
}

interface EdgeType {
    id : string,
    source : string,
    target : string
}

export default function CreateWorkflow() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);
 
  const onNodesChange = useCallback(
    (changes : any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes : any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params : any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {!nodes.length && 
        <Triggersheet onSelect={(kind,metadata)=>{
                setNodes([...nodes,{
                    id : Math.random().toString(),
                    data : {
                        type : "trigger",
                        kind,
                        metadata,
                        label : kind
                    },
                    position : {x : 0,y : 0},
                    

                }])
        }} />
      }
      {nodes.length > 0 &&
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
        />}
    </div>
  );
}
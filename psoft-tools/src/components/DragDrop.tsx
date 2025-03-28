import React, { useRef, useCallback, MouseEvent, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  getNodesBounds, 
  getViewportForBounds,
  NodeTypes,
  type Edge,
  ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Sidebar from './Sidebar.tsx';
import './DragDrop.css';
import type * as CSS from 'csstype';
import ShapeNode from './ShapeNode.tsx';
import { toPng } from 'html-to-image';
import useUndoRedo from './useUndoRedo';

// Defines the Drag and Drop functionality of the CFG Canvas.
export default function DragDrop() {
  
  // Begin with a single Entry node on the canvas
  const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Entry' },
      position: { x: 250, y: 5 },
    },
  ];

  // Define the type(s) of nodes available on the canvas
  const nodeTypes: NodeTypes = {
    shape: ShapeNode,
  };

  let id = 0;
  const getId = () => `dndnode_${id++}`;
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();
  const reactFlowInstance = useReactFlow();
  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo();

  // Create a new edge once the user connects two nodes
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  // 
  const onDragOver = useCallback((event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Create a new node on the canvas when the user finishes dragging and drops the node
  const onDrop = useCallback(
    (event: { preventDefault: () => void; dataTransfer: { getData: (arg0: string) => any; }; clientX: any; clientY: any; }) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      takeSnapshot();

      // Create the node of the type selected by the user
      switch (type) {

        case 'rect':
          var stateNode = {
            id: type + getId(),
            type: 'shape',
            position,
            data: { type: 'rectangle', color: 'white', label: '', },
          };
          setNodes((nds) => nds.concat(stateNode));
          break;
        
        case 'diamond':
          var branchNode = {
            id: type + getId(),
            type: 'shape',
            position,
            data: { type: 'diamond', color: 'white', label: '', },
          };
          setNodes((nds) => nds.concat(branchNode));
          break;

        default:
          var newNode = {
            id: 'exit' + getId(),
            type: 'output',
            position,
            data: { label: 'Exit', },
          }
          setNodes((nds) => nds.concat(newNode));
          break;
      }
    },
    [screenToFlowPosition],
  );
  
  // Define the dimensions of the canvas to fit within the screen and allow space for the navbar
  const divStyle: CSS.Properties = {
    width: '1500px',
    height: '95vh',
    marginTop: "50px"
  };

  // Update the edge label if the user clicks on an edge after selecting a branch value
  const onEdgeClick = (event: MouseEvent, edge: Edge) => {
    setEdges((eds) => 
      eds.map((ed) => {

        if (globalThis.branchVal === 'trueBranch') {
          takeSnapshot();
          return ed.id === edge.id ? {...edge, data: {...edge.data, }, label: "true",} : ed;
        } 
        
        else if (globalThis.branchVal === 'falseBranch') {
          takeSnapshot();
          return ed.id === edge.id ? {...edge, data: {...edge.data, }, label: "false",} : ed;
        }

        return ed.id === edge.id ? {...edge, data: {...edge.data, }} : ed;
      }),
    );
  };

  // Download an image of the CFG to the user's computer
  function downloadImage(dataUrl: string) {
    const a = document.createElement('a');
    a.setAttribute('download', 'CFG.png');
    a.setAttribute('href', dataUrl);
    a.click();
  }


  const { getNodes } = useReactFlow();
    const onClick = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
      const nodesBounds = getNodesBounds(getNodes());
      const imageWidth = '1500';
      const imageHeight = '1500';
      const viewport = getViewportForBounds(
          nodesBounds,
          1500,
          1500,
          0.5,
          2,
          0,
      );
      toPng(document.querySelector('.react-flow__viewport') as HTMLElement, {
        backgroundColor: '#FFFFFF',
        width: 1500,
        height: 1500,
        style: {
          width: imageWidth,
          height: imageHeight,
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
      }).then(downloadImage);
  };

  const conMode : ConnectionMode = ConnectionMode.Loose;

  // Define the buttons and place the canvas and sidebar
  return (
    <div className="dndflow" style={{width: "100%"}}>
      <div className="reactflow-wrapper" ref={reactFlowWrapper} style={divStyle}>
      <button className="download-btn" onClick={onClick}>Download Image</button>
      <button className="undo-btn" onClick={undo}>Undo</button>
      <button className="redo-btn" onClick={redo}>Redo</button>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onEdgeClick={onEdgeClick}
          connectionMode={conMode}
          fitView
        >
        </ReactFlow>
      </div>
      <Sidebar/>
    </div>
  );
};
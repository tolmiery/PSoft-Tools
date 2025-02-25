import Navbar from "../components/Navbar";
import { ReactFlow, ReactFlowProvider, getViewportForBounds, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import DragDrop from "../components/DragDrop";
export default function CFGCanvas() {
	return (
	<div>
		<Navbar/>
		<ReactFlowProvider>
    		<DragDrop/>
  		</ReactFlowProvider>
  		
  	</div>
	);
}
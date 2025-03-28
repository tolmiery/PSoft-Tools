import React from 'react';

export default () => {

  // Begin tracking movement once the user begins dragging from one of the node buttons
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  // Update global branch value if the user clicks on the True Branch or False branch buttons
  const onClick = (bType: string) => {
    if (bType === 'trueBranch') {
      globalThis.branchVal = "trueBranch";
    } else if (bType === 'falseBranch') {
      globalThis.branchVal = "falseBranch";
    }
  }
  
  return (
  <aside>
      <div className="description">You can drag these nodes into the canvas.</div>
      <div className="dndnode statement" onDragStart={(event) => onDragStart(event, 'rect')} draggable>
        Statement Node
      </div>
      <div className="dndnode branch" onDragStart={(event) => onDragStart(event, 'diamond')} draggable>
        Branch Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Exit Node
      </div>
      <p>You can click these buttons, then on the desired edge to add branch labels.</p>
      <div className="dndnode true" onClick={() => onClick('trueBranch')}>
      True Branch
      </div>
      <div className="dndnode false" onClick={() => onClick('falseBranch')}>
      False Branch
      </div>
      <p>You can draw edges by clicking and dragging on the <b>black dots</b> between two nodes.</p>
    </aside>
  );
};
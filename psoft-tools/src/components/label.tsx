// Defines a label for a node in the CFG canvas
function NodeLabel(props: { placeholder: string }) {
    return (
      <input type='text' className='node-label' placeholder={props.placeholder} />
    );
  }
  export default NodeLabel;
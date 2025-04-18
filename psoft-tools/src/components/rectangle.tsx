import { SVGAttributes } from 'react';

// Define the shape's properties
type ShapeProps = {
  width: number;
  height: number;
} & SVGAttributes<SVGElement>;

// Initialize the rectangle shape with the given dimensions
function Rectangle({ width, height, ...svgAttributes }: ShapeProps) {
  return <rect x={0} y={0} width={width} height={height} {...svgAttributes} />;
}
export default Rectangle;
import { SVGAttributes } from 'react';

function generatePath(points: number[][]) {
  const path = points.map(([x, y]) => `${x},${y}`).join(' L');
  return `M${path} Z`;
}

// Define the shape's properties
type ShapeProps = {
  width: number;
  height: number;
} & SVGAttributes<SVGElement>;

// Initialize the diamond node with the given dimensions
function Diamond({ width, height, ...svgAttributes }: ShapeProps) {
  const diamondPath = generatePath([
    [0, height / 2],
    [width / 2, 0],
    [width, height / 2],
    [width / 2, height],
  ]);
  return <path d={diamondPath} {...svgAttributes} />;
}
export default Diamond;
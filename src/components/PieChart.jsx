import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const PieChart = props => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [explodedSlice, setExplodedSlice] = useState(null);
  const [tooltipData, setTooltipData] = useState({ visible: false, x: 0, y: 0, name: '', percentage: 0, color: '' });

  // Change colors to an array
  const colors = ['#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a', '#0c312e', '#082421'];



  useEffect(() => {
    const width = props.width;
    const height = props.height;
    const radius = (Math.min(width, height) / 2) - 30;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    // Select the SVG element
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Add a group element
    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Set up the pie generator
    const pie = d3.pie().value(d => d.value);

    // Set up the arc generator
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const totalValue = d3.sum(props.data, d => d.value); // Calculate total value for percentage

    // Bind data to arcs
    const arcs = g.selectAll('.arc')
      .data(pie(props.data))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .on('click', (event, d) => {
        props.handleMapRegionInPie(d);
        if (props.explode) {
          setExplodedSlice(d.data.name === explodedSlice ? null : d.data.name);
        }
      })
      .on('mousemove', (event, d) => {
        const percentage = ((d.data.value / totalValue) * 100).toFixed(2); // Calculate percentage
        const colorIndex = props.data.findIndex(item => item.name === d.data.name); // Find color index
        setTooltipData({
          visible: true,
          x: event.pageX + 20,
          y: event.pageY - 70,
          name: d.data.name,
          percentage: percentage,
          color: colors[colorIndex % colors.length], // Assign color based on index
        });
      })
      .on('mouseleave', () => {
        setTooltipData(prev => ({ ...prev, visible: false }));
      });

    // Draw the pie chart slices with animation
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colors[i % colors.length]) // Assign color based on index
      .attr('opacity', 0) // Start with opacity 0
      .transition() // Transition to full opacity
      .duration(750)
      .attr('opacity', 1) // Fade in effect
      .attrTween('d', function(d) {
        const i = d3.interpolate(d.startAngle, d.endAngle);
        return function(t) {
          d.endAngle = i(t);
          return arc(d);
        };
      });

    if (props.explode) {
      // Calculate the explode offset
      const explodeOffset = (d) => (explodedSlice === d.data.name ? 20 : 0);

      // Adjust positions of arcs based on explosion state
      arcs.attr('transform', d => {
        const angle = (d.startAngle + d.endAngle) / 2;
        const x = Math.sin(angle) * explodeOffset(d);
        const y = -Math.cos(angle) * explodeOffset(d);
        return `translate(${x}, ${y})`;
      });
    }

    // Add text labels to the slices
    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data.name)
      .style('fill', 'white')
      .style('font-size', '12px');

    // Cleanup function
    return () => {
      d3.select(svgRef.current).selectAll('*').remove();
    };
  }, [props.data, explodedSlice]);

  return (
    <>
      <svg ref={svgRef}></svg>
      {tooltipData.visible && (
        <div
          ref={tooltipRef}
          className='flex justify-between items-center w-auto h-auto bg-white rounded-md p-2 shadow-lg gap-x-2'
          style={{ opacity: 1, position: 'absolute', left: tooltipData.x, top: tooltipData.y }}
        >
          <div className='w-3 h-3' style={{ backgroundColor: tooltipData.color }}></div>
          <strong>{tooltipData.name}</strong>
          <p>{tooltipData.percentage}%</p>
        </div>
      )}
    </>
  );
};

export default PieChart;

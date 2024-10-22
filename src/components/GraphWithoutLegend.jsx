import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const GraphWithoutLegend = ({ data, width, height, className, handleMapRegionInBar }) => {
  const chartRef = useRef(null); // Reference for the chart container

  useEffect(() => {
    // Define margins, width, and height
    const margin = { top: 40, right: 30, bottom: 50, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Remove any existing content in case of re-renders
    d3.select(chartRef.current).selectAll('*').remove();

    // Create the SVG container
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', `bg-slate-100 rounded-2xl`)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define the scales for the chart
    const x = d3.scaleBand()
      .domain(data.map(d => d.name))  // Data categories for the x-axis
      .range([0, chartWidth])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]) // Max value for the y-axis
      .range([chartHeight, 0]);

    // Create the X-axis
    const xAxis = svg.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

    // Create the Y-axis
    const yAxis = svg.append('g')
      .call(d3.axisLeft(y));

    // Add tooltip div (hidden by default)
    const tooltip = d3.select(chartRef.current)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('border', '1px solid #ddd')
      .style('border-radius', '5px')
      .style('padding', '10px')
      .style('pointer-events', 'none')
      .style('box-shadow', '0px 4px 6px rgba(0, 0, 0, 0.1)');

    // Define an array of colors
    const colors = ['#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a', '#082421'];

    // Mouse event functions
    const handleMouseOver = (event, d, i) => {
      d3.select(event.currentTarget)
        .transition().duration(200)
        .style('opacity', 0.5);
      tooltip.transition().duration(200).style('opacity', 1);
      
      // Set the background color based on the index
      const color = colors[i % colors.length]; // Get color based on index
      
      tooltip.html(`
        <div class='flex'>
          <strong class='flex justify-between items-center gap-x-2'>
            <div class='w-3 h-3' style='background-color:${color};'></div>
            <p>${d.name}</p>
          </strong>
          <p>: ${d.value}</p>
        </div>
      `);
    };

    const handleMouseMove = (event) => {
      const tooltipWidth = 150; // Adjust based on your tooltip width
      const tooltipHeight = 50; // Adjust based on your tooltip height

      let left = event.pageX + 20; // Default position
      let top = event.pageY - 70; // Default position

      // Check if the tooltip goes beyond the right edge
      if (left + tooltipWidth > window.innerWidth) {
        left = window.innerWidth - tooltipWidth - 20; // Adjust left position
      }

      // Check if the tooltip goes beyond the bottom edge
      if (top + tooltipHeight > window.innerHeight) {
        top = window.innerHeight - tooltipHeight - 20; // Adjust top position
      }

      tooltip
        .style('left', `${left}px`)
        .style('top', `${top}px`);
    };

    const handleMouseOut = (event) => {
      d3.select(event.currentTarget)
        .transition().duration(200)
        .style('opacity', 1);
      tooltip.transition().duration(200).style('opacity', 0);
    };

    // Create the bars with transitions and different colors
    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.name))
      .attr('y', chartHeight) // Start at the bottom of the chart
      .attr('width', x.bandwidth())
      .attr('height', 0) // Start with height 0
      .attr('fill', (d, i) => colors[i % colors.length]) // Assign color based on index
      .on('mouseover', (event, d) => handleMouseOver(event, d, data.indexOf(d))) // Pass index
      .on('mousemove', handleMouseMove)
      .on('mouseout', handleMouseOut)
      .on('click', (d, i) => {handleMapRegionInBar(i)})
      .transition() // Transition when entering
      .duration(800) // Duration of the transition
      .attr('y', d => y(d.value)) // Set final position
      .attr('height', d => chartHeight - y(d.value)); // Set final height

  }, [data, height, width]);

  return (
    <div className={className} ref={chartRef}></div>
  );
};

export default GraphWithoutLegend;

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const GraphWithLegend = ({ data, width, height, className }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const margin = { top: 40, right: 30, bottom: 50, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    d3.select(chartRef.current).selectAll('*').remove();

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', `bg-slate-100 rounded-2xl`)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const categories = data.map(d => d.name);
    const subCategories = Object.keys(data[0].values);

    const x0 = d3.scaleBand()
      .domain(categories)
      .range([0, chartWidth])
      .padding(0.2);

    const x1 = d3.scaleBand()
      .domain(subCategories)
      .range([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d3.max(Object.values(d.values)))])
      .range([chartHeight, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x0));

    svg.append('g')
      .call(d3.axisLeft(y));

    const colors = ['#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59'];

    // Add tooltip div (hidden by default)
    const tooltip = d3.select(chartRef.current)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background-color', '#ffffff')
      .style('border', '1px solid #ddd')
      .style('border-radius', '8px')
      .style('padding', '10px')
      .style('pointer-events', 'none')
      .style('box-shadow', '0px 4px 8px rgba(0, 0, 0, 0.2)')
      .style('transition', 'opacity 0.2s ease')
      .style('z-index', 10);

    const bars = svg.selectAll('.category')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'category')
      .attr('transform', d => `translate(${x0(d.name)}, 0)`);

    bars.selectAll('rect')
      .data(d => subCategories.map(key => ({ key, value: d.values[key], name: d.name })))
      .enter()
      .append('rect')
      .attr('x', d => x1(d.key))
      .attr('y', chartHeight)
      .attr('width', x1.bandwidth())
      .attr('height', 0)
      .attr('fill', (d, i) => colors[i % colors.length])
      .on('mouseover', (event, d) => {
        d3.select(event.currentTarget)
          .transition().duration(200)
          .style('opacity', 0.6);
        tooltip.transition().duration(200).style('opacity', 1);
        
        // Get the color associated with the specific value
        const color = colors[subCategories.indexOf(d.key) % colors.length]; // Get color based on sub-category index
        
        // Set the tooltip content
        tooltip.html(`
          <div style="display: flex; align-items: center;">
            <div style="width: 12px; height: 12px; background-color: ${color}; border-radius: 3px; margin-right: 8px;"></div>
            <strong style="font-size: 14px;">Value: ${d.value}</strong>
          </div>
          <p style="margin: 0; font-size: 12px; color: #555;">${d.name}: ${d.key}</p>
        `);
      })
      .on('mousemove', (event) => {
        const tooltipWidth = 200; 
        const tooltipHeight = 70; 

        let left = event.pageX + 20; 
        let top = event.pageY - 70; 

        if (left + tooltipWidth > window.innerWidth) {
          left = window.innerWidth - tooltipWidth - 20; 
        }

        if (top + tooltipHeight > window.innerHeight) {
          top = window.innerHeight - tooltipHeight - 20; 
        }

        tooltip
          .style('left', `${left}px`)
          .style('top', `${top}px`);
      })
      .on('mouseout', (event) => {
        d3.select(event.currentTarget)
          .transition().duration(200)
          .style('opacity', 1);
        tooltip.transition().duration(200).style('opacity', 0);
      })
      .transition()
      .duration(800)
      .attr('y', d => y(d.value))
      .attr('height', d => chartHeight - y(d.value));

  }, [data, height, width]);

  return <div className={className} ref={chartRef}></div>;
};

export default GraphWithLegend;

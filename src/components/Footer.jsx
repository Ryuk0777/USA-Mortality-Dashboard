import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import PieChart from './PieChart';
import Graph from './GraphWithoutLegend';

const Footer = (props) => {
  const [legendItems, setLegendItems] = useState([]);
  const regionColor = ['#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a', '#0c312e', '#082421'];
  const chartRef = useRef();

  const handleLegend = () => {
    const items = [];
    for (let i = 1; i <= 10; i++) {
      items.push(
        <div key={i} className='flex h-auto w-full gap-x-5'>
          <div className='w-5 h-5 border border-black' style={{ backgroundColor: regionColor[i - 1] }}></div>
          <p>HHS {i}</p>
        </div>
      );
    }
    setLegendItems(items);
  };

  // Handle legend on mount
  useEffect(() => {
    handleLegend();
  }, []);

  return (
    <div className='flex w-screen h-auto bg-slate-300 p-3 gap-x-3'>
      <div className='bg-white h-44 w-96 rounded-2xl'>
        <h1 className='font-bold text-3xl m-3 text-slate-600'>Year</h1>
        <h1 className='font-bold text-6xl ml-10 mt-5 text-slate-600'>2011-2013</h1>
      </div>

      <div className='bg-white h-44 w-60 rounded-2xl overflow-y-scroll'>
        <div className='m-5'>
          {legendItems}
        </div>
      </div>

      {/* Pie Chart or Graph section */}
      <div
        ref={chartRef}
        className='flex justify-center items-center bg-white h-44 w-48 rounded-2xl'
        onClick={() => {
          // Only trigger onClick if the chart is not frozen
          if (!props.isFrozen && props.Graphdata[0] !== false) {
            props.setChartState(!props.chartState);
          }
        }}
      >
        {!props.isFrozen ? (
          props.chartState ? (
            <PieChart data={props.Piedata} explode={false} width={200} height={200} />
          ) : (
            <Graph data={props.Graphdata} width={190} height={175} className={''} />
          )
        ) : (
          <h1 className='font-extrabold text-2xl text-center text-slate-600' >No PieChart avaliable for this data</h1>
        )}
      </div>

      {/* Freeze Pie Button */}
      <div  className='flex justify-center items-center bg-white h-44 w-[700px] rounded-2xl'>
        <h1 className='text-center font-bold text-slate-700 text-4xl'>{props.graphTitle}</h1>
      </div>
    </div>
  );
};

Footer.propTypes = {
  setChartState: PropTypes.func.isRequired,
  chartState: PropTypes.bool.isRequired,
  Piedata: PropTypes.array.isRequired,
  Graphdata: PropTypes.array.isRequired,
};

export default Footer;

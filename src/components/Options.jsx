import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'

const Options = (props) => {
  const optionRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 80 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [prevEvent, setPrevEvent] = useState();
  const [prevColor, setPrevColor] = useState();

  const handleOptions = (event) =>{
    
    if(prevEvent){
      prevEvent.target.style.backgroundColor = prevColor
    }

    setPrevEvent(event);
    setPrevColor(window.getComputedStyle(event.target).backgroundColor)

    event.target.style.backgroundColor = 'red'

    const request = event.target.innerText;

    props.setCurrentRequest(request)
    
  }

  // Handle mouse down for dragging
  const handleMouseDown = (event) => {
    setIsDragging(true);
    const rect = optionRef.current.getBoundingClientRect();
    setOffset({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  // Handle mouse movement while dragging
  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const newX = event.clientX - offset.x;
    const newY = event.clientY - offset.y;
    setPosition({ x: newX, y: newY });
  };

  // Handle mouse release
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={optionRef}
      className={`w-[46%] h-[61%] shadow-lg z-30 rounded-xl m-3 border border-slate-900 ${props.className}`}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {/* Header for dragging */}
      <div
        className='flex justify-end h-[9%] w-full bg-slate-50 rounded-t-xl pr-3'
        onMouseDown={handleMouseDown}
      >
        <p
          className='h-full flex justify-center items-center hover:opacity-30 hover:cursor-pointer font-bold text-end text-3xl pr-1 pb-2'
          onClick={() => {
            props.setOptionState(false);
          }}
        >
          x
        </p>
      </div>

      <div className='h-[91%] w-full bg-slate-950 rounded-b-xl p-3'>
        <div className='flex h-full w-full'>
            <div className='h-[80%] w-full overflow-y-scroll'>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-white h-12 w-[90%] rounded-md mt-2 mx-auto block'>Region</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-white h-12 w-[90%] rounded-md mt-2 mx-auto block'>Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-white h-12 w-[90%] rounded-md mt-2 mx-auto block'>Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-white h-12 w-[90%] rounded-md mt-2 mx-auto block'>Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-white h-12 w-[90%] rounded-md mt-2 mx-auto block'>Region-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-white h-12 w-[90%] rounded-md mt-2 mx-auto block'>Cause-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-white h-12 w-[90%] rounded-md mt-2 mx-auto block'>Cause-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-white h-12 w-[90%] rounded-md mt-2 mx-auto block'>Region-Rural-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-white h-12 w-[90%] rounded-md mt-2 mx-auto block'>Region-Urban-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-white h-12 w-[90%] rounded-md mt-2 mx-auto block'>Cause-Urban-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-white h-12 w-[90%] rounded-md mt-2 mx-auto block'>Cause-Rural-Gender</button>
            </div> 
            <div className='h-[80%] w-full overflow-y-scroll'>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-100 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS1-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-200 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS2-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-300 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS3-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-400 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS4-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-500 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS5-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-600 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS6-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-700 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS7-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-800 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS8-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-900 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS9-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-950 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS10-Cause</button>

              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-100 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS1-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-200 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS2-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-300 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS3-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-400 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS4-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-500 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS5-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-600 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS6-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-700 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS7-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-800 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS8-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-900 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS9-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-950 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS10-Urban || Rural</button>

              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-100 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS1-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-200 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS2-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-300 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS3-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-400 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS4-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-500 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS5-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-600 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS6-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-700 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS7-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-800 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS8-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-900 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS9-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-950 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS10-Gender</button>

              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-100 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS1-Cause-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-200 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS2-Cause-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-300 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS3-Cause-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-400 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS4-Cause-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-500 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS5-Cause-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-600 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS6-Cause-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-700 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS7-Cause-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-800 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS8-Cause-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-900 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS9-Cause-Urban || Rural</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-950 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS10-Cause-Urban || Rural</button>

              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-100 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS1-Cause-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-200 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS2-Cause-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-300 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS3-Cause-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-400 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS4-Cause-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-500 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS5-Cause-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-600 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS6-Cause-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-700 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS7-Cause-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-800 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS8-Cause-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-900 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS9-Cause-Gender</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-950 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS10-Cause-Gender</button>
              
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-100 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS1-Urban || Rural-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-200 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS2-Urban || Rural-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-300 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS3-Urban || Rural-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-400 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS4-Urban || Rural-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-500 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS5-Urban || Rural-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-600 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS6-Urban || Rural-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-700 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS7-Urban || Rural-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-800 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS8-Urban || Rural-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-900 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS9-Urban || Rural-Cause</button>
              <button onDoubleClick={(e)=>{handleOptions(e); props.handleRequest()}} onClick={(e)=>handleOptions(e)} className='bg-teal-950 h-12 w-[90%] rounded-md mt-2 mx-auto block'>HHS10-Urban || Rural-Cause</button>
            </div>
        </div>
      </div>
      <div className='h-auto w-full flex justify-end items-end pr-8 gap-x-7 font-bold -mt-14'>
            <button onClick={() => {
            props.setOptionState(false);
          }} className='bg-red-600 h-10 w-48 rounded-md' >Cancel</button>
            <button onClick={()=>{props.handleRequest(); props.setOptionState(false);}} className='bg-white h-10 w-48 rounded-md'>Continue</button>
        </div>
    </div>
  );
};

Options.propTypes = {
  handleRequest: PropTypes.func.isRequired,
}

export default Options;

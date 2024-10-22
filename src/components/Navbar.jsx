import React from 'react'
import PropTypes from 'prop-types'

const Navbar = props => {
  return (
    <>
    <div className='flex justify-between items-center w-full h-20 bg-slate-200'>
      <img src="https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg" alt="" 
      className='h-20 '
      />
      <h1 className='text-slate-600 font-bold text-4xl'>US Mortality Rate</h1>
      <button className='h-14 w-32 bg-white text-purple-800 rounded-xl mr-3 font-bold hover:opacity-70'
      onClick={()=> props.setOptionState(true)}>Options</button>
    </div>
    </>
  )
}

Navbar.propTypes = {
    setOptionState: PropTypes.func.isRequired,
}

export default Navbar
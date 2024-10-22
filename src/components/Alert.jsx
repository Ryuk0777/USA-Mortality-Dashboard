import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Alert = (props) => {
  const [counter, setCounter] = useState(false);
  const redAlert = "bg-red-300 text-red-900 transition-all duration-500 translate-y-12";
  const redAlertButton = "bg-red-200 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 dark:text-red-400";
  const greenAlert = "bg-green-300 text-green-900 transition-all duration-500 translate-y-12";
  const greenAlertButton = "bg-green-200 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 dark:text-green-400";

  const [alertType, setAlertType] = useState('');
  const [alertButtonType, setAlertButtonType] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Determine the alert type based on props.alert
    if (props.alert === 'error') {
      setAlertType(redAlert);
      setAlertButtonType(redAlertButton);
    } else if (props.alert === 'success') {
      if(counter === false) {
        setCounter(true);
      }else{
        setAlertType(greenAlert);
        setAlertButtonType(greenAlertButton);
      }


    } else {
      setAlertType('');
      setAlertButtonType('');
    }

    // Show the alert if there's a message and set it to visible
    if (props.alert) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    if(counter){

    }
    // Automatically hide the alert after a timeout
    const timer = setTimeout(() => {
      setIsVisible(false);
      props.setAlert('');
    }, 3000); // Alert visible for 3 seconds

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [props.alert]); // Run when props.alert changes

  return (
    <>
      {isVisible && (
        <div
          className={`flex items-center justify-between absolute z-10 w-[100%] h-12 -top-12 opacity-100  p-4 ${alertType}`}
        >
          <h3 className="font-bold text-xl opacity-100">{props.alertMessage}</h3>
          <div>
            <button
              onClick={() => {
                setIsVisible(false);
                props.setAlert('');
              }}
              type="button"
              className={`ms-auto -mx-1.5 -my-1.5 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:hover:bg-gray-700 ${alertButtonType}`}
              aria-label="Close"
            >
              <span className="sr-only">Dismiss</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Alert.propTypes = {
  setAlert: PropTypes.func.isRequired,
  alert: PropTypes.string.isRequired,
  AlertMessage: PropTypes.string, // Optional prop for custom alert messages
};

export default Alert;

import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import * as d3 from 'd3';
import Options from './components/Options';
import Alert from './components/Alert';

function App() {
  const [chartState, setChartState] = useState(true);
  const [Graphdata, setGraphData] = useState([]);
  const[graphTitle, setGraphTitle] = useState('');

  const [mapRef, setMapRef] = useState(null);
  const [optionState, setOptionState] = useState(false);

  const [showLegend, setShowLegend] = useState(false);

  const [alert, setAlert] = useState('');
  const [currentRequest, setCurrentRequest] = useState("Region");

  const [alertMessage, setAlertMessage] = useState('');
  const [isFrozen, setIsFrozen] = useState(false); // State to manage if the pie chart is frozen

  const regionMetaData = {
    HHS1: ['#99f6e4', '#ME', '#VT', '#NH', '#MA', '#CT', '#RI'],
    HHS2: ['#5eead4', '#NY', '#NJ'],
    HHS3: ['#2dd4bf', '#PA', '#WV', '#VA', '#DE', '#MD'],
    HHS4: ['#14b8a6', '#KY', '#TN', '#NC', '#MS', '#AL', '#GA', '#SC', '#FL'],
    HHS5: ['#0d9488', '#MN', '#WI', '#MI', '#IL', '#IN', '#OH'],
    HHS6: ['#0f766e', '#NM', '#OK', '#AR', '#TX', '#LA'],
    HHS7: ['#115e59', '#NE', '#IA', '#KS', '#MO'],
    HHS8: ['#134e4a', '#MT', '#ND', '#WY', '#SD', '#UT', '#CO'],
    HHS9: ['#0c312e', '#CA', '#NV', '#AZ', '#HI'],
    HHS10: ['#082421', '#AK', '#WA', '#OR', '#ID']
  };

  const handleMapRegionInBar = (bar) => {
    // Split name and join it back together without spaces
    let nameParts = bar.name.split(' ');
    let name = nameParts.join('');
    let ref = d3.select(mapRef.current);
    let regions = ref.selectAll('path');

    // Reset all regions to their original color
    regions.each(function () {
      let originalColor = d3.select(this).attr('data-original-fill');
      d3.select(this).attr('fill', originalColor);
    });

    // Highlight the currently clicked region
    regions.each(function () {
      let regionName = d3.select(this).attr('region-type');
      if (regionName === name) {
        d3.select(this).attr('fill', 'white'); // Set fill to white for clicked region
      }
    });
  };

  const handleMapRegionInPie = (arc)=>{
    let nameParts = arc.data.name.split(' ');
    let name = nameParts.join('');
    let ref = d3.select(mapRef.current);
    let regions = ref.selectAll('path');

    // Reset all regions to their original color
    regions.each(function () {
      let originalColor = d3.select(this).attr('data-original-fill');
      d3.select(this).attr('fill', originalColor);
    });

    // Highlight the currently clicked region
    regions.each(function () {
      let regionName = d3.select(this).attr('region-type');
      if (regionName === name) {
        d3.select(this).attr('fill', 'white'); // Set fill to white for clicked region
      }
    });
  }

  const handleRequest = async (_request = null) => {

    
    
    console.log("request-> ", currentRequest);
  
    try {
      // Fetch data from the server
      const response = await fetch(`http://127.0.0.1:5000/${currentRequest}`);
      
      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Debugging: log the data
      console.log(data);
      
      // Check the response type and update state accordingly
      if (data.hue === false) {
        setIsFrozen(false)
        setGraphData(data.data); // Update state with fetched data
        setGraphTitle(data.title); // Update graph title
        setShowLegend(false); // Hide legend
        setAlert('success'); // Set alert type
        setAlertMessage('success'); // Set success message
      } else if (data.hue === true) {
        setChartState(true)
        setIsFrozen(true)
        setGraphData(data.data); // Update state with fetched data
        setGraphTitle(data.title); // Update graph title
        setShowLegend(true); // Show legend
        setAlert('success'); // Set alert type
        setAlertMessage('success'); // Set success message
      }
    } catch (error) {
      // Handle fetch errors
      console.error("Error fetching data:", error);
      setAlertMessage(`${error}`); // Set error message
      setAlert('error'); // Set alert type to error
    }
  };
  

  useEffect(() => {
    // Fetch data from Flask API
    handleRequest()
  }, []); 
  return (
    <>
      <Alert alert={alert} setAlert={setAlert} alertMessage={alertMessage} />
      <div className='h-auto w-screen fixed'>
        <Navbar setOptionState={setOptionState} setAlert={setAlert}/>

        {optionState &&<Options setOptionState={setOptionState} currentRequest={currentRequest} setCurrentRequest={setCurrentRequest} handleRequest={handleRequest}/>}

        <MainContent
          chartState={chartState}
          Graphdata={Graphdata}
          Piedata={Graphdata}
          regionMetaData={regionMetaData}
          handleMapRegionInBar={handleMapRegionInBar}
          handleMapRegionInPie={handleMapRegionInPie}
          setMapRef={setMapRef}
          showLegend={showLegend}
        />

        <Footer
          Piedata={Graphdata}
          Graphdata={Graphdata}
          chartState={chartState}
          setChartState={setChartState}
          graphTitle={graphTitle}
          isFrozen={isFrozen}
        />
      </div>
    </>
  );
}

export default App;

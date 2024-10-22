import PropTypes from 'prop-types';
import UsaMap from './UsaMap';
import GraphWithoutLegend from './GraphWithoutLegend';
import PieChart from './PieChart';
import GraphWithLegend from './GraphWithLegend';

const MainContent = (props) => {
  return (
    <>
      <div className='flex h-full w-full bg-slate-300'>
        <UsaMap
          height={'450px'}
          width={'700px'}
          className={'bg-slate-900 rounded-2xl shadow-sm'}
          divClass='p-3 pb-0'
          regionMetaData={props.regionMetaData}
          setMapRef={props.setMapRef}
        />

        {props.chartState ? (
          props.showLegend ? (
            <GraphWithLegend
              data={props.Graphdata}
              width={800}
              height={450}
              className={'mr-3 my-3 mb-0'}
              handleMapRegionInBar={props.handleMapRegionInBar}
            />
          ) : (
            <GraphWithoutLegend
              data={props.Graphdata}
              width={800}
              height={450}
              className={'mr-3 my-3 mb-0'}
              handleMapRegionInBar={props.handleMapRegionInBar}
            />
          )
        ) : (
          <div className='flex justify-center items-center bg-slate-100 mt-3 w-[800px] h-[450px] rounded-2xl'>
            <PieChart
              data={props.Piedata}
              explode={true}
              width={450}
              height={450}
              handleMapRegionInPie={props.handleMapRegionInPie}
            />
          </div>
        )}
      </div>
    </>
  );
};

MainContent.propTypes = {
  regionMetaData: PropTypes.object.isRequired,
  setMapRef: PropTypes.func.isRequired,
  showLegend: PropTypes.bool.isRequired,
  chartState: PropTypes.bool.isRequired,
  Graphdata: PropTypes.array.isRequired,
  Piedata: PropTypes.array.isRequired,
  handleMapRegionInBar: PropTypes.func.isRequired,
  handleMapRegionInPie: PropTypes.func.isRequired,
};

export default MainContent;

import markerSvg from './map-marker.svg';
import './MapMarker.css';
import { Tooltip } from 'antd';

const Marker = (props: any) => {
  return (
    <Tooltip title={props.title}>
      <img src={markerSvg} alt="Marker" className="marker" />
    </Tooltip>
  )
};

export default Marker;

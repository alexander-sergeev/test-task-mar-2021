import markerSvg from './map-marker.svg';
import './MapMarker.css';
import { Tooltip } from 'antd';

export type MapMarkerProps = {
  title: string;
  lat: number;
  lng: number;
};

const MapMarker = (props: MapMarkerProps) => {
  return (
    <Tooltip title={props.title}>
      <img src={markerSvg} alt="Marker" className="map-marker" />
    </Tooltip>
  );
};

export default MapMarker;

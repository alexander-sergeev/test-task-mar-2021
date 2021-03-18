import React from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from '../../components/MapMarker/MapMarker';
import { Trans, useTranslation } from 'react-i18next';
import { useGeolocation } from 'react-use';
import CentredMessage from '../../components/CentredMessage/CentredMessage';
import googleMapReact from 'google-map-react';

const MAP_ZOOM = 11;
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

const Home = () => {
  const { t } = useTranslation();

  const geo = useGeolocation({ enableHighAccuracy: true });

  if (geo.loading) {
    return (
      <CentredMessage>
        <Trans>Allow access to geolocation</Trans>
      </CentredMessage>
    );
  }

  if (geo.error || geo.latitude == null || geo.longitude == null) {
    return (
      <CentredMessage>
        <Trans>Error on getting your geoposition</Trans>: {geo.error?.message}
      </CentredMessage>
    );
  }

  const coords: googleMapReact.Coords = {
    lat: geo.latitude,
    lng: geo.longitude,
  };
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
      defaultCenter={coords}
      defaultZoom={MAP_ZOOM}
    >
      <MapMarker
        lat={geo.latitude}
        lng={geo.longitude}
        title={t('Your position on map')}
      />
    </GoogleMapReact>
  );
};

export default Home;

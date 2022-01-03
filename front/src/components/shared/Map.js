import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
import Geocode from 'react-geocode';

const Map = ({address}) => {
  const [longitude, setlongitude] = useState(0);
  const [latitude, setlatitude] = useState(0);
  useEffect(() => {
    console.log(address);
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setlatitude(lat);
        setlongitude(lng);
        console.log([longitude, latitude]);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: '100%', minHeight: '200px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

Map.propTypes = {
  address: PropTypes.string.isRequired,
};

export default Map;

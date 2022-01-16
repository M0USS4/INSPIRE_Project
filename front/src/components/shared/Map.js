import React from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

const Map = ({address}) => {
  return (
    <div>
      { address && <MapContainer
        center={[address[0].longitude,address[0].latitude]}
        zoom={11}
        scrollWheelZoom={false}
        style={{ width: '100%', minHeight: '400px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {address.map((marker, index) => (
          <Marker position={[marker.longitude, marker.latitude]} key={index}>
            <Popup>
              {marker.rue}
            </Popup>
          </Marker>
        ))}

      </MapContainer>
      }
    </div>

  );
};

Map.propTypes = {
  address: PropTypes.array.isRequired,
};

export default Map;

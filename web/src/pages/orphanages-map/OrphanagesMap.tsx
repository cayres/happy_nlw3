import React, { CSSProperties } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { AddButton, Aside } from './components';
import './style.css';
import 'leaflet/dist/leaflet.css';

const mapStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  zIndex: 5,
};

export function OrphanagesMap() {
  return (
    <div id="page-map">
      <Aside />
      <Map center={[-13.0023301, -38.4534359]} zoom={15} style={mapStyle}>
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </Map>
      <AddButton />
    </div>
  );
}

import React from 'react';

import mapMarker from '../../../images/map-marker.svg';

export function Aside() {
  return (
    <aside>
      <header>
        <img src={mapMarker} alt="Happy" />
        <h2>Escolha um orfanato no mapa</h2>
        <p>Muitas crianças estão esperando a sua visita :)</p>
      </header>
      <footer>
        <strong>Salvador</strong>
        <span>Bahia</span>
      </footer>
    </aside>
  );
}

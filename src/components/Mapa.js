import React from 'react';

//importando o leaflet e o react-leaflet
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

// definindo o centro do mapa
const center = [-7.238227270040868, -39.43078078679895];

export default function Mapa() {
  // carregando um icone para o marcador
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  // função responsavel por localizar o usuario e adicionar um marcador no local
  function LocationMarker() {
    // state para armazenar a localização
    const [position, setPosition] = React.useState(null);
    // capturando o click no mapa e direcionando até a localização
    const map = useMapEvents({
      // procurando a localização quando o click ocorrer
      click() {
        map.locate();
      },
      // direcionando o mapa para a localização quando encontrar
      locationfound(e) {
        // 'salvando' a localização
        setPosition(e.latlng);
        // direcionando até a localização
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    // se tiver alguma localização adiciona um marcador
    return position === null ? null : (
      // criando o marcador na localização
      // adicionando as informações das comics selecionadas no marcador
      <Marker draggable="true" position={position}>
        <Popup>
          <h3>As coimics:</h3>
          <h4>{localStorage.getItem('comics')}</h4>
          <h3>Serão Entregues Aqui</h3>
        </Popup>
      </Marker>
    );
  }

  // criando o mapa
  return (
    <MapContainer
      style={{ width: '600px', height: '300px' }}
      center={center}
      zoom={15}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}

import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';
import Map from './Mapa';

// criando um portal para o modal do mapa
const portalRoot = document.getElementById('portal-root-map');

// verificando se pode abrir o modal do mapa
const ModalMap = (props) => {
  if (!props.isOpen) {
    return null;
  }

  // criando o portal
  // criando o layout do modal do mapa
  // adicionando o mapa dentro do modal
  return ReactDOM.createPortal(
    <>
      <section className="modal-map">
        <div className="map">
          <button className="fechar" onClick={props.onClickClose}>
            X
          </button>
          <Map />
        </div>
      </section>
    </>,
    portalRoot,
  );
};
export default ModalMap;

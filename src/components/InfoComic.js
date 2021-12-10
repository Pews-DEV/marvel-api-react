import React from 'react';

// componente responsavel pelo layout da comic dentro do modal
const InfoComic = (props) => {
  // função chamada ao clicar no botão 'selecionar'
  // a função chama uma função de callback passada, pelo ModalComic, atraves dos props
  function handleClick() {
    props.handleSelectComic(props.id, props.title);
  }

  // criando o layout e adicionando as informmações da comic selecionada atraves dos props
  return (
    <>
      <div className="info-comics">
        <div>
          <img src={props.imageURL} alt={props.title} />
        </div>
        <div>
          <h1>{props.title}</h1>
          <h2>price: ${props.price}</h2>
          <p>{props.description}</p>
          <button className="btn-select" onClick={handleClick}>
            selecionar
          </button>
        </div>
      </div>
    </>
  );
};

export default InfoComic;

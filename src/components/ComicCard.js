import React from 'react';

// componente responsavel pelo layout das comics
const ComicCard = (props) => {
  return (
    <div className="formatting">
      <img
        src={props.imageURL}
        alt="Imagem Comic"
        onClick={props.onClickImage}
      />
      <h1>{props.title}</h1>
      <p>{props.price === 0 ? '$ 0.00' : `$ ${props.price}`}</p>
    </div>
  );
};

export default ComicCard;

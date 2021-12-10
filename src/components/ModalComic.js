import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';
import InfoComic from './InfoComic';

// criando um portal para o modal das informações da comic
const portalRoot = document.getElementById('portal-root');

const ModalComic = ({
  isOpen,
  onClickClose,
  comicId,
  getSearchData,
  setInfoComics,
  infoComics,
  search,
  setSearch,
}) => {
  // state usado para armazenar as comics selecionadas pelo usuario (adicionando a lista de entrega)
  const [comicSelected, setComicSelected] = React.useState([]);

  // função responsavel por adicionar as informações das comics selecionadas pelo usuario
  // (lista de entrega)
  function handleSelectComic(id, title) {
    const infoComic = `(${id}:${title})`;
    let newComicSelected = comicSelected;
    if (comicSelected.includes(infoComic)) {
      let index = comicSelected.indexOf(infoComic);
      newComicSelected.splice(index, 1);
      alert('Comic Deselecionada');
    } else {
      newComicSelected.push(infoComic);
      alert('Comic Selecionada');
    }
    setComicSelected(newComicSelected);
    console.log(comicSelected);
    localStorage.clear(); // limpando lo localStorage
    // adicionando a lista de entrega ao localStorage
    localStorage.setItem('comics', comicSelected);
  }

  // verificando se pode abrir o modal
  if (!isOpen) {
    return null;
  }

  // verificar s epode abrir o modal
  // search é uma state de controle para não ficar fazendo requests desnecessários
  if (isOpen && search) {
    let searchData = getSearchData();
    let url = `${searchData.complementoURL}`;
    fetch(`http://gateway.marvel.com/v1/public/comics/${comicId}${url}`)
      .then((response) => response.json())
      .then((snapshot) => {
        const data = snapshot.data.results;
        const resp = data.map((item) => {
          return {
            id: item.id,
            description: item.description,
            title: item.title,
            image: `${item.thumbnail.path ?? 'default'}/portrait_uncanny.${
              item.thumbnail.extension
            }`,
            date: item.dates[0]?.date,
            price: item.prices[0]?.price,
            autors: item.autors,
          };
        });
        // passando as informações da comic selecionada para exibir no modal
        setInfoComics(resp);
        // setando o state de controle
        setSearch(false);
      });
  }

  // criando o portal e criando o modal
  // adicionando o componente InfoComic ao modal
  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modalComics">
        <button type="button" className="fechar" onClick={onClickClose}>
          X
        </button>
        {infoComics.map((comic) => (
          <InfoComic
            id={comic.id}
            price={comic.price}
            imageURL={comic.image}
            title={comic.title}
            autor={comic.autor}
            description={comic.description}
            key={comic.id}
            handleSelectComic={handleSelectComic}
          />
        ))}
      </div>
    </div>,
    portalRoot,
  );
};

export default ModalComic;

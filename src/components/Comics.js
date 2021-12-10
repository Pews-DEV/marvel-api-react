import React from 'react';

// importando os componentes
import ComicCard from './ComicCard';
import ModalComic from './ModalComic';
import ModalMap from './ModalMap';

import imgMap from '../assets/map-icon.png';

const Comics = (props) => {
  // state usado para registrar o id da comic selecinada
  const [comicId, setComicId] = React.useState(null);
  // state de controle para pesquisar a comic
  const [search, setSearch] = React.useState(false);
  // state de controle para abrir o modal do mapa
  const [mapOpen, setMapOpen] = React.useState(false);

  // hook effect para poder fazer o request das comics
  React.useEffect(() => {
    let searchData = props.getSearchData();
    fetch(searchData.baseURL)
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
          };
        });
        // passando os dados para o state 'comics'
        props.setComics(resp);
      });
  }, []);

  // criando o conteudo do site chamando o componente ComicCard
  // instanciando dois componentes de modal (apesar deles serem criados em outros roots)
  return (
    <>
      <div className="bar-bg">
        <button className="btn-bar" onClick={() => setMapOpen(true)}>
          Enviar Comics <img className="btn-img" src={imgMap} alt="" />
        </button>
      </div>
      <main className="content comics" id="content">
        {props.comics.map((comic) => (
          <ComicCard
            id={comic.id}
            price={comic.price}
            imageURL={comic.image}
            title={comic.title}
            key={comic.id}
            setIdComic={props.setIdComic}
            IdComic={props.idComic}
            onClickImage={() => {
              setComicId(comic.id);
              setSearch(true);
            }}
          />
        ))}
        <ModalComic
          isOpen={Boolean(comicId)}
          comicId={comicId}
          onClickClose={() => setComicId(null)}
          getSearchData={props.getSearchData}
          infoComics={props.infoComics}
          setInfoComics={props.setInfoComics}
          search={search}
          setSearch={setSearch}
        />
        <ModalMap
          isOpen={mapOpen}
          setMapOpen={setMapOpen}
          mapOpen={mapOpen}
          comicSelected={props.comicSelected}
          onClickClose={() => setMapOpen(false)}
        />
      </main>
    </>
  );
};

export default Comics;

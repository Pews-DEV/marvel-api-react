import React from 'react';
import md5 from 'md5';

// importando componentes
import Header from './components/Header';
import Comics from './components/Comics';
import Footer from './components/Footer';

// informações API
const timeStamp = '1637284124589';
const publicKey = '5e1021ef458be16fdcdbab547e7dc215';
const privateKey = '43d59e70a4a96643497c701344c36985abe47edb';
// criar hash
const hash = md5(timeStamp + privateKey + publicKey);

const App = () => {
  // state usado para a lista de comics
  const [comics, setComics] = React.useState([]);
  // state usado para as informações da comic selecionada (para abrir o modal)
  const [infoComics, setInfoComics] = React.useState([]);
  // state usado para armazenar o titulo a ser pesquisado
  const [comicTitle, setComicTitle] = React.useState('');

  // URL base
  const baseURL = `http://gateway.marvel.com/v1/public/comics?&orderBy=-focDate&ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

  // function usada para passar algumas informações
  function getSearchData() {
    return {
      baseURL: baseURL,
      comicTitle: comicTitle,
      setComicTitle: setComicTitle,
      complementoURL: `?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`,
    };
  }

  return (
    <>
      <div className="estrutura">
        <Header
          comics={comics}
          setComics={setComics}
          getSearchData={getSearchData}
        />
        <Comics
          comics={comics}
          setComics={setComics}
          infoComics={infoComics}
          setInfoComics={setInfoComics}
          getSearchData={getSearchData}
        />
        <Footer
          comics={comics}
          setComics={setComics}
          getSearchData={getSearchData}
        />
      </div>
    </>
  );
};

export default App;

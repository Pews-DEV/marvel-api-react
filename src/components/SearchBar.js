import React from 'react';

// componente adicionado ao header
// responsavel pela pesquisa
const SearchBar = (props) => {
  // função para setar o titulo que será usado na pesquisa
  function handleSearchChange(e) {
    let searchData = props.getSearchData();
    searchData.setComicTitle(e.target.value);
  }

  // função responsavel pelo request da pesquisa
  function handleSearch(e) {
    let searchData = props.getSearchData();
    let url = `${searchData.baseURL}&titleStartsWith=${searchData.comicTitle}`;
    fetch(url)
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
        // passando os dados do request para o state das comics
        props.setComics(resp);
      });
  }

  // criando o componente de pesquisa
  return (
    <div id="formulario">
      <input
        type="text"
        id="campo"
        className="campo"
        placeholder="Pesquisar Comic..."
        onChange={handleSearchChange}
      />
      <input
        type="submit"
        value="pesquisar"
        className="btn"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;

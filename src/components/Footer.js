import React from 'react';

// criando componente Footer
const Footer = (props) => {
  // state usado para definir o limite de comics no request
  const [limit, setLimit] = React.useState(20);

  // function para realizar o request do botão 'More'
  function handleMore(e) {
    // construindo a url usando a função getSearchData
    let searchData = props.getSearchData();
    let url = `${searchData.baseURL}`;
    if (searchData.comicTitle !== '') {
      url += `&title=${searchData.comicTitle}`;
    }
    url += `&limit=${limit}`;

    setLimit(limit * 2); //setando o limite

    // requisição
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
        // passando os datos para o state comics
        props.setComics(resp);
      });
  }
  // construindo o footer e o botão 'More'
  return (
    <footer className="footer">
      <button onClick={handleMore} className="btn">
        MORE
      </button>
    </footer>
  );
};

export default Footer;

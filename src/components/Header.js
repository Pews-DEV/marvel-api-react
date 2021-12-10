import React from 'react';
import SearchBar from './SearchBar';
import imgLogo from '../assets/marvel-logo.png';

// construindo o componente Header e adicionando o componente 'SearchBar'
const Header = (props) => {
  return (
    <header className="header">
      <a href="index.html">
        <img className="logo" src={imgLogo} alt="Marvel Logo" />
      </a>
      <SearchBar
        comics={props.comics}
        setComics={props.setComics}
        getSearchData={props.getSearchData}
      />
    </header>
  );
};

export default Header;

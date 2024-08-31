import styled from "styled-components";
import search from "../assets/search.svg";
import { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ onSearch, hint }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onSearch(e.target.value); // 부모 컴포넌트로 검색어 전달
  };

  return (
    <SearchContainer>
      <SearchIcon src={search} />
      <SearchInput
        placeholder={hint}
        value={inputValue}
        onChange={handleInputChange}
      />
    </SearchContainer>
  );
};

export default Search;

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  hint: PropTypes.string.isRequired,
};

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 6px;
  background-color: #f4f4f4;
  align-items: center;
  padding-left: 20px;
  gap: 5px;
`;

const SearchIcon = styled.img`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  display: flex;
  width: 80%;
  border: none;
  background-color: transparent;
  outline: none;
`;

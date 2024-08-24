import styled from "styled-components";
import search from "../assets/search.svg";

const Search = () => {
  return (
    <SearchContainer>
      <SearchIcon src={search} />
      <SearchInput placeholder="그룹명을 검색해 주세요" />
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  display: flex;
  width: 1186px;
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
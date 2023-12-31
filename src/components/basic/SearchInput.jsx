import styled from "styled-components";
import SearchIcon from "../icons/SearchIcon";

// Representa a barra de pesquisa da aplicação
const StyledSearchInput = styled.span`
  position: relative;
  flex: 1 1 auto;
`;

// Representa o ícone do campo de pesquisa da barra de pesquisa
const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  width: 18px;
  height: 18px;
  left: 18px;
  top: calc(50% - 9px);
  fill: var(--color-blue-b300);
`;

// Representa o campo de pesquisa (input) da barra de pesquisa
const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px 15px;
  padding-left: 47px;
  border: 1px solid var(--color-gray-g50);
  border-radius: 5px;
  &::placeholder {
    color: var(--color-gray-g300);
    opacity: 1;
  }
`;

// Representa o campo de pesquisa da aplicação
const SearchInput = ({ ...props }) => {
  return (
    <StyledSearchInput>
      <StyledSearchIcon />
      <StyledInput
        type="search"
        name="search"
        id="search"
        placeholder="Pesquisar"
        {...props}
      />
    </StyledSearchInput>
  );
};

export default SearchInput;

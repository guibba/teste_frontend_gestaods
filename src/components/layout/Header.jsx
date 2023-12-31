import styled from "styled-components";
import Button from "../basic/Button";
import SearchInput from "../basic/SearchInput";
import AddIcon from "../icons/AddIcon";

// Representa o cabeçalho da página principal
const StyledHeader = styled.header`
  background-color: var(--color-white);
  border-radius: 5px 5px 0 0;
  padding: 16px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;

  @media screen and (min-width: 640px) {
    padding: 16px 56px;
  }
`;

// Representa o título presente no cabeçalho da página principal
const StyledTitle = styled.p`
  display: none;

  @media screen and (min-width: 640px) {
    display: block;
  }
`;

// Representa a barra de pesquisa presente no cabeçalho
const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 1 auto;

  @media screen and (min-width: 640px) {
    flex: 0 1 auto;
  }
`;

// Representa o botão de adicionar novos pacientes
// Utilizado para esconder o texto do botão em telas menores
const StyledSearchButton = styled(Button)`
  & > p {
    display: none;

    @media screen and (min-width: 420px) {
      display: block;
    }
  }
`;

// Representa o cabeçalho da página principal
// Executa o callback 'onAdd' quando o botão de adicionar paciente é clicado
const Header = ({ onAdd }) => {
  return (
    <StyledHeader>
      <StyledTitle>Listagem de pacientes</StyledTitle>
      <StyledSearchBar>
        <SearchInput name="search" id="search" placeholder="Pesquisar" />
        <StyledSearchButton
          variant="primary"
          color="blue"
          icon={<AddIcon />}
          onClick={() => {
            onAdd();
          }}
        >
          <p>Adicionar paciente</p>
        </StyledSearchButton>
      </StyledSearchBar>
    </StyledHeader>
  );
};

export default Header;

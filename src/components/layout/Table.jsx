import styled from "styled-components";
import { useData } from "../../data/DataContext";
import ActionIcon from "../icons/ActionIcon";
import SortIcon from "../icons/SortIcon";

// Container que engloba toda a tabela
const StyledTableContainer = styled.div`
  background-color: var(--color-white);
  border-radius: 0 0 5px 5px;
  padding: 0 16px;
`;

// Representa toda a tabela da página principal
const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin: 0 auto;

  @media screen and (min-width: 1032px) {
    margin-bottom: 50px;
  }
`;

// Representa as linhas da tabela
const StyledTableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 70px;
  border-top: 1px solid var(--color-gray-g50);
  padding-left: 16px;
  gap: 16px;

  &:nth-child(2n) {
    background-color: var(--color-table-row-bg-odd);
  }

  &:nth-child(2n + 1) {
    background-color: var(--color-table-row-bg-even);
  }

  &:first-child {
    background-color: var(--color-table-row-bg-odd);
    padding-bottom: 4px;
    font-weight: 600;
    color: var(--color-table-header-text);
  }

  // Breakpoint onde a coluna 'Data de nascimento' é ocultada
  @media screen and (min-width: 530px) {
    grid-template-columns: 1fr repeat(1, 150px) 70px;
  }

  // Breakpoint onde a coluna 'Cidade' é ocultada
  @media screen and (min-width: 700px) {
    grid-template-columns: 1fr repeat(2, 150px) 70px;
  }

  // Breakpoint onde a coluna 'E-mail' é ocultada
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr repeat(3, 150px) 70px;
  }

  // Breakpoint onde a coluna 'CPF' é ocultada
  @media screen and (min-width: 956px) {
    grid-template-columns: repeat(5, 150px) minmax(70px, 1fr);
  }
`;

// Representa uma célula genérica da tabela
const StyledTableCell = styled.div`
  padding: 16px 0 12px 0;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  color: var(--color-gray-g500);
  vertical-align: top;
  text-align: left;
  overflow-wrap: anywhere;
`;

// Representa a célula da tabela que possui o nome do paciente
const StyledTableCellName = styled(StyledTableCell)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

// Representa a célula da tabela que possui o CPF do paciente
const StyledTableCellCPF = styled(StyledTableCell)`
  display: none;

  @media screen and (min-width: 956px) {
    display: inline-flex;
  }
`;

// Representa a célula da tabela que possui o username do paciente
const StyledTableCellUsername = styled(StyledTableCell)`
  display: none;

  @media screen and (min-width: 768px) {
    display: inline-flex;
  }
`;

// Representa a célula da tabela que possui a cidade do paciente
const StyledTableCellAddress = styled(StyledTableCell)`
  display: none;

  @media screen and (min-width: 700px) {
    display: inline-flex;
  }
`;

// Representa a célula da tabela que possui a data de nascimento do paciente
const StyledTableCellDateOfBirth = styled(StyledTableCell)`
  display: none;

  @media screen and (min-width: 530px) {
    display: inline-flex;
  }
`;

// Representa o texto que fica embaixo do nome do paciente na coluna 'Nome'
const StyledText = styled.p`
  font-size: 13px;
  color: var(--color-gray-g300);
`;

// Representa o nome do paciente
// É o dado principal da coluna 'Nome', então não herda os estilos de StyledText
const StyledTextName = styled.p`
  color: var(--color-blue-b300);
  @media screen and (min-width: 1032px) {
    cursor: pointer;
  }
`;

// Representa o CPF do paciente na coluna 'Nome'
// É utilizado para mostrar o texto quando a coluna 'CPF' for ocultada
const StyledTextCPF = styled(StyledText)`
  display: block;

  @media screen and (min-width: 956px) {
    display: none;
  }
`;

// Representa o email do paciente na coluna 'Nome'
// É utilizado para mostrar o texto quando a coluna 'E-mail' for ocultada
const StyledTextUsername = styled(StyledText)`
  display: block;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

// Representa a cidade do paciente na coluna 'Nome'
// É utilizado para mostrar o texto quando a coluna 'Cidade' for ocultada
const StyledTextAddress = styled(StyledText)`
  display: block;

  @media screen and (min-width: 700px) {
    display: none;
  }
`;

// Representa a data de nascimento do paciente na coluna 'Nome'
// É utilizado para mostrar o texto quando a coluna 'Data de nascimento' for ocultada
const StyledTextDateOfBirth = styled(StyledText)`
  display: block;

  @media screen and (min-width: 530px) {
    display: none;
  }
`;

// Representa o ícone ao lado dos nomes de cada coluna
const StyledSortIcon = styled(SortIcon)`
  fill: var(--color-blue-b300);
  @media screen and (min-width: 1032px) {
    cursor: pointer;
  }
`;

// Representa o ícone na coluna 'Ações' de cada linha da tabela
const StyledActionIcon = styled(ActionIcon)`
  fill: var(--color-black);
  @media screen and (min-width: 1032px) {
    cursor: pointer;
  }
`;

// Engloba o título de cada coluna e o ícone
const StyledHeaderWrapper = styled.span`
  display: flex;
  gap: 8px;
  align-items: center;
`;

// Representa a tabela da página principal
// Executa o callback 'onNameClick' quando o nome do paciente é clicado
// Executa o callback 'onActionButtonClick' quando o botão de ações é clicado
const Table = ({ onNameClick, onActionButtonClick }) => {
  // Utiliza o hook customizado para ter acesso ao Context com os dados
  const data = useData();

  return (
    <StyledTableContainer>
      <StyledTable>
        <StyledTableRow>
          <StyledTableCellName scope="col">
            <StyledHeaderWrapper>
              <p>Nome</p>
              <StyledSortIcon />
            </StyledHeaderWrapper>
          </StyledTableCellName>
          <StyledTableCellCPF scope="col">
            <StyledHeaderWrapper>
              <p>CPF</p>
              <StyledSortIcon />
            </StyledHeaderWrapper>
          </StyledTableCellCPF>
          <StyledTableCellDateOfBirth scope="col">
            <StyledHeaderWrapper>
              <p>Data de nascimento</p>
              <StyledSortIcon />
            </StyledHeaderWrapper>
          </StyledTableCellDateOfBirth>
          <StyledTableCellUsername scope="col">
            <StyledHeaderWrapper>
              <p>E-mail</p>
              <StyledSortIcon />
            </StyledHeaderWrapper>
          </StyledTableCellUsername>
          <StyledTableCellAddress scope="col">
            <StyledHeaderWrapper>
              <p>Cidade</p>
              <StyledSortIcon />
            </StyledHeaderWrapper>
          </StyledTableCellAddress>
          <StyledTableCell scope="col">
            <StyledHeaderWrapper>
              <p>Ações</p>
              <StyledSortIcon />
            </StyledHeaderWrapper>
          </StyledTableCell>
        </StyledTableRow>
        {Object.entries(data).map(([key, value]) => {
          const name = value.basicInformation.name;

          let username = value.basicInformation.username + "@gestaods.com.br";

          const city = value.contactInformation.city;

          const cpf = value.basicInformation.cpf.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            "$1.$2.$3-$4"
          );

          const dateOfBirth = new Date(
            value.basicInformation.dateOfBirth
          ).toLocaleDateString("pt-BR", { timeZone: "UTC" });

          return (
            <StyledTableRow key={key}>
              <StyledTableCellName>
                <StyledTextName
                  onClick={(e) => {
                    e.preventDefault();
                    onNameClick(key);
                  }}
                >
                  {name}
                </StyledTextName>
                <StyledTextUsername>{username}</StyledTextUsername>
                <StyledTextAddress>{city}</StyledTextAddress>
                <StyledTextCPF>
                  <b>CPF: </b>
                  {cpf}
                </StyledTextCPF>
                <StyledTextDateOfBirth>
                  <b>Data de nascimento: </b>
                  {dateOfBirth}
                </StyledTextDateOfBirth>
              </StyledTableCellName>
              <StyledTableCellCPF>{cpf}</StyledTableCellCPF>
              <StyledTableCellDateOfBirth>
                {dateOfBirth}
              </StyledTableCellDateOfBirth>
              <StyledTableCellUsername>{username}</StyledTableCellUsername>
              <StyledTableCellAddress>{city}</StyledTableCellAddress>
              <StyledTableCell>
                <StyledActionIcon
                  onClick={(e) => onActionButtonClick(e, key)}
                />
              </StyledTableCell>
            </StyledTableRow>
          );
        })}
      </StyledTable>
    </StyledTableContainer>
  );
};

export default Table;

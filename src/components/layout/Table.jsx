import styled from "styled-components";
import { useData } from "../../data/DataContext";
import ActionIcon from "../icons/ActionIcon";
import SortIcon from "../icons/SortIcon";

// Representa as linhas da tabela
const StyledTableRow = styled.tr`
  border-top: 0.5px solid var(--color-gray-g50);

  &:nth-child(2n) {
    background-color: var(--color-table-row-bg-even);
  }

  &:nth-child(2n + 1) {
    background-color: var(--color-table-row-bg-odd);
  }
`;

// Representa os cabeçalhos da tabela
const StyledTableHeader = styled.th`
  width: 164px;
  padding: 16px 0px 16px 16px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  color: var(--color-table-header-text);
  font-weight: 600;
`;

// Representa as células da tabela
const StyledTableData = styled.td`
  width: 164px;
  padding: 16px 0px 12px 16px;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: var(--color-gray-g500);
  vertical-align: top;
  text-align: left;
  overflow-wrap: anywhere;
`;

// Container que engloba toda a tabela
const StyledTableContainer = styled.div`
  background-color: var(--color-white);
  border-radius: 0 0 5px 5px;
  padding: 0 16px;
`;

// Representa toda a tabela da página principal
const StyledTable = styled.table`
  margin: 0 auto;
  border-collapse: collapse;
  text-align: center;
  width: 100%;

  .data {
    font-size: 13px;
    color: #656565;
  }

  .dataCpf {
    display: block;

    @media screen and (min-width: 1032px) {
      display: none;
    }
  }

  .colCpf {
    display: none;

    @media screen and (min-width: 1032px) {
      display: inline-flex;
    }
  }

  .dataDateOfBirth {
    display: block;

    @media screen and (min-width: 530px) {
      display: none;
    }
  }

  .colDateOfBirth {
    display: none;

    @media screen and (min-width: 530px) {
      display: inline-flex;
    }
  }

  .dataUsername {
    display: block;

    @media screen and (min-width: 870px) {
      display: none;
    }
  }

  .colUsername {
    display: none;

    @media screen and (min-width: 870px) {
      display: inline-flex;
    }
  }

  .dataCity {
    display: block;

    @media screen and (min-width: 700px) {
      display: none;
    }
  }

  .colCity {
    display: none;

    @media screen and (min-width: 700px) {
      display: inline-flex;
    }
  }

  .colActions {
    width: auto;
    padding-right: 16px;

    @media screen and (min-width: 370px) {
      width: 164px;
    }
  }

  @media screen and (min-width: 1032px) {
    margin-bottom: 50px;
  }
`;

// Representa as células da coluna do nome do paciente
const StyledColumnName = styled.p`
  color: var(--color-blue-b300);
  cursor: pointer;
`;

// Representa o ícone ao lado dos nomes de cada coluna
const StyledSortIcon = styled(SortIcon)`
  fill: var(--color-blue-b300);
  cursor: pointer;
`;

// Representa o ícone na coluna 'Ações' de cada linha da tabela
const StyledActionIcon = styled(ActionIcon)`
  fill: var(--color-black);
  cursor: pointer;
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
        <thead>
          <StyledTableRow>
            <StyledTableHeader scope="col" className="colName">
              <p>Nome</p>
              <StyledSortIcon />
            </StyledTableHeader>
            <StyledTableHeader scope="col" className="colCpf">
              <p>CPF</p>
              <StyledSortIcon />
            </StyledTableHeader>
            <StyledTableHeader scope="col" className="colDateOfBirth">
              <p>Data de nascimento</p>
              <StyledSortIcon />
            </StyledTableHeader>
            <StyledTableHeader scope="col" className="colUsername">
              <p>E-mail</p>
              <StyledSortIcon />
            </StyledTableHeader>
            <StyledTableHeader scope="col" className="colCity">
              <p>Cidade</p>
              <StyledSortIcon />
            </StyledTableHeader>
            <StyledTableHeader scope="col" className="colActions">
              <p>Ações</p>
              <StyledSortIcon />
            </StyledTableHeader>
          </StyledTableRow>
        </thead>
        <tbody>
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
                <StyledTableData className="colName">
                  <StyledColumnName
                    onClick={(e) => {
                      e.preventDefault();
                      onNameClick(key);
                    }}
                  >
                    {name}
                  </StyledColumnName>
                  <p className="data dataUsername">{username}</p>
                  <p className="data dataCity">{city}</p>
                  <p className="data dataCpf">
                    <b>CPF: </b>
                    {cpf}
                  </p>
                  <p className="data dataDateOfBirth">
                    <b>Nasc.: </b>
                    {dateOfBirth}
                  </p>
                </StyledTableData>
                <StyledTableData className="colCpf">{cpf}</StyledTableData>
                <StyledTableData className="colDateOfBirth">
                  {dateOfBirth}
                </StyledTableData>
                <StyledTableData className="colUsername">
                  {username}
                </StyledTableData>
                <StyledTableData className="colCity">{city}</StyledTableData>
                <StyledTableData className="colActions">
                  <StyledActionIcon
                    onClick={(e) => onActionButtonClick(e, key)}
                  />
                </StyledTableData>
              </StyledTableRow>
            );
          })}
        </tbody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default Table;

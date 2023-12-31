import { useState } from "react";
import styled from "styled-components";
import Header from "./components/layout/Header";
import Table from "./components/layout/Table";
import ActionMenu from "./components/menu/ActionMenu";
import DeleteModal from "./components/modals/DeleteModal";
import InformationModal from "./components/modals/InformationModal";
import { DataProvider } from "./data/DataContext";
import GlobalStyle from "./globalStyle";

// Representa o logo da empresa no topo da página principal
const StyledLogo = styled.img`
  max-width: 230px;
  align-self: center;
`;

// Representa o container que engloba toda a aplicação
const StyledContainer = styled.div`
  max-width: 1032px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  margin: 0 auto;
  gap: 12px;
`;

// Representa toda a aplicação
function App() {
  // Estado que armazena temporariamente o identificador do usuário selecionado
  const [currentPatientId, setCurrentPatientId] = useState(null);

  // Estado que representa se o modal com as informações do paciente está sendo renderizado
  const [isInformationModalOpen, setInformationModalOpen] = useState(false);

  // Estado que representa se o modal de confirmação de exclusão está sendo renderizado
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Estado que representa se o menu de ações está sendo renderizado
  const [isActionMenuOpen, setActionMenuOpen] = useState(false);

  // Estado que armazena as coordanadas da tela onde o menu de ações deve ser renderizado
  const [actionMenuPosition, setActionMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  // Trata o evento em que o usuário clica no botão da coluna 'Ações' da tabela
  // Recebe o identificador do paciente (id)
  // Calcula e armazena a posição em que o menu deve ser renderizado
  // Fecha o menu de ações
  // Armazena o identificador (id) do paciente no estado local
  const handleActionButtonClick = (e, id) => {
    e.stopPropagation();

    const { left, top, height } = e.target.getBoundingClientRect();
    const x = left;
    const y = top + height;

    setActionMenuPosition({ x, y });
    setActionMenuOpen(!isActionMenuOpen);
    setCurrentPatientId(id);
  };

  // Trata o evento em que o usuário clica no nome do paciente na tabela
  // Recebe o identificador do paciente (id)
  // Armazena o identificador (id) do paciente no estado local
  // Abre o modal com as informações do paciente
  const handleNameClick = (id) => {
    setCurrentPatientId(id);
    setInformationModalOpen(true);
  };

  // Trata o evento em que o usuário clica no botão de adicionar pacientes
  // Abre o modal com as informações do paciente
  const handleAddButtonClick = () => {
    setInformationModalOpen(true);
  };

  // Trata o evento em que o usuário clica em 'Editar' no menu de ações
  // Abre o modal com as informações do paciente
  // Fecha o menu de ações
  const handleEditButtonClick = () => {
    setInformationModalOpen(true);
    setActionMenuOpen(false);
  };

  // Trata o evento em que o usuário clica em 'Salvar' no modal de informações do paciente
  // Fecha o modal com as informações do paciente
  // Reseta o estado que armazena o identificador (id) do paciente
  const handleSaveButtonClick = () => {
    setInformationModalOpen(false);
    setCurrentPatientId(null);
  };

  // Trata o evento em que o usuário clica em 'Excluir' no menu de ações
  // Abre o modal de confirmação de exclusão
  // Fecha o menu de ações
  const handleDeleteButtonClick = () => {
    setDeleteModalOpen(true);
    setActionMenuOpen(false);
  };

  // Trata o evento em que o usuário fecha o menu de ações ou cancela a exclusão
  // Fecha o modal de confirmação de exclusão
  // Reseta o estado que armazena o identificador (id) do paciente
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setCurrentPatientId(null);
  };

  return (
    <DataProvider>
      <GlobalStyle />
      <div className="App">
        <StyledContainer>
          {!isInformationModalOpen && (
            <StyledLogo src="assets/logo.png" alt="Logo da GestãoDS" />
          )}
          <main>
            {!isInformationModalOpen && (
              <>
                <Header onAdd={handleAddButtonClick} />
                <Table
                  onNameClick={handleNameClick}
                  onActionButtonClick={handleActionButtonClick}
                />
              </>
            )}

            {isInformationModalOpen && (
              <InformationModal
                identifier={currentPatientId}
                onSave={handleSaveButtonClick}
              />
            )}
          </main>
          {isActionMenuOpen && (
            <ActionMenu
              position={actionMenuPosition}
              onEdit={handleEditButtonClick}
              onDelete={handleDeleteButtonClick}
              onClickOutside={() => setActionMenuOpen(false)}
            />
          )}
          {isDeleteModalOpen && (
            <DeleteModal
              identifier={currentPatientId}
              onClose={handleDeleteModalClose}
            />
          )}
        </StyledContainer>
      </div>
    </DataProvider>
  );
}

export default App;

import styled from "styled-components";
import { useDataDispatch } from "../../data/DataContext";
import Button from "../basic/Button";
import CloseIcon from "../icons/CloseIcon";

// Representa o backdrop do modal de confirmação de exclusão
const StyledModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Engloba todos componentes do modal de confirmação de exclusão
const StyledModalContainer = styled.div`
  background: var(--color-white);
  margin: 0 16px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

// Representa o cabeçalho do modal de confirmação de exclusão
const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

// Representa o título do modal de confirmação de exclusão
const StyledModalTitle = styled.span`
  font-size: 24px;
  color: var(--color-darkpurple-dp500);
  font-weight: 600;
`;

// Representa o botão para fechar o modal de confirmação de exclusão
const StyledModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

// Representa o ícone do botão para fechar o modal de confirmação de exclusão
const StyledCloseIcon = styled(CloseIcon)`
  fill: var(--color-gray-g300);
`;

// Representa o corpo do modal de confirmação de exclusão
const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  align-items: center;
  font-size: 16px;
  border-top: 1px solid var(--color-gray-g75);
  border-bottom: 1px solid var(--color-gray-g75);
`;

// Representa a imagem no centro do modal de confirmação de exclusão
const StyledModalImage = styled.img`
  max-height: 132px;
`;

// Representa o primeiro parágrafo do modal de confirmação de exclusão
const StyledModalQuestionText = styled.p`
  color: var(--color-gray-g400);
  text-align: center;
`;

// Representa o segundo parágrafo do modal de confirmação de exclusão
const StyledModalDisclaimerText = styled.p`
  margin-bottom: 16px;
  font-weight: 600;
  color: var(--color-gray-g400);
  text-align: center;
`;

// Representa o rodapé do modal de confirmação de exclusão
const StyledModalFooter = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  padding: 16px;
`;

// Representa o botão de cancelar exclusão
const StyledCancelButton = styled(Button)`
  padding: 8px 16px;
  font-weight: 600;
`;

// Representa o botão de confirmar exclusão
const StyledDeleteButton = styled(Button)`
  padding: 8px 16px;
`;

// Representa o modal de confirmação de exclusão
// Recebe o identificador (identifier) do paciente selecionado
// Executa o callback 'onClose' quando o usuário interage com elementos que cancelam a exclusão
// ---
// Em caso de confirmação, despacha (dispatch) uma ação para o Reducer
// O Reducer recebe o nome da ação (delete) e o identificador do paciente a ser excluído
const DeleteModal = ({ identifier, onClose }) => {
  // Reducer customizado para despachar as ações a serem executadas sobre os dados
  const dispatch = useDataDispatch();

  return (
    <StyledModalBackdrop
      onClick={() => {
        onClose();
      }}
    >
      <StyledModalContainer onClick={(e) => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Excluir paciente?</StyledModalTitle>
          <StyledModalCloseButton onClick={() => onClose()}>
            <StyledCloseIcon />
          </StyledModalCloseButton>
        </StyledModalHeader>
        <StyledModalBody>
          <StyledModalImage
            src="assets/question.svg"
            alt="Ilustração de uma pessoa em dúvida"
          />

          <StyledModalQuestionText>
            Tem certeza que deseja excluir o paciente selecionado?
          </StyledModalQuestionText>
          <StyledModalDisclaimerText>
            Essa ação não poderá ser desfeita.
          </StyledModalDisclaimerText>
        </StyledModalBody>
        <StyledModalFooter>
          <StyledCancelButton
            variant="secondary"
            color="blue"
            onClick={() => onClose()}
          >
            Cancelar
          </StyledCancelButton>
          <StyledDeleteButton
            variant="primary"
            color="red"
            onClick={() => {
              dispatch({
                type: "delete",
                id: identifier,
              });
              onClose();
            }}
          >
            Excluir
          </StyledDeleteButton>
        </StyledModalFooter>
      </StyledModalContainer>
    </StyledModalBackdrop>
  );
};

export default DeleteModal;

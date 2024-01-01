import { forwardRef } from "react";
import styled from "styled-components";

// Representa o backdrop do menu de ações
const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 1032px) {
    background: transparent;
  }
`;

// Representa todo o menu de ações
const StyledActionMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.05),
    0px 1px 15px 0px rgba(14, 30, 47, 0.03);
  z-index: 1;

  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 5px;
  transform: translate(-50%, -50%) scale(1.5);

  @media screen and (min-width: 1032px) {
    position: absolute;
    left: ${(props) => `${props.$positionX}px` || "0"};
    top: ${(props) => `${props.$positionY}px` || "0"};
    transform: scale(1);
  }
`;

// Representa todos os itens do menu de ação
const StyledActionMenuItem = styled.div`
  background-color: var(--color-white);
  padding: 10px 16px;
  width: 156px;
  border-radius: 0;
  color: var(--color-gray-g300);
  border-bottom: 1px solid var(--color-gray-g50);

  &:hover {
    background-color: var(--color-blue-b50);
    color: var(--color-blue-b300);
  }

  &:first-child {
    border-radius: 5px 5px 0 0;
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
  }

  @media screen and (min-width: 1032px) {
    cursor: pointer;
  }
`;

// Representa o menu de ações acessado ao clicar no botão da coluna 'Ações'
// O hook forwardRef permite que o componente pai acesse a ref dos componentes internos
// Recebe as coordenadas da posição da tela {x, y} onde ele deve ser renderizado
// Executa o callback 'onEdit' quando o item 'Editar' do menu é clicado
// Executa o callback 'onDelete' quando oo item 'Excluir' do menu é clicado
// Executa o callback 'onClickOutside' quando o usuário clica fora do componente
const ActionMenu = forwardRef(function ActionMenu(
  { position, onEdit, onDelete, onClickOutside, ...props },
  ref
) {
  return (
    <StyledBackdrop onClick={() => onClickOutside()}>
      <StyledActionMenu
        ref={ref}
        $positionX={position.x}
        $positionY={position.y}
        onClick={onClickOutside}
        {...props}
      >
        <StyledActionMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          Editar
        </StyledActionMenuItem>
        <StyledActionMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          Excluir
        </StyledActionMenuItem>
      </StyledActionMenu>
    </StyledBackdrop>
  );
});

export default ActionMenu;

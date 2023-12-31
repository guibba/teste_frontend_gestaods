import { forwardRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";

// Representa todos os campos de seleção (select) da aplicação
const StyledSelect = styled.select`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid var(--color-gray-g50);
  border-radius: 5px;
  font-family: inherit;
  font-size: 14px;
  background-color: var(--color-white);
  cursor: pointer;

  ${(props) =>
    props.$isSelected
      ? css`
          color: var(--color-gray-g300);
        `
      : css`
          color: var(--color-gray-g75);
        `};
`;

// Representa as opções de seleção (option) do componente
const StyledOption = styled.option`
  font-family: inherit;
  color: var(--color-gray-g300);

  &:first-child {
    color: var(--color-gray-g75);
  }
`;

// Representa um campo de seleção (select)
// O hook forwardRef permite que o componente pai acesse a ref dos componentes internos
// Recebe as opções de seleção (options) através de um array de objetos {valor: nome}
const Select = forwardRef(function Select({ options, ...props }, ref) {
  // Estado que representa se existe alguma opção selecionada atualmente
  const [isSelected, setSelected] = useState(false);

  // Inicializa o componente com o valor recebido na prop 'defaultValue'
  useEffect(() => {
    setSelected(props.defaultValue !== "");
  }, [props.defaultValue]);

  // Atualiza o estado do componente quando há alguma alteração na seleção
  function handleChange(e) {
    setSelected(e.target.value !== "");
  }

  return (
    <StyledSelect
      ref={ref}
      $isSelected={isSelected}
      onChange={handleChange}
      {...props}
    >
      {options.map((item, i) => (
        <StyledOption key={i} value={item.value}>
          {item.label}
        </StyledOption>
      ))}
    </StyledSelect>
  );
});

export default Select;

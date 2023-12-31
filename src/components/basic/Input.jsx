import { forwardRef } from "react";
import styled from "styled-components";

// Representa todos os campos de entrada (input) da aplicação
const StyledInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid var(--color-gray-g50);
  border-radius: 5px;
  font-family: inherit;
  font-size: 14px;
  appearance: none;
  color: var(--color-gray-g300);

  &::placeholder {
    color: var(--color-gray-g75);
  }
`;

// Representa um campos de entrada (input)
// O hook forwardRef permite que o componente pai acesse a ref dos componentes internos
const Input = forwardRef(function Input({ ...props }, ref) {
  return <StyledInput ref={ref} {...props} />;
});

export default Input;

import { forwardRef } from "react";
import styled from "styled-components";

// Representa os campos de texto multilinha
const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid var(--color-gray-g50);
  border-radius: 5px;
  font-family: inherit;
  font-size: 14px;
  appearance: none;
  resize: none;
  height: 73px;
  color: var(--color-gray-g300);

  &::placeholder {
    color: var(--color-gray-g75);
  }
`;

// Representa um campo de texto multilinha
// O hook forwardRef permite que o componente pai acesse a ref dos componentes internos
const Textarea = forwardRef(function Textarea({ ...props }, ref) {
  return <StyledTextarea ref={ref} {...props} />;
});

export default Textarea;

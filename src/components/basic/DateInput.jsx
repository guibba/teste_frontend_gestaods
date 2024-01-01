import { forwardRef } from "react";
import styled from "styled-components";
import DateIcon from "../icons/DateIcon";

// Representa o campo de entrada de datas customizado
const StyledDateInput = styled.span`
  position: relative;
  flex: 1 1 auto;
`;

// Representa o ícone do campo de entrada de data
const StyledDateIcon = styled(DateIcon)`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 12px;
  top: calc(50% - 12px);
  fill: var(--color-blue-b300);
  @media screen and (min-width: 1032px) {
    cursor: pointer;
  }
`;

// Representa o campo de entrada (input) de datas
const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px 15px;
  padding-left: 40px;
  border: 1px solid var(--color-gray-g50);
  border-radius: 5px;
  color: var(--color-gray-g300);
  font-family: inherit;
  background-color: var(--color-white);
  appearance: none;

  &::-webkit-calendar-picker-indicator {
    display: none;
  }
`;

// Representa o campo de entrada de datas
// O hook forwardRef permite que o componente pai acesse a ref dos componentes internos
const DateInput = forwardRef(function DateInput({ ...props }, ref) {
  return (
    <StyledDateInput>
      <StyledDateIcon onClick={() => ref.current.showPicker()} />
      <StyledInput type="date" name="date" id="date" ref={ref} {...props} />
    </StyledDateInput>
  );
});

export default DateInput;

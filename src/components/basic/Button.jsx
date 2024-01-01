import styled, { css } from "styled-components";

// Representa todos os botões da aplicação
const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  padding: 8px 8px;
  height: 32px;
  box-shadow: 0px 4px 8px 0px rgba(14, 30, 47, 0.03);
  gap: 8px;

  ${(props) =>
    props.$variant === "primary" &&
    css`
      border: none;
      color: var(--color-white);
      ${(props) =>
        props.$color === "blue" &&
        css`
          background-color: var(--color-blue-b300);
        `}
      ${(props) =>
        props.$color === "red" &&
        css`
          background-color: var(--color-red-r300);
        `}
    `}

  ${(props) =>
    props.$variant === "secondary" &&
    css`
      background-color: var(--color-white);
      ${(props) =>
        props.$color === "blue" &&
        css`
          border: 1px solid var(--color-blue-b300);
          color: var(--color-blue-b300);
        `}
      ${(props) =>
        props.$color === "red" &&
        css`
          border: 1px solid var(--color-red-r300);
          color: var(--color-red-r300);
        `}
    `}
  @media screen and (min-width: 1032px) {
    cursor: pointer;
  }
`;

// Representa o ícone que pode ser incluído no botão
const StyledIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 3px 4px 4px 3px;
  width: 20px;
  height: 20px;
  ${(props) =>
    props.$variant === "primary" &&
    css`
      fill: var(--color-white);
    `}
  ${(props) =>
    props.$variant === "secondary" &&
    css`
      ${(props) =>
        props.$color === "blue" &&
        css`
          fill: var(--color-blue-b300);
        `}
      ${(props) =>
        props.$color === "red" &&
        css`
          fill: var(--color-red-r300);
        `}
    `}
`;

// Representa todos os botões contidos na aplicação
// Possui duas versões, "primary" (preenchido) e "secondary" (contornado)
// Possui duas variações de cores: "blue" (azul) e "red" (vermelho)
// Além disso, é possível incluir um dos ícones através da prop "icon"
const Button = ({ variant, color, icon = null, children, ...props }) => {
  return (
    <StyledButton $variant={variant} $color={color} {...props}>
      {icon && (
        <StyledIcon $variant={variant} $color={color}>
          {icon}
        </StyledIcon>
      )}
      {children}
    </StyledButton>
  );
};

export default Button;

import { createGlobalStyle } from "styled-components";

// Estilos globais utilizados na aplicação
const GlobalStyle = createGlobalStyle`
  :root {
    --color-black: #000000;
    --color-white: #ffffff;
    --color-gray-g50: #e8e8e8;
    --color-gray-g75: #c0c0c0;
    --color-gray-g100: #a6a6a6;
    --color-gray-g300: #656565;
    --color-gray-g400: #565656;
    --color-gray-g500: #474747;
    --color-blue-b50: #edf3fc;
    --color-blue-b100: #b6d1f4;
    --color-blue-b300: #136cdc;
    --color-purple-p500: #4f1368;
    --color-darkpurple-dp500: #510972;
    --color-red-r300: #c52525;

    --color-body-bg: #f6f6f6;
    --color-table-header-text: #4b4b4b;
    --color-table-row-bg-odd: #fcfcfc;
    --color-table-row-bg-even: #ffffff;
    --color-border-inactive-tab: #ebeef1;
    --color-bg-profile-picture: #d9d9d9;
  }

  * {
    box-sizing: border-box;
    margin: 0;
  }

  body {
    margin: 0;
    padding: 0;
    background: var(--color-body-bg);
    font-family: 'Source Sans 3', sans-serif;
    font-size: 14px;
  }
`;

export default GlobalStyle;

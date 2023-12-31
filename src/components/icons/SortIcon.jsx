// Representa o ícone presente ao lado dos nomes de coluna da tabela
const SortIcon = ({ ...props }) => {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3.6167 0.461365L0.616699 3.45386H2.8667V8.71136H4.3667V3.45386H6.6167L3.6167 0.461365ZM8.8667 10.9689V5.71136H7.3667V10.9689H5.1167L8.1167 13.9614L11.1167 10.9689H8.8667Z" />
    </svg>
  );
};

export default SortIcon;

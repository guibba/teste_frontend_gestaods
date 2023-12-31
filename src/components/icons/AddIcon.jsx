// Representa o ícone presente no botão para adicionar novos pacientes
const AddIcon = ({ ...props }) => {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12.3333 7.54472H7.33329V12.5447H5.66663V7.54472H0.666626V5.87805H5.66663V0.878052H7.33329V5.87805H12.3333V7.54472Z" />
    </svg>
  );
};

export default AddIcon;

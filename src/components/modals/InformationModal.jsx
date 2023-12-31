import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useData, useDataDispatch } from "../../data/DataContext";
import Button from "../basic/Button";
import Input from "../basic/Input";
import Select from "../basic/Select";
import Textarea from "../basic/Textarea";

// Representa o container que engloba todo o modal
const StyledInformationContainer = styled.div`
  max-width: 1032px;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0 auto;
  gap: 12px;
  background-color: var(--color-white);
  border-radius: 10px;
  padding: 30px 20px;

  @media screen and (min-width: 1032px) {
    margin: 64px auto;
  }
`;

// Representa a barra que contém as abas
const StyledTabBar = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 2px solid var(--color-border-inactive-tab);
`;

// Representa cada aba
const StyledTab = styled.button`
  background: none;
  min-height: 40px;
  font-size: 16px;
  border: none;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  ${(props) =>
    props.$active
      ? css`
          color: var(--color-purple-p500);
          box-shadow: 0 2px 0 0 var(--color-purple-p500);
        `
      : css`
          color: var(--color-gray-g300);
          box-shadow: 0 2px 0 0 var(--color-border-inactive-tab);
        `}
`;

// Representa um container que engloba o conteúdo de cada aba
// Não é utilizado diretamente, são estilos em comum entre as abas
const StyledTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 27px 0px;
  color: var(--color-gray-g300);
`;

// Representa o container que engloba o conteúdo da aba 'Informações básicas'
// É utilizado somente para mostrar/ocultar seus conteúdos
const StyledBasicInformationContainer = styled(StyledTabContainer)`
  display: ${(props) => props.$hidden && "none"};
`;

// Representa o container que engloba o conteúdo da aba 'Contato'
// É utilizado somente para mostrar/ocultar seus conteúdos
const StyledContactInformationContainer = styled(StyledTabContainer)`
  display: ${(props) => props.$hidden && "none"};
`;

// Representa a imagem de perfil do paciente
const StyledAvatar = styled.div`
  background-color: var(--color-bg-profile-picture);
  border-radius: 50%;
  width: 125px;
  height: 125px;
  padding: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-bottom: 15px;

  @media (min-width: 540px) {
    align-self: flex-start;
  }

  & > img {
    width: 100%;
    height: 100%;
  }
`;

// Representa a grade dividida em três colunas de campos de entrada (input)
const StyledGrid = styled.ul`
  display: grid;
  margin: 0;
  padding: 0;
  grid-template-columns: 1fr;
  gap: 14px 30px;
  list-style: none;

  @media screen and (min-width: 780px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (min-width: 540px) and (max-width: 780px) {
    grid-template-columns: 1fr 1fr;
  }
`;

// Representa cada item da grade de campos de entrada (input)
const StyledGridItem = styled.li`
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.$fillRow &&
    css`
      grid-column: span 1;
      @media screen and (min-width: 780px) {
        grid-column: span 3;
      }

      @media screen and (min-width: 540px) and (max-width: 780px) {
        grid-column: span 2;
      }
    `}
`;

// Representa o rodapé do container de abas
// Engloba os botões utilizados durante a navegação
const StyledTabFooter = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: auto;
`;

// Representa os botões no rodapé de cada aba
const StyledButton = styled(Button)`
  flex: 1 1 auto;
  min-width: min-content;
  max-width: 30%;
`;

// Representa o modal que contém informações do paciente
// Recebe o identificador (identifier) do paciente selecionado
// Caso o id seja 'null' o modal será utilizado para adicionar um paciente
// Executa o callback 'onSave' quando o botão de salvar paciente é clicado
// ---
// Em caso de adição, despacha (dispatch) uma ação para o Reducer
// O Reducer recebe o nome da ação (add) e os dados do paciente a ser adicionado
// ---
// Em caso de edição, despacha (dispatch) uma ação para o Reducer
// O Reducer recebe o nome da ação (edit), o identificador e os novos dados do paciente editado
const InformationModal = ({ identifier = null, onSave }) => {
  // Context e Reducer customizados, para ter acesso aos dados e para despachar ações sobre eles
  const data = useData();
  const dispatch = useDataDispatch();

  // Tipos de abas e o estado que armazena qual aba está selecionada atualmente (currentTab)
  const tabs = {
    BASIC_INFORMATION: "basic",
    CONTACT_INFORMATION: "contact",
  };
  const [currentTab, setCurrentTab] = useState(tabs.BASIC_INFORMATION);

  // Estado que armazena o CEP digitado pelo usuário
  const [cep, setCEP] = useState(
    data[identifier] ? data[identifier].contactInformation.cep : ""
  );

  // Refs das caixas de texto da aba de informações básicas
  const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const nationalityRef = useRef(null);
  const dateOfBirthRef = useRef(null);
  const cpfRef = useRef(null);
  const rgRef = useRef(null);
  const genderRef = useRef(null);
  const maritalStatusRef = useRef(null);
  const observationsRef = useRef(null);

  // Refs das caixas de texto da aba de informações de contato
  const cepRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const addressRef = useRef(null);
  const houseNumberRef = useRef(null);
  const districtRef = useRef(null);
  const detailsRef = useRef(null);

  // Hook para realizar a requisição para a API externa VIACEP
  // Só executa se o CEP digitado possuir exatamente 8 dígitos
  // Se o CEP existe e for retornado, preenche os campos relevantes automaticamente
  // Se o CEP não existe ou ocorrer algum erro, deixa os campos relevantes vazios
  useEffect(() => {
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (data.erro) throw Error("CEP não encontrado.");
          addressRef.current.value = data.logradouro;
          districtRef.current.value = data.bairro;
          cityRef.current.value = data.localidade;
          stateRef.current.value = data.uf;
        })
        .catch((_) => {
          addressRef.current.value = "";
          districtRef.current.value = "";
          cityRef.current.value = "";
          stateRef.current.value = "";
        });
    }
  }, [cep]);

  // Trata os eventos disparados quando o usuário digita no campo do CEP
  function handleChange(e) {
    setCEP(cepRef.current.value);
  }

  return (
    <StyledInformationContainer>
      <StyledTabBar>
        <StyledTab
          onClick={() => setCurrentTab(tabs.BASIC_INFORMATION)}
          $active={currentTab === tabs.BASIC_INFORMATION}
        >
          Informações básicas
        </StyledTab>
        <StyledTab
          onClick={() => setCurrentTab(tabs.CONTACT_INFORMATION)}
          $active={currentTab === tabs.CONTACT_INFORMATION}
        >
          Contato
        </StyledTab>
      </StyledTabBar>
      <StyledBasicInformationContainer
        $hidden={currentTab !== tabs.BASIC_INFORMATION}
      >
        <StyledAvatar>
          <img src="assets/avatar.svg" alt="Foto de perfil do paciente" />
        </StyledAvatar>

        <StyledGrid>
          <StyledGridItem>
            <label htmlFor="patient">Paciente</label>
            <Input
              type="text"
              name="patient"
              id="patient"
              placeholder="Digite"
              defaultValue={data[identifier]?.basicInformation?.name || ""}
              ref={nameRef}
            />
          </StyledGridItem>
          <StyledGridItem>
            <label htmlFor="username">Apelido</label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Digite"
              defaultValue={data[identifier]?.basicInformation?.username || ""}
              ref={usernameRef}
            />
          </StyledGridItem>
          <StyledGridItem>
            <label htmlFor="nationality">Nacionalidade</label>
            <Input
              type="text"
              name="nationality"
              id="nationality"
              placeholder="Digite"
              defaultValue={
                data[identifier]?.basicInformation?.nationality || ""
              }
              ref={nationalityRef}
            />
          </StyledGridItem>
          <StyledGridItem>
            <label htmlFor="dateOfBirth">Nascimento</label>
            <Input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              min="1900-01-01"
              max={new Date().toISOString().split("T")[0]}
              defaultValue={
                data[identifier]?.basicInformation?.dateOfBirth
                  ? new Date(data[identifier].basicInformation.dateOfBirth)
                      .toISOString()
                      .split("T")[0]
                  : new Date().toISOString().split("T")[0]
              }
              ref={dateOfBirthRef}
            />
          </StyledGridItem>
          <StyledGridItem>
            <label htmlFor="cpf">CPF</label>
            <Input
              type="text"
              name="cpf"
              id="cpf"
              placeholder="Digite"
              defaultValue={data[identifier]?.basicInformation?.cpf || ""}
              ref={cpfRef}
            />
          </StyledGridItem>
          <StyledGridItem>
            <label htmlFor="rg">RG</label>
            <Input
              type="text"
              name="rg"
              id="rg"
              placeholder="Digite"
              defaultValue={data[identifier]?.basicInformation?.rg || ""}
              ref={rgRef}
            />
          </StyledGridItem>
          <StyledGridItem>
            <label htmlFor="gender">Gênero</label>
            <Select
              name="gender"
              id="gender"
              defaultValue={data[identifier]?.basicInformation?.gender || ""}
              ref={genderRef}
              options={[
                { value: "", label: "Sem filtro" },
                { value: "male", label: "Masculino" },
                { value: "female", label: "Feminino" },
                { value: "other", label: "Outro" },
                { value: "preferNotToAnswer", label: "Prefiro não responder" },
              ]}
            />
          </StyledGridItem>
          <StyledGridItem>
            <label htmlFor="maritalStatus">Estado civil</label>
            <Select
              name="maritalStatus"
              id="maritalStatus"
              defaultValue={
                data[identifier]?.basicInformation?.maritalStatus || ""
              }
              ref={maritalStatusRef}
              options={[
                { value: "", label: "Sem filtro" },
                { value: "single", label: "Solteiro(a)" },
                { value: "married", label: "Casado(a)" },
              ]}
            />
          </StyledGridItem>
          <StyledGridItem $fillRow={true}>
            <label htmlFor="observations">Observações adicionais</label>
            <Textarea
              name="observations"
              id="observations"
              cols="30"
              rows="10"
              placeholder="Digite"
              defaultValue={
                data[identifier]?.basicInformation?.observations || ""
              }
              ref={observationsRef}
            ></Textarea>
          </StyledGridItem>
        </StyledGrid>
      </StyledBasicInformationContainer>
      <StyledContactInformationContainer
        $hidden={currentTab !== tabs.CONTACT_INFORMATION}
      >
        <StyledGrid>
          <StyledGridItem>
            <label htmlFor="cep">CEP</label>
            <Input
              type="text"
              name="cep"
              id="cep"
              placeholder="Digite"
              defaultValue={data[identifier]?.contactInformation?.cep || ""}
              onChange={handleChange}
              ref={cepRef}
            />
          </StyledGridItem>
          <StyledGridItem>
            <label htmlFor="city">Cidade</label>
            <Input
              type="text"
              name="city"
              id="city"
              placeholder="Digite"
              defaultValue={data[identifier]?.contactInformation?.city || ""}
              ref={cityRef}
            />
          </StyledGridItem>
          <StyledGridItem>
            <label htmlFor="state">UF</label>
            <Input
              type="text"
              name="state"
              id="state"
              placeholder="Digite"
              defaultValue={data[identifier]?.contactInformation?.state || ""}
              ref={stateRef}
            />
          </StyledGridItem>
          <StyledGridItem>
            <label htmlFor="address">Endereço</label>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="Digite"
              defaultValue={data[identifier]?.contactInformation?.address || ""}
              ref={addressRef}
            />
          </StyledGridItem>
          <StyledGridItem>
            <label htmlFor="houseNumber">Número</label>
            <Input
              type="text"
              name="houseNumber"
              id="houseNumber"
              placeholder="Digite"
              defaultValue={
                data[identifier]?.contactInformation?.houseNumber || ""
              }
              ref={houseNumberRef}
            />
          </StyledGridItem>
          <StyledGridItem>
            <label htmlFor="district">Bairro</label>
            <Input
              type="text"
              name="district"
              id="district"
              placeholder="Digite"
              defaultValue={
                data[identifier]?.contactInformation?.district || ""
              }
              ref={districtRef}
            />
          </StyledGridItem>
          <StyledGridItem>
            <label htmlFor="details">Complemento</label>
            <Input
              type="text"
              name="details"
              id="details"
              placeholder="Digite"
              defaultValue={data[identifier]?.contactInformation?.details || ""}
              ref={detailsRef}
            />
          </StyledGridItem>
        </StyledGrid>
      </StyledContactInformationContainer>
      <StyledTabFooter>
        {currentTab === tabs.BASIC_INFORMATION && (
          <StyledButton
            variant="primary"
            color="blue"
            onClick={() => {
              setCurrentTab(tabs.CONTACT_INFORMATION);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Próximo
          </StyledButton>
        )}
        {currentTab === tabs.CONTACT_INFORMATION && (
          <StyledButton
            variant="primary"
            color="blue"
            onClick={() => {
              const newValue = {
                basicInformation: {
                  name: nameRef.current.value,
                  username: usernameRef.current.value,
                  nationality: nationalityRef.current.value,
                  dateOfBirth: dateOfBirthRef.current.value,
                  cpf: cpfRef.current.value,
                  rg: rgRef.current.value,
                  gender: genderRef.current.value,
                  maritalStatus: maritalStatusRef.current.value,
                  observations: observationsRef.current.value,
                },
                contactInformation: {
                  cep: cepRef.current.value,
                  city: cityRef.current.value,
                  state: stateRef.current.value,
                  address: addressRef.current.value,
                  houseNumber: houseNumberRef.current.value,
                  district: districtRef.current.value,
                  details: detailsRef.current.value,
                },
              };

              if (identifier === null) {
                dispatch({
                  type: "add",
                  data: newValue,
                });
              } else {
                dispatch({
                  type: "edit",
                  id: identifier,
                  data: newValue,
                });
              }
              onSave();
            }}
          >
            Salvar
          </StyledButton>
        )}
      </StyledTabFooter>
    </StyledInformationContainer>
  );
};

export default InformationModal;

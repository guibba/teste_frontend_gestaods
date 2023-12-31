import { createContext, useContext, useReducer } from "react";
import { initialData } from "./initialData";

// Context para fornecer acesso aos dados em todos os níveis da aplicação
export const DataContext = createContext(null);

// Context para fornecer acesso ao Reducer em todos os níveis da aplicação
export const DataDispatchContext = createContext(null);

// Engloba os componentes da aplicação para fornecer os Contexts
export function DataProvider({ children }) {
  const [data, dispatch] = useReducer(dataReducer, initialData);

  return (
    <DataContext.Provider value={data}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}

// Hook customizado para facilitar o acesso aos dados
export function useData() {
  return useContext(DataContext);
}

// Hook customizado para facilitar o acesso ao Reducer
export function useDataDispatch() {
  return useContext(DataDispatchContext);
}

// Função para auxiliar na cópia profunda (deep copy) dos objetos de mesmo formato que os dados
function clone(data) {
  const dataCopy = {};
  Object.entries(data).forEach(([key, value]) => {
    const valueCopy = {
      basicInformation: {
        name: value.basicInformation.name,
        username: value.basicInformation.username,
        nationality: value.basicInformation.nationality,
        dateOfBirth: value.basicInformation.dateOfBirth,
        cpf: value.basicInformation.cpf,
        rg: value.basicInformation.rg,
        gender: value.basicInformation.gender,
        maritalStatus: value.basicInformation.maritalStatus,
        observations: value.basicInformation.observations,
      },
      contactInformation: {
        cep: value.contactInformation.cep,
        city: value.contactInformation.city,
        state: value.contactInformation.state,
        address: value.contactInformation.address,
        houseNumber: value.contactInformation.houseNumber,
        district: value.contactInformation.district,
        details: value.contactInformation.details,
      },
    };
    dataCopy[key] = valueCopy;
  });

  return dataCopy;
}

// Reducer que recebe as ações a serem executadas sobre os dados
// Possui três ações: adicionar um dado (add), editar um dado (edit) e excluir um dado (delete)
export function dataReducer(data, action) {
  switch (action.type) {
    case "add": {
      const nextState = clone(data);

      const keys = Object.keys(data);
      const lastIndex = parseInt(keys[keys.length - 1]);
      const nextId = lastIndex + 1;

      nextState[nextId] = action.data;

      return nextState;
    }
    case "edit": {
      const nextState = clone(data);
      nextState[action.id] = action.data;

      return nextState;
    }
    case "delete": {
      const nextState = clone(data);
      delete nextState[action.id];

      return nextState;
    }
    default: {
      throw Error("Ação desconhecida: " + action.type);
    }
  }
}

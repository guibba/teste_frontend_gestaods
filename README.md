# Teste de Front-End GestãoDS

Projeto realizado durante o teste de Front-End da empresa GestãoDS.

## Instruções para executar o projeto localmente

### Requisitos

- **Git** (versão utilizada: `2.43.0`)
- **Node.js** (versão utilizada: `20.10.0`)
- **npm** (versão utilizada: `10.2.3`)

### Passos para executar o projeto localmente

Abra o terminal e execute o comando abaixo para clonar o repositório:

```
git clone https://github.com/guibba/teste_frontend_gestaods.git
```

Em seguida, navegue para o diretório do projeto com o comando:

```
cd teste_frontend_gestaods
```

3. Agora, para instalar todas as dependências, execute:

```
npm install
```

4. Depois que a instalação for finalizada, execute seguinte comando para iniciar o servidor de desenvolvimento:

```
npm start
```

5. Por último, após o servidor de desenvolvimento concluir a inicialização, navegue para o endereço [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar o projeto sendo executado.

## Estrutura do projeto

O projeto está separado em dois diretórios principais: `data` e `components`. No diretório `data` estão os dados iniciais para popular o estado local e a combinação **ContextAPI** + **useReducer** utilizada no gerenciamento de estado. Já o diretório `components`, o mais complexo, está dividido em 5 subdiretórios que serão detalhados a seguir.

### Subdiretório `icons`

Aqui estão os ícones utilizados pelos outros componentes. São componentes simples que foram colocados em arquivos separados apenas para deixar o projeto mais organizado. São eles:

- `ActionIcon`
- `AddIcon`
- `CloseIcon`
- `SearchIcon`
- `SortIcon`

### Subdiretório `basic`

Neste subdiretório estão os componentes básicos utilizados por toda a aplicação. São eles:

- `Button`
- `Input`
- `SearchInput`
- `Select`
- `Textarea`

São apenas versões estilizadas dos componentes convencionais.

### Subdiretório `menu`

Só há o componente `ActionMenu` aqui. Ele representa o menu que aparece quando o usuário interage com o botão da coluna `Ações` da tabela. Existem duas opções de ações, sendo a primeira `Editar` (edita os dados do paciente selecionado) e a segunda `Excluir` (exclui o paciente selecionado da lista).

### Subdiretório `layout`

Os dois componentes da página principal estão aqui: `Header` e `Table`.

- `Header` contém o título da página (Listagem de pacientes) e a barra de pesquisa.
- `Table` contém a tabela principal com um resumo das informações de cada paciente.

A barra de pesquisa é composta pelo campo `SearchInput` e pelo botão `Adicionar paciente`.

Adicionalmente, a tabela possui dois elementos de interatividade, o `nome do paciente` e o botão que exibe o `ActionMenu`.

### Subdiretório `modals`

No último subdiretório estão os modais. Um deles é o `DeleteModal`, que representa o diálogo de confirmação de exclusão e aparece quando o usuário clica na opção `Excluir` no menu `ActionMenu`.

Enquanto o `InformationModal`, por fim, é renderizado apenas quando o usuário clica no nome de um paciente na tabela ou quando seleciona a opção `Editar` no menu `ActionMenu`.

### Estilos globais

Todos os componentes citados foram estilizados utilizando regras e variáveis globais de estilização contidas no arquivo `globalStyle.js`, principalmente para seleção das cores.

## Bibliotecas utilizadas

- [React](https://react.dev/) (versão: `18.2.0`)
- [styled-components](https://styled-components.com/) (versão `6.1.3`)

## Outros

- [Create React App](https://github.com/facebook/create-react-app) (versão `5.0.1`)

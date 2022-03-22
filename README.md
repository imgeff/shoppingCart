# Boas vindas ao repositório do projeto ShoppingCart

---

## Habilidades

Nesse projeto, fui capaz de:

- Fazer requisições a uma API *(Application Programming Interface)* do Mercado Livre;
- Utilizar os meus conhecimentos sobre JavaScript, CSS e HTML;
- Trabalhar com funções assíncronas;
- Implementar testes unitários.

---## O que foi desenvolvido

Nesse projeto foi feito um carrinho de compras totalmente dinâmico! E o melhor: consumindo dados diretamente de uma API! a API do Mercado Livre para buscarmos produtos à venda.

### Protótipo do projeto

O projeto foi feito com base nos comportamentos e estilos do protótipo abaixo:

![Project Gif](./prototipo.gif)

---

## Desenvolvimento

## Como instalar localmente

1. Clone o repositório

- `git clone git@github.com:imgeff/shoppinCart.git`.
- Entre na pasta do repositório que você acabou de clonar:
  - `cd shoppingCart`

2. Instale as dependências e inicialize o projeto

- Instale as dependências:
  - `npm install`
- Inicialize o projeto:
  - Extensão Live Server - id da Extensão/Vscode: `ritwickdey.liveserver`

## Para contribuir

3. Crie uma branch a partir da branch `main`

- Verifique que você está na branch `main`
  - Exemplo: `git branch`
- Se não estiver, mude para a branch `main`
  - Exemplo: `git checkout main`
- Agora, crie uma branch onde você vai guardar os commits do seu projeto
  - Exemplo: `git checkout -b nome-da-sua-branch`

---

## ESLint e Stylelint

Para garantir a qualidade do código, foi utilizado neste projeto os linters `ESLint` e `Stylelint`.
Assim o código estará alinhado com as boas práticas de desenvolvimento, sendo mais legível e de fácil manutenção! Para rodá-los localmente no projeto, execute os comandos abaixo:

```bash
npm run lint
npm run lint:styles
```

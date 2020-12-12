# Troca de conhecimento

## Sumário

1. Sobre o projeto
2. Objetivo
3. Ferramentas
4. Instalações necessárias
5. Passos iniciais
6. Para acessar em produção
7. Documentação
    - Observações
    - Endpoints da nossa API
8. Visão geral
    - Arquitetura MVC
    - Estrutura do projeto
    - Fluxograma
9. Melhorias futuras
10. Agradecimentos

## Sobre o projeto

O Troca de Conhecimento é uma API criada com o intuito de ser consumida por uma plataforma onde os usuários possam marcar de trocar aulas de interesses em comum. Diferente de plataformas em que dá o *match* entre professor e aluno, para o usuário pagar por uma aula ou ser pago para ensinar, a ideia da plataforma é a **troca**.  Por exemplo, você precisa precisa de ajuda em inglês e sabe física, a plataforma é ideal para você encontrar algupem que queira aprender física e ensinar inglês; assim, todos saem ganhando.

## Objetivo

O objetivo do Troca de conhecimento se baseia em dois pilares: estimular o espírito de colaboração e estimular a cultura de aprendizado. No Pisa de 2018, o Brasil está abaixo da posição 50 em todas áreas de conhecimento (leitura, matemática e ciência), e mais de 50% da população tem renda mensal de 1 salário mínimo, então pagar por educação não é uma realidade brasileira *ainda*. Então nada melhor como pensarmos em iniciativas para melhorar este cenário.

## Ferramentas

As ferramentas até agora disponibilizadas na API são:

- Cadastrar usuário na plataforma.
- Login.
- Exibir, editar e excluir conta.
- Buscar pessoas que tenham domínio na área que você tem interesse em aprender.
- Buscar pessoas pelo nome de usuário
- Marcar aulas.
- Exibir, editar e excluir reuniões.

## Instalações necessárias

Se quiser rodar este projeto na sua máquina, você vai precisa ter as seguintes instalações:

- [NodeJS](https://nodejs.org/en/download/): Para desenvolver em Javascript a nível backend.

- [MongoDB](https://www.mongodb.com/): Para criar seu próprio banco de dados.

- [Robo3T](https://studio3t.com/download/): Para visualizar o banco de dados de maneira mais simples.

- [Git](https://git-scm.com/downloads): Para baixar este repositório localmente.

- Editor de código-fonte (alguns exemplos): 
    - [Visual Studio Code](https://code.visualstudio.com/)
    - [Atom](https://atom.io/)
    - [Brackets](http://brackets.io/)

- Gerenciador de pacotes para instalar dependências do projeto (alguns exemplos):
    - [NPM](https://www.npmjs.com/): já vem com o NodeJS
    - [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)

- Interface para testar os endpoints (alguns exemplos):
    - [Postman](https://www.postman.com/downloads/)
    - [Insomnia](https://insomnia.rest/download/)


## Passos iniciais

- Dar clone neste repositório por meio do comando:
   - `git clone https://github.com/Luana-Leticia/projeto-troca-de-conhecimento.git`

- Instalar as dependências necessárias do projeto:
   - `npm install `

- Criar arquivo `.env` na pasta raiz, como o modelo `.env.example`. Descrição das variáveis:
    - PORT: porta local para rodar o servidor.
    - MONGO_URI: url para o banco de dados configurado na sua máquina.
    - SECRET_KEY: chave aleatória para gerar o token.

- Criar uma conexão no Robo3T.

- Iniciar API (e pronto para teste):
    - `npm start`

## Para acessar em produção

- Já para acessar a API sem necessitar instalar o projeto na sua máquina, pode acessar os recursos por meio de uma interface pelo link:

    - https://trocaconhecimento.herokuapp.com/

E então só preencher com os recursos desejados.


## Documentação

### Observações: 

1. Todos endpoints serão da forma: **<https://trocaconhecimento.herokuapp.com>/recurso**.
Ou, se for localmente, será: **http://localhost:PORTA/recurso**

2. Os parâmetros das requisições são passados pela url da requisição e o corpo das requisições podem ser passados por formulário HTTP (no caso o x-www-urlencoded) ou JSON. É preciso configurar isso na interface (Postman, Insomnia ou outro). O formato de JSON será usado nos exemplos da documentação, mas a forma por formulário segue o padrão (exemplo do Postman):

![Corpo de requisição no Postman](assets/fig1.PNG)

Para todos os recursos, vai ser pedido a autenticação do usuário, que é feita por meio do token recebido ao criar conta ou entrar na conta. Deverá ser preenchido o campo de authorização no header, como abaixo, independentemente de usar JSON ou forms
.
![Corpo de cabeçalho no Postman](assets/fig2.PNG)

### Endpoints da nossa API:
 
| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| GET 	| `/` 	| Home 	|

- **Saída:**

```javascript
{
    "title": "Bem-vindo à plataforma Troca de conhecimento",
    "version": "1.0.0"
}
```

| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| POST 	| `/account/login` 	| Registrar novo usuário 	|

- Corpo  da requisição (JSON):

```javascript
{
    "username": "Luana Letícia",
    "email": "luana@fake.com",
    "password": "fake123",
    "passwordConfirmation": "fake123"
}
```

- **Saída:**

```javascript
{
    "message": "Conta cadastrada com sucesso.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDNhMzZmMjMzZGI2M2M5ODAzZmIyZCIsImlhdCI6MTYwNzcwNTQ1NSwiZXhwIjoxNjA3NzQ4NjU1fQ.JDUBrPKVD1SYVZRznjfLSZUgjhz_YFzLjcBI9yeBxeM"
}
```

| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| POST 	| `/login` 	| Entrada do usuário 	|

- Corpo  da requisição (JSON):

```javascript

{
    "email": "luana@fake.com,
    "password": "fake123"
}

```

- **Saída:**

```javascript
{
    "message": "Bem vindo.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDMyNTQ3NDAzZmZmMzJjY2M1Mzc1OCIsImlhdCI6MTYwNzY4ODE3NywiZXhwIjoxNjA3NzMxMzc3fQ.KdrtP7j7MaOBhFjv59TY9WR9UNuwhGseiEuA7NfDyyY"
}
```

| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| GET	| `/account/viewAccount` 	| Ver conta 	|

- Exemplos de endpoint:
    - https://trocaconhecimento.herokuapp.com/viewAccount
    - http://localhost:3000/account/viewAccount

- **Saída:**

```javascript
{
    "learningInterests": [],
    "domainKnowledges": [
        "alemao",
        "portugues"
    ],
    "_id": "5fd3a36f233db63c9803fb2d",
    "username": "Jostein Garden",
    "email": "jostein@fake.com",
    "timeAvailability": [],
    "createdAt": "2020-12-11T16:50:55.580Z",
    "updatedAt": "2020-12-11T16:50:55.580Z",
    "__v": 0
}
```

| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| GET 	| `/account/:username` 	| Buscar usuário por *nome* 	|
| GET 	| `/account/:interest` 	| Buscar usuário por *áreas de domínio* 	|

- Exemplos de endpoint:
    - https://trocaconhecimento.herokuapp.com/account/valentina
    - http://localhost:3000/account/valentina 


- **Saída:**

```javascript
[
    {
        "learningInterests": ['matematica', 'fisica'],
        "domainKnowledges": ['ingles', 'portugues'],
        "friends": [],
        "_id": "5fd26b1ace05020b280d8a55",
        "meetings": [],
        "username": "Valentina Silva",
        "createdAt": "2020-12-10T18:38:18.305Z",
        "updatedAt": "2020-12-10T18:38:18.305Z",
        "__v": 0
    },
    {
        "learningInterests": ['historia', 'arte'],
        "domainKnowledges": ['calculo', 'fisica'],
        "friends": [],
        "_id": "5fd27adc7a4b331df411d042",
        "meetings": [],
        "username": "Valentina Santos",
        "createdAt": "2020-12-10T19:45:33.007Z",
        "updatedAt": "2020-12-11T11:53:35.992Z",
        "__v": 0
    }
]
```


| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| UPDATE 	| `/account/edit` 	| Editar perfil de usuário	|

- Corpo  da requisição (exemplo)(JSON):

```javascript

{
    "nome": "Luana S.",
    "password": "otherPassword"
}

```

- Exemplos de endpoint:
    - https://trocaconhecimento.herokuapp.com/account/edit
    - http://localhost:3000/account/edit

- **Saída:**

```javascript
{
    "message": "Conta alterada com sucesso."
}
```

| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| DELETE 	| `/account/remove` 	| Deletar conta por *id* 	|


- Exemplos de endpoint:
    - https://trocaconhecimento.herokuapp.com/account/remove
    - http://localhost:3000/account/remove

- **Saída:**

```javascript
{
    "message": "Conta deletada com sucesso."
}
```


| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| POST 	| `/meetings/create/otherParticipant/:otherAccountId` 	| Marcar uma reunião com outro usuário	|

- Corpo  da requisição (exemplo)(JSON):

```javascript

{
    "date": "2020/12/01",
    "topic": "artes"
}

```

- Exemplos de endpoint:
    - https://trocaconhecimento.herokuapp.com/meetings/create/otherParticipant/5fd3a072e114ea269c36ffbf
    - http://localhost:3000/meetings/create/otherParticipant/5fd3a072e114ea269c36ffbf

- **Saída:**

```javascript
{
    "message": "Reunião marcada com sucesso."
}
```

| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| GET 	| `/meetings` 	| Buscar reuniões do usuário 	|


- Exemplos de endpoint:
    - https://trocaconhecimento.herokuapp.com/meetings
    - http://localhost:3000/meetings

- **Saída:**

```javascript
{
    "meetings": [
        {
            "participants": [
                {
                    "_id": "5fd3a058e114ea269c36ffbe",
                    "username": "luana leticia"
                },
                {
                    "_id": "5fd3a072e114ea269c36ffbf",
                    "username": "Vanessa Carolayne"
                }
            ],
            "_id": "5fd409f3a2cede238ce6c3d4",
            "date": "2020-12-16T03:00:00.000Z",
            "topic": "fisica",
            "createdAt": "2020-12-12T00:08:19.903Z",
            "updatedAt": "2020-12-12T00:08:19.903Z",
            "__v": 0
        }
    ]
}
```

| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| GET 	| `/meetings/topic/:topics` 	| Buscar reuniões do usuário por *tema*	|

- Exemplos de endpoint:
    - https://trocaconhecimento.herokuapp.com/meetings/topic/fisica
    - http://localhost:3000/meetings/topic/fisica

- **Saída:**

```javascript
{
    "meetings": [
        {
            "participants": [
                {
                    "_id": "5fd3a058e114ea269c36ffbe",
                    "username": "luana leticia"
                },
                {
                    "_id": "5fd3a072e114ea269c36ffbf",
                    "username": "Vanessa Carolayne"
                }
            ],
            "_id": "5fd409f3a2cede238ce6c3d4",
            "date": "2020-12-16T03:00:00.000Z",
            "topic": "fisica",
            "createdAt": "2020-12-12T00:08:19.903Z",
            "updatedAt": "2020-12-12T00:08:19.903Z",
            "__v": 0
        }
    ]
}
```

| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| UPDATE 	| `meetings/edit/:meetingId` 	| Editar reunião por id 	|

- Exemplos de endpoint:
    - https://trocaconhecimento.herokuapp.com/meetings/edit/:meetingId
    - http://localhost:3000/meetings/edit/:meetingId

- **Saída:**

```javascript
{
    "message": "Reunião editada com sucesso."
}
```

| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| DELETE 	| `meetings/remove/:meetingId` 	| Deletar reunião por id 	|

- Exemplos de endpoint:
    - https://trocaconhecimento.herokuapp.com/meetings/remove/:meetingId
    - http://localhost:3000/meetings/remove/:meetingId

- **Saída:**

```javascript
{
    "message": "Reunião deletada com sucesso."
}
```


## Visão geral

### Arquitetura MVC

O projeto segue o padrão de arquitetura MVC, como se segue abaixo. As views não estão presentes pois não temos front ainda, que virá a ser uma melhoria futura.

```bash
\--📂 PROJETO-TROCA-DE-CONHECIMENTO
		 |   .gitignore
		 |   package-lock.json
		 |   package.json
         |   .env
         |   .env_example
         |   README.md
	     |   **server.js**
            \--📂 assets
			\--📂 node_modules
			\--📂src
			    |   **app.js**
                |
			    📂---configs
			    |       **database.js**
			    |
			    📂---controllers
			    |       **accountController.js**
                |       **meetingController.js**
                |
                📂---helpers
			    |       **generateToken.js**
			    |
                📂---middlewares
			    |       **accountAuth.js**
                |
			    📂---models
			    |       **accountSchema.js**
				|       **meetingSchema.js**
			    |
			    📂---routes
			    |       **accountRoute.js**
                |       **meetingRoute.js**
                |       **index.js**
									
```

### Estrutura do projeto

A estrutura do projeto segue abaixo. Foi seguido o modelo de arquitetura API RESTFUL, com algumas modificações.

![Estrutura do projeto](assets/estrutura-do-projeto.png)

### Fluxograma

O mapeamento dos recursos da nossa API está no fluxograma abaixo. Você pode observar que alguns recursos não foram disponibilizados ainda, mas o objetivo é dar continuidade ao projeto. As processos em *verde* foram construídos e devem ser aprimorados. Os demais deverão ser implementados.

![Fluxograma](assets/fluxograma.png)

## Melhorias futuras

Melhorias que serão implementadas em breve:

- Possibilitar chats, convites.
- Aprimorar mecanismo de busca.
- Aprimorar autenticação.
- Front.

## Agradecimentos

Gratidão a todos os organizadores do [{Reprograma}](https://github.com/reprograma), por proporcionar um crescimento de aprendizado e pessoal. A todas alunas, pelo espírito de colaboração e união que foi passado em todas as aulas.
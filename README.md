# Troca de conhecimento

## O que é

É uma rede onde os usuários podem marcar de trocar aulas de interesses específicos. Por exemplo, você precisa aprender inglês e sabe física, o aplicativo te ajudaria a encontrar alguém que sabe inglês e quer aprender física.

## Objetivo

Estimular o espírito de colaboração e aprendizado.

## Documentação

Recursos disponíveis na nossa API:
 
- Recursos para cadastrar e entrar na plataforma:

| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| POST 	| `/cadastrar` 	| Registrar novo usuário 	|
| POST 	| `/login` 	| Entrada do usuário 	|

- Recurso para buscar perfis de usuários:

| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| GET 	| `/perfil/:id` 	| Buscar perfil por *id* 	|
| GET 	| `/perfil/:nome` 	| Buscar perfil por *nome* 	|

Para os dois métodos a saída deve ser:

(SAÍDA)

- Para atualizar o perfil: 

| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| UPDATE 	| `/perfil/:id` 	| Editar perfil por *id* 	|

Para o método a saída deve ser:

(SAÍDA)

Para deletar perfil:

| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| DELETE 	| `/perfil/:id` 	| Deletar perfil por *id* 	|

- Para marcar uma nova reunião: 

| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| POST 	| `/reuniao` 	| Criar reunião 	|

A saída deve ser: 

(SAÍDA)

| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| GET 	| `/perfil/reuniao/:id` 	| Buscar reunião por id 	|

A saída deve ser: 

(SAÍDA)

- Para editar uma reunião: 

| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| UPDATE 	| `/reuniao/:id` 	| Editar reunião por id 	|


A saída deve ser: 

(SAÍDA)


- Para deletar uma reunião: 

| Método 	| Recurso 	| Descrição 	|
|-	|-	|-	|
| DELETE 	| `/reuniao/:id` 	| Deletar reunião por id 	|

A saída deve ser: 

(SAÍDA)


### Dependências

1. O que é necessário ter na sua máquina se for usar o projeto localmente?

[NodeJS](https://nodejs.org/en/download/)

[MongoDB](https://www.mongodb.com/)

2. Comandos a executar:

- Instalar dependências

    `npm install`

- Iniciar API

    `npm start`

- Acessar

    `localhost:3000`


## Visão geral

![Estrutura do projeto](assets/estrutura-do-projeto.png)

![Fluxograma](assets/fluxograma.png)
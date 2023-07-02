## Description

Guia para inicializar a aplicacao. O projeto foi construido com postgres, nestjs, typescript, prisma e docker

## Inicializaçao do docker

```bash
$ dentro da pasta "quikdev" abra o terminal e digite o comando: [chmod +x .docker/entrypoint.sh]

$ dentro da mesma pasta "quikdev" digite o comando: [docker-compose up]

$ espera a aplicaçao criar o DB, instalar os pacotes e inicializar, isso pode demorar alguns minutos

$ quando a aplicaçao estiver pronta a seguinte linha aparecera no terminal: Nest application successfully started

$ em http://localhost:3000/api/v1 estara a documentaçao com as rotas da API com suas funcionalidades

$ # OBS: Se o ambiente de execuçao for com sistema windows, talvez seja necessario poucas alteraçoes no arquivo docker-compose.yaml. Caso a execuçao for com sistema windows fico a disposiçao para enviar um novo arquivo com atualizaçao do docker compose 
```

## Informaçoes sobre a utilizaçao da aplicaçao

```bash
# Cadastro de usuarios
$ A rota de signup cria um usuario e retorna o token para autenticaçao

$ A rota de signin utiliza email e senha de um usuario cadastrado, para gerar o token de autenticaçao

$ Para autenticar o usuario, basta inserir o token gerado em signup ou signin no campo que abrira ao clicar em authorize
no canto superior direito da tela


# Criaçao de posts
$ Para criar, atualizar, inserir imagem ou deletar um post, o usuario deve estar autenticado

$ Somente o usuario que criou o post podera atualiza-lo ou deleta-lo

$ Rota de selecionar post por id adiciona visualizaçoes ao post

$ Rota para inserir imagem no post, aceita qualquer tipo de imagem, mas nao outros tipos de arquivos.
Ao inserir uma imagem no post, a imagem sera salva na pasta storage, que esta dentro da pasta quikdev-app.
Nome da imagem é definido com email do usuario e id do post, para evitar mais de uma imagem por post.

$ #OBS: Rota para inserir imagens foi desenvolvida em conjunto com toda a aplicaçao como monolito. Mas poderia facilmente ser desenvolvido um microserviço para realizar upload de imagens implementando um sistema de mensageria com rabbitmq ou kafka, para enviar a url da imagem armazenada na nuvem por exemplo S3. Caso seja necessario fico a disposiçao para implementar.


# Comentarios
$ Para criar, atualizar, ou deletar um comentario, o usuario deve estar autenticado

$ Comentarios seguem as regras de negocio do enunciado

```

- Author - [Ruhan Correa Soares]()
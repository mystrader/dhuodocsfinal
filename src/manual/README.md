# Instalação On Premise


# DHUO API v0.1.0

## Introdução
Este manual contém instruções e requisitos para a instalação do DHUO API. A visão macro dos componentes do DHUO API pode ser vista abaixo:

![Dhuo API Visão Macro](https://storage.googleapis.com/strapi_prd/dhuo_api_macro_142f5c8cf1/dhuo_api_macro_142f5c8cf1.png)


## Módulos e versões
Os componentes dhuo e suas versões são listados abaixo:

| módulo                       | versão |
|------------------------------|--------|
| apimanagement-accountservice | v0.1.0 |
| apimanagement-devportal-web  | v0.1.0 |
| apimanagement-healthcheck    | v0.1.0 |
| apimanagement-product        | v0.1.0 |
| apimanagement-schedules      | v0.1.0 |
| apimanagement-service        | v0.1.0 |
| apimanagement-workflow       | v0.1.0 |
| apione-kong                  | v0.1.0 |
| dhuo-strapi                  | v0.1.0 |
| gdhuo                        | v0.1.0 |
| viaapi-service               | v0.1.0 |
| viaapi-web                   | v0.1.0 |

## Repositórios e acessos
As credenciais de acesso ao docker registry e aos arquivos de template devem ser solicitados à equipe dhuo.

|                           | url                                                |
|---------------------------|----------------------------------------------------|
| docker registry           | https://registry-dhuo.br.engineering               |
| templates de configuração | https://gitlab.engdb.com.br/apione/dhuoapi-install |


## Pré-requisitos

### Infraestrutura
Os requisitos recomendados para os nós do cluster kubernetes são:

| requisito      |
|----------------|
| 10vCPU         |
| 16GB de RAM    |
| 150GB de disco |

As versões homologadas dos componentes de infraestrutura necessários para a instalação do dhuo são:

|            | versão  |
|------------|---------|
| grafana    | 7.5.0   |
| kafka      | 2.7.0   |
| kubernetes | v1.20.x |
| mongodb    | 4.6.0   |

### Ferramentas
|        | descrição                                                                                                                                       |
|--------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| deck   | usada na configuração dos serviços de back-end do dhuo, é utilizada a ferramenta **decK**. Ela pode ser obtida em https://github.com/Kong/deck. |
| gsutil | usada para configuração dos buckets no google cloud storage.                                                                                    |

### Endereços de domínio
É necessário possuir o cadastro de domínio para expor o acesso aos seguintes componentes:

| módulo                      | descrição                                                          |
|-----------------------------|--------------------------------------------------------------------|
| apimanagement-devportal-web | developer portal                                                   |
| apione-kong                 | camada de exposição dos serviços back-end consumidos pelos portais |
| dhuo-strapi                 | cms para customização do developer portal                          |
| viaapi-web                  | api manager, admin portal                                          |

### Google storage buckets
É necessário possuir dois storage buckets para as seguintes finalidades:

| bucket   | função                                                                                  |
|----------|-----------------------------------------------------------------------------------------|
| dhuo-cms | armazenamento de imagens utilizadas pelo cms e exibidas no developer portal             |
| dhuo-b2c | armazenamento dos assets utilizados na customização do front-end de SSO do Azure AD B2C |

Ambos os buckets devem possuir acesso público. Para isso, adicionar uma permission com as seguintes características:

- **Principal:** allUsers
- **Role:** Storage Object Viewer

Deve ser habilitado o CORS no bucket dhuo-b2c. Para isso utilize a ferramenta `gsutil`para carregar as configurações de cors presentes no diretório [/gs-buckets](https://gitlab.engdb.com.br/apione/dhuoapi-install/-/tree/master/gs-buckets) do repositório de templates de configuração.

Exemplo:
```
gsutil cors set cors-config.json gs://dhuo-b2c
```

### Google reCAPTCHA
Para logins no developer portal é utilizado o recaptcha. É necessário gerar um par de chaves de configuração do recaptcha do google.

1. Acessar a url https://www.google.com/recaptcha/admin
2. Registrar um novo site correspondente ao dhuo com as seguintes configurações:
**Tipo de reCAPTCHA**: reCAPTCHA v2; Caixa de seleção "Não sou um robô"
**Domínios:** inserir dois domínios: b2clogin.com; domínio do developer portal
3. Obter site key e secret key que serão utilizados nas configurações do **AD B2C** e do módulo dhuo **apimanagement-accountservice**.

## Azure AD B2C
Devido ao fato da configuração do AD B2C ser realizada majoritariamente somente no setup inicial do ambiente, as instruções de provisionamento encontram-se em um manual anexo a esse. Um guia visual complementar também está disponível no repositório de templates no diretório [/_visual-guides](https://gitlab.engdb.com.br/apione/dhuoapi-install/-/tree/master/_visual-guides).

**Atenção:** algumas propriedades geradas durante a instalação do AD B2C são utilizadas em configurações dos outros módulos dhuo e referenciadas neste manual.

## Instalação dhuo

### Back-ends
Passos referentes aos módulos:

| módulo dhuo                  |
|------------------------------|
| apimanagement-accountservice |
| apimanagement-healthcheck    |
| apimanagement-product        |
| apimanagement-schedules      |
| apimanagement-service        |
| apimanagement-workflow       |
| viaapi-service               |

Para cada módulo:
1. Criar um arquivo **application.properties** a partir do modelo presente no diretório [/config](https://gitlab.engdb.com.br/apione/dhuoapi-install/-/tree/master/config) do repositório de templates de configuração do módulo em questão.
2. Configurar as propriedades customizadas (se presentes no arquivo do módulo em questão) conforme relação abaixo:

| propriedade                              | descrição                                                                                                                                                                                                          | exemplo                                  |
|------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|
| app.msgraph.base-identifier-uris         | domínio do tenant b2c em formato https://{dominio}. Vide propriedade [b2cTenant.PrimaryDomain](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure)**[1]**                                      |                                          |
| app.msgraph.client-id                    | client ID do app msgraph configurado no tenant do AD B2C. Vide propriedade [b2cTenant.app.MsGraph.clientId](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure)**[1]**                         |                                          |
| app.msgraph.internal-issuer              | domínio do tenant b2c em formato https://{dominio}. Vide propriedade [b2cTenant.PrimaryDomain](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure)**[1]**                                      |                                          |
| app.msgraph.secret                       | client secret  do app msgraph configurado no tenant do AD B2C. Vide propriedade [b2cTenant.app.MsGraph.secret](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure)**[1]**                      |                                          |
| app.msgraph.service-principal-id         | Object ID da enterprise application associada ao app apione. Vide propriedade [b2cTenant.app.Apione.EnterpriseApplication.objectId](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure)**[1]** |                                          |
| app.msgraph.tenant                       | Tenant ID do tenant b2c. Vide propriedade [b2cTenant.TenantId](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure)**[1]**                                                                      |                                          |
| app.recaptcha.secret                     | secret key obtida na configuração do Google reCAPTCHA **[1]**                                                                                                                                                      |                                          |
| logging.file                             | path para o arquivo de armazenamento de logs                                                                                                                                                                       | INFO                                     |
| logging.level.org.apache.kafka           | nível de logs para libs kafka                                                                                                                                                                                      | WARN                                     |
| logging.level.org.hibernate              | nível de logs do hibernate                                                                                                                                                                                         | OFF                                      |
| logging.level.org.springframework        | nível de logs gerados pelo spring                                                                                                                                                                                  | ERROR                                    |
| logging.level.root                       | nível de logs gerais da aplicação                                                                                                                                                                                  | ERROR                                    |
| product.apiManagerUrl                    | url da aplicação apimanagement-service para comunicação interna entre módulos **[2]**                                                                                                                              | http://apimanagement-service.dhuo:8080   |
| product.devPortalUrl                     | url da aplicação viaapi-service para comunicação interna entre módulos **[2]**                                                                                                                                     | http://viaapi-service.dhuo:8080          |
| spring.cloud.stream.kafka.binder.brokers | url para conexão ao broker kafka                                                                                                                                                                                   | dhuo-kafka:9092                          |
| spring.data.mongodb.uri                  | string de conexão ao mongodb **[3]**                                                                                                                                                                               | mongodb://root:123@dhuo-mongo:27017/dhuo |

[1] configuração presente apenas no módulo **apimanagement-accountservice**.
[2] configuração presente apenas no módulo **apimanagement-product**.
[3] recomenda-se utilizar o mesmo banco (database) compartilhado entre os módulos do dhuo. Em futuros releases do produto os módulos deverão ser unificados.

3. Criar secret do tipo Opaque com nome do módulo a partir do arquivo application.properties. Exemplo:
```
kubectl create secret generic <módulo dhuo> --from-file=application.properties -n <namespace>
```
4. Configurar um arquivo **.env** a partir do modelo presente no repositório de templates em [/config/java_opts](https://gitlab.engdb.com.br/apione/dhuoapi-install/-/tree/master/config/java_opts). Ele contém a variável de ambiente JAVA_OPTS e as configurações de inicialização de jvm. **Observação:** a config -Dspring.config.location é **obrigatória** na configuração de JAVA_OPTS e deve corresponder ao caminho configurado no deployment onde será montado o volume contendo o application.properties criado no configmap do passo anterior.

5. Criar configmap a partir do arquivo .env. **Observação:** diferente da secret, esse configmap será usado pelo deployment do módulo como conjunto de variáveis de ambiente ao invés de ser mapeada como arquivo. Exemplo:

```sh
kubectl create configmap <módulo dhuo>-vars -n <namespace> --from-env-file=.env
```

6. Configurar arquivos template de objetos kubernetes (deployment.yaml, service.yaml, hpa.yaml) a partir dos modelos presentes no repositório de templates de configuração do módulo em questão no diretório [/k8s](https://gitlab.engdb.com.br/apione/dhuoapi-install/-/tree/master/k8s). **Observação:** tais arquivos são modelos de referência e podem ser customizados com outras propriedades além das existentes conforme necessidade.

7. Realizar deploy dos objetos kubernetes no cluster a partir dos arquivos de configuração do passo anterior. Exemplo:

```sh
kubectl apply -f <diretório>
```

Passos referentes aos módulos


| módulo dhuo |
|-------------|
| gdhuo       |


1. Criar e configurar um arquivo **.env** a partir do modelo presente no diretório [/config](https://gitlab.engdb.com.br/apione/dhuoapi-install/-/tree/master/config) do repositório de templates de configuração do módulo em questão. As variáveis configuráveis estão relacionadas abaixo:

| variável         | descrição                                                                                     | exemplo                                       |
|------------------|-----------------------------------------------------------------------------------------------|-----------------------------------------------|
| MONGODB_DATABASE | database do dhuo no mongodb                                                                   | dhuo                                          |
| MONGODB_OPTIONS  | Opções extras de configuração da conexão ao mongodb.                                          | authSource=admin&gssapiServiceName=mongodb    |
| MONGODB_PASSWORD | senha do usuário de acesso ao mongodb                                                         | 123                                           |
| MONGODB_URI      | hosts de conexão ao mongodb no formato host:port. Caso haja mais de um, separar por vírgulas. | dhuo-mongo-1:27017,dhuo-mongo-mongodb-2:27017 |
| MONGODB_USERNAME | usuário de conexão ao mongodb                                                                 | root                                          |

2. Criar secret do tipo Opaque com nome do módulo a partir do arquivo .env. **Observação:** diferente dos módulos anteriores, essa secret será usada pelo deployment do módulo como conjunto de variáveis de ambiente ao invés de ser mapeada como arquivo. Exemplo:

```sh
kubectl create secret generic gdhuo --from-env-file=.env -n <namespace>
```

3. Configurar arquivos template de objetos kubernetes (deployment.yaml, service.yaml, hpa.yaml) a partir dos modelos presentes no repositório de templates de configuração do módulo em questão no diretório [/k8s](https://gitlab.engdb.com.br/apione/dhuoapi-install/-/tree/master/k8s). **Observação:** tais arquivos são modelos de referência e podem ser customizados com outras propriedades além das existentes conforme necessidade.

4. Realizar deploy dos objetos kubernetes no cluster a partir dos arquivos de configuração do passo anterior. Exemplo:

```sh
kubectl apply -f <diretório>
```

### Front-ends
Passos referentes aos módulos

| módulo dhuo                 |
|-----------------------------|
| apimanagement-devportal-web |
| viaapi-web                  |

1. Criar e configurar um arquivo **.env** a partir do modelo presente no diretório [/config](https://gitlab.engdb.com.br/apione/dhuoapi-install/-/tree/master/config) do repositório de templates de configuração do módulo em questão. As variáveis configuráveis estão relacionadas abaixo:

**apimanagement-devportal-web**
| variável                               | descrição                                                                                                                                                                                                                                | exemplo                                                                 |
|----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| AUTH_CLIENT_ID                         | o Client ID do app apimanagement-devportal-web configurado no tenant b2c. Vide propriedade [b2cTenant.app.Devportalweb.clientId](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure)                                 | 11111111-1111-1111-1111-111111111111                                    |
| AUTH_CLIENT_SECRET                     | deixar vazio                                                                                                                                                                                                                             |                                                                         |
| AUTH_SCOPES                            | url do tenant b2c para acesso aos escopos no formato https://{tenant b2c}.onmicrosoft.com/apione/access offline_access openid. Vide propriedade [b2cTenant.Name](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure) | https://b2c-exmaple.onmicrosoft.com/apione/access offline_access openid |
| AUTH_TENANT_NAME                       | nome do tenant b2c. Vide propriedade [b2cTenant.Name](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure)                                                                                                            | b2c-example                                                             |
| IMAGES_DOMAIN                          | url de acesso ao bucket do cms no google storage                                                                                                                                                                                         | storage.googleapis.com/dhuo-cms                                         |
| NEXT_PUBLIC_APIMANAGEMENT_API_URL      | url de acesso ao back-end da aplicação dhuo no formato {host}/it-management/                                                                                                                                                             | https://gateway-dhuo.br.engineering/it-management/                      |
| NEXT_PUBLIC_AUTH_PASS_CHANGE           | policy do ad b2c. Valor fixo.                                                                                                                                                                                                            | B2C_1A_VV_PassChange                                                    |
| NEXT_PUBLIC_AUTH_PROFILE_EDIT_PROVIDER | policy do ad b2c. Valor fixo.                                                                                                                                                                                                            | B2C_1A_VV_ProfileEdit-Native                                            |
| NEXT_PUBLIC_AUTH_SU_PROVIDER           | policy do ad b2c. Valor fixo.                                                                                                                                                                                                            | B2C_1A_VV_EXT_SU                                                        |
| NEXT_PUBLIC_AUTH_SUSI_PROVIDER         | policy do ad b2c. Valor fixo.                                                                                                                                                                                                            | B2C_1A_VV_EXT_SUSI                                                      |
| NEXT_PUBLIC_ENVIRONMENT                | valor fixo                                                                                                                                                                                                                               | SIT                                                                     |
| NEXT_PUBLIC_PORTAL_NAME                | nome do developer portal a ser criado no dhuo                                                                                                                                                                                            | marketplace                                                             |
| NEXT_PUBLIC_STRAPI_API_URL             | url de acesso ao cms.                                                                                                                                                                                                                    | https://strapi-dhuo.com.br/                                             |
| NEXTAUTH_URL                           | url do developer portal                                                                                                                                                                                                                  | https://devportal-dhuo.br.engineering                                   |

**viaapi-web**
| variável               | descrição                                                                                                                                                                                                                                   | exemplo                                                                     |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| API_URL                | url de acesso ao back-end da aplicação dhuo no formato {host}/it-management.                                                                                                                                                                | https://gateway-dhuo.com.br/it-management                                   |
| AUTHORITY              | url da policy de login do ad b2c no formato https://{tenant b2c}.b2clogin.com/{tenant b2c}.onmicrosoft.com/B2C_1A_VV_SUSI (fixo). Vide propriedade [b2cTenant.Name](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure) | https://b2c-example.b2clogin.com/b2c-example.onmicrosoft.com/B2C_1A_VV_SUSI |
| CLIENT_ID              | o Client ID do app viaapi-web configurado no tenant b2c. Vide propriedade [b2cTenant.app.Viaapiweb.clientId](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure)                                                        | 11111111-1111-1111-1111-111111111111                                        |
| DEFAULT_LANGUAGE       | idioma padrão do portal admin. Valores possíveis pt-BR, en-US                                                                                                                                                                               | pt-BR                                                                       |
| KNOWN_AUTHORITIES      | domínio do ad b2c no formato {tenant b2c}.b2clogin.com. Vide propriedade [b2cTenant.Name](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure)                                                                           | b2c-example.b2clogin.com                                                    |
| POSTLOGOUT_REDIRECTURI | url de redirecionamento após logout do portal.                                                                                                                                                                                              | /                                                                           |
| SCOPES                 | url para acesso aos escopos da aplicação no formato https://{tenant b2c}.onmicrosoft.com/apione/access. Vide propriedade [b2cTenant.Name](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure)                           | https://kenissonb2c.onmicrosoft.com/apione/access                           |

2. Criar configmap do tipo Opaque com nome do módulo a partir do arquivo .env. Exemplo:

```sh
kubectl create configmap generic <módulo dhuo> --from-env-file=.env -n <namespace>
```

3. Configurar arquivos template de objetos kubernetes (deployment.yaml, service.yaml, hpa.yaml) a partir dos modelos presentes no repositório de templates de configuração do módulo em questão no diretório [/k8s](https://gitlab.engdb.com.br/apione/dhuoapi-install/-/tree/master/k8s). **Observação:** tais arquivos são modelos de referência e podem ser customizados com outras propriedades além das existentes conforme necessidade.

4. Realizar deploy dos objetos kubernetes no cluster a partir dos arquivos de configuração do passo anterior. Exemplo:

```
kubectl apply -f <diretório>
```

### CMS (dhuo-strapi)
1. Criar e configurar um arquivo **.env** a partir do modelo presente no diretório [/config](https://gitlab.engdb.com.br/apione/dhuoapi-install/-/tree/master/config) do repositório de templates de configuração do módulo em questão. As variáveis configuráveis estão relacionadas abaixo:

| variável             | descrição                                                                | exemplo                                 |
|----------------------|--------------------------------------------------------------------------|-----------------------------------------|
| DATABASE_NAME        | database do cms no mongodb                                               | strapi                                  |
| DATABASE_HOST        | hosts de conexão ao mongodb. Caso haja mais de um, separar por vírgulas. | dhuo-mongo-1,dhuo-mongo-mongodb-2       |
| DATABASE_PASSWORD    | senha do usuário de acesso ao mongodb                                    | 123                                     |
| DATABASE_PORT        | porta da conexão com o mongodb                                           | 27017                                   |
| DATABASE_USERNAME    | usuário de conexão ao mongodb                                            | root                                    |
| STORAGE_ACCOUNT_NAME | nome do bucket do google storage a ser utilizado pelo cms                | dhuo-cms                                |
| STORAGE_BASE_URL     | url de acesso ao bucket do cms no google storage                         | https://storage.googleapis.com/dhuo-cms |



2. Criar secret do tipo Opaque com nome do módulo a partir do arquivo .env. Exemplo:

```sh
kubectl create secret generic dhuo-strapi --from-env-file=.env -n <namespace>
```

3. Configurar arquivos template de objetos kubernetes (deployment.yaml, service.yaml, hpa.yaml) a partir dos modelos presentes no repositório de templates de configuração do módulo em questão no diretório [/k8s](https://gitlab.engdb.com.br/apione/dhuoapi-install/-/tree/master/k8s). **Observação:** tais arquivos são modelos de referência e podem ser customizados com outras propriedades além das existentes conforme necessidade.

4. Realizar deploy dos objetos kubernetes no cluster a partir dos arquivos de configuração do passo anterior. Exemplo:

```sh
kubectl apply -f <diretório>
```

### Kong (back-end gateway)

**Gerar JWT**

É necessário gerar uma chave rsa no formato pem a partir do jwk gerado no AD B2C. Para isso:

1. Acessar a configuração de openid gerada pelo tenant b2c em https://{tenant b2c}.b2clogin.com/{tenant b2c}.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1A_VV_SUSI
2. Acessar a url definida na propriedade **jwks_uri**
3. Gerar um arquivo .pem a partir do jwt definido na propriedade **keys**.

Ferramentas para conversão jwk-pem:
  - https://github.com/lffranca/openid
  - https://www.npmjs.com/package/jwk-to-pem

**Gerar Basic Auth**

Essas propriedades são cadastradas no AD B2C. Vide propriedades [b2cTenant.PolicyKeys.RestApiUsername e b2cTenant.PolicyKeys.RestApiPassword](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure).

**Deploy kong**

Para configuração dos serviços de back-end do dhuo,
1. Utilize a versão atual do módulo `apione-kong`
2. Configure os certificados e consumers do kong presentes no arquivo , conforme relação a abaixo:

| propriedade                                  | descrição                                                                  |
|----------------------------------------------|----------------------------------------------------------------------------|
| consumers > jwt_secrets > key                | valor da propriedade **kid** obtida no passo Gerar JWT                     |
| consumers > jwt_secrets > rsa_public_key     | arquivo .pem gerado a partir do jwk no passo Gerar JWT                     |
| consumers > basicauth_credentials > password | propriedade b2cTenant.PolicyKeys.RestApiPassword no passo Gerar Basic Auth |
| consumers > basicauth_credentials > username | propriedade b2cTenant.PolicyKeys.RestApiUsername no passo Gerar Basic Auth |


3. Caso necessário, altere o valor do campo **host** de cada service no arquivo dhuo.yaml presente no diretório [/kong](https://gitlab.engdb.com.br/apione/dhuoapi-install/-/tree/master/kong) para corresponder ao host de instalação de cada módulo.

4. Utilizando a ferramenta `decK`, realize a importação das configurações do arquivo dhuo.yaml para a instância kong onde os serviços do dhuo serão expostos.

Exemplo:

```sh
deck sync --kong-addr <konghost>:8001 --state dhuo.yaml 
```

### Setup strapi
Após deploy do módulo **dhuo-strapi**, 
1. Realize o primeiro acesso à intereface do strapi em {url-strapi}/admin
2. Cadastre o usuário administrador
3. Configure as permissões de acesso à api do cms acessando: Settings > USERS & PERMISSIONS PLUGIN > Roles

<iframe src='//gifs.com/embed/K8YLmM' frameborder='0' scrolling='no' width='800px' height='600px' style='-webkit-backface-visibility: hidden;-webkit-transform: scale(1);' ></iframe>

4. Editar a role **Public**
5. Ativar as permissões conforme tabelas abaixo:
6. Após selecionar as permissões, clicar no botão salvar, no topo da página

**APPLICATION**

| Categoria      | Permissões           |
|----------------|----------------------|
| FONT           | count, find, findone |
| PORTAL         | count, find, findone |
| PORTAL-CATALOG | count, find, findone |
| PORTAL-HOME    | count, find, findone |
| PORTAL-MENU    | count, find, findone |
| PORTAL-PAGE    | count, find, findone |
| PORTAL-THEME   | count, find, findone |
| STYLE          | count, find, findone |

**CONTENT-MANAGER**

| Categoria        | Permissões                                     |
|------------------|------------------------------------------------|
| COLLECTION-TYPES | findone, find, previewmanyrelations            |
| COMPONENTS       | findcomponentconfiguration, findcomponents     |
| CONTENT-TYPES    | findcontenttypeconfiguration, findcontenttypes |
| RELATIONS        | find                                           |
| SINGLE-TYPES     | find                                           |
| UID              | checkuidavailability                           |

**CONTENT-TYPE-BUILDER**

| Categoria    | Permissões                      |
|--------------|---------------------------------|
| BUILDER      | getreservednames                |
| COMPONENTS   | getcomponent, getcomponents     |
| CONNECTIONS  | getconnections                  |
| CONTENTTYPES | getcontenttype, getcontenttypes |

**UPLOAD**

| Categoria | Permissões                   |
|-----------|------------------------------|
| UPLOAD    | count, find, findone, search |

### Setup mongodb

Após deploy dos módulos de back-end do dhuo

1. Acessar a instância do mongodb 
2. Realizar a carga inicial de dados na collection **environment** da database dhuo, com os dados do arquivo **environment.json** presente em [/mongodb](https://gitlab.engdb.com.br/apione/dhuoapi-install/-/tree/master/mongodb).

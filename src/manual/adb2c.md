# AD B2C

[[toc]]

O DHUO utiliza o AD B2C para gerenciar o registro e autenticação de usuários para acesso aos portais e APIs do produto.

O AD B2C permite a criação de políticas customizadas para o fluxos de usuário. Essas políticas são definidas nos XMLs baseados na documentação oficial.

## Pre-requisitos
 - VSCode (https://code.visualstudio.com)
 - Azure AD B2C extension for VS Code (https://marketplace.visualstudio.com/items?itemName=AzureADB2CTools.aadb2c)
 - Azure subscription para provisionamento do Azure AD B2C (https://docs.microsoft.com/pt-br/azure/active-directory-b2c/overview)

## Provisionamento Tenant B2C
Provisionar um tenant b2c, registrar os apps e policy keys em uma conta azure. Vide [AD B2C -  Provisionamento-Azure](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure).

## Configuração extensão vscode
A extensão do vscode é responsável por fazer o build e upload das policies no Azure AD B2C. Seguir a configuração conforme [documentação oficial](https://github.com/azure-ad-b2c/vscode-extension/blob/master/src/help/policy-upload.md).

Ao configurar a propriedade `Graph: Clientid` da extensão, utilizar o client id do app msgraph configurado no tenant do AD B2C. Vide propriedade [b2cTenant.app.MsGraph.clientId](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure).

## Configuração app.settings.json
Este arquivo está na raiz do projeto e contém configurações que serão aplicadas nos arquivos de template de policy gerando as policies com configurações específicas para cada instância de AD B2C existente.

|propriedade|descrição|exemplo|
|--|--|--|
|Tenant|domínio do tenant b2c. Vide propriedade [b2cTenant.PrimaryDomain](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure).|dhuob2c.onmicrosoft.com|
|InstrumentationKey|Instrumentation key do Application Insights cadastrado. Vide propriedade [defaultTenant.app.ApplicationInsights.InstrumentationKey](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure).|11111111-1111-1111-1111-111111111111|
|TenantObjectId|Tenant ID do tenant b2c. Vide propriedade [b2cTenant.TenantId](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure).|11111111-1111-1111-1111-111111111111|
|TokenLifeTimeSecs|tempo de duração em segundos do token. Default: 86400|86400|
|IdTokenLifeTimeSecs|tempo de duração em segundos do idtoken. Default: 86400|86400|
|RefreshTokenLifeTimeSecs|tempo de duração em segundos do refresh token. Default: 1209600|1209600|
|RollingRefreshTokenLifeTimeSecs|tempo de duração em segundos para rolagem do token. Default: 1209600|1209600|
|UrlHtmlRepository|url de acesso ao bucket do b2c no google storage utilizado para armazenamento dos assets utilizados na customização do front-end de SSO do Azure AD B2C|storage.googleapis.com/dhuo-b2c|
|UrlUserProfileAPI|url da API para enriquecimento de token com perfil do usuário. Trata-se de uma api do módulo apimanagement-accountsservice no formato: https://{host-gateway-backend}/it-management/v1/users/profile|https://gateway-dhuo.br.engineering/it-management/v1/users/profile|
|GoogleClientId|google app client id registrado no google developer para autenticação de usuários com conta no Google. Não usado no momento.||
|FacebookClientId|facebook app client id registrado no facebook developer para autenticação de usuários com conta no Facebook. Não usado no momento.||
|ProxyIdentityExperienceFrameworkClientId|o Client ID do app ProxyIdentityExperienceFramework configurado no tenant b2c. Vide propriedade [b2cTenant.app.ProxyIdentityExperienceFramework.clientId](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure).|11111111-1111-1111-1111-111111111111|
|IdentityExperienceFrameworkClientId|o Client ID do app IdentityExperienceFramework configurado no tenant b2c. Vide propriedade [b2cTenant.app.IdentityExperienceFramework.clientId](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure).|11111111-1111-1111-1111-111111111111|
|B2cExtensionsAppClientId|o Client ID do app b2c-extensions-app (Criado automaticamente ao criar o tenant do Azure AD B2C). Vide propriedade [b2cTenant.app.B2CExtensionsApp.clientId](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure).|11111111-1111-1111-1111-111111111111|
|B2cExtensionsAppObjectId|o Object ID do app b2c-extensions-app (Criado automaticamente ao criar o tenant do Azure AD B2C). Vide propriedade [b2cTenant.app.B2CExtensionsApp.objectId](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure).|11111111-1111-1111-1111-111111111111|
|AzureADTenantName|domínio do tenant pai (default). Vide propriedade [defaultTenant.PrimaryDomain](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure).|engineeringbr.onmicrosoft.com|
|AzureADClientId|o Client ID do app criado no tenant pai (default) para login de usuários internos. Vide propriedade [defaultTenant.app.InternalUser.clientId](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure).|11111111-1111-1111-1111-111111111111|

## Build
Uma vez configurado o arquivo appsettings.json, realizar o build para gerar os arquivos de policies com as configurações definidas por ambiente. Os arquivos gerados serão disponibilizados na pasta Environment.

Para executar o build basta executar `Ctr+Shift+P` no vscode e digitar "B2C Policy build" (ou `Ctr+Shift+5`).

## Deploy
Após realizar o build, deve ser feito o upload das policies para o AD B2C. Isso pode ser feito diretamente pelo portal da Azure ou através do vscode utilizando a extensão instalada anteriormente.

Para executar o upload pelo vscode basta abrir o arquivo da policy e executar `Ctrl+Shift+P` e digitar "B2C Upload current policy" (ou `Ctrl+Shift+U`)

Para executar o upload pelo portal Azure:
- Acesse o portal Azure
- Certifique-se que esteja no tenant b2c
- Caso não esteja, vá no menu de usuário e selecione a opção **Switch directory** e, na tela seguinte, troque para o diretório do tenant b2c
- Na página inicial do portal, busque por e selecione Azure AD B2C
- Acessar Identity Experience Framework > Custom policies. Selecionar **Upload custom policy**
- Realizar o upload do arquivo da policy

**Atenção:** As policies possuem uma cadeia de dependências. Caso seja o primeiro upload, ou tenha alterações em várias policies, a ordem a ser seguida é:

- B2C_1A_VV_TFB.xml
- B2C_1A_VV_TFE.xml
- B2C_1A_VV_TFE_EXT.xml

demais (não há ordem)
- B2C_1A_VV_EXT_SU.xml
- B2C_1A_VV_EXT_SUSI.xml
- B2C_1A_VV_PassChange.xml
- B2C_1A_VV_PassReset.xml
- B2C_1A_VV_ProfileEdit-Native.xml
- B2C_1A_VV_SUSI.xml

## Configurações DHUO
Uma vez configurado o AD B2C, é necessário configurar:

- as páginas customizadas do AD B2C (adb2c-login-estatico)
- as aplicações que se comunicam com o AD B2C:
  - apimanagement-accountservice
  - apimanagement-devportal-web
  - viaapi-web
- os consumers no gateway backend para comunicação AD B2C <--> DHUO Back-end.

As configurações de aplicações e consumers são detalhadas na seção principal do manual.

### AD B2C Custom UI (adb2c-login-estatico)
1. Configurar o arquivo **.env** a partir do modelo presente no diretório [/adb2c/adb2c-login-estatico](https://gitlab.engdb.com.br/apione/dhuoapi-install/-/tree/master/adb2c/adb2c-login-estatico) do repositório de templates de configuração. As variáveis configuráveis estão relacionadas abaixo:

|variável|descrição|exemplo|
|--|--|--|
|B2C_STORAGE_URL|url de acesso ao bucket do b2c no google storage|https://storage.googleapis.com/dhuo-b2c|
|B2C_TENANT_NAME|nome do tenant b2c. Vide propriedade [b2cTenant.Name](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure).|dhuob2c|
|B2C_AUTH_CLIENT_ID|o Client ID do app apimanagement-devportal-web configurado no tenant b2c. Vide propriedade [b2cTenant.app.Devportalweb.clientId](/Manual-de-Instalação-On-Premise-DHUO/AD-B2C-%2D-Provisionamento-Azure).|11111111-1111-1111-1111-111111111111|
|B2C_DEV_PORTAL_HOST|endereço de domínio do developer portal (apimanagement-devportal-web)|devportal.br.engineering|
|B2C_RECAPTCHA_SITE_KEY|site key obtida na configuração do Google reCAPTCHA||
|B2C_RECAPTCHA_VALIDATION_URL|url da API de validação de captcha. Trata-se de uma api do módulo apimanagement-accountsservice no formato: https://{host-gateway-backend}/it-management/v1/captcha/validation|https://gateway-dhuo.br.engineering/it-management/v1/captcha/validation|
|B2C_RECAPTCHA_VALIDATION_API_KEY|apikey do consumer cadastrado no gateway backend para consumo da API de validação do captcha||

2. execute o comando para carregar as variáveis de ambiente
```sh
source .env
```
3. execute o script `env-apply.sh`
```sh
./env-apply.sh
```
4. faça upload dos arquivos para o bucket do google storage
```sh
gsutil -h "Cache-Control:no-store" rsync -d -r b2c/ gs://<bucket>/b2c
```

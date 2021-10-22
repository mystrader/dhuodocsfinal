# AD B2C - Provisionamento Azure

[[toc]]

## Tabela de propriedades
Durante a instalação serão gerados IDs e propriedades que serão utilizados em configurações de diversos pontos. Para isso recomenda-se utilizar a tabela de propriedades abaixo e armazenar os valores em um arquivo para uso posterior e melhor orientação. 

**Atenção:** Alguns valores, como as secrets, só são visíveis no momento do cadastro.

|propriedade||
|--|--|
|defaultTenant.PrimaryDomain||
|defaultTenant.app.ApplicationInsights.InstrumentationKey||
|defaultTenant.app.InternalUser.clientId||
|defaultTenant.app.InternalUser.secret||
|b2cTenant.Name||
|b2cTenant.TenantId||
|b2cTenant.PrimaryDomain||
|b2cTenant.app.MsGraph.clientId||
|b2cTenant.app.MsGraph.secret||
|b2cTenant.app.IdentityExperienceFramework.clientId||
|b2cTenant.app.ProxyIdentityExperienceFramework.clientId||
|b2cTenant.app.Apione.EnterpriseApplication.objectId||
|b2cTenant.app.Viaapiweb.clientId||
|b2cTenant.app.Devportalweb.clientId||
|b2cTenant.app.Devportalweb.secret||
|b2cTenant.app.B2CExtensionsApp.clientId||
|b2cTenant.app.B2CExtensionsApp.objectId||
|b2cTenant.PolicyKeys.RestApiUsername||
|b2cTenant.PolicyKeys.RestApiPassword||

## Tenant padrão (Default directory)
Todos os passos dessa seção devem ser executados no tenant default da subscription Azure.

### Obtenção do Primary domain
- Na página inicial do portal, busque por e selecione Azure Active Directory
- Em **Overview**, obter o Primary domain
- Atribuir à propriedade **defaultTenant.PrimaryDomain** da tabela de propriedades o Primary domain obtido anteriormente.

### Registro de Resource providers
- Na página inicial do portal, busque por e selecione Subscriptions
- Selecione sua subscription
- No menu lateral acesse Resource providers
- Busque por Microsoft.AzureActiveDirectory
- Selecione e clique em Register

### Criação de Resource group
- Na página inicial do portal, busque por e selecione Resource groups
- Crie um resource group que será usado para associar ao tenant b2c. Exemplo: dhuo

### Cadastro do tenant b2c
- Na página inicial do portal, selecione Create a resource
- Busque por Azure Active Directory B2C
- Crie um tenant b2c com as seguintes propriedades:
   - Organization name: defina um nome para o tenant b2c. Exemplo: dhuo.
   - Initial domain name: defina um nome para o domínio do tenant b2c. Exemplo: dhuo.
   - Subscription: selecione a subscription desejada.
   - Resource group: selecione o resource group criado anteriormente.
- Revise e confirme
- Atribuir à propriedade **b2cTenant.Name** da tabela de propriedades o Initial domain name definido anteriormente.

### App Insights
- Na página inicial do portal, busque por e selecione Application Insights
- Selecione **Create**
- Crie um Application Insights com as seguintes propriedades:
   - Subscription: selecione a subscription desejada.
   - Resource group: selecione o resource group criado anteriormente.
   - Name: apione
   - Region: selecione uma região de preferência
   - Resource Mode: Workspace-based
- Revise e confirme
- Aguarde o provisionamento
- Na página inicial do portal, busque por e selecione Application Insights
- Busque e selecione o app criado anteriormente
- Em **Overview**, obter o Instrumentation Key
- Atribuir à propriedade **defaultTenant.app.ApplicationInsights.InstrumentationKey** da tabela de propriedades o Instrumentation Key obtido anteriormente.

### App para login de usuários no Azure AD (não B2C) - apione-internal-user
- Na página inicial do portal, busque por e selecione Azure Active Directory
- Em **App registrations**, selecionar **New registration**
- Crie um App com as seguintes propriedades:
   - Name: apione-internal-user
   - Supported account types: Accounts in this organizational directory only
   - Redirect URI: (Web) https://{b2cTenant.Name}.b2clogin.com/{b2cTenant.Name}.onmicrosoft.com/oauth2/authresp
- Registrar
- Na página do app criado (Overview), obter o Application (client) ID
- Atribuir à propriedade **defaultTenant.app.InternalUser.clientId** da tabela de propriedades o Application (client) ID obtido anteriormente.

**Permissions**
- Em **API permissions**, selecionar **Add a permission** > Microsoft APIs > Microsoft Graph > Delegated permissions
- Buscar e selecionar a permission **openid**
- Add permissions
- Em **API permissions**, selecionar **Add a permission** > Microsoft APIs > Microsoft Graph > Delegated permissions
- Buscar e selecionar a permission **offiline_access**
- Add permissions
- Selecione **Grant admin consent for <diretório>**
- Confirme e aguarde a atribuição de permissões

**Secret**
- Em **Certificates & secrets**, selecionar **New client secret**
- Crie um secret com as seguintes propriedades:
   - Description: apione-secret
   - Expires: 24 months
- Add
- Após criada, obter o Value gerado
- Atribuir à propriedade **defaultTenant.app.InternalUser.secret** da tabela de propriedades o Value obtido anteriormente.
**Atenção:** o valor da secret Só poderá ser visto por inteiro quando criado.

## Tenant B2C
Todos os passos dessa seção devem ser executados no tenant b2c da subscription Azure.

- Certifique-se que esteja no tenant b2c
- Caso não esteja, vá no menu de usuário e selecione a opção **Switch directory** e, na tela seguinte, troque para o diretório do tenant b2c

### Obtenção do Primary domain e Tenant ID
- Na página inicial do portal, busque por e selecione Azure Active Directory
- Em **Overview**, obter o Tenant ID
- Atribuir à propriedade **b2cTenant.TenantId** da tabela de propriedades o Primary domain obtido anteriormente.
- Em **Overview**, obter o Primary domain
- Atribuir à propriedade **b2cTenant.PrimaryDomain** da tabela de propriedades o Primary domain obtido anteriormente.

### App MS Graph
- Na página inicial do portal, busque por e selecione Azure Active Directory
- Em **App registrations**, selecionar **New registration**
- Crie um App com as seguintes propriedades:
   - Name: apione-msgraph
   - Supported account types: Accounts in this organizational directory only
   - Redirect URI: deixar em branco
   - Permissions: Grant admin consent to openid and offline_access permissions
- Registrar
- Na página do app criado (Overview), obter o Application (client) ID
- Atribuir à propriedade **b2cTenant.app.MsGraph.clientId** da tabela de propriedades o Application (client) ID obtido anteriormente.

**Authentication**
- Em **Authentication**, Advanced settings, marcar **Enable the following mobile and desktop flows**: Yes
- Selecione Save

**Permissions**
- Em **API permissions**, selecionar **Add a permission** > Microsoft APIs > Microsoft Graph > Application permissions
- Buscar e selecionar as permissions
   - Application.Read.All
   - Application.ReadWrite.All
   - Application.ReadWrite.OwnedBy
   - AppRoleAssignment.ReadWrite.All
   - Directory.Read.All
   - Directory.ReadWrite.All
   - User.Read.All
   - User.ReadWrite.All
   - Group.ReadWrite.All
   - AuditLog.Read.All
   - Policy.ReadWrite.TrustFramework
- Add permissions
- Em **API permissions**, selecionar **Add a permission** > Microsoft APIs > Microsoft Graph > Delegated permissions
- Buscar e selecionar a permission **Policy.ReadWrite.TrustFramework**
- Add permissions
- Selecione **Grant admin consent for <diretório>**
- Confirme e aguarde a atribuição de permissões

**Secret**
- Em **Certificates & secrets**, selecionar **New client secret**
- Crie um secret com as seguintes propriedades:
   - Description: msgraph-secret
   - Expires: 24 months
- Add
- Após criada, obter o Value gerado
- Atribuir à propriedade **b2cTenant.app.MsGraph.secret** da tabela de propriedades o Value obtido anteriormente.
**Atenção:** o valor da secret Só poderá ser visto por inteiro quando criado.

### App IdentityExperienceFramework
- Na página inicial do portal, busque por e selecione Azure Active Directory
- Em **App registrations**, selecionar **New registration**
- Crie um App com as seguintes propriedades:
   - Name: IdentityExperienceFramework
   - Supported account types: Accounts in this organizational directory only
   - Redirect URI: (Web) https://{b2cTenant.Name}.b2clogin.com/{b2cTenant.Name}.onmicrosoft.com
   - Permissions: Grant admin consent to openid and offline_access permissions
- Registrar
- Na página do app criado (Overview), obter o Application (client) ID
- Atribuir à propriedade **b2cTenant.app.IdentityExperienceFramework.clientId** da tabela de propriedades o Application (client) ID obtido anteriormente.

**Scope**
- Em **Expose an API**, selecionar **Add a scope**
- Selecione Save and continue
- Crie um scope com as seguintes propriedades:
   - Scope name: user_impersonation
   - Admin consent display name: Access IdentityExperienceFramework
   - Admin consent description: Allow the application to access IdentityExperienceFramework on behalf of the signed-in user.
   - State: Enabled
- Selecione Add scope

### App ProxyIdentityExperienceFramework
- Na página inicial do portal, busque por e selecione Azure Active Directory
- Em **App registrations**, selecionar **New registration**
- Crie um App com as seguintes propriedades:
   - Name: ProxyIdentityExperienceFramework
   - Supported account types: Accounts in this organizational directory only
   - Redirect URI: (Public client/native (mobile...) myapp://auth
   - Permissions: Grant admin consent to openid and offline_access permissions
- Registrar
- Na página do app criado (Overview), obter o Application (client) ID
- Atribuir à propriedade **b2cTenant.app.ProxyIdentityExperienceFramework.clientId** da tabela de propriedades o Application (client) ID obtido anteriormente.

**Authentication**
- Em **Authentication**, Advanced settings, marcar **Enable the following mobile and desktop flows**: Yes
- Selecione Save

**Permissions**
- Em **API permissions**, selecionar **Add a permission** > My APIs > IdentityExperienceFramework > Delegated permissions
- Buscar e selecionar a permission **user_impersonation**
- Add permissions
- Selecione **Grant admin consent for <diretório>**
- Confirme e aguarde a atribuição de permissões

### App apione
- Na página inicial do portal, busque por e selecione Azure Active Directory
- Em **App registrations**, selecionar **New registration**
- Crie um App com as seguintes propriedades:
   - Name: apione
   - Supported account types: Accounts in any identity provider or organizational directory (for authenticating users with user flows)
   - Redirect URI: deixar em branco
   - Permissions: Grant admin consent to openid and offline_access permissions
- Registrar
- Na página do app criado (Overview), clique no link da propriedade **Managed application in local directory**
- Na página seguinte, obter o Object ID
- Atribuir à propriedade **b2cTenant.app.Apione.EnterpriseApplication.objectId** da tabela de propriedades o Object ID obtido anteriormente.
- Retorne para a página do App apione

**Scope**
- Em **Expose an API**, selecionar **Add a scope**
- Defina a URI: apione
- Selecione Save and continue
- Crie um scope com as seguintes propriedades:
   - Scope name: access
   - Admin consent display name: access
   - Admin consent description: access
   - State: Enabled
- Selecione Add scope

**Roles**
- Em **Manifest**, editar a propriedade **appRoles** do json, incluindo o conteúdo do arquivo roles.json do repositório
- Salvar

### App apione viaapi-web
- Na página inicial do portal, busque por e selecione Azure Active Directory
- Em **App registrations**, selecionar **New registration**
- Crie um App com as seguintes propriedades:
   - Name: viaapi-web
   - Supported account types: Accounts in any identity provider or organizational directory (for authenticating users with user flows)
   - Redirect URI: deixar em branco
   - Permissions: Grant admin consent to openid and offline_access permissions
- Registrar
- Na página do app criado (Overview), obter o Application (client) ID
- Atribuir à propriedade **b2cTenant.app.Viaapiweb.clientId** da tabela de propriedades o Application (client) ID obtido anteriormente.

**Authentication**
- Em **Authentication**, Platform configurations, selecionar Add a platform > Single-page application
- Configurar com as seguintes propriedades:
   - Redirect URIs: endereço de dominio do viaapi-web. Exemplo: https://dhuo.br.engineering/
   - Implicit grant and hybrid flows: 
      - Access tokens (used for implicit flows)
      - ID tokens (used for implicit and hybrid flows)
- Selecione Configure

**Permissions**
- Em **API permissions**, selecionar **Add a permission** > My APIs > apione > Delegated permissions
- Buscar e selecionar a permission **access**
- Add permissions
- Selecione **Grant admin consent for <diretório>**
- Confirme e aguarde a atribuição de permissões

### App apione apimanagement-devportal-web
- Na página inicial do portal, busque por e selecione Azure Active Directory
- Em **App registrations**, selecionar **New registration**
- Crie um App com as seguintes propriedades:
   - Name: apimanagement-devportal-web
   - Supported account types: Accounts in any identity provider or organizational directory (for authenticating users with user flows)
   - Redirect URI: deixar em branco
   - Permissions: Grant admin consent to openid and offline_access permissions
- Registrar
- Na página do app criado (Overview), obter o Application (client) ID
- Atribuir à propriedade **b2cTenant.app.Devportalweb.clientId** da tabela de propriedades o Application (client) ID obtido anteriormente.

**Authentication**
- Em **Authentication**, Platform configurations, selecionar Add a platform > Single-page application
- Configurar com as seguintes propriedades:
   - Redirect URIs: url de callback do dominio do developer portal (apimanagement-devportal-web) para a policy B2C_1A_VV_EXT_SU.
      - Formato: https://{dominio devportal}/api/auth/callback/B2C_1A_VV_EXT_SU/
   - Implicit grant and hybrid flows: 
      - Access tokens (used for implicit flows)
      - ID tokens (used for implicit and hybrid flows)
- Selecione Configure
- Na configuração da Single-page application feita anteriormente, selecionar Add URI
- Adicionar as seguintes URIs nos formatos a seguir:
     - http://{dominio devportal}/api/auth/callback/B2C_1A_VV_EXT_SUSI/
     - http://{dominio devportal}/api/auth/callback/B2C_1A_VV_ProfileEdit-Native/
- Selecione Save
- Em **Authentication**, Platform configurations, selecionar Add a platform > Web
- Configurar com as seguintes propriedades:
   - Redirect URIs: url de callback do dominio do developer portal (apimanagement-devportal-web) para a policy B2C_1A_VV_EXT_SU.
      - Formato: https://{dominio devportal}/api/auth/callback/B2C_1A_VV_PassChange/
- Selecione Configure
- Na configuração da Web application feita anteriormente, selecionar Add URI
- Adicionar as seguintes URIs nos formatos a seguir:
     - http://{dominio devportal}/api/auth/callback/B2C_1A_VV_PassReset/
- Selecione Save
- Em **Authentication**, Advanced settings, marcar **Enable the following mobile and desktop flows**: Yes
- Selecione Save

**Permissions**
- Em **API permissions**, selecionar **Add a permission** > My APIs > apione > Delegated permissions
- Buscar e selecionar a permission **access**
- Add permissions
- Em **API permissions**, selecionar **Add a permission** > My APIs > IdentityExperienceFramework > Delegated permissions
- Buscar e selecionar a permission **user_impersonation**
- Add permissions
- Selecione **Grant admin consent for <diretório>**
- Confirme e aguarde a atribuição de permissões

**Secret**
- Em **Certificates & secrets**, selecionar **New client secret**
- Crie um secret com as seguintes propriedades:
   - Description: devportal-secret
   - Expires: 24 months
- Add
- Após criada, obter o Value gerado
- Atribuir à propriedade **=b2cTenant.app.Devportalweb.secret** da tabela de propriedades o Value obtido anteriormente.
**Atenção:** o valor da secret Só poderá ser visto por inteiro quando criado.

### app b2c-extensions-app
- Na página inicial do portal, busque por e selecione Azure Active Directory
- Em **App registrations**, selecionar **All applications**
- Selecionar o app **b2c-extensions-app**
- Na página de detalhes do app b2c-extensions-app (Overview), obter o Application (client) ID
- Atribuir à propriedade **b2cTenant.app.B2CExtensionsApp.clientId** da tabela de propriedades o Application (client) ID obtido anteriormente.
- Na página de detalhes do app b2c-extensions-app (Overview), obter o Object ID
- Atribuir à propriedade **b2cTenant.app.B2CExtensionsApp.objectId** da tabela de propriedades o Object ID obtido anteriormente.

## Configuração Identity Experience Framework
Nesta seção são configurados secrets referenciadas no arquivos XML de custom policies que serão configuradas posteriormente.

- Na página inicial do portal, busque por e selecione Azure AD B2C
- Selecionar **Identity Experience Framework**
- Na página seguinte, selecione **Policy keys** e crie as seguintes keys com as seguintes propriedades:

### B2C_1A_AdminClientEncryptionKeyContainer
  - Options: Generate
  - Name: B2C_1A_AdminClientEncryptionKeyContainer
  - Key type: RSA
  - Key usage: Encryption

### B2C_1A_TokenSigningKeyContainer
  - Options: Generate
  - Name: B2C_1A_TokenSigningKeyContainer
  - Key type: RSA
  - Key usage: Signature

### B2C_1A_TokenEncryptionKeyContainer
  - Options: Generate
  - Name: B2C_1A_TokenEncryptionKeyContainer
  - Key type: RSA
  - Key usage: Encryption

### B2C_1A_GoogleSecret
  - Options: Manual
  - Name: B2C_1A_GoogleSecret
  - Secret: B2C_1A_GoogleSecret
  - Key usage: Encryption

### B2C_1A_FacebookSecret
  - Options: Manual
  - Name: B2C_1A_FacebookSecret
  - Secret: B2C_1A_FacebookSecret
  - Key usage: Encryption

### B2C_1A_GetUserGroupsRestApiUsername
  - Options: Manual
  - Name: B2C_1A_GetUserGroupsRestApiUsername
  - Secret: usuário para autenticação Basic Auth a ser cadastrado como consumer no kong para acesso a API do back-end durante a configuração Kong (back-end gateway).
  - Key usage: Encryption
**Observação:** Atribuir à propriedade **b2cTenant.PolicyKeys.RestApiUsername** da tabela de propriedades o usuário cadastrado.

### B2C_1A_GetUserGroupsRestApiPassword
  - Options: Manual
  - Name: B2C_1A_GetUserGroupsRestApiPassword
  - Secret: senha para autenticação Basic Auth a ser cadastrado como consumer no kong para acesso a API do back-end durante a configuração Kong (back-end gateway).
  - Key usage: Encryption
**Observação:** Atribuir à propriedade **b2cTenant.PolicyKeys.RestApiPassword** da tabela de propriedades a senha cadastrada.

### B2C_1A_AzureADSecret
  - Options: Manual
  - Name: B2C_1A_AzureADSecret
  - Secret: propriedade **defaultTenant.app.InternalUser.secret** da tabela de propriedades
  - Key usage: Encryption

# Gestão de grupos e usuários
Todos os passos dessa seção devem ser executados no tenant b2c da subscription Azure.

Esta seção contém instruções para gerenciamento de roles de usuários e grupos.

## Roles
- Na página inicial do portal, busque por e selecione Azure Active Directory
- Em **Enterprise applications**, selecionar **All Aplications** e em seguida Apply
- Busque pelo app apione
- Na página do app, vá em **Users and groups** e selecione Add user/group
- Em **Users**, pesquise pelos usuários desejados, selecione-os e em seguida Select
- Em **Select a role**, selecione a role desejada para ser aplicada aos usuários. Roles disponíveis:
   - Consumer API
   - Devportal Admin API
   - Editor API
   - Operator API
   - Portal internal user
   - Producer API
- Selecione Assign

## Groups
- Na página inicial do portal, busque por e selecione Azure Active Directory
- A relação de grupos utilizadas pela aplicação está localizada em **Groups**
- Os grupos utilizados são do tipo **Security**.

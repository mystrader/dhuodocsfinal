# Ambientes dhuo


## PROD, DEV e RC

|| "Prod"(demo) | Dev(sandbox) | QA(release candidate) | user/pass |
|--|--|--|--|---|
|Admin Portal| https://dhuo.br.engineering | https://sandbox-dhuo.br.engineering | https://qa-dhuo.br.engineering | b2c |
|Dev Portal| https://devportal-dhuo.br.engineering | https://sandbox-devportal-dhuo.br.engineering | https://qa-devportal-dhuo.br.engineering | b2c |
|Strapi| https://strapi-dhuo.br.engineering/admin | https://sandbox-strapi-dhuo.br.engineering/admin | https://qa-strapi-dhuo.br.engineering/admin | b2c |
|Kong| https://gateway-dhuo.br.engineering | https://sandbox-gateway-dhuo.br.engineering | https://qa-gateway-dhuo.br.engineering | - |
|Jira SD| https://dhuo.atlassian.net/ | https://dhuotest.atlassian.net/jira/your-work  | - | dhuosd@gmail.com / Brasil123|

## Ferramentas

|| url |
|--|--|
|Nexus|https://nexus-dhuo.br.engineering|
|Harbor|https://registry-dhuo.br.engineering|
|Konga|https://konga-dhuo.br.engineering|
|Grafana|https://dhuo-observability.br.engineering|







# Subindo ambientes DHUO local

::: tip

 Extraído do nosso primeiro Tals com Lucas
:::

1. Dar o clone no seguinte repositório
[API LOCAL RUNNER](https://gitlab.engdb.com.br/apione/apione-local-runner)

2. Rodar o comando: 


``` sh
docker-compose -f deploy/docker-compose.yml up -d
```
_O dockerCompose está na versão 1.29.2_


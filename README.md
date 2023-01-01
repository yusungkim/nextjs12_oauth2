# OAuth2.0 Demo using NEXTJS 12

## Feature

* Login using OAuth2.0 and save access_token in session
* Get User info from github with access_token
* Save user info to session
* Reuse user info from the session within short amount of period (60sec)

## Branch Tags history

[swr](https://github.com/yusungkim/nextjs12_oauth2/tree/tailwindcss)

* tailwindcss / layout
* daisyui / theme
* swr / useMutation / methodGuard

[oauth_github](https://github.com/yusungkim/nextjs12_oauth2/tree/oauth_github)

* oauth / useUser / github provider

[oauth_google](https://github.com/yusungkim/nextjs12_oauth2/releases/tag/init_oauth_google)

* oauth / useUser / github provider / google provider
* signout

## Develop

### Local up

```bash
# init
docker-compose run app yarn
# up
docker-compose up

# do something inside of app container
docker-compose run app sh
```

### Prisma and mysql

```bash
### inside of app container

# pacakge install
yarn add -D prisma
yarn add -D @prisma/client

# generate prisma config
yarn prisma init --datasource-provider mysql

# migration
yarn prisma migrate dev --name init

# force update db schema
yarn prisma db push

# orm generate
yarn prisma generate
```

# OAuth2.0 Demo using NEXTJS 12

**Feature** 

* Login using OAuth2.0 and save access_token in session
* Get User info from github with access_token
* Save user info to session
* Reuse user info from the session within short amount of period (60sec)

### Branch Tags

Branch: 

[swr](https://github.com/yusungkim/nextjs12_oauth2/tree/tailwindcss)
* tailwindcss / layout
* daisyui / theme
* swr / useMutation / methodGuard

[oauth_github](https://github.com/yusungkim/nextjs12_oauth2/tree/oauth_github)
* oauth / useUser / github provider


```bash
# init
docker-compose run app yarn
# up
docker-compose up
```
## Simple Auth Server for Hasura

- make a `.env` file based on `.env.example`
- fill the environment variable values
- the `HASURA_GRAPHQL_JWT_SECRET` value should be in json ([see here](https://docs.hasura.io/1.0/graphql/manual/auth/authentication/jwt.html#running-with-jwt)) with the SECRET matching the `SECRET` value.
- run `docker-compose up --build`
- the hasura will be available on `localhost:8080`
- the auth server will be available on `localhost:5001`
- register and login to get a token
- use the token to request resources from the hasura

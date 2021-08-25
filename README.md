<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

Server side for Date App.

## Installation

```bash
$ yarn
```
* install [docker](https://www.docker.com/products/docker-desktop)
* install [pgAdmin](https://www.pgadmin.org/download/)
* run pg admin with some ```<PASSWORD>``` 
* run ```docker run --name date-app-db -p 5432:5432 -e POSTGRES_PASSWORD=Test1234! -d postgres```
* in pg admin create a new server. General tab name - ``DateAppDB``. Connection tab host - ``localhost``, port - ``5432``, password - ``Test1234!``
* after creating a server you will see a ``date-app-db``
* run  ``http://localhost:3000/graphql`` to see playground


## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```

## Test 

```bash
# unit tests
$ yarn test
```

## TODO



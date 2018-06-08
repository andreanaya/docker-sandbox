# docker-test

Guide to set up dev/deploy workflow for sample express/mongoose CRUD User API.

1. [Local environment](#local)
1. [Remote environment](#remote)

## <a name="local"></a>Local environment

Local dev or prototyping environment. `docker-sync` is used to syncronize files between host machine and Docker.

## <a name="remote"></a>Remote environment

Staging, Live or any other environment on a remote server. `docker-machine` with a [generic driver](https://docs.docker.com/machine/drivers/generic) are used to deploy images.

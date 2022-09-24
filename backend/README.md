# Dashboard

## Requirements

- Ubuntu 22.04 Lts
- Git version 2.25.1
- Docker version 19.03.8
- Docker-compose version 2.3.0
- Nodejs version 16.0.0 Lts
- Nestjs 9.0.0

### Install Docker and Docker Compose

You can run Compose on OS X and 64-bit Linux. It is currently not supported on
the Windows operating system. To install Compose, you'll need to install Docker
first.

Depending on how your system is configured, you may require `sudo` access to
install Compose. If your system requires `sudo`, you will receive "Permission
denied" errors when installing Compose. If this is the case for you, preface the
install commands with `sudo` to install.

To install Compose, do the following:

1.  Install Docker Engine version 19.03.8 or greater:

    - <a href="https://docs.docker.com/installation/mac/" target="_blank">Mac OS X installation</a> (installs both Engine and Compose)

    - <a href="https://docs.docker.com/installation/ubuntulinux/" target="_blank">Ubuntu installation</a>

    - <a href="https://docs.docker.com/installation/" target="_blank">other system installations</a>

    - Manual: apt install docker.io

2.  Go to the <a href="https://github.com/docker/compose/releases" target="_blank">repository release page</a>.

3.  Enter the `curl` command in your termial.

    The command has the following format:

        curl -L https://github.com/docker/compose/releases/download/2.3.0/docker-compose-Linux-x86_64 > /usr/local/bin/docker-compose

    If you have problems installing with `curl`, you can use `pip` instead: `pip install -U docker-compose`

4.  Apply executable permissions to the binary:

        $ chmod +x /usr/local/bin/docker-compose

5.  Optionally, install [command completion](completion.md) for the
    `bash` and `zsh` shell.

6.  Test the installation.

```bash
$ docker-compose --version
docker-compose version: 1.26.0
```

```bash
$ mongo --username admin --password --authenticationDatabase admin
```

### Deploy with Docker-compose

```bash
$ cd deploy
$ docker-compose up
```

### Server installation

```bash
$ npm i -g @nestjs/cli
$ cd server && npm install
```

### Build and running Server production mode

```bash
$ npm run build && npm run start:prod
```

Once the server application is running you can visit [http://localhost:3001/core/api/graphql](http://localhost:3001/core/api/graphql) to see the Graphql playground.

## Setting up

### Docker
See installation instructions at: [docker documentation](https://docs.docker.com/install/)
### Docker Compose
Install [docker compose](https://github.com/docker/compose), see installation
instructions at [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

## Fire it up

```bash
$ docker-compose up -d                                 # Start the container
$ docker-compose exec django python manage.py migrate  # apply database migrations
```

## DEVSHOP API

## Description

[DevShop](https://github.com/CrystyanSantos9/api-devshop.git) API to Devshop backend in Nest

## Executing image build and container in developing environment

```bash
$ docker-compose up | docker-compose up -d 
```

## Installation without container 

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database Migration 
```bash
# generate a new migration synchronizing entities 
$ npm run typeorm migration:generate -- ./src/migrations/migration-update -d ./typeOrm.config.ts

# sync database running migrations
$ npm run typeorm migration:run --  -d ./typeOrm.config.ts 

# reverting migrations
$ npm run typeorm migration:reset --  -d ./typeOrm.config.ts 
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Crystyan Santos](https://crystyan-resume-8ud5qjv4r-cryssantos.vercel.app/)

## License

Nest is [MIT licensed](LICENSE).

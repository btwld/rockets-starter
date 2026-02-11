<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Rockets Starter API built with NestJS, TypeORM, and Rockets Auth modules.

## Database Setup

This application uses PostgreSQL as its primary database. Follow the steps below to set up your database.

### PostgreSQL Installation

#### macOS (using Homebrew)
```bash
brew install postgresql@15
brew services start postgresql@15
```

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Windows
Download and install from [PostgreSQL official website](https://www.postgresql.org/download/windows/)

### Database Configuration

1. Create a PostgreSQL database:
```bash
createdb rockets-starter
```

Or using psql:
```bash
psql -U postgres
CREATE DATABASE "rockets-starter";
```

2. Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```

3. Update the `DATABASE_URL` in your `.env` file:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/rockets-starter
```

### Migration from SQLite

If you're migrating from the previous SQLite setup:

1. **Backup your SQLite data** (if needed):
   - The old database file is `database.sqlite`
   
2. **Update dependencies**:
   ```bash
   yarn install
   ```

3. **Run the application** with the new PostgreSQL configuration:
   - The application will automatically synchronize the schema in development mode
   - For production, ensure `synchronize` is set to `false` in the configuration

### Configuration

The application uses a centralized configuration pattern with environment variables. All configuration files are located in `src/config/`.

#### Setting Up Environment Variables

1. Copy the example environment file:
   ```bash
   cp env.example.txt .env
   ```

2. Update the values in `.env` according to your environment

Key configuration files:
- `typeorm.settings.ts` - Database configuration
- `rockets-auth.settings.ts` - Authentication settings
- `rockets.settings.ts` - Rockets module settings
- `config.constants.ts` - Configuration key constants

#### Environment Variables

See `env.example.txt` for all available options:

**Database:**
- `DATABASE_URL` - PostgreSQL connection string
- `DATABASE_SSL` - Enable SSL for database connection (true/false)
- `NODE_ENV` - Application environment (development/production)

**Email:**
- `EMAIL_FROM` - Email sender address
- `EMAIL_LOGO_URL` - Logo URL for email templates

**Application:**
- `APP_BASE_URL` - Application base URL
- `OTP_EXPIRES_IN` - OTP expiration time (e.g., "10m")
- `ENABLE_GLOBAL_GUARD` - Enable global authentication guard (true/false)

**Roles:**
- `ADMIN_ROLE_NAME` - Name of admin role (default: "admin")
- `DEFAULT_ROLE_NAME` - Name of default user role (default: "user")

**Seeding (Development Only):**
- `USER_MODULE_SEEDER_AMOUNT` - Number of users to create (default: 50, set to 0 for production)
- `ROLE_MODULE_SEEDER_AMOUNT` - Number of roles to create (default: 50, set to 0 for production)

## Project setup

```bash
$ yarn install
```

## Database Migrations

This project uses TypeORM migrations for database schema management.

### Running Migrations

Initialize the database with migrations and seed data:
```bash
yarn sandbox:init
```

Run pending migrations only:
```bash
yarn migration:run
```

### Creating Migrations

Generate a migration from entity changes:
```bash
yarn migration:generate ./src/migrations/MigrationName
```

Create a blank migration file:
```bash
yarn migration:create ./src/migrations/MigrationName
```

### Other Migration Commands

Show migration status:
```bash
yarn migration:show
```

Revert the last migration:
```bash
yarn migration:revert
```

## Database Seeding

The application includes a seeder (`AppSeeder`) that creates essential data for your application.

### Essential Data Created

The seeder always creates:
- **Admin Role**: `admin` (Administrator role with full access)
- **User Role**: `user` (Default user role)
- **Admin User**: 
  - Email: `admin@conceptatech.com`
  - Username: `admin`
  - Password: `Test1234`
  - Assigned Role: `admin`

### Seeding Commands

Run the seeder only:
```bash
yarn seed:run
```

Rebuild database (drop schema, run migrations, and seed):
```bash
yarn sandbox:rebuild
```

Initialize database with migrations and seeding:
```bash
yarn sandbox:init
```

### Controlling Seeding Behavior

The seeder uses Concepta's factories which can create additional test data based on environment variables:

```bash
# In your .env file

# Set to 0 to create only the essential admin user
USER_MODULE_SEEDER_AMOUNT=0

# Set to 0 to create only admin and user roles
ROLE_MODULE_SEEDER_AMOUNT=0
```

**⚠️ Important**: Setting these values to `0` ensures only the essential data is created. If not set, the Concepta seeders will create 50 additional users and 50 additional roles by default (useful for testing, but not for production).

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

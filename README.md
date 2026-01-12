# Rockets Starter

A full-stack monorepo boilerplate built with Turborepo, featuring NestJS 10 backend and Next.js frontend.

## 🚀 Quick Start

```bash
# Install dependencies
yarn install

# Run development servers
yarn dev

# Build all applications
yarn build
```

## 📦 What's Inside

This monorepo includes the following packages and applications:

### Applications
- `api`: NestJS 10 backend server with TypeORM and SQLite (runs on port 3001)
- `web`: Next.js frontend application with TypeScript and Tailwind CSS (runs on port 3000)

### Packages
- `typescript-config`: Shared TypeScript configurations for different environments
- `eslint-config`: Shared ESLint configurations for Next.js and NestJS

## 🏗️ Project Structure

```
music-management-system/
├── apps/
│   ├── api/          # NestJS 10 backend
│   └── web/          # Next.js frontend
├── packages/
│   ├── typescript-config/  # Shared TypeScript configs
│   └── eslint-config/      # Shared ESLint configs
├── package.json
└── turbo.json
```

## 🛠️ Available Scripts

- `yarn dev` - Start all applications in development mode
- `yarn build` - Build all applications for production
- `yarn lint` - Lint all applications
- `yarn type-check` - Run TypeScript type checking
- `yarn clean` - Clean all build artifacts

## 🔧 Technology Stack

### Backend (API)
- **NestJS 10**: Progressive Node.js framework
- **TypeORM**: Object-relational mapping
- **SQLite**: Lightweight database for development
- **Swagger**: API documentation

### Frontend (Web)
- **Next.js 16**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint**: Code linting

### Development Tools
- **Turborepo**: Monorepo build system
- **Yarn Workspaces**: Package management
- **TypeScript**: Shared type definitions
- **ESLint**: Code quality

## 🚀 Getting Started

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd music-management-system
   yarn install
   ```

2. **Start development**
   ```bash
   yarn dev
   ```

3. **Access applications**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 🏭 Production Build

```bash
# Build all applications
yarn build

# Start production servers
cd apps/api && yarn start:prod
cd apps/web && yarn start
```

## 📝 Next Steps

This boilerplate provides a solid foundation for building scalable applications. Consider adding:

- Database configuration for production
- Authentication & authorization
- API endpoints for your business logic
- Frontend components and pages
- Testing setup (Jest, Cypress)
- CI/CD pipeline
- Docker containerization

## 🤝 Contributing

This is a boilerplate project. Feel free to customize it according to your project requirements.

# Vite React App Setup Guide

This guide will help you set up and run my Vite-powered React application, using an environment variable (`VITE_BASE_URL`) for configuration.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js (recommended version)
- npm or yarn (latest versions)

## Installation

1. **Navigate into your project directory:**

   ```bash
   cd FE
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

## Configuration

1. **Create an environment file:**

   Create a `.env` file in the root of your project.

   ```plaintext
   # .env file

   VITE_BASE_URL=<your-base-url>
   ```

   Replace `<your-base-url>` with the base URL of your API or any other environment-specific configurations.
  assuming you are running locally the server it will be `http://localhost:3000`

## Running the Application

To start your Vite React application locally:

```bash
npm run dev
# or
yarn dev
```

This command starts the development server. The application will watch for file changes and provide hot module replacement.

## Building for Production

To build your Vite React application for production:

```bash
npm run build
# or
yarn build
```

This command generates a production-ready build of your application in the `dist` directory.


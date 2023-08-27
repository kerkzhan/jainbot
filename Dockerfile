# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.16.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"
# Node.js app lives here
WORKDIR /app

# Install pnpm
ARG PNPM_VERSION=8.6.12
RUN npm install -g pnpm@$PNPM_VERSION

# Throw-away compile stage to compile Typescript into Javacsript
FROM base as compile
COPY package*.json ./
COPY tsconfig.json ./
COPY . .
RUN pnpm install --frozen-lockfile 
RUN pnpm build

# Throw-away build stage to reduce size of final image
FROM base

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3

# Install node modules
COPY package.json pnpm-lock.yaml ./
COPY --from=compile /app/build /app/build
RUN pnpm install --frozen-lockfile -P

COPY . .

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "node", "build/index.js" ]

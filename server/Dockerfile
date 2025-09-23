# syntax=docker/dockerfile:1

# --- BUILD STAGE ---
# This stage installs dependencies and builds the TypeScript code.
FROM node:20-slim AS builder
WORKDIR /app

# Copy all package.json files and the lock file from the monorepo root
COPY package*.json ./
COPY client/package.json client/package-lock.json ./client/
COPY server/package.json server/package-lock.json ./server/

# Install ALL dependencies from the root
RUN npm install

# Copy the rest of the source code into the container
COPY . .

# Generate the Prisma Client using the schema from the root
RUN npx prisma generate

# Build the server's TypeScript code into JavaScript
# We use --prefix to run the script from the /server directory
RUN npm run build --prefix server


# --- PRODUCTION STAGE ---
# This stage creates a smaller, final image with only what's needed to run.
FROM node:20-slim
WORKDIR /app

# Copy necessary package files for installing only production dependencies
COPY package.json package-lock.json ./
COPY server/package.json ./server/

# Install ONLY production dependencies from the root
RUN npm install --omit=dev

# From the builder stage, copy the generated Prisma client and schema
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Copy the compiled backend code from the builder stage
COPY --from=builder /app/server/dist ./server/dist

# The command to start the application.
# It runs the "start" script located in the server's package.json
CMD ["npm", "run", "start", "--prefix", "server"]
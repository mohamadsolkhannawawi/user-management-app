# syntax=docker/dockerfile:1

# --- BUILD STAGE ---
FROM node:20-slim AS builder
WORKDIR /app

# Copy all necessary package files
COPY package*.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/

# Install all dependencies from the root
RUN npm install

# Copy the rest of the source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the server's TypeScript code
RUN npm run build --prefix server

# --- PRODUCTION STAGE ---
FROM node:20-slim
WORKDIR /app

# Copy only production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
COPY server/package.json ./server/

# Copy compiled backend code
COPY --from=builder /app/server/dist ./server/dist

# Copy Prisma schema for runtime migrations
COPY --from=builder /app/prisma ./prisma

# The command to start the application
CMD ["npm", "run", "start", "--prefix", "server"]
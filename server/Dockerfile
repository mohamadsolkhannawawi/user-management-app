# Add a comment at the top to enable multi-stage build features
# syntax=docker/dockerfile:1

# Stage 1: Build the application
FROM node:20-slim AS builder
WORKDIR /app

# Copy all package.json files to leverage Docker cache
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install ALL dependencies from the root
RUN npm install --omit=dev

# Copy the prisma schema
COPY prisma ./prisma/

# Generate the Prisma Client
RUN npx prisma generate

# Copy the backend source code
COPY server/. .

# Build the TypeScript project
RUN npm run build


# Stage 2: Create the final production image
FROM node:20-slim
WORKDIR /app

# Copy only necessary production files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server/package*.json ./server/
COPY --from=builder /app/dist ./server/dist
COPY --from=builder /app/prisma ./prisma/

# Set the working directory to the server folder
WORKDIR /app/server

# Command to run migrations and start the application
CMD ["npm", "run", "start"]
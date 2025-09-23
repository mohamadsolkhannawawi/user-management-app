# syntax=docker/dockerfile:1

# --- BUILD STAGE ---
# This stage installs dependencies and builds the TypeScript code.
FROM node:20-slim AS builder
WORKDIR /app

# Copy all package.json files and the lock file from the monorepo root
COPY package*.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/

# Install ALL dependencies needed for the build process
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

# Copy only production dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
COPY server/package.json ./server/

# Copy the compiled backend code from the builder stage
COPY --from=builder /app/server/dist ./server/dist

# Copy the Prisma schema, which is needed at runtime for migrations
COPY prisma ./prisma

# The command to start the application.
# It runs the "start" script located in the server's package.json
CMD ["npm", "run", "start", "--prefix", "server"]
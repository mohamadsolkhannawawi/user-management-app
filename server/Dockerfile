# syntax=docker/dockerfile:1

# --- BUILD STAGE ---
# This stage installs all dependencies and builds the TypeScript code.
FROM node:20-slim AS builder
WORKDIR /app

# Copy the entire project context into the container
COPY . .

# Install all dependencies from the root package.json
RUN npm install

# Generate the Prisma Client
RUN npx prisma generate

# Build the server's TypeScript code, running the script from the /server folder
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

# Set the final working directory to the server folder
WORKDIR /app/server

# The command to start the application
CMD ["npm", "run", "start"]
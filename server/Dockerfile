# Stage 1: Build the application
FROM node:20-slim AS builder
WORKDIR /app

# Install Prisma Client separately
RUN npm install prisma --location=global

# Copy package files from the root directory
COPY ../package*.json ./
RUN npm install

# Copy Prisma schema from the root directory
COPY ../prisma ./prisma/

# Generate Prisma Client
RUN npx prisma generate

# Copy the backend source code
COPY . .

# Build the TypeScript project
RUN npm run build

# Stage 2: Create the production image
FROM node:20-slim
WORKDIR /app

# Copy production dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Copy compiled code from the builder stage
COPY --from=builder /app/dist ./dist

# Copy Prisma schema for the runtime
COPY --from=builder /app/prisma ./prisma/

# Expose the port the app runs on
EXPOSE 5001

# Command to run the application
CMD ["npm", "run", "start"]
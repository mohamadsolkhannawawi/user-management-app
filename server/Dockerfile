# Stage 1: Dependencies & Build
FROM node:20-slim AS builder
WORKDIR /app

# Copy root package files and install ALL dependencies
COPY package*.json ./
RUN npm install

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma Client
RUN npx prisma generate

# Copy backend source code
COPY server/src ./src/

# Copy backend tsconfig
COPY server/tsconfig.json ./tsconfig.json

# Build the TypeScript project
RUN npm run build --prefix server


# Stage 2: Production
FROM node:20-slim
WORKDIR /app

# Copy production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Copy compiled backend code
COPY --from=builder /app/dist ./dist

# Copy prisma schema for runtime
COPY --from=builder /app/prisma ./prisma/

# Expose the correct port
EXPOSE 5001

# Command to start the server, referencing the unified package.json
CMD ["npm", "run", "start", "--prefix", "server"]
# Use Node.js base image with pnpm
FROM node:20.12.2-alpine

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy source code
COPY . .

# Install dependencies
RUN pnpm install

# Expose Vite dev server port
EXPOSE 5173

# Start dev server
CMD ["pnpm", "dev"]

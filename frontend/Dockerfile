# Use Node.js base image with npm
FROM node:20.12.2-alpine

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Install dependencies
RUN npm install

# Expose Vite dev server port
EXPOSE 5173

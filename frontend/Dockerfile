# Use Node.js base image with npm
FROM node:20.12.2-alpine

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Copy only package.json + lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Expose Vite dev server port
EXPOSE 5173

# Start the Vite dev server
CMD ["npm", "run", "dev"]
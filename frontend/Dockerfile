# Stage 1: Build the application
FROM node:24-slim AS builder

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:latest

# Copy built files from builder stage to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config (optional but recommended)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
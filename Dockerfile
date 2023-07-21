# Use official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project files to the working directory
COPY . .

# Build the Vue.js application
RUN npm run build

# Install serve to run a static web server
RUN npm install -g serve

# Expose port 80 for the web server
EXPOSE 80

# Start the web server
CMD ["serve", "-s", "dist", "-l", "80"]

# Use a base image with Node.js pre-installed
FROM node:18.16.0-alpine3.18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]


#use below commmand to build DockerImage
#docker build -t frontend_delight_kitchen:1.0.0 .
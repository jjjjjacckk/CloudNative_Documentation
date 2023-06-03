# Pull the Node image from Docker Hub
FROM node:14-slim

# Set directory
WORKDIR /usr/app

# Copy package.json
COPY ./package.json ./

# Install dependencies
RUN npm install

# Copy rest of the code to container
COPY . .

# Expose container port
EXPOSE 8080

# Run the Vue application
CMD [ "npm", "run", "serve" ]
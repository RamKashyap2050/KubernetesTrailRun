# Use the official Node.js image as a base image
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy local code to the container image
COPY . .

# Rebuild bcrypt for the specific environment
RUN npm rebuild bcrypt --build-from-source

# Run the web service on container startup
CMD [ "node", "server.js" ]

# Expose the port the app runs on
EXPOSE 3001

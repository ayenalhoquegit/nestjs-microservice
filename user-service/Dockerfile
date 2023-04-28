# Base image
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used for package.json AND package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install 

# Bundle app source 
COPY . .

# Creates a "dist" folder with the build
RUN npm run build

EXPOSE 3001

# Start the server using the build

CMD [ "node","dist/main.js" ]

# CMD ["npm", "run", "start:dev"]
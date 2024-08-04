# Base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# If you have no build step, comment out or remove this line
# RUN npm run build

# Expose the port (if applicable)
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]

# Use the official Node.js 16 image as the base image
FROM node:16-alpine

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production

# Copy the rest of the app's source code to the container
COPY . .

# Build the app
RUN yarn build

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000

# Expose the port that the app will run on
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]

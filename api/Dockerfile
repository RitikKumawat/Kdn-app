FROM node:20-alpine

# Set timezone
ENV TZ="Asia/Kolkata"

# Set Puppeteer Chromium path (Alpine-compatible)
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Create app directory
WORKDIR /usr/app

# Install Chromium and required dependencies for Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    yarn

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the project
COPY . .

# Build the project (e.g. if using TypeScript or a bundler)
RUN yarn build

# Install PM2 globally
RUN yarn global add pm2

# Expose your app's port
EXPOSE 3000

# Start the app with PM2
CMD ["pm2-runtime", "dist/app.js"]

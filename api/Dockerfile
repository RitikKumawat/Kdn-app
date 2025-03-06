FROM node:18-bullseye

# Install Chrome
RUN apt-get update && apt-get install -y wget
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb

# Set working directory
WORKDIR /app
COPY . .

# Install dependencies
RUN npm install

# Start server
CMD ["node", "server.js"]

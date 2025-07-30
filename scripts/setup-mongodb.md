# MongoDB Setup Guide

## Option 1: Local MongoDB Installation

### Windows
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. Start MongoDB service:
   ```bash
   net start MongoDB
   ```

### macOS
1. Install using Homebrew:
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```
2. Start MongoDB service:
   ```bash
   brew services start mongodb-community
   ```

### Linux (Ubuntu)
1. Import MongoDB public GPG key:
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
   ```
2. Create list file for MongoDB:
   ```bash
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
   ```
3. Install MongoDB:
   ```bash
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   ```
4. Start MongoDB service:
   ```bash
   sudo systemctl start mongod
   ```

## Option 2: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update your `.env.local` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/brandpilot
   ```

## Verify Installation

Test your MongoDB connection:
```bash
mongosh
# or
mongo
```

You should see the MongoDB shell prompt. Type `exit` to quit.

## Database Setup

The application will automatically create the necessary collections when you first use it. No manual setup required! 
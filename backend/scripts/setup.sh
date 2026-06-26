#!/bin/bash
# NYDC Trading Platform - Backend Setup Script

set -e

echo "================================="
echo " NYDC Backend Setup"
echo "================================="

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 22 ]; then
  echo "ERROR: Node.js 22+ required. Found: $(node -v)"
  exit 1
fi

echo "Node.js version: $(node -v) OK"

# Install dependencies
echo -e "\n>>> Installing dependencies..."
npm install

# Copy .env if not present
if [ ! -f .env ]; then
  echo -e "\n>>> Creating .env from .env.example..."
  cp .env.example .env
  echo "Edit .env and set DATABASE_URL and JWT_SECRET before continuing."
fi

# Generate Prisma client
echo -e "\n>>> Generating Prisma client..."
npm run prisma:generate

# Run migrations
echo -e "\n>>> Running Prisma migrations..."
npm run prisma:migrate

# Seed database
echo -e "\n>>> Seeding database..."
npm run prisma:seed

echo -e "\n================================="
echo " Setup complete!"
echo " Run: npm run dev"
echo " API: http://localhost:5000/api/v1"
echo " Health: http://localhost:5000/api/v1/health"
echo "================================="

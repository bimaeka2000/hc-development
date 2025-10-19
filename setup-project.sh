#!/bin/bash

# Hentikan script jika ada error
set -e

echo "🔄 Switching to branch a..."
git checkout backup

echo "⬇️ Pulling latest changes..."
git pull origin backup

echo "📦 Installing dependencies..."
npm install

echo "🧱 Running migrations..."
node ace migration:run --force

echo "🌱 Seeding database..."
node ace db:seed --force

echo "✅ Setup completed successfully!"

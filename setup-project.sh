#!/bin/bash

# Hentikan script jika ada error
set -e

echo "📦 Installing dependencies..."
npm install

echo "🧱 Running migrations..."
node ace migration:fresh

echo "🌱 Seeding database..."
node ace db:seed

echo "✅ Setup completed successfully!"

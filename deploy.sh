#!/bin/bash

# Production Deployment Script for Next.js Dashboard Demo
# This script handles building and deploying the application with PM2

set -e  # Exit on any error

echo "🚀 Starting deployment process..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Node.js version: $(node --version)"
print_status "npm version: $(npm --version)"
echo ""

# Install dependencies
print_status "Installing dependencies..."
npm ci || npm install
print_success "Dependencies installed"
echo ""

# Run linting
print_status "Running ESLint..."
if npm run lint; then
    print_success "Linting passed"
else
    print_warning "Linting failed, but continuing..."
fi
echo ""

# Run type checking
print_status "Running TypeScript type check..."
if npm run type-check; then
    print_success "Type checking passed"
else
    print_error "Type checking failed"
    exit 1
fi
echo ""

# Build the application
print_status "Building Next.js application..."
if npm run build; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi
echo ""

# Check if PM2 is managing any processes
if npm run pm2:status &> /dev/null; then
    print_status "Existing PM2 processes detected"
    print_status "Reloading with zero-downtime..."
    npm run pm2:reload
    print_success "Application reloaded with zero-downtime"
else
    print_status "No existing PM2 processes found"
    print_status "Starting fresh PM2 instance..."
    npm run pm2:start
    print_success "Application started with PM2"
fi
echo ""

# Show status
print_status "Current PM2 status:"
npm run pm2:status
echo ""

print_success "Deployment completed successfully! 🎉"
print_status "Application is running on port 3000"
print_status "View logs: npm run pm2:logs"
print_status "Monitor: npm run pm2:monit"
echo ""

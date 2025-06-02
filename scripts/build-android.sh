
#!/bin/bash

echo "🚀 Building Streak Radar Android App..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
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

print_status "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi

print_status "Building React app..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Failed to build React app"
    exit 1
fi

print_status "Adding Android platform..."
npx cap add android 2>/dev/null || print_warning "Android platform already exists"

print_status "Syncing Capacitor..."
npx cap sync android

if [ $? -ne 0 ]; then
    print_error "Failed to sync Capacitor"
    exit 1
fi

print_status "Opening Android Studio..."
npx cap open android

print_status "✅ Build process completed!"
print_status "Next steps:"
echo "1. In Android Studio, click 'Run' to test on device/emulator"
echo "2. For APK: Build → Build Bundle(s) / APK(s) → Build APK(s)"
echo "3. For Play Store: Build → Generate Signed Bundle / APK"

echo ""
print_status "📱 Your Android app is ready!"

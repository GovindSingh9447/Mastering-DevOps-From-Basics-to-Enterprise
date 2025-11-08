#!/bin/bash

# Script to start the documentation website server from the repository root
# The website is now served from root (/) instead of /docs/

echo "🚀 Starting DevOps Documentation Website..."
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Using Python 3"
    echo "📖 Server starting at http://localhost:8000"
    echo "📁 Serving from: $SCRIPT_DIR"
    echo "🌐 Open: http://localhost:8000"
    echo "🛑 Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
# Check if Python 2 is available
elif command -v python &> /dev/null; then
    echo "✅ Using Python 2"
    echo "📖 Server starting at http://localhost:8000"
    echo "📁 Serving from: $SCRIPT_DIR"
    echo "🌐 Open: http://localhost:8000"
    echo "🛑 Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer 8000
else
    echo "❌ Error: Python is not installed"
    echo "Please install Python 3 to run this server"
    exit 1
fi


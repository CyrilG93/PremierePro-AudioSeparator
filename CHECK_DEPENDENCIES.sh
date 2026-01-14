#!/bin/bash
# Audio Separator - Dependency Checker for macOS
# Run this to verify all dependencies are installed correctly

echo "========================================"
echo "Audio Separator - Dependency Checker"
echo "========================================"
echo ""

ALL_OK=1

# Check Node.js
echo "[1/4] Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "  [OK] Node.js: $NODE_VERSION"
else
    echo "  [MISSING] Node.js not found"
    echo "  Install with: brew install node"
    ALL_OK=0
fi
echo ""

# Check Python
echo "[2/4] Checking Python..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo "  [OK] $PYTHON_VERSION"
elif command -v python &> /dev/null; then
    PYTHON_VERSION=$(python --version)
    echo "  [OK] $PYTHON_VERSION"
else
    echo "  [MISSING] Python not found"
    echo "  Install with: brew install python@3.11"
    ALL_OK=0
fi
echo ""

# Check Demucs
echo "[3/4] Checking Demucs..."
if python3 -m demucs --help &> /dev/null; then
    echo "  [OK] Demucs is installed"
else
    echo "  [MISSING] Demucs not found"
    echo "  Install with: pip3 install demucs"
    ALL_OK=0
fi
echo ""

# Check ffmpeg
echo "[4/4] Checking ffmpeg..."
if command -v ffmpeg &> /dev/null; then
    FFMPEG_VERSION=$(ffmpeg -version 2>&1 | head -n1 | awk '{print $3}')
    echo "  [OK] ffmpeg: $FFMPEG_VERSION"
else
    echo "  [OPTIONAL] ffmpeg not found"
    echo "  Install with: brew install ffmpeg"
fi
echo ""

# Check extension installation
echo "[BONUS] Checking extension installation..."
EXTENSION_PATH="/Library/Application Support/Adobe/CEP/extensions/PremierePro-AudioSeparator"
if [ -d "$EXTENSION_PATH" ]; then
    echo "  [OK] Extension installed at correct location"
else
    echo "  [WARNING] Extension not found in standard location"
    echo "  Expected: $EXTENSION_PATH"
fi
echo ""

# Check CEP debug mode
echo "[BONUS] Checking CEP debug mode..."
DEBUG_MODE=$(defaults read com.adobe.CSXS.11 PlayerDebugMode 2>/dev/null)
if [ "$DEBUG_MODE" = "1" ]; then
    echo "  [OK] CEP debug mode is enabled"
else
    echo "  [WARNING] CEP debug mode may not be enabled"
    echo "  Run: defaults write com.adobe.CSXS.11 PlayerDebugMode 1"
fi
echo ""

echo "========================================"
if [ "$ALL_OK" = "1" ]; then
    echo "Result: ALL DEPENDENCIES INSTALLED!"
    echo ""
    echo "You're ready to use Audio Separator!"
    echo "Open Premiere Pro and go to Window > Extensions > Audio Separator"
else
    echo "Result: MISSING DEPENDENCIES"
    echo ""
    echo "Please install the missing dependencies listed above"
    echo "Then run this checker again to verify"
fi
echo "========================================"
echo ""

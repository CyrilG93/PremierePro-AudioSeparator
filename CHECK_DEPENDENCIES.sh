#!/bin/bash
# Audio Separator - Dependency Checker (macOS)
# Verifies Python 3.11, FFmpeg, and Configuration

echo "========================================"
echo "Audio Separator - Dependency Checker"
echo "========================================"
echo ""

ALL_OK=1

# 1. Check Python 3.11
echo "[1/4] Checking Python 3.11..."
PYTHON_PATH=""
# Logic matching the installer
check_paths=(
    "/usr/local/bin/python3.11"
    "/opt/homebrew/bin/python3.11"
    "/Library/Frameworks/Python.framework/Versions/3.11/bin/python3.11"
)

for p in "${check_paths[@]}"; do
    if [ -f "$p" ] && [ -x "$p" ]; then
        PYTHON_PATH="$p"
        break
    fi
done

if [ -z "$PYTHON_PATH" ]; then
    if command -v python3.11 &> /dev/null; then
        PYTHON_PATH=$(which python3.11)
    fi
fi

if [ -n "$PYTHON_PATH" ]; then
    VER=$("$PYTHON_PATH" --version)
    echo "  [OK] Found: $VER"
    echo "       Path: $PYTHON_PATH"
else
    echo "  [MISSING] Python 3.11 not found!"
    echo "  The plugin specifically requires Python 3.11."
    ALL_OK=0
fi
echo ""

# 2. Check FFmpeg
echo "[2/4] Checking FFmpeg..."
if command -v ffmpeg &> /dev/null; then
    echo "  [OK] FFmpeg found in PATH"
else
    # Check if a path is in config? We'll check config next.
    echo "  [WARNING] FFmpeg not found in global PATH"
    # Not fatal if config points to it, but good to have
fi
echo ""

# 3. Check Demucs
echo "[3/4] Checking Demucs..."
if [ -n "$PYTHON_PATH" ]; then
    if "$PYTHON_PATH" -m pip show demucs &> /dev/null; then
        echo "  [OK] Demucs is installed"
    else
        echo "  [MISSING] Demucs package not found in Python 3.11 environment"
        ALL_OK=0
    fi
else
    echo "  [SKIPPED] Cannot check Demucs without Python 3.11"
    ALL_OK=0
fi
echo ""

# 4. Check Config File
echo "[4/4] Checking Configuration..."
EXTENSION_PATH="/Library/Application Support/Adobe/CEP/extensions/PremierePro-AudioSeparator"
CONFIG_FILE="$EXTENSION_PATH/client/config.json"
LOCAL_CONFIG="./client/config.json"

if [ -f "$CONFIG_FILE" ]; then
    echo "  [OK] Global config found: $CONFIG_FILE"
    cat "$CONFIG_FILE"
elif [ -f "$LOCAL_CONFIG" ]; then
     echo "  [OK] Local config found (development): $LOCAL_CONFIG"
else
    echo "  [MISSING] config.json not found."
    echo "  Please run INSTALL_MACOS.sh to generate it."
    ALL_OK=0
fi
echo ""

echo "========================================"
if [ "$ALL_OK" = "1" ]; then
    echo "Result: SYSTEM READY! ✓"
else
    echo "Result: ISSUES DETECTED ✗"
    echo "Please run INSTALL_MACOS.sh to fix configuration."
fi
echo "========================================"
echo ""

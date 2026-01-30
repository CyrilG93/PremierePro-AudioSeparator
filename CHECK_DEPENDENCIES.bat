@echo off
:: Audio Separator - Dependency Checker (Windows)
:: Verifies Python 3.11, FFmpeg, and Configuration

echo ========================================
echo Audio Separator - Dependency Checker
echo ========================================
echo.

set "ALL_OK=1"

:: 1. Check Python 3.11
echo [1/4] Checking Python 3.11...
set "PYTHON_PATH="

:: Check common paths
set "CHECK_PATHS=C:\Python311\python.exe;%LOCALAPPDATA%\Programs\Python\Python311\python.exe;C:\Program Files\Python311\python.exe;C:\Program Files (x86)\Python311\python.exe"
for %%p in (%CHECK_PATHS%) do (
    if exist "%%p" set "PYTHON_PATH=%%p"
)

if not defined PYTHON_PATH (
    py -3.11 --version >nul 2>&1
    if %errorlevel% equ 0 (
        for /f "tokens=*" %%i in ('py -3.11 -c "import sys; print(sys.executable)"') do set "PYTHON_PATH=%%i"
    )
)

if defined PYTHON_PATH (
    echo   [OK] Found Python 3.11: %PYTHON_PATH%
) else (
    echo   [MISSING] Python 3.11 not found!
    set "ALL_OK=0"
)
echo.

:: 2. Check FFmpeg
echo [2/4] Checking FFmpeg...
ffmpeg -version >nul 2>&1
if %errorlevel% equ 0 (
    echo   [OK] FFmpeg found in PATH
) else (
    echo   [WARNING] FFmpeg not found in global PATH.
    echo             (If configured in config.json, this is fine)
)
echo.

:: 3. Check Demucs
echo [3/4] Checking Demucs...
if defined PYTHON_PATH (
    "%PYTHON_PATH%" -m pip show demucs >nul 2>&1
    if %errorlevel% equ 0 (
        echo   [OK] Demucs is installed
    ) else (
        echo   [MISSING] Demucs package not found
        set "ALL_OK=0"
    )
) else (
    echo   [SKIPPED] Cannot check Demucs (Python missing)
)
echo.

:: 4. Check Config File
echo [4/4] Checking Configuration...
set "EXTENSION_PATH=%ProgramFiles(x86)%\Common Files\Adobe\CEP\extensions\PremierePro-AudioSeparator"
set "CONFIG_FILE=%EXTENSION_PATH%\client\config.json"
set "LOCAL_CONFIG=client\config.json"

if exist "%CONFIG_FILE%" (
    echo   [OK] Global config found:
    echo        %CONFIG_FILE%
    type "%CONFIG_FILE%"
) else (
    if exist "%LOCAL_CONFIG%" (
        echo   [OK] Local config found (development): %LOCAL_CONFIG%
    ) else (
        echo   [MISSING] config.json not found.
        echo             Run INSTALL_WINDOWS.bat to create it.
        set "ALL_OK=0"
    )
)
echo.

echo ========================================
if "%ALL_OK%"=="1" (
    echo Result: SYSTEM READY!
) else (
    echo Result: ISSUES DETECTED
    echo Please run INSTALL_WINDOWS.bat to fix.
)
echo ========================================
echo.
pause

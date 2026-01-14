@echo off
:: Audio Separator - Dependency Checker for Windows
:: Run this to verify all dependencies are installed correctly

echo ========================================
echo Audio Separator - Dependency Checker
echo ========================================
echo.

set "ALL_OK=1"

:: Check Node.js
echo [1/4] Checking Node.js...
node --version >nul 2>&1
if %errorLevel% equ 0 (
    for /f "tokens=*" %%i in ('node --version') do echo   [OK] Node.js: %%i
) else (
    echo   [MISSING] Node.js not found
    echo   Download from: https://nodejs.org/
    set "ALL_OK=0"
)
echo.

:: Check Python
echo [2/4] Checking Python...
python --version >nul 2>&1
if %errorLevel% equ 0 (
    for /f "tokens=*" %%i in ('python --version') do echo   [OK] %%i
) else (
    echo   [MISSING] Python not found
    echo   Download from: https://www.python.org/downloads/
    set "ALL_OK=0"
)
echo.

:: Check Demucs
echo [3/4] Checking Demucs...
python -m demucs --help >nul 2>&1
if %errorLevel% equ 0 (
    echo   [OK] Demucs is installed
) else (
    echo   [MISSING] Demucs not found
    echo   Install with: pip install demucs
    set "ALL_OK=0"
)
echo.

:: Check ffmpeg
echo [4/4] Checking ffmpeg...
ffmpeg -version >nul 2>&1
if %errorLevel% equ 0 (
    echo   [OK] ffmpeg is installed
) else (
    echo   [OPTIONAL] ffmpeg not found
    echo   Download from: https://ffmpeg.org/download.html
)
echo.

:: Check extension installation
echo [BONUS] Checking extension installation...
if exist "%ProgramFiles(x86)%\Common Files\Adobe\CEP\extensions\PremierePro-AudioSeparator" (
    echo   [OK] Extension installed at correct location
) else (
    echo   [WARNING] Extension not found in standard location
    echo   Expected: %ProgramFiles(x86)%\Common Files\Adobe\CEP\extensions\PremierePro-AudioSeparator
)
echo.

echo ========================================
if "%ALL_OK%"=="1" (
    echo Result: ALL DEPENDENCIES INSTALLED!
    echo.
    echo You're ready to use Audio Separator!
    echo Open Premiere Pro and go to Window ^> Extensions ^> Audio Separator
) else (
    echo Result: MISSING DEPENDENCIES
    echo.
    echo Please install the missing dependencies listed above
    echo Then run this checker again to verify
)
echo ========================================
echo.

pause

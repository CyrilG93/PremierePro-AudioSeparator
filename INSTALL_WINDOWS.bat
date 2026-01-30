@echo off
REM Audio Separator for Premiere Pro - Windows Installer
REM Version 2.3.0

echo.
echo ========================================
echo Audio Separator for Premiere Pro
echo Installation Package v2.3.0 - Windows
echo ========================================
echo.

REM Request Administrator Privileges
NET FILE 1>NUL 2>NUL
if '%errorlevel%' == '0' ( goto :admin ) else ( goto :uac )

:uac
echo Requesting administrator privileges...
powershell Start-Process -FilePath "%0" -ArgumentList "%cd%" -Verb RunAs
exit /b

:admin
REM Get script directory (handle if run as admin from diff path)
pushd "%~dp0"
set "SOURCE_DIR=%~dp0"
REM Remove trailing backslash if exists
if "%SOURCE_DIR:~-1%"=="\" set "SOURCE_DIR=%SOURCE_DIR:~0,-1%"

set "EXTENSION_PATH=%ProgramFiles(x86)%\Common Files\Adobe\CEP\extensions\PremierePro-AudioSeparator"
set "CONFIG_FILE=%EXTENSION_PATH%\config.json"

echo Source directory: %SOURCE_DIR%
echo Target directory: %EXTENSION_PATH%
echo.

echo ========================================
echo Step 1/5: Checking Python 3.11
echo ========================================
echo.

set "PYTHON_PATH="

REM Check common installation paths for Python 3.11 specifically
REM We check specific 3.11 folders to ensure compatibility with Demucs

set "CHECK_PATHS=C:\Python311\python.exe;%LOCALAPPDATA%\Programs\Python\Python311\python.exe;C:\Program Files\Python311\python.exe;C:\Program Files (x86)\Python311\python.exe"

for %%p in (%CHECK_PATHS%) do (
    if exist "%%p" (
        set "PYTHON_PATH=%%p"
        goto :found_python
    )
)

REM Try finding py launcher with 3.11
py -3.11 --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('py -3.11 -c "import sys; print(sys.executable)"') do set "PYTHON_PATH=%%i"
    goto :found_python
)

REM If still not found, check if plain 'python' is 3.11
python --version 2>&1 | findstr "3.11" >nul
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('where python') do (
        set "PYTHON_PATH=%%i"
        goto :found_python
    )
)

:found_python

if defined PYTHON_PATH (
    echo [OK] Python 3.11 found: %PYTHON_PATH%
) else (
    echo [MISSING] Python 3.11 not found!
    echo.
    echo Audio Separator STRICTLY requires Python 3.11 (not 3.12+).
    echo.
    echo Please download and install Python 3.11.8 for Windows from:
    echo https://www.python.org/downloads/release/python-3118/
    echo.
    echo IMPORTANT: Check "Add Python to PATH" during installation.
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Step 2/5: Checking FFmpeg
echo ========================================
echo.

set "FFMPEG_PATH="
ffmpeg -version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('where ffmpeg') do set "FFMPEG_PATH=%%i"
    echo [OK] FFmpeg found in PATH.
) else (
    REM Check common paths
    if exist "C:\ffmpeg\bin\ffmpeg.exe" set "FFMPEG_PATH=C:\ffmpeg\bin\ffmpeg.exe"
    if exist "C:\Program Files\ffmpeg\bin\ffmpeg.exe" set "FFMPEG_PATH=C:\Program Files\ffmpeg\bin\ffmpeg.exe"
)

if defined FFMPEG_PATH (
    echo      Path: %FFMPEG_PATH%
) else (
    echo [MISSING] FFmpeg not found!
    echo.
    echo Please download FFmpeg and add it to your System PATH.
    echo Or install it to C:\ffmpeg\bin\ffmpeg.exe
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Step 3/5: Installing Demucs
echo ========================================
echo.

echo Installing/Updating Demucs...
"%PYTHON_PATH%" -m pip install -U demucs --quiet
if %errorlevel% equ 0 (
    echo [OK] Demucs installed successfully.
) else (
    echo [ERROR] Failed to install Demucs.
    echo Check internet connection.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Step 4/5: Installing Extension Files
echo ========================================
echo.

if not exist "%EXTENSION_PATH%" mkdir "%EXTENSION_PATH%"

echo Copying extension files...
xcopy /E /I /Y "%SOURCE_DIR%\client" "%EXTENSION_PATH%\client" >nul
xcopy /E /I /Y "%SOURCE_DIR%\host" "%EXTENSION_PATH%\host" >nul
xcopy /E /I /Y "%SOURCE_DIR%\CSXS" "%EXTENSION_PATH%\CSXS" >nul

if exist "%SOURCE_DIR%\.debug" copy /Y "%SOURCE_DIR%\.debug" "%EXTENSION_PATH%\" >nul
if exist "%SOURCE_DIR%\README.md" copy /Y "%SOURCE_DIR%\README.md" "%EXTENSION_PATH%\" >nul

echo [OK] Files installed.

echo Enabling CEP Debug Mode...
reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.10" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.11" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.12" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.13" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.14" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.15" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.16" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
echo [OK] Debug mode enabled.

echo.
echo ========================================
echo Step 5/5: Auto-Configuration
echo ========================================
echo.

echo Generating config.json...

REM Escape backslashes for JSON
set "JSON_PYTHON=%PYTHON_PATH:\=\\%"
set "JSON_FFMPEG=%FFMPEG_PATH:\=\\%"

(
echo {
echo   "pythonPath": "%JSON_PYTHON%",
echo   "ffmpegPath": "%JSON_FFMPEG%"
echo }
) > "%CONFIG_FILE%"

if exist "%CONFIG_FILE%" (
    echo [OK] Configuration saved.
    echo      Python: %PYTHON_PATH%
    echo      FFmpeg: %FFMPEG_PATH%
) else (
    echo [ERROR] Could not write config file.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo 1. Restart Adobe Premiere Pro
echo 2. Open Window ^> Extensions ^> Audio Separator
echo.
pause

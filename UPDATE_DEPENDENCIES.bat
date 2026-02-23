@echo off
:: Audio Separator - Dependency Updater (Windows)
:: Updates install/runtime dependencies without reinstalling the extension

title Audio Separator - Dependency Updater

echo ========================================
echo Audio Separator - Dependency Updater
echo ========================================
echo.

set "UPDATES_DONE=0"
set "PYTHON_PATH="

:: Reuse the installer's Python 3.11 lookup logic so Demucs is upgraded in the right interpreter.
py -3.11 --version >nul 2>&1
if %errorlevel% EQU 0 (
    for /f "tokens=*" %%i in ('py -3.11 -c "import sys; print(sys.executable)"') do set "PYTHON_PATH=%%i"
)

if not defined PYTHON_PATH (
    python --version 2>&1 | findstr "3.11" >nul
    if %errorlevel% EQU 0 (
        for /f "tokens=*" %%i in ('where python 2^>nul') do set "PYTHON_PATH=%%i" & goto :python_found
    )
)

if not defined PYTHON_PATH if exist "C:\Python311\python.exe" set "PYTHON_PATH=C:\Python311\python.exe"
if not defined PYTHON_PATH if exist "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" set "PYTHON_PATH=%LOCALAPPDATA%\Programs\Python\Python311\python.exe"
if not defined PYTHON_PATH if exist "C:\Program Files\Python311\python.exe" set "PYTHON_PATH=C:\Program Files\Python311\python.exe"
if not defined PYTHON_PATH if exist "C:\Program Files (x86)\Python311\python.exe" set "PYTHON_PATH=C:\Program Files (x86)\Python311\python.exe"

:python_found

:: 1. Update pip (Python 3.11)
echo [1/3] Updating pip (Python 3.11)...
if defined PYTHON_PATH (
    echo   Python: %PYTHON_PATH%
    "%PYTHON_PATH%" -m pip install --upgrade pip 2>&1
    if errorlevel 1 (
        echo   [ERROR] Failed to update pip
    ) else (
        echo   [OK] pip updated (or already latest)
        set /a UPDATES_DONE+=1
    )
) else (
    echo   [MISSING] Python 3.11 not found. Run INSTALL_WINDOWS.bat after installing Python 3.11.
)
echo.

:: 2. Update Demucs
echo [2/3] Updating Demucs...
if defined PYTHON_PATH (
    "%PYTHON_PATH%" -m pip show demucs >nul 2>&1
    if errorlevel 1 (
        echo   [MISSING] Demucs is not installed in Python 3.11.
        echo   Run INSTALL_WINDOWS.bat first.
    ) else (
        for /f "tokens=2" %%i in ('"%PYTHON_PATH%" -m pip show demucs 2^>nul ^| findstr /B "Version:"') do echo   Current version: %%i
        "%PYTHON_PATH%" -m pip install --upgrade demucs 2>&1
        if errorlevel 1 (
            echo   [ERROR] Failed to update Demucs
        ) else (
            echo   [OK] Demucs updated (or already latest)
            set /a UPDATES_DONE+=1
        )
    )
) else (
    echo   [SKIPPED] Python 3.11 missing
)
echo.

:: 3. Update ffmpeg (best effort)
echo [3/3] Updating ffmpeg...
ffmpeg -version >nul 2>&1
if errorlevel 1 (
    echo   [MISSING] ffmpeg not found. Run INSTALL_WINDOWS.bat after installing ffmpeg.
) else (
    for /f "tokens=3" %%i in ('ffmpeg -version ^| findstr "ffmpeg version"') do echo   Current version: %%i
    winget --version >nul 2>&1
    if errorlevel 1 (
        echo   [INFO] winget not available. Update ffmpeg manually on Windows if needed.
        echo   Download latest from: https://www.gyan.dev/ffmpeg/builds/
    ) else (
        echo   Trying update with winget (Gyan.FFmpeg)...
        winget upgrade --id Gyan.FFmpeg -e --accept-source-agreements --accept-package-agreements 2>&1
        if errorlevel 1 (
            echo   [INFO] winget could not auto-update ffmpeg ^(non-blocking^)
            echo   Download latest from: https://www.gyan.dev/ffmpeg/builds/
        ) else (
            echo   [OK] ffmpeg update command completed ^(verify version above if needed^)
            set /a UPDATES_DONE+=1
        )
    )
)
echo.

echo ========================================
if %UPDATES_DONE% GTR 0 (
    echo Done! %UPDATES_DONE% dependency(ies) updated.
) else (
    echo Done! All dependencies are already up to date ^(or require manual install/update^).
)
echo ========================================
echo.
echo Press any key to exit...
pause >nul

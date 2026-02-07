@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul 2>&1

echo ========================================
echo Diagnostic - Installation Demucs
echo ========================================
echo.

set "LOGFILE=%~dp0diagnostic_log.txt"
echo Diagnostic started at %date% %time% > "%LOGFILE%"
echo System info: >> "%LOGFILE%"
echo. >> "%LOGFILE%"

echo [1/6] Checking Python...
python --version >> "%LOGFILE%" 2>&1
if !errorlevel! NEQ 0 (
    echo [ERREUR] Python non trouve!
    echo Python not found >> "%LOGFILE%"
    goto :end
)
for /f "tokens=*" %%i in ('python --version 2^>^&1') do echo [OK] %%i

echo.
echo [2/6] Checking Python path...
python -c "import sys; print(sys.executable)" >> "%LOGFILE%" 2>&1
for /f "tokens=*" %%i in ('python -c "import sys; print(sys.executable)"') do echo     Path: %%i
echo Python path: >> "%LOGFILE%"
python -c "import sys; print(sys.executable)" >> "%LOGFILE%"

echo.
echo [3/6] Checking pip...
python -m pip --version >> "%LOGFILE%" 2>&1
if !errorlevel! NEQ 0 (
    echo [ERREUR] pip non trouve!
    goto :end
)
for /f "tokens=*" %%i in ('python -m pip --version 2^>^&1') do echo [OK] %%i

echo.
echo [4/6] Checking installed packages...
echo Installed packages: >> "%LOGFILE%"
python -m pip list | findstr -i "torch demucs torchaudio" >> "%LOGFILE%" 2>&1
python -m pip list | findstr -i "torch demucs torchaudio"

echo.
echo [5/6] Testing demucs import...
echo Testing demucs import: >> "%LOGFILE%"
python -c "import demucs; print('Demucs import OK')" >> "%LOGFILE%" 2>&1
if !errorlevel! NEQ 0 (
    echo [ERREUR] Demucs ne peut pas etre importe
    echo Testing torch import... >> "%LOGFILE%"
    python -c "import torch; print('Torch OK')" >> "%LOGFILE%" 2>&1
    if !errorlevel! NEQ 0 (
        echo [ERREUR] PyTorch ne peut pas etre importe
        echo Torch import failed >> "%LOGFILE%"
    ) else (
        echo [OK] PyTorch OK mais Demucs echoue
    )
) else (
    echo [OK] Demucs import OK
)

echo.
echo [6/6] Testing demucs --help...
echo Testing demucs --help: >> "%LOGFILE%"
python -m demucs --help >> "%LOGFILE%" 2>&1
if !errorlevel! NEQ 0 (
    echo [ERREUR] demucs --help echoue - Erreur complete dans le log
    echo.
    echo Erreur detaillee:
    python -m demucs --help 2>&1
) else (
    echo [OK] demucs --help fonctionne
)

:end
echo.
echo ========================================
echo Diagnostic termine!
echo ========================================
echo.
echo Log complet: %LOGFILE%
echo.
echo Copiez le contenu du fichier diagnostic_log.txt 
echo pour le partager et obtenir de l'aide.
echo.
pause

@echo off
:: Audio Separator - Windows Installation Script
:: Version 2.1.0

title Audio Separator - Installation

echo.
echo ========================================
echo Audio Separator - Installation Windows
echo ========================================
echo.

:: Check for administrator privileges
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
if '%errorlevel%' NEQ '0' (
    echo.
    echo ERREUR: Privileges administrateur requis!
    echo.
    echo Clic droit sur install-windows.bat
    echo et selectionnez "Executer en tant qu'administrateur"
    echo.
    pause
    exit /b 1
)

echo [OK] Execution avec privileges administrateur
echo.

:: Step 1: Check Node.js
echo Etape 1/5 : Verification de Node.js...
node --version >nul 2>&1
if %errorlevel% EQU 0 (
    for /f "tokens=*" %%i in ('node --version') do echo [OK] Node.js: %%i
) else (
    echo [MANQUANT] Node.js n'est pas installe
    echo.
    echo Veuillez installer Node.js depuis: https://nodejs.org/
    echo Puis relancez ce script.
    echo.
    pause
    exit /b 1
)

:: Step 2: Check Python
echo.
echo Etape 2/5 : Verification de Python...
python --version >nul 2>&1
if %errorlevel% EQU 0 (
    for /f "tokens=*" %%i in ('python --version') do echo [OK] %%i
) else (
    echo [MANQUANT] Python n'est pas installe
    echo.
    echo Veuillez installer Python depuis: https://www.python.org/downloads/
    echo IMPORTANT: Cochez "Add Python to PATH" pendant l'installation!
    echo Puis relancez ce script.
    echo.
    pause
    exit /b 1
)

:: Step 3: Install Demucs
echo.
echo Etape 3/5 : Installation de Demucs...
python -m demucs --help >nul 2>&1
if %errorlevel% EQU 0 (
    echo [OK] Demucs est deja installe
    echo Mise a jour vers la derniere version...
    python -m pip install --upgrade demucs --quiet
) else (
    echo Installation de Demucs en cours (peut prendre quelques minutes)...
    python -m pip install demucs
    if %errorlevel% EQU 0 (
        echo [OK] Demucs installe avec succes
    ) else (
        echo [ERREUR] Echec de l'installation de Demucs
        echo Essayez manuellement: pip install demucs
        pause
        exit /b 1
    )
)

:: Step 4: Check ffmpeg
echo.
echo Etape 4/5 : Verification de ffmpeg...
ffmpeg -version >nul 2>&1
if %errorlevel% EQU 0 (
    echo [OK] ffmpeg est installe
) else (
    echo [OPTIONNEL] ffmpeg n'est pas installe
    echo.
    echo ffmpeg est recommande pour de meilleures performances.
    echo Pour l'installer:
    echo 1. Telechargez depuis: https://www.gyan.dev/ffmpeg/builds/
    echo 2. Extrayez le ZIP
    echo 3. Copiez le contenu de bin vers C:\ffmpeg\bin\
    echo 4. Ajoutez C:\ffmpeg\bin au PATH systeme
    echo.
    echo Appuyez sur une touche pour continuer sans ffmpeg...
    pause >nul
)

:: Step 5: Copy plugin files
echo.
echo Etape 5/5 : Installation du plugin...

set "SOURCE_DIR=%~dp0"
set "EXTENSION_PATH=%ProgramFiles(x86)%\Common Files\Adobe\CEP\extensions\PremierePro-AudioSeparator"

:: Check if source files exist
if not exist "%SOURCE_DIR%client" (
    echo ERREUR: Fichiers du plugin non trouves!
    echo Ce script doit etre execute depuis le dossier du plugin.
    pause
    exit /b 1
)

:: Create extension directory
if not exist "%EXTENSION_PATH%" (
    echo Creation du dossier des extensions...
    mkdir "%EXTENSION_PATH%"
)

:: Copy files
echo Copie des fichiers du plugin...
xcopy /Y /E /I /Q "%SOURCE_DIR%client" "%EXTENSION_PATH%\client\" >nul
xcopy /Y /E /I /Q "%SOURCE_DIR%host" "%EXTENSION_PATH%\host\" >nul
xcopy /Y /E /I /Q "%SOURCE_DIR%CSXS" "%EXTENSION_PATH%\CSXS\" >nul

if exist "%SOURCE_DIR%.debug" copy /Y "%SOURCE_DIR%.debug" "%EXTENSION_PATH%\.debug" >nul
if exist "%SOURCE_DIR%README.md" copy /Y "%SOURCE_DIR%README.md" "%EXTENSION_PATH%\README.md" >nul

echo [OK] Fichiers du plugin copies

:: Enable debug mode in registry
echo.
echo Activation du mode debug CEP...
reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.11" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1
reg add "HKEY_CURRENT_USER\Software\Adobe\CSXS.12" /v PlayerDebugMode /t REG_SZ /d 1 /f >nul 2>&1

if %errorlevel% EQU 0 (
    echo [OK] Mode debug active
) else (
    echo [AVERTISSEMENT] Impossible d'activer le mode debug automatiquement
)

echo.
echo ========================================
echo Installation terminee avec succes!
echo ========================================
echo.
echo Prochaines etapes:
echo 1. Redemarrez Adobe Premiere Pro
echo 2. Allez dans Fenetre ^> Extensions ^> Audio Separator
echo 3. Selectionnez un clip audio
echo 4. Cliquez sur "Separer l'audio"
echo.
echo Pour plus d'informations, consultez README.md
echo.
pause

# 🎵 Audio Separator v2.1 - Premiere Pro Plugin

Professional plugin to separate audio tracks into stems (vocals, instrumental, drums, bass) directly in Adobe Premiere Pro, powered by Demucs AI.

**[English](#english)** | **[Français](#français)**

---

# English

## 📋 Requirements

This extension needs the following tools installed on your computer:

| Tool | Why is it needed? | Installed by script? |
|------|-------------------|---------------------|
| **Node.js** | Required by Adobe CEP to run the extension | ❌ Manual |
| **Python 3.11+** | Required to run Demucs AI model | ❌ Manual |
| **Demucs** | AI audio separation model (Facebook Research) | ✅ Automatic |
| **ffmpeg** | Better audio processing performance | ✅ Automatic (optional) |

> **Important**: Node.js and Python must be installed BEFORE running the installation script.

---

## 🚀 Installation

### macOS Installation

#### Step 1: Install Prerequisites

Open Terminal and install via Homebrew:

```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# For Apple Silicon (M1/M2/M3), add Homebrew to PATH:
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# Install Node.js and Python
brew install node python@3.11
```

#### Step 2: Run the Installer

```bash
cd /path/to/PremierePro-AudioSeparator
chmod +x install-mac.sh
./install-mac.sh
```

The installer will:
- ✅ Verify Python is installed
- ✅ Install Demucs automatically
- ✅ Install ffmpeg (optional, recommended)
- ✅ Copy extension to Adobe CEP folder
- ✅ Enable debug mode

#### Step 3: Restart Premiere Pro

Go to **Window** > **Extensions** > **Audio Separator**

---

### Windows Installation

#### Step 1: Install Prerequisites

1. **Download and install Node.js**: https://nodejs.org/
   - Choose the LTS version
   - Use default installation options

2. **Download and install Python 3.11**: https://www.python.org/downloads/
   - ⚠️ **IMPORTANT**: Check **"Add Python to PATH"** during installation!

#### Step 2: Run the Installer

1. Right-click `install-windows.bat` → **Run as administrator**
2. Follow the on-screen instructions

The installer will:
- ✅ Verify Node.js and Python are installed
- ✅ Install Demucs via pip
- ✅ Check for ffmpeg (will guide you to install if missing)
- ✅ Copy extension to Adobe CEP folder
- ✅ Enable debug mode in registry

#### Step 3: Restart Premiere Pro

Go to **Window** > **Extensions** > **Audio Separator**

---

### Manual Installation

If the automatic installers don't work:

1. **Install dependencies manually**:
   ```bash
   # Windows
   pip install demucs
   
   # macOS
   pip3 install demucs
   ```

2. **Copy the plugin folder** to:
   - **macOS**: `/Library/Application Support/Adobe/CEP/extensions/`
   - **Windows**: `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\`

3. **Enable debug mode**:
   - **macOS**: `defaults write com.adobe.CSXS.11 PlayerDebugMode 1`
   - **Windows**: Create registry key `HKEY_CURRENT_USER\Software\Adobe\CSXS.11\PlayerDebugMode` = `1`

4. **Restart Premiere Pro**

---

## ✨ Features

### Separation Modes
- 🎤 **2 Stems**: Vocals + Instrumental
- 🎸 **4 Stems**: Vocals + Drums + Bass + Other

### Performance & Quality
- ⚡ **3 Processing Modes**: Fast, Balanced (recommended), Maximum Quality
- 🚀 **GPU Support**: Automatic acceleration with NVIDIA CUDA or Apple Metal (MPS)
- 📊 **Real-time Progress**: Progress bar and elapsed time tracking
- 🎯 **Smart Output**: MP3 320kbps (recommended), WAV, or FLAC

### Premiere Pro Integration
- 📁 **Auto-import**: Separated files automatically imported to your project
- 🗂️ **Smart Organization**: Import to the same bin as the original file
- 💾 **Flexible Saving**: Next to original file or custom folder
- 🏷️ **Auto-naming**: Files named with suffixes _Voice, _Instrumental, _Drums, _Bass, _Other
- 🌍 **Bilingual**: Full English/French interface

---

## 📖 Usage

### 1. Open the Panel
In Adobe Premiere Pro: **Window** > **Extensions** > **Audio Separator**

### 2. Select an Audio Clip
1. In your timeline, select an audio clip you want to separate
2. Click the **"📁 Select audio clip"** button in the panel

### 3. Configure Options
- **Processing Mode**: Fast, Balanced, or Maximum Quality
- **Model Quality**: HTDemucs, HTDemucs Fine-tuned (recommended), or MDX Extra
- **Output Format**: MP3 320kbps (recommended), WAV, or FLAC

### 4. Start Separation
1. Click **"✨ Separate audio"**
2. Wait for processing to complete
3. Use the **"❌ Cancel"** button to stop if needed

### 5. Import to Project
Once separation is complete, files are automatically imported into your project.

---

## 🐛 Troubleshooting

### Plugin doesn't appear in Premiere Pro

1. Verify the folder is in the extensions directory
2. Enable debug mode (see installation instructions)
3. Completely restart Premiere Pro
4. Check JavaScript console logs (F12 in panel)

### Error "Python or Demucs not installed"

```bash
# macOS
python3 --version
python3 -m demucs --help

# Windows
python --version
python -m demucs --help
```

If Demucs is not found, reinstall:
```bash
# Windows
pip install demucs

# macOS
pip3 install demucs
```

### Separation fails

1. Verify source audio file is accessible
2. Ensure sufficient disk space (at least 2GB free)
3. Check write permissions in destination folder
4. Consult logs in progress panel

---

## 📝 License

This plugin uses:
- **Demucs**: MIT License - Facebook Research
- **CEP**: Adobe Common Extensibility Platform

---

**Version**: 2.1.0  
**Author**: Cyril V  

---

# Français

## 📋 Prérequis

Cette extension nécessite les outils suivants sur votre ordinateur :

| Outil | Pourquoi c'est nécessaire ? | Installé par le script ? |
|-------|----------------------------|--------------------------|
| **Node.js** | Requis par Adobe CEP pour l'extension | ❌ Manuel |
| **Python 3.11+** | Requis pour exécuter le modèle IA Demucs | ❌ Manuel |
| **Demucs** | Modèle IA de séparation audio (Facebook Research) | ✅ Automatique |
| **ffmpeg** | Meilleures performances de traitement audio | ✅ Automatique (optionnel) |

> **Important** : Node.js et Python doivent être installés AVANT d'exécuter le script d'installation.

---

## 🚀 Installation

### Installation macOS

#### Étape 1 : Installer les prérequis

Ouvrez le Terminal et installez via Homebrew :

```bash
# Installer Homebrew (si pas déjà installé)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Pour Apple Silicon (M1/M2/M3), ajouter Homebrew au PATH :
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# Installer Node.js et Python
brew install node python@3.11
```

#### Étape 2 : Exécuter l'installateur

```bash
cd /chemin/vers/PremierePro-AudioSeparator
chmod +x install-mac.sh
./install-mac.sh
```

L'installateur va :
- ✅ Vérifier que Python est installé
- ✅ Installer Demucs automatiquement
- ✅ Installer ffmpeg (optionnel, recommandé)
- ✅ Copier l'extension dans le dossier Adobe CEP
- ✅ Activer le mode debug

#### Étape 3 : Redémarrer Premiere Pro

Allez dans **Fenêtre** > **Extensions** > **Audio Separator**

---

### Installation Windows

#### Étape 1 : Installer les prérequis

1. **Télécharger et installer Node.js** : https://nodejs.org/
   - Choisir la version LTS
   - Utiliser les options d'installation par défaut

2. **Télécharger et installer Python 3.11** : https://www.python.org/downloads/
   - ⚠️ **IMPORTANT** : Cochez **"Add Python to PATH"** pendant l'installation !

#### Étape 2 : Exécuter l'installateur

1. Clic droit sur `install-windows.bat` → **Exécuter en tant qu'administrateur**
2. Suivez les instructions à l'écran

L'installateur va :
- ✅ Vérifier que Node.js et Python sont installés
- ✅ Installer Demucs via pip
- ✅ Vérifier ffmpeg (vous guidera pour l'installer si absent)
- ✅ Copier l'extension dans le dossier Adobe CEP
- ✅ Activer le mode debug dans le registre

#### Étape 3 : Redémarrer Premiere Pro

Allez dans **Fenêtre** > **Extensions** > **Audio Separator**

---

### Installation manuelle

Si les installateurs automatiques ne fonctionnent pas :

1. **Installer les dépendances manuellement** :
   ```bash
   # Windows
   pip install demucs
   
   # macOS
   pip3 install demucs
   ```

2. **Copier le dossier du plugin** vers :
   - **macOS** : `/Library/Application Support/Adobe/CEP/extensions/`
   - **Windows** : `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\`

3. **Activer le mode debug** :
   - **macOS** : `defaults write com.adobe.CSXS.11 PlayerDebugMode 1`
   - **Windows** : Créer la clé de registre `HKEY_CURRENT_USER\Software\Adobe\CSXS.11\PlayerDebugMode` = `1`

4. **Redémarrer Premiere Pro**

---

## ✨ Fonctionnalités

### Modes de séparation
- 🎤 **2 Stems** : Voix + Instrumental
- 🎸 **4 Stems** : Voix + Batterie + Basse + Autres

### Performance et qualité
- ⚡ **3 Modes de traitement** : Rapide, Équilibré (recommandé), Qualité maximale
- 🚀 **Support GPU** : Accélération automatique avec NVIDIA CUDA ou Apple Metal (MPS)
- 📊 **Progression en temps réel** : Barre de progression et temps écoulé
- 🎯 **Sortie intelligente** : MP3 320kbps (recommandé), WAV ou FLAC

### Intégration Premiere Pro
- 📁 **Import automatique** : Fichiers séparés automatiquement importés dans votre projet
- 🗂️ **Organisation intelligente** : Import dans le même dossier que le fichier original
- 💾 **Sauvegarde flexible** : À côté du fichier original ou dossier personnalisé
- 🏷️ **Nommage automatique** : Fichiers nommés avec suffixes _Voix, _Instrumental, _Batterie, _Basse, _Autres
- 🌍 **Bilingue** : Interface complète Anglais/Français

---

## 📖 Utilisation

### 1. Ouvrir le panneau
Dans Adobe Premiere Pro : **Fenêtre** > **Extensions** > **Audio Separator**

### 2. Sélectionner un clip audio
1. Dans votre timeline, sélectionnez un clip audio à séparer
2. Cliquez sur le bouton **"📁 Sélectionner un clip audio"**

### 3. Configurer les options
- **Mode de traitement** : Rapide, Équilibré ou Qualité maximale
- **Qualité du modèle** : HTDemucs, HTDemucs Fine-tuned (recommandé) ou MDX Extra
- **Format de sortie** : MP3 320kbps (recommandé), WAV ou FLAC

### 4. Lancer la séparation
1. Cliquez sur **"✨ Séparer l'audio"**
2. Attendez la fin du traitement
3. Utilisez le bouton **"❌ Annuler"** pour arrêter si nécessaire

### 5. Importer dans le projet
Une fois la séparation terminée, les fichiers sont automatiquement importés dans votre projet.

---

## 🐛 Dépannage

### Le plugin n'apparaît pas dans Premiere Pro

1. Vérifiez que le dossier est dans le répertoire des extensions
2. Activez le mode debug (voir instructions d'installation)
3. Redémarrez complètement Premiere Pro
4. Vérifiez les logs de la console JavaScript (F12 dans le panneau)

### Erreur "Python ou Demucs n'est pas installé"

```bash
# macOS
python3 --version
python3 -m demucs --help

# Windows
python --version
python -m demucs --help
```

Si Demucs n'est pas trouvé, réinstallez-le :
```bash
# Windows
pip install demucs

# macOS
pip3 install demucs
```

### La séparation échoue

1. Vérifiez que le fichier audio source est accessible
2. Assurez-vous d'avoir suffisamment d'espace disque (au moins 2 Go libres)
3. Vérifiez les permissions d'écriture dans le dossier de destination
4. Consultez les logs dans le panneau de progression

---

## 📝 Licence

Ce plugin utilise :
- **Demucs** : Licence MIT - Facebook Research
- **CEP** : Adobe Common Extensibility Platform

---

**Version** : 2.1.0  
**Auteur** : Cyril V

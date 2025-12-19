# 🎵 Audio Separator v2.1 - Premiere Pro Plugin

Professional plugin to separate audio tracks into stems (vocals, instrumental, drums, bass) directly in Adobe Premiere Pro, powered by Demucs AI.

**[English](#english)** | **[Français](#français)**

---

# English

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

### Interface
- 🎨 **Modern Design**: Dark and elegant interface
- 📊 **Detailed Logs**: Complete process tracking
- ✅ **Real-time Validation**: Option verification before processing
- ❌ **Cancel Button**: Stop processing at any time

## 📋 Requirements

### Required Software

1. **Adobe Premiere Pro 2025** (version 25.0 or higher)
2. **Python 3.11.8+** installed on your system
3. **Demucs** - AI audio separation model

### Installing Python and Demucs

#### macOS

```bash
# Install Python (if not already installed)
brew install python3

# Install Demucs
pip3 install demucs

# Verify installation
python3 -m demucs --help
```

#### Windows

```bash
# Download and install Python from python.org
# Then in terminal:

pip install demucs

# Verify installation
python -m demucs --help
```

## 🚀 Plugin Installation

### Method 1: Automatic Installation (Recommended)

#### macOS
0. Install Python 3.11.8 (included)
1. Run `install-mac.sh`
2. Follow the on-screen instructions
3. Restart Adobe Premiere Pro

#### Windows
1. Run `install-windows.bat` as Administrator
2. Follow the on-screen instructions
3. Restart Adobe Premiere Pro

### Method 2: Manual Installation

1. **Locate the CEP extensions folder**:

   **macOS**:
   ```
   /Library/Application Support/Adobe/CEP/extensions/
   ```

   **Windows**:
   ```
   C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\
   ```

2. **Copy the plugin folder**:
   - Copy the `PremierePro-AudioSeparator` folder to the extensions directory

3. **Enable debug mode** (if necessary):

   **macOS**:
   ```bash
   defaults write com.adobe.CSXS.11 PlayerDebugMode 1
   ```

   **Windows** (in registry):
   ```
   HKEY_CURRENT_USER\Software\Adobe\CSXS.11
   Create a PlayerDebugMode String key with value "1"
   ```

4. **Restart Adobe Premiere Pro**

## 📖 Usage

### 1. Open the Panel

In Adobe Premiere Pro:
- Go to **Window** > **Extensions** > **Audio Separator**

### 2. Select an Audio Clip

1. In your timeline, select an audio clip you want to separate
2. Click the **"📁 Select audio clip"** button in the panel

### 3. Configure Options

- **Processing Mode**:
  - `⚡ Fast`: 30-40% faster (quantized + segment 7)
  - `⚖️ Balanced`: Recommended (segment 7)
  - `🏆 Maximum Quality`: Best quality, slower

- **Model Quality**:
  - `HTDemucs`: Fast
  - `HTDemucs Fine-tuned`: Best (recommended)
  - `MDX Extra`: Slowest, maximum quality

- **Output Format**:
  - `MP3 320kbps`: Recommended, 10x smaller
  - `WAV`: Lossless, very large
  - `FLAC`: Lossless, compressed

### 4. Start Separation

1. Click **"✨ Separate audio"**
2. Wait for processing to complete (may take a few minutes depending on file length)
3. Use the **"❌ Cancel"** button to stop processing if needed

### 5. Import to Project

Once separation is complete:
- Click **"📥 Import to project"**
- Files will be automatically imported to an "Audio Separated" bin

## 🎯 Use Cases

- **Remixing**: Isolate vocals to create instrumental versions
- **Karaoke**: Create karaoke tracks by removing vocals
- **Audio Mixing**: Adjust vocals and instruments levels separately
- **Audio Restoration**: Clean vocal or instrumental tracks individually
- **Content Creation**: Use separated tracks for creative editing

## 🐛 Troubleshooting

### Plugin doesn't appear in Premiere Pro

1. Verify the folder is in the extensions directory
2. Enable debug mode (see installation instructions)
3. Completely restart Premiere Pro
4. Check JavaScript console logs (F12 in panel)

### Error "Python or Demucs not installed"

1. Verify Python installation:
   ```bash
   python3 --version
   ```

2. Verify Demucs installation:
   ```bash
   python3 -m demucs --help
   ```

3. Ensure Python is in system PATH

### Separation fails

1. Verify source audio file is accessible
2. Ensure sufficient disk space
3. Check write permissions in destination folder
4. Consult logs in progress panel

## 📝 License

This plugin uses:
- **Demucs**: MIT License - Facebook Research
- **CEP**: Adobe Common Extensibility Platform

---

**Version**: 2.1.0  
**Author**: Cyril V  
**Last Update**: November 2025

---

# Français

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

### Interface
- 🎨 **Design moderne** : Interface sombre et élégante
- 📊 **Logs détaillés** : Suivi complet du processus
- ✅ **Validation en temps réel** : Vérification des options avant traitement
- ❌ **Bouton d'annulation** : Arrêter le traitement à tout moment

## 📋 Prérequis

### Logiciels requis

1. **Adobe Premiere Pro 2025** (version 25.0 ou supérieure)
2. **Python 3.8+** installé sur votre système
3. **Demucs** - Modèle de séparation audio IA

### Installation de Python et Demucs

#### macOS

```bash
# Installer Python (si pas déjà installé)
brew install python3

# Installer Demucs
pip3 install demucs

# Vérifier l'installation
python3 -m demucs --help
```

#### Windows

```bash
# Télécharger et installer Python depuis python.org
# Puis dans le terminal :

pip install demucs

# Vérifier l'installation
python -m demucs --help
```

## 🚀 Installation du plugin

### Méthode 1 : Installation automatique (Recommandée)

#### macOS
1. Exécutez `install-mac.sh`
2. Suivez les instructions à l'écran
3. Redémarrez Adobe Premiere Pro

#### Windows
1. Exécutez `install-windows.bat` en tant qu'Administrateur
2. Suivez les instructions à l'écran
3. Redémarrez Adobe Premiere Pro

### Méthode 2 : Installation manuelle

1. **Localisez le dossier des extensions CEP** :

   **macOS** :
   ```
   /Library/Application Support/Adobe/CEP/extensions/
   ```

   **Windows** :
   ```
   C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\
   ```

2. **Copiez le dossier du plugin** :
   - Copiez le dossier `PremierePro-AudioSeparator` dans le répertoire des extensions

3. **Activez le mode debug** (si nécessaire) :

   **macOS** :
   ```bash
   defaults write com.adobe.CSXS.11 PlayerDebugMode 1
   ```

   **Windows** (dans le registre) :
   ```
   HKEY_CURRENT_USER\Software\Adobe\CSXS.11
   Créer une clé PlayerDebugMode de type String avec la valeur "1"
   ```

4. **Redémarrez Adobe Premiere Pro**

## 📖 Utilisation

### 1. Ouvrir le panneau

Dans Adobe Premiere Pro :
- Allez dans **Fenêtre** > **Extensions** > **Audio Separator**

### 2. Sélectionner un clip audio

1. Dans votre timeline, sélectionnez un clip audio à séparer
2. Cliquez sur le bouton **"📁 Sélectionner un clip audio"** dans le panneau

### 3. Configurer les options

- **Mode de traitement** :
  - `⚡ Rapide` : 30-40% plus rapide (quantized + segment 7)
  - `⚖️ Équilibré` : Recommandé (segment 7)
  - `🏆 Qualité maximale` : Meilleure qualité, plus lent

- **Qualité du modèle** :
  - `HTDemucs` : Rapide
  - `HTDemucs Fine-tuned` : Meilleur (recommandé)
  - `MDX Extra` : Plus lent, qualité maximale

- **Format de sortie** :
  - `MP3 320kbps` : Recommandé, 10x plus petit
  - `WAV` : Sans perte, très lourd
  - `FLAC` : Sans perte, compressé

### 4. Lancer la séparation

1. Cliquez sur **"✨ Séparer l'audio"**
2. Attendez la fin du traitement (peut prendre quelques minutes selon la longueur)
3. Utilisez le bouton **"❌ Annuler"** pour arrêter le traitement si nécessaire

### 5. Importer dans le projet

Une fois la séparation terminée :
- Cliquez sur **"📥 Importer dans le projet"**
- Les fichiers seront automatiquement importés dans un chutier "Audio Séparé"

## 🎯 Cas d'usage

- **Remixage** : Isolez les voix pour créer des versions instrumentales
- **Karaoké** : Créez des pistes karaoké en supprimant les voix
- **Mixage audio** : Ajustez séparément les niveaux des voix et instruments
- **Restauration audio** : Nettoyez les pistes vocales ou instrumentales individuellement
- **Création de contenu** : Utilisez les pistes séparées pour vos montages créatifs

## 🐛 Dépannage

### Le plugin n'apparaît pas dans Premiere Pro

1. Vérifiez que le dossier est dans le répertoire des extensions
2. Activez le mode debug (voir instructions d'installation)
3. Redémarrez complètement Premiere Pro
4. Vérifiez les logs de la console JavaScript (F12 dans le panneau)

### Erreur "Python ou Demucs n'est pas installé"

1. Vérifiez l'installation de Python :
   ```bash
   python3 --version
   ```

2. Vérifiez l'installation de Demucs :
   ```bash
   python3 -m demucs --help
   ```

3. Assurez-vous que Python est dans le PATH système

### La séparation échoue

1. Vérifiez que le fichier audio source est accessible
2. Assurez-vous d'avoir suffisamment d'espace disque
3. Vérifiez les permissions d'écriture dans le dossier de destination
4. Consultez les logs dans le panneau de progression

## 📝 Licence

Ce plugin utilise :
- **Demucs** : Licence MIT - Facebook Research
- **CEP** : Adobe Common Extensibility Platform

---

**Version** : 2.1.0  
**Auteur** : Cyril V  
**Dernière mise à jour** : Novembre 2025

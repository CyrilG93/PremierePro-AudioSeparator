#!/bin/bash

# Audio Separator - Script d'installation automatique pour macOS
# Version 2.0.0

echo "🎵 Audio Separator - Installation pour macOS"
echo "=============================================="
echo ""

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Définir Python 3.11 comme version obligatoire (Demucs n'est pas compatible avec Python 3.14+)
PYTHON_PATH="/usr/local/bin/python3.11"
PIP_PATH="/usr/local/bin/python3.11 -m pip"

# Vérifier Python 3.11
echo "Étape 1/6 : Vérification de Python 3.11..."
if [ -f "$PYTHON_PATH" ]; then
    PYTHON_VERSION=$($PYTHON_PATH --version | cut -d' ' -f2)
    print_success "Python $PYTHON_VERSION trouvé"
else
    print_warning "Python 3.11 n'est pas installé à $PYTHON_PATH"
    echo ""
    echo "Demucs requiert Python 3.11 (incompatible avec Python 3.14+)"
    echo "Voulez-vous installer Python 3.11 automatiquement via Homebrew ? (o/n)"
    read -r INSTALL_PYTHON
    
    if [[ "$INSTALL_PYTHON" =~ ^[Oo]$ ]]; then
        # Vérifier Homebrew
        if ! command -v brew &> /dev/null; then
            echo "Installation de Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            
            # Ajouter Homebrew au PATH pour Apple Silicon
            if [[ $(uname -m) == 'arm64' ]]; then
                echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
                eval "$(/opt/homebrew/bin/brew shellenv)"
            fi
        fi
        
        echo "Installation de Python 3.11..."
        brew install python@3.11
        
        # Créer un lien symbolique si nécessaire
        if [ ! -f "$PYTHON_PATH" ]; then
            sudo ln -sf /opt/homebrew/opt/python@3.11/bin/python3.11 /usr/local/bin/python3.11 2>/dev/null || \
            sudo ln -sf /usr/local/opt/python@3.11/bin/python3.11 /usr/local/bin/python3.11 2>/dev/null
        fi
        
        if [ -f "$PYTHON_PATH" ]; then
            PYTHON_VERSION=$($PYTHON_PATH --version | cut -d' ' -f2)
            print_success "Python $PYTHON_VERSION installé avec succès"
        else
            print_error "Échec de l'installation de Python 3.11"
            exit 1
        fi
    else
        print_error "Python 3.11 est requis pour continuer"
        echo "Installez Python 3.11 manuellement depuis https://www.python.org/downloads/"
        exit 1
    fi
fi

# Vérifier pip
echo ""
echo "Étape 2/6 : Vérification de pip..."
if $PYTHON_PATH -m pip --version &> /dev/null; then
    print_success "pip trouvé pour Python 3.11"
else
    print_error "pip n'est pas installé pour Python 3.11"
    exit 1
fi

# Installer Demucs
echo ""
echo "Étape 3/6 : Installation de Demucs..."
if $PYTHON_PATH -m demucs --help &> /dev/null; then
    print_success "Demucs est déjà installé"
else
    echo "Installation de Demucs en cours (cela peut prendre quelques minutes)..."
    $PIP_PATH install demucs
    if [ $? -eq 0 ]; then
        print_success "Demucs installé avec succès"
    else
        print_error "Échec de l'installation de Demucs"
        echo "Essayez manuellement: $PIP_PATH install demucs"
        exit 1
    fi
fi

# Installer FFmpeg (optionnel mais recommandé)
echo ""
echo "Étape 4/6 : Vérification de FFmpeg..."
if command -v ffmpeg &> /dev/null; then
    print_success "FFmpeg est installé"
else
    print_warning "FFmpeg n'est pas installé (recommandé pour de meilleures performances)"
    echo ""
    echo "Voulez-vous installer FFmpeg automatiquement ? (o/n)"
    read -r INSTALL_FFMPEG
    
    if [[ "$INSTALL_FFMPEG" =~ ^[Oo]$ ]]; then
        if command -v brew &> /dev/null; then
            echo "Installation de FFmpeg..."
            brew install ffmpeg
            if [ $? -eq 0 ]; then
                print_success "FFmpeg installé avec succès"
            else
                print_warning "Échec de l'installation de FFmpeg (non critique)"
            fi
        else
            print_warning "Homebrew n'est pas installé, impossible d'installer FFmpeg automatiquement"
        fi
    else
        print_warning "FFmpeg non installé (vous pouvez l'installer plus tard avec: brew install ffmpeg)"
    fi
fi

# Copier le plugin
echo ""
echo "Étape 5/6 : Installation du plugin dans Premiere Pro..."
PLUGIN_DIR="/Library/Application Support/Adobe/CEP/extensions"
PLUGIN_NAME="PremierePro-AudioSeparator"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Créer le dossier si nécessaire
if [ ! -d "$PLUGIN_DIR" ]; then
    echo "Création du dossier des extensions..."
    sudo mkdir -p "$PLUGIN_DIR"
fi

# Supprimer l'ancienne version si elle existe
if [ -d "$PLUGIN_DIR/$PLUGIN_NAME" ]; then
    echo "Suppression de l'ancienne version..."
    sudo rm -rf "$PLUGIN_DIR/$PLUGIN_NAME"
fi

# Copier uniquement les fichiers nécessaires (pas .git, pas install scripts, pas README)
echo "Copie des fichiers du plugin..."
sudo mkdir -p "$PLUGIN_DIR/$PLUGIN_NAME"
sudo cp -r "$SCRIPT_DIR/client" "$PLUGIN_DIR/$PLUGIN_NAME/"
sudo cp -r "$SCRIPT_DIR/host" "$PLUGIN_DIR/$PLUGIN_NAME/"
sudo cp -r "$SCRIPT_DIR/CSXS" "$PLUGIN_DIR/$PLUGIN_NAME/"
sudo cp "$SCRIPT_DIR/.debug" "$PLUGIN_DIR/$PLUGIN_NAME/" 2>/dev/null || true

# Corriger les permissions
sudo chmod -R 755 "$PLUGIN_DIR/$PLUGIN_NAME"
sudo chown -R $(whoami):staff "$PLUGIN_DIR/$PLUGIN_NAME"

if [ -d "$PLUGIN_DIR/$PLUGIN_NAME/client" ]; then
    print_success "Plugin installé avec succès"
else
    print_error "Échec de l'installation du plugin"
    exit 1
fi

# Activer le mode debug
echo ""
echo "Étape 6/6 : Activation du mode debug CEP..."
defaults write com.adobe.CSXS.11 PlayerDebugMode 1

if [ $? -eq 0 ]; then
    print_success "Mode debug activé"
else
    print_warning "Impossible d'activer le mode debug automatiquement"
    echo "Exécutez manuellement: defaults write com.adobe.CSXS.11 PlayerDebugMode 1"
fi

# Résumé
echo ""
echo "=============================================="
echo -e "${GREEN}✓ Installation terminée avec succès!${NC}"
echo "=============================================="
echo ""
echo "📝 Prochaines étapes:"
echo "1. Redémarrez Adobe Premiere Pro"
echo "2. Ouvrez le panneau: Fenêtre > Extensions > Audio Separator"
echo "3. Sélectionnez un clip audio dans la timeline"
echo "4. Cliquez sur 'Séparer l'audio'"
echo ""
echo "📚 Pour plus d'informations, consultez README.md"
echo ""

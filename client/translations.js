/**
 * Translations for Audio Separator
 * Supported languages: French (fr), English (en)
 */

window.translations = {
    fr: {
        // Header
        title: "Audio Separator",
        subtitle: "Séparation audio intelligente par IA",

        // Buttons
        selectClip: "📁 Sélectionner un clip audio",
        separate: "✨ Séparer l'audio",
        cancel: "❌ Annuler",
        import: "📥 Importer dans le projet",

        // File info
        selectedFileLabel: "Fichier sélectionné:",
        noFileSelected: "Aucun fichier sélectionné",

        // Options section
        optionsTitle: "Options de séparation:",
        separationMode: "Mode de séparation:",
        mode2Stems: "2 Stems (Voix + Instrumental)",
        mode4Stems: "4 Stems (Voix + Batterie + Basse + Autres)",

        // Export options
        exportVocals: "Exporter les voix",
        exportInstrumental: "Exporter l'instrumental",
        exportDrums: "Exporter la batterie",
        exportBass: "Exporter la basse",
        exportOther: "Exporter les autres",

        // Options
        processSelectionOnly: "Traiter uniquement la portion IN/OUT du clip (F)",
        saveNextToOriginal: "Enregistrer à côté du fichier d'origine",
        autoImport: "Importer automatiquement dans le projet",

        // Processing mode
        processingMode: "Mode de traitement:",
        modeBalanced: "⚖️ Équilibré (recommandé)",
        modeFast: "⚡ Rapide (30-40% plus rapide)",
        modeQuality: "🏆 Qualité maximale",

        // Model
        model: "Modèle:",
        modelHtdemucs: "HTDemucs (rapide)",
        modelHtdemucsFt: "HTDemucs Fine-tuned (meilleur)",
        modelMdx: "MDX Extra (le plus lent)",

        // Output format
        outputFormat: "Format de sortie:",
        formatMp3: "MP3 320kbps (recommandé, 10x plus petit)",
        formatWav: "WAV (sans perte, très lourd)",
        formatFlac: "FLAC (sans perte, compressé)",

        // Progress
        progressTitle: "Progression",
        processingInProgress: "Traitement en cours...",
        timeElapsed: "Temps écoulé:",
        logsTitle: "Logs:",

        // Results
        resultsTitle: "✅ Séparation terminée!",
        separationCompleted: "✅ Séparation terminée!",

        // Logs messages
        gpuDetected: "🚀 GPU détecté:",
        usingCpu: "💻 Utilisation du CPU",
        systemInfo: "💻 Système:",
        cores: "cœurs CPU, RAM:",
        used: "utilisée",
        highMemory: "⚠️ Mémoire système élevée. Fermez d'autres applications pour de meilleures performances.",

        launching: "Lancement de Demucs...",
        modeLabel: "Mode:",
        modelLabel: "Modèle:",
        processingLabel: "Traitement:",
        formatLabel: "Format:",
        fileLabel: "Fichier:",

        modeBalancedLog: "⚖️ Mode équilibré (segment 7)",
        modeFastLog: "⚡ Mode rapide activé (quantized + segment 7)",
        modeQualityLog: "🏆 Mode qualité maximale",

        separationInProgress: "Séparation en cours (cela peut prendre plusieurs minutes)...",
        executingDemucs: "Exécution de Demucs...",
        searchingFiles: "Recherche des fichiers générés...",
        completed: "Terminé !",

        cancelling: "❌ Annulation du traitement...",
        cancelled: "✅ Traitement annulé",

        // File names
        vocals: "voix",
        instrumental: "instrumental",
        drums: "batterie",
        bass: "basse",
        other: "autres",

        // Log messages
        startingSeparation: "Démarrage du processus de séparation...",
        outputFolder: "Dossier de sortie:",
        nextToOriginal: "(à côté du fichier d'origine)",
        preparation: "Préparation...",
        processError: "Erreur: Le processus s'est terminé avec le code",
        details: "Détails:",
        separationFailed: "Échec de la séparation (code:",
        output: "Output:",
        fileFound: "🔍 Fichier trouvé:",
        type: "→ Type:",
        fileRenamed: "✅ Fichier renommé:",
        ignored: "→ Ignoré (ne correspond pas aux options sélectionnées)",
        autoImportEnabled: "🔄 Import automatique activé...",
        importingFiles: "Importation des fichiers dans le projet...",
        filesImported: "fichier(s) importé(s) dans le dossier",

        // Footer
        version: "v2.3.0 - Robust",
        poweredBy: "Propulsé par Demucs AI"
    },

    en: {
        // Header
        title: "Audio Separator",
        subtitle: "AI-powered intelligent audio separation",

        // Buttons
        selectClip: "📁 Select audio clip",
        separate: "✨ Separate audio",
        cancel: "❌ Cancel",
        import: "📥 Import to project",

        // File info
        selectedFileLabel: "Selected file:",
        noFileSelected: "No file selected",

        // Options section
        optionsTitle: "Separation options:",
        separationMode: "Separation mode:",
        mode2Stems: "2 Stems (Vocals + Instrumental)",
        mode4Stems: "4 Stems (Vocals + Drums + Bass + Other)",

        // Export options
        exportVocals: "Export vocals",
        exportInstrumental: "Export instrumental",
        exportDrums: "Export drums",
        exportBass: "Export bass",
        exportOther: "Export other",

        // Settings
        processSelectionOnly: "Process clip IN/OUT portion only (F)",
        saveNextToOriginal: "Save next to original file",
        autoImport: "Auto-import to project",

        // Processing mode
        processingMode: "Processing mode:",
        modeBalanced: "⚖️ Balanced (recommended)",
        modeFast: "⚡ Fast (30-40% faster)",
        modeQuality: "🏆 Maximum quality",

        // Model
        model: "Model:",
        modelHtdemucs: "HTDemucs (fast)",
        modelHtdemucsFt: "HTDemucs Fine-tuned (best)",
        modelMdx: "MDX Extra (slowest)",

        // Output format
        outputFormat: "Output format:",
        formatMp3: "MP3 320kbps (recommended, 10x smaller)",
        formatWav: "WAV (lossless, very large)",
        formatFlac: "FLAC (lossless, compressed)",

        // Progress
        progressTitle: "Progress",
        processingInProgress: "Processing in progress...",
        timeElapsed: "Time elapsed:",
        logsTitle: "Logs:",

        // Results
        resultsTitle: "✅ Separation complete!",
        separationCompleted: "✅ Separation complete!",

        // Logs messages
        gpuDetected: "🚀 GPU detected:",
        usingCpu: "💻 Using CPU",
        systemInfo: "💻 System:",
        cores: "CPU cores, RAM:",
        used: "used",
        highMemory: "⚠️ High system memory. Close other applications for better performance.",

        launching: "Launching Demucs...",
        modeLabel: "Mode:",
        modelLabel: "Model:",
        processingLabel: "Processing:",
        formatLabel: "Format:",
        fileLabel: "File:",

        modeBalancedLog: "⚖️ Balanced mode (segment 7)",
        modeFastLog: "⚡ Fast mode enabled (quantized + segment 7)",
        modeQualityLog: "🏆 Maximum quality mode",

        separationInProgress: "Separation in progress (this may take several minutes)...",
        executingDemucs: "Executing Demucs...",
        searchingFiles: "Searching for generated files...",
        completed: "Completed!",

        cancelling: "❌ Cancelling process...",
        cancelled: "✅ Process cancelled",

        // File names
        vocals: "voice",
        instrumental: "instrumental",
        drums: "drums",
        bass: "bass",
        other: "other",

        // Log messages
        startingSeparation: "Starting separation process...",
        outputFolder: "Output folder:",
        nextToOriginal: "(next to original file)",
        preparation: "Preparing...",
        processError: "Error: Process terminated with code",
        details: "Details:",
        separationFailed: "Separation failed (code:",
        output: "Output:",
        fileFound: "🔍 File found:",
        type: "→ Type:",
        fileRenamed: "✅ File renamed:",
        ignored: "→ Ignored (does not match selected options)",
        autoImportEnabled: "🔄 Auto-import enabled...",
        importingFiles: "Importing files to project...",
        filesImported: "file(s) imported to folder",

        // Footer
        version: "v2.3.0 - Robust",
        poweredBy: "Powered by Demucs AI"
    }
};

// Helper function to get translation
window.t = function (key) {
    return window.translations[window.currentLanguage || 'fr'][key] || key;
};

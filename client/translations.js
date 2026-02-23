/**
 * Translations for Audio Separator
 * Supported languages: Chinese Simplified (zh-CN), English (en), French (fr), German (de),
 * Italian (it), Japanese (ja), Portuguese Brazil (pt-BR), Russian (ru), Spanish (es)
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
        version: "v2.3.2 - Robust",
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
        version: "v2.3.2 - Robust",
        poweredBy: "Powered by Demucs AI"
    }
};

// Additional UI languages reuse English as a fallback for non-overridden log/debug strings.
window.translations.es = Object.assign({}, window.translations.en, {
    subtitle: "Separación de audio inteligente con IA",
    selectClip: "📁 Seleccionar clip de audio",
    separate: "✨ Separar audio",
    cancel: "❌ Cancelar",
    import: "📥 Importar al proyecto",
    selectedFileLabel: "Archivo seleccionado:",
    noFileSelected: "Ningún archivo seleccionado",
    optionsTitle: "Opciones de separación:",
    separationMode: "Modo de separación:",
    mode2Stems: "2 Stems (Voces + Instrumental)",
    mode4Stems: "4 Stems (Voces + Batería + Bajo + Otros)",
    exportVocals: "Exportar voces",
    exportInstrumental: "Exportar instrumental",
    exportDrums: "Exportar batería",
    exportBass: "Exportar bajo",
    exportOther: "Exportar otros",
    saveNextToOriginal: "Guardar junto al archivo original",
    autoImport: "Importar automáticamente al proyecto",
    processingMode: "Modo de procesamiento:",
    modeBalanced: "⚖️ Equilibrado (recomendado)",
    modeFast: "⚡ Rápido (30-40% más rápido)",
    modeQuality: "🏆 Calidad máxima",
    model: "Modelo:",
    modelHtdemucs: "HTDemucs (rápido)",
    modelHtdemucsFt: "HTDemucs Fine-tuned (mejor)",
    modelMdx: "MDX Extra (más lento)",
    outputFormat: "Formato de salida:",
    formatMp3: "MP3 320kbps (recomendado, 10x más pequeño)",
    formatWav: "WAV (sin pérdida, muy grande)",
    formatFlac: "FLAC (sin pérdida, comprimido)",
    progressTitle: "Progreso",
    processingInProgress: "Procesando...",
    timeElapsed: "Tiempo transcurrido:",
    logsTitle: "Registros:",
    resultsTitle: "✅ ¡Separación completada!",
    separationCompleted: "✅ ¡Separación completada!",
    importingFiles: "Importando archivos al proyecto...",
    vocals: "voz",
    drums: "batería",
    bass: "bajo",
    other: "otros",
    poweredBy: "Desarrollado con Demucs AI"
});

// German UI translations keep English fallback for technical logs to reduce maintenance risk.
window.translations.de = Object.assign({}, window.translations.en, {
    subtitle: "Intelligente KI-Audiotrennung",
    selectClip: "📁 Audioclip auswählen",
    separate: "✨ Audio trennen",
    cancel: "❌ Abbrechen",
    import: "📥 In Projekt importieren",
    selectedFileLabel: "Ausgewählte Datei:",
    noFileSelected: "Keine Datei ausgewählt",
    optionsTitle: "Trennungsoptionen:",
    separationMode: "Trennungsmodus:",
    mode2Stems: "2 Stems (Gesang + Instrumental)",
    mode4Stems: "4 Stems (Gesang + Schlagzeug + Bass + Sonstiges)",
    exportVocals: "Gesang exportieren",
    exportInstrumental: "Instrumental exportieren",
    exportDrums: "Schlagzeug exportieren",
    exportBass: "Bass exportieren",
    exportOther: "Sonstiges exportieren",
    saveNextToOriginal: "Neben Originaldatei speichern",
    autoImport: "Automatisch ins Projekt importieren",
    processingMode: "Verarbeitungsmodus:",
    modeBalanced: "⚖️ Ausgewogen (empfohlen)",
    modeFast: "⚡ Schnell (30-40% schneller)",
    modeQuality: "🏆 Maximale Qualität",
    model: "Modell:",
    modelHtdemucs: "HTDemucs (schnell)",
    modelHtdemucsFt: "HTDemucs Fine-tuned (beste Qualität)",
    modelMdx: "MDX Extra (am langsamsten)",
    outputFormat: "Ausgabeformat:",
    formatMp3: "MP3 320kbps (empfohlen, 10x kleiner)",
    formatWav: "WAV (verlustfrei, sehr groß)",
    formatFlac: "FLAC (verlustfrei, komprimiert)",
    progressTitle: "Fortschritt",
    processingInProgress: "Verarbeitung läuft...",
    timeElapsed: "Verstrichene Zeit:",
    logsTitle: "Protokolle:",
    resultsTitle: "✅ Trennung abgeschlossen!",
    separationCompleted: "✅ Trennung abgeschlossen!",
    vocals: "gesang",
    drums: "schlagzeug",
    other: "sonstiges",
    poweredBy: "Powered by Demucs AI"
});

// Brazilian Portuguese translations for the main UI controls and labels.
window.translations["pt-BR"] = Object.assign({}, window.translations.en, {
    subtitle: "Separação de áudio inteligente com IA",
    selectClip: "📁 Selecionar clipe de áudio",
    separate: "✨ Separar áudio",
    cancel: "❌ Cancelar",
    import: "📥 Importar para o projeto",
    selectedFileLabel: "Arquivo selecionado:",
    noFileSelected: "Nenhum arquivo selecionado",
    optionsTitle: "Opções de separação:",
    separationMode: "Modo de separação:",
    mode2Stems: "2 Stems (Voz + Instrumental)",
    mode4Stems: "4 Stems (Voz + Bateria + Baixo + Outros)",
    exportVocals: "Exportar voz",
    exportInstrumental: "Exportar instrumental",
    exportDrums: "Exportar bateria",
    exportBass: "Exportar baixo",
    exportOther: "Exportar outros",
    saveNextToOriginal: "Salvar ao lado do arquivo original",
    autoImport: "Importar automaticamente para o projeto",
    processingMode: "Modo de processamento:",
    modeBalanced: "⚖️ Equilibrado (recomendado)",
    modeFast: "⚡ Rápido (30-40% mais rápido)",
    modeQuality: "🏆 Qualidade máxima",
    model: "Modelo:",
    modelHtdemucs: "HTDemucs (rápido)",
    modelHtdemucsFt: "HTDemucs Fine-tuned (melhor)",
    modelMdx: "MDX Extra (mais lento)",
    outputFormat: "Formato de saída:",
    formatMp3: "MP3 320kbps (recomendado, 10x menor)",
    formatWav: "WAV (sem perdas, muito grande)",
    formatFlac: "FLAC (sem perdas, compactado)",
    progressTitle: "Progresso",
    processingInProgress: "Processando...",
    timeElapsed: "Tempo decorrido:",
    logsTitle: "Logs:",
    resultsTitle: "✅ Separação concluída!",
    separationCompleted: "✅ Separação concluída!",
    vocals: "voz",
    drums: "bateria",
    bass: "baixo",
    other: "outros",
    poweredBy: "Desenvolvido com Demucs AI"
});

// Japanese translations for user-facing interface text.
window.translations.ja = Object.assign({}, window.translations.en, {
    title: "Audio Separator",
    subtitle: "AIによる高精度オーディオ分離",
    selectClip: "📁 オーディオクリップを選択",
    separate: "✨ オーディオを分離",
    cancel: "❌ キャンセル",
    import: "📥 プロジェクトに読み込む",
    selectedFileLabel: "選択したファイル:",
    noFileSelected: "ファイルが選択されていません",
    optionsTitle: "分離オプション:",
    separationMode: "分離モード:",
    mode2Stems: "2 Stems (ボーカル + インスト)",
    mode4Stems: "4 Stems (ボーカル + ドラム + ベース + その他)",
    exportVocals: "ボーカルを書き出す",
    exportInstrumental: "インストを書き出す",
    exportDrums: "ドラムを書き出す",
    exportBass: "ベースを書き出す",
    exportOther: "その他を書き出す",
    saveNextToOriginal: "元ファイルの横に保存",
    autoImport: "プロジェクトに自動読み込み",
    processingMode: "処理モード:",
    modeBalanced: "⚖️ バランス (推奨)",
    modeFast: "⚡ 高速 (30-40%高速)",
    modeQuality: "🏆 最高品質",
    model: "モデル:",
    modelHtdemucs: "HTDemucs (高速)",
    modelHtdemucsFt: "HTDemucs Fine-tuned (高品質)",
    modelMdx: "MDX Extra (最も遅い)",
    outputFormat: "出力形式:",
    formatMp3: "MP3 320kbps (推奨、10倍小さい)",
    formatWav: "WAV (可逆、非常に大きい)",
    formatFlac: "FLAC (可逆、圧縮)",
    progressTitle: "進行状況",
    processingInProgress: "処理中...",
    timeElapsed: "経過時間:",
    logsTitle: "ログ:",
    resultsTitle: "✅ 分離が完了しました！",
    separationCompleted: "✅ 分離が完了しました！",
    vocals: "ボーカル",
    drums: "ドラム",
    bass: "ベース",
    other: "その他",
    poweredBy: "Demucs AI 搭載"
});

// Italian translations for the main interface labels.
window.translations.it = Object.assign({}, window.translations.en, {
    subtitle: "Separazione audio intelligente con IA",
    selectClip: "📁 Seleziona clip audio",
    separate: "✨ Separa audio",
    cancel: "❌ Annulla",
    import: "📥 Importa nel progetto",
    selectedFileLabel: "File selezionato:",
    noFileSelected: "Nessun file selezionato",
    optionsTitle: "Opzioni di separazione:",
    separationMode: "Modalità di separazione:",
    mode2Stems: "2 Stems (Voci + Strumentale)",
    mode4Stems: "4 Stems (Voci + Batteria + Basso + Altro)",
    exportVocals: "Esporta voci",
    exportInstrumental: "Esporta strumentale",
    exportDrums: "Esporta batteria",
    exportBass: "Esporta basso",
    exportOther: "Esporta altro",
    saveNextToOriginal: "Salva accanto al file originale",
    autoImport: "Importa automaticamente nel progetto",
    processingMode: "Modalità di elaborazione:",
    modeBalanced: "⚖️ Bilanciato (consigliato)",
    modeFast: "⚡ Veloce (30-40% più veloce)",
    modeQuality: "🏆 Qualità massima",
    model: "Modello:",
    modelHtdemucs: "HTDemucs (veloce)",
    modelHtdemucsFt: "HTDemucs Fine-tuned (migliore)",
    modelMdx: "MDX Extra (più lento)",
    outputFormat: "Formato di uscita:",
    formatMp3: "MP3 320kbps (consigliato, 10x più piccolo)",
    formatWav: "WAV (lossless, molto grande)",
    formatFlac: "FLAC (lossless, compresso)",
    progressTitle: "Avanzamento",
    processingInProgress: "Elaborazione in corso...",
    timeElapsed: "Tempo trascorso:",
    logsTitle: "Log:",
    resultsTitle: "✅ Separazione completata!",
    separationCompleted: "✅ Separazione completata!",
    vocals: "voce",
    drums: "batteria",
    bass: "basso",
    other: "altro",
    poweredBy: "Basato su Demucs AI"
});

// Simplified Chinese translations for primary UI controls.
window.translations["zh-CN"] = Object.assign({}, window.translations.en, {
    title: "Audio Separator",
    subtitle: "AI 智能音频分离",
    selectClip: "📁 选择音频片段",
    separate: "✨ 分离音频",
    cancel: "❌ 取消",
    import: "📥 导入到项目",
    selectedFileLabel: "已选择文件:",
    noFileSelected: "未选择文件",
    optionsTitle: "分离选项:",
    separationMode: "分离模式:",
    mode2Stems: "2 轨 (人声 + 伴奏)",
    mode4Stems: "4 轨 (人声 + 鼓 + 贝斯 + 其他)",
    exportVocals: "导出人声",
    exportInstrumental: "导出伴奏",
    exportDrums: "导出鼓",
    exportBass: "导出贝斯",
    exportOther: "导出其他",
    saveNextToOriginal: "保存在原文件旁",
    autoImport: "自动导入到项目",
    processingMode: "处理模式:",
    modeBalanced: "⚖️ 均衡 (推荐)",
    modeFast: "⚡ 快速 (快 30-40%)",
    modeQuality: "🏆 最高质量",
    model: "模型:",
    modelHtdemucs: "HTDemucs (快速)",
    modelHtdemucsFt: "HTDemucs Fine-tuned (最佳)",
    modelMdx: "MDX Extra (最慢)",
    outputFormat: "输出格式:",
    formatMp3: "MP3 320kbps (推荐，体积小 10 倍)",
    formatWav: "WAV (无损，体积很大)",
    formatFlac: "FLAC (无损，已压缩)",
    progressTitle: "进度",
    processingInProgress: "处理中...",
    timeElapsed: "已用时间:",
    logsTitle: "日志:",
    resultsTitle: "✅ 分离完成！",
    separationCompleted: "✅ 分离完成！",
    vocals: "人声",
    drums: "鼓",
    bass: "贝斯",
    other: "其他",
    poweredBy: "由 Demucs AI 驱动"
});

// Russian translations for the main interface labels.
window.translations.ru = Object.assign({}, window.translations.en, {
    subtitle: "Интеллектуальное разделение аудио на базе ИИ",
    selectClip: "📁 Выбрать аудиоклип",
    separate: "✨ Разделить аудио",
    cancel: "❌ Отмена",
    import: "📥 Импортировать в проект",
    selectedFileLabel: "Выбранный файл:",
    noFileSelected: "Файл не выбран",
    optionsTitle: "Параметры разделения:",
    separationMode: "Режим разделения:",
    mode2Stems: "2 Stems (Вокал + Инструментал)",
    mode4Stems: "4 Stems (Вокал + Ударные + Бас + Другое)",
    exportVocals: "Экспорт вокала",
    exportInstrumental: "Экспорт инструментала",
    exportDrums: "Экспорт ударных",
    exportBass: "Экспорт баса",
    exportOther: "Экспорт другого",
    saveNextToOriginal: "Сохранять рядом с исходным файлом",
    autoImport: "Автоимпорт в проект",
    processingMode: "Режим обработки:",
    modeBalanced: "⚖️ Сбалансированный (рекомендуется)",
    modeFast: "⚡ Быстрый (на 30-40% быстрее)",
    modeQuality: "🏆 Максимальное качество",
    model: "Модель:",
    modelHtdemucs: "HTDemucs (быстро)",
    modelHtdemucsFt: "HTDemucs Fine-tuned (лучше)",
    modelMdx: "MDX Extra (самый медленный)",
    outputFormat: "Формат вывода:",
    formatMp3: "MP3 320kbps (рекомендуется, в 10 раз меньше)",
    formatWav: "WAV (без потерь, очень большой)",
    formatFlac: "FLAC (без потерь, сжатый)",
    progressTitle: "Прогресс",
    processingInProgress: "Обработка...",
    timeElapsed: "Прошло времени:",
    logsTitle: "Логи:",
    resultsTitle: "✅ Разделение завершено!",
    separationCompleted: "✅ Разделение завершено!",
    vocals: "вокал",
    drums: "ударные",
    bass: "бас",
    other: "другое",
    poweredBy: "Работает на Demucs AI"
});

// Helper function to get translation
window.t = function (key) {
    // Fallback to English if a key is missing in a translated dictionary.
    const currentTranslations = window.translations[window.currentLanguage || 'fr'] || window.translations.en || {};
    return currentTranslations[key] || (window.translations.en && window.translations.en[key]) || key;
};

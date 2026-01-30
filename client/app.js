/**
 * Main application logic for Audio Separator
 */

(function () {
    'use strict';

    const csInterface = new CSInterface();
    let selectedClip = null;
    let separatedFiles = [];
    let originalProjectItem = null;

    // Language management - Default to English on first launch
    window.currentLanguage = localStorage.getItem('preferredLanguage') || 'en';

    // DOM Elements
    const elements = {
        languageSelect: document.getElementById('languageSelect'),
        appTitle: document.getElementById('appTitle'),
        appSubtitle: document.getElementById('appSubtitle'),
        selectBtn: document.getElementById('selectBtn'),
        separateBtn: document.getElementById('separateBtn'),
        cancelBtn: document.getElementById('cancelBtn'),
        importBtn: document.getElementById('importBtn'),
        selectedFile: document.getElementById('selectedFile'),
        separationMode: document.getElementById('separationMode'),
        stems2Options: document.getElementById('stems2Options'),
        stems4Options: document.getElementById('stems4Options'),
        exportVocals: document.getElementById('exportVocals'),
        exportInstrumental: document.getElementById('exportInstrumental'),
        exportVocals4: document.getElementById('exportVocals4'),
        exportDrums: document.getElementById('exportDrums'),
        exportBass: document.getElementById('exportBass'),
        exportOther: document.getElementById('exportOther'),
        saveNextToOriginal: document.getElementById('saveNextToOriginal'),
        autoImport: document.getElementById('autoImport'),
        processingMode: document.getElementById('processingMode'),
        modelQuality: document.getElementById('modelQuality'),
        outputFormat: document.getElementById('outputFormat'),
        progressSection: document.getElementById('progressSection'),
        progressStatus: document.getElementById('progressStatus'),
        progressPercent: document.getElementById('progressPercent'),
        progressFill: document.getElementById('progressFill'),
        timeElapsedLabel: document.getElementById('timeElapsedLabel'),
        timeElapsedValue: document.getElementById('timeElapsedValue'),
        progressLog: document.getElementById('progressLog'),
        resultsSection: document.getElementById('resultsSection'),
        resultsTitle: document.getElementById('resultsTitle'),
        resultsList: document.getElementById('resultsList')
    };

    // Timer variables
    let startTime = null;
    let timerInterval = null;

    // Process variable for cancellation
    let currentProcess = null;

    /**
     * Load language translations
     */
    function loadLanguage(lang) {
        window.currentLanguage = lang;
        const tr = translations[lang];

        // Update header
        elements.appTitle.textContent = tr.title;
        elements.appSubtitle.textContent = tr.subtitle;

        // Update buttons
        elements.selectBtn.innerHTML = tr.selectClip;
        elements.separateBtn.innerHTML = tr.separate;
        elements.cancelBtn.innerHTML = tr.cancel;
        elements.importBtn.innerHTML = tr.import;

        // Update file info label
        const fileInfoLabel = document.querySelector('.info-card label');
        if (fileInfoLabel) fileInfoLabel.textContent = tr.selectedFileLabel;

        if (selectedClip === null) {
            elements.selectedFile.textContent = tr.noFileSelected;
        }

        // Update options title
        const optionsTitle = document.querySelector('.section-title');
        if (optionsTitle) optionsTitle.textContent = tr.optionsTitle;

        // Update labels
        const labels = document.querySelectorAll('.quality-selector label, .output-format label');
        labels.forEach(label => {
            const forAttr = label.getAttribute('for');
            if (forAttr === 'separationMode') label.textContent = tr.separationMode;
            if (forAttr === 'processingMode') label.textContent = tr.processingMode;
            if (forAttr === 'modelQuality') label.textContent = tr.model;
            if (forAttr === 'outputFormat') label.textContent = tr.outputFormat;
        });

        // Update select options
        const mode2Option = elements.separationMode.querySelector('option[value="2stems"]');
        const mode4Option = elements.separationMode.querySelector('option[value="4stems"]');
        if (mode2Option) mode2Option.textContent = tr.mode2Stems;
        if (mode4Option) mode4Option.textContent = tr.mode4Stems;

        // Update processing mode options
        const modeBalanced = elements.processingMode.querySelector('option[value="balanced"]');
        const modeFast = elements.processingMode.querySelector('option[value="fast"]');
        const modeQuality = elements.processingMode.querySelector('option[value="quality"]');
        if (modeBalanced) modeBalanced.textContent = tr.modeBalanced;
        if (modeFast) modeFast.textContent = tr.modeFast;
        if (modeQuality) modeQuality.textContent = tr.modeQuality;

        // Update model options
        const modelHtdemucs = elements.modelQuality.querySelector('option[value="htdemucs"]');
        const modelHtdemucsFt = elements.modelQuality.querySelector('option[value="htdemucs_ft"]');
        const modelMdx = elements.modelQuality.querySelector('option[value="mdx_extra"]');
        if (modelHtdemucs) modelHtdemucs.textContent = tr.modelHtdemucs;
        if (modelHtdemucsFt) modelHtdemucsFt.textContent = tr.modelHtdemucsFt;
        if (modelMdx) modelMdx.textContent = tr.modelMdx;

        // Update format options
        const formatMp3 = elements.outputFormat.querySelector('option[value="mp3"]');
        const formatWav = elements.outputFormat.querySelector('option[value="wav"]');
        const formatFlac = elements.outputFormat.querySelector('option[value="flac"]');
        if (formatMp3) formatMp3.textContent = tr.formatMp3;
        if (formatWav) formatWav.textContent = tr.formatWav;
        if (formatFlac) formatFlac.textContent = tr.formatFlac;

        // Update checkbox labels
        const checkboxLabels = document.querySelectorAll('.checkbox-label span');
        checkboxLabels.forEach(span => {
            const checkbox = span.previousElementSibling;
            if (checkbox) {
                const id = checkbox.id;
                if (id === 'exportVocals' || id === 'exportVocals4') span.textContent = tr.exportVocals;
                if (id === 'exportInstrumental') span.textContent = tr.exportInstrumental;
                if (id === 'exportDrums') span.textContent = tr.exportDrums;
                if (id === 'exportBass') span.textContent = tr.exportBass;
                if (id === 'exportOther') span.textContent = tr.exportOther;
                if (id === 'saveNextToOriginal') span.textContent = tr.saveNextToOriginal;
                if (id === 'autoImport') span.textContent = tr.autoImport;
            }
        });

        // Update progress section
        if (elements.progressStatus.textContent === 'Traitement en cours...' ||
            elements.progressStatus.textContent === 'Processing in progress...') {
            elements.progressStatus.textContent = tr.processingInProgress;
        }

        // Update time elapsed label (keep the value)
        const currentTime = elements.timeElapsedValue ? elements.timeElapsedValue.textContent : '0s';
        if (elements.timeElapsedLabel) {
            elements.timeElapsedLabel.innerHTML = tr.timeElapsed + ' <span id="timeElapsedValue">' + currentTime + '</span>';
            // Re-reference the value element
            elements.timeElapsedValue = document.getElementById('timeElapsedValue');
        }

        // Update results title
        if (elements.resultsTitle) {
            elements.resultsTitle.textContent = tr.separationCompleted;
        }

        // Update footer
        const versionElement = document.querySelector('.version');
        if (versionElement) versionElement.textContent = tr.version + ' | ' + tr.poweredBy;

        // Save preference
        localStorage.setItem('preferredLanguage', lang);
    }

    /**
     * Initialize the extension
     */
    function init() {
        Utils.log('Audio Separator extension initialized');

        // Load saved language
        elements.languageSelect.value = window.currentLanguage;
        loadLanguage(window.currentLanguage);

        setupEventListeners();
        checkPythonEnvironment();
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        // Language selector
        elements.languageSelect.addEventListener('change', function () {
            loadLanguage(this.value);
        });

        elements.selectBtn.addEventListener('click', selectAudioClip);
        elements.separateBtn.addEventListener('click', separateAudio);
        elements.cancelBtn.addEventListener('click', cancelSeparation);
        elements.importBtn.addEventListener('click', importToProject);

        // Mode selection
        elements.separationMode.addEventListener('change', function () {
            const is4Stems = elements.separationMode.value === '4stems';
            elements.stems2Options.style.display = is4Stems ? 'none' : 'flex';
            elements.stems4Options.style.display = is4Stems ? 'flex' : 'none';
            updateSeparateButton();
        });

        // Enable/disable separate button based on checkboxes
        elements.exportVocals.addEventListener('change', updateSeparateButton);
        elements.exportInstrumental.addEventListener('change', updateSeparateButton);
        elements.exportVocals4.addEventListener('change', updateSeparateButton);
        elements.exportDrums.addEventListener('change', updateSeparateButton);
        elements.exportBass.addEventListener('change', updateSeparateButton);
        elements.exportOther.addEventListener('change', updateSeparateButton);
    }

    /**
     * Cancel current separation
     */
    function cancelSeparation() {
        if (currentProcess) {
            addLogMessage(t('cancelling'));
            currentProcess.kill('SIGTERM');
            currentProcess = null;

            stopTimer();
            elements.progressSection.style.display = 'none';

            // Restore buttons
            elements.cancelBtn.style.display = 'none';
            elements.separateBtn.style.display = 'block';
            elements.separateBtn.disabled = false;
            elements.selectBtn.disabled = false;

            addLogMessage(t('cancelled'));
        }
    }

    /**
     * Update separate button state
     */
    function updateSeparateButton() {
        const hasSelection = selectedClip !== null;
        let hasExportOption = false;

        if (elements.separationMode.value === '2stems') {
            hasExportOption = elements.exportVocals.checked || elements.exportInstrumental.checked;
        } else {
            hasExportOption = elements.exportVocals4.checked || elements.exportDrums.checked ||
                elements.exportBass.checked || elements.exportOther.checked;
        }

        elements.separateBtn.disabled = !(hasSelection && hasExportOption);
    }

    /**
     * Get unique filename by adding _1, _2, etc. if file exists
     */
    function getUniqueFilename(basePath, baseName, extension) {
        const fs = require('fs');
        const path = require('path');

        let finalPath = path.join(basePath, baseName + extension);
        let counter = 1;

        while (fs.existsSync(finalPath)) {
            finalPath = path.join(basePath, baseName + '_' + counter + extension);
            counter++;
        }

        return finalPath;
    }

    /**
     * Check if Python and Demucs are installed
     */
    function checkPythonEnvironment() {
        csInterface.evalScript('AudioSeparator_checkPythonEnvironment()', function (result) {
            const status = JSON.parse(result);
            if (!status.success) {
                Utils.showNotification(
                    'Python ou Demucs n\'est pas installé. Veuillez consulter la documentation pour l\'installation.',
                    'warning'
                );
            }
        });
    }

    /**
     * Select audio clip from timeline
     */
    function selectAudioClip() {
        Utils.log('Selecting audio clip...');
        csInterface.evalScript('AudioSeparator_getSelectedAudioClip()', function (result) {
            try {
                const clipData = JSON.parse(result);
                if (clipData.success) {
                    selectedClip = clipData;
                    originalProjectItem = clipData; // Store for import
                    elements.selectedFile.textContent = clipData.name;

                    updateSeparateButton();
                    Utils.log('Clip selected: ' + clipData.name + ' (Dossier: ' + clipData.parentBinName + ')');
                } else {
                    Utils.showNotification(
                        'Veuillez sélectionner un clip audio dans la timeline.',
                        'error'
                    );
                }
            } catch (e) {
                Utils.log('Error parsing clip data: ' + e.message, 'error');
                Utils.showNotification('Erreur lors de la sélection du clip.', 'error');
            }
        });
    }

    /**
     * Separate audio into vocals and instrumental
     */
    function separateAudio() {
        if (!selectedClip) {
            Utils.showNotification('Aucun clip sélectionné.', 'error');
            return;
        }

        // Show progress section
        elements.progressSection.style.display = 'block';
        elements.resultsSection.style.display = 'none';
        elements.separateBtn.disabled = true;
        elements.selectBtn.disabled = true;

        updateProgress(0, t('preparation'));
        addLogMessage(t('startingSeparation'));

        // Determine output directory
        let outputPath;
        if (elements.saveNextToOriginal.checked) {
            // Save next to original file
            const path = require('path');
            outputPath = path.dirname(selectedClip.path);
            addLogMessage(t('outputFolder') + ' ' + outputPath + ' ' + t('nextToOriginal'));
            startSeparation(outputPath);
        } else {
            // Ask user for output directory
            csInterface.evalScript('Folder.selectDialog("Sélectionnez le dossier de sortie").fsName', function (result) {
                if (!result || result === 'null') {
                    handleSeparationError('Aucun dossier sélectionné');
                    return;
                }
                outputPath = result;
                addLogMessage(t('outputFolder') + ' ' + outputPath);
                startSeparation(outputPath);
            });
        }
    }

    /**
     * Detect GPU device
     */
    function detectGPU() {
        const os = require('os');
        const platform = os.platform();

        if (platform === 'darwin') {
            // macOS - Check for Apple Silicon
            const arch = os.arch();
            if (arch === 'arm64') {
                return 'mps';  // Apple Metal Performance Shaders
            }
        } else if (platform === 'win32' || platform === 'linux') {
            // Windows/Linux - Check for CUDA
            try {
                const { execSync } = require('child_process');
                execSync('nvidia-smi', { stdio: 'ignore' });
                return 'cuda';
            } catch (e) {
                // No NVIDIA GPU
            }
        }

        return 'cpu';
    }

    /**
     * Check system resources
     */
    function checkSystemResources() {
        const os = require('os');
        const freeMem = os.freemem();
        const totalMem = os.totalmem();
        const memUsage = ((totalMem - freeMem) / totalMem * 100).toFixed(1);
        const cpuCount = os.cpus().length;

        addLogMessage(`${t('systemInfo')} ${cpuCount} ${t('cores')} ${memUsage}% ${t('used')}`);

        if (memUsage > 80) {
            addLogMessage(t('highMemory'));
        }
    }

    /**
     * Start the separation process
     */
    function startSeparation(outputPath) {
        // Load configuration
        const path = require('path');
        const fs = require('fs');
        let config = {};

        try {
            const configPath = path.join(__dirname, 'config.json');
            if (fs.existsSync(configPath)) {
                config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            } else {
                throw new Error('Config file not found');
            }
        } catch (e) {
            Utils.showNotification('Configuration manquante. Veuillez réinstaller le plugin.', 'error');
            addLogMessage('❌ Erreur: config.json introuvable. Veuillez exécuter le script d\'installation.');
            return;
        }

        if (!config.pythonPath) {
            Utils.showNotification('Chemin Python non configuré.', 'error');
            return;
        }

        updateProgress(5, t('executingDemucs'));

        // Start timer
        startTimer();

        // Hide separate button and show cancel button
        elements.separateBtn.style.display = 'none';
        elements.cancelBtn.style.display = 'block';
        elements.selectBtn.disabled = true;

        // Check system resources
        checkSystemResources();

        // Use Node.js to execute the command
        const { spawn, execSync } = require('child_process');
        const fs = require('fs');
        const path = require('path');
        const os = require('os');

        const model = elements.modelQuality.value;
        let inputPath = selectedClip.path;
        const is4Stems = elements.separationMode.value === '4stems';
        const processingMode = elements.processingMode.value;
        const outputFormat = elements.outputFormat.value;

        // Use configured paths
        const pythonPath = config.pythonPath;
        const ffmpegPath = config.ffmpegPath;

        addLogMessage(`🐍 Python: ${pythonPath}`);

        // Detect GPU
        const device = detectGPU();
        if (device !== 'cpu') {
            addLogMessage(`🚀 ${t('gpuDetected')} ${device.toUpperCase()}`);
        } else {
            addLogMessage(`💻 ${t('usingCpu')}`);
        }

        addLogMessage(t('launching'));
        addLogMessage(`${t('modeLabel')}: ` + (is4Stems ? '4 Stems' : '2 Stems'));
        addLogMessage(`${t('modelLabel')}: ` + model);
        addLogMessage(`${t('processingLabel')}: ` + processingMode);
        addLogMessage(`${t('formatLabel')}: ` + outputFormat.toUpperCase());
        addLogMessage(`${t('fileLabel')}: ` + inputPath);
        updateProgress(10, t('separationInProgress'));

        // Build command arguments
        const args = ['-m', 'demucs'];

        // Add processing mode options
        switch (processingMode) {
            case 'fast':
                args.push('--quantized');  // 30-40% faster
                args.push('--segment', '7');  // Less RAM, compatible with all models
                addLogMessage(t('modeFastLog'));
                break;
            case 'quality':
                // Default mode, no extra options
                addLogMessage(t('modeQualityLog'));
                break;
            case 'balanced':
            default:
                args.push('--segment', '7');  // Save RAM, compatible with all models
                addLogMessage(t('modeBalancedLog'));
                break;
        }

        // Force GPU if available
        if (device !== 'cpu') {
            args.push('--device', device);
        }

        // Add output format
        if (outputFormat === 'mp3') {
            args.push('--mp3');
            args.push('--mp3-bitrate', '320');
        } else if (outputFormat === 'flac') {
            args.push('--flac');
        }
        // WAV is default, no option needed

        if (!is4Stems) {
            args.push('--two-stems=vocals');
        }

        args.push('-n', model, '--out', outputPath, inputPath);

        addLogMessage('Commande: ' + pythonPath + ' ' + args.join(' '));

        // Use spawn instead of exec for better real-time output
        const spawnEnv = {
            ...process.env
        };

        // Add FFmpeg to PATH if configured
        if (ffmpegPath) {
            const separator = os.platform() === 'win32' ? ';' : ':';
            const ffmpegDir = path.dirname(ffmpegPath);
            spawnEnv.PATH = ffmpegDir + separator + (spawnEnv.PATH || '');
        }

        currentProcess = spawn(pythonPath, args, { env: spawnEnv });

        let outputData = '';
        let errorData = '';

        currentProcess.stdout.on('data', function (data) {
            const output = data.toString();
            outputData += output;
            addLogMessage('📝 ' + output.trim());
        });

        currentProcess.stderr.on('data', function (data) {
            const output = data.toString();
            errorData += output;
            addLogMessage('ℹ️ ' + output.trim());

            // Update progress based on output
            if (output.includes('%')) {
                const match = output.match(/(\d+)%/);
                if (match) {
                    const percent = parseInt(match[1]);
                    updateProgress(10 + (percent * 0.85), t('separationInProgress') + ' ' + percent + '%');
                }
            }
        });

        currentProcess.on('close', function (code) {
            // Restore buttons
            elements.cancelBtn.style.display = 'none';
            elements.separateBtn.style.display = 'block';
            elements.selectBtn.disabled = false;
            currentProcess = null;

            if (code !== 0 && code !== null) {
                addLogMessage('❌ ' + t('processError') + ' ' + code);
                if (errorData) addLogMessage(t('details') + ' ' + errorData);
                handleSeparationError(t('separationFailed') + ' ' + code + ')');
                return;
            }

            addLogMessage(t('separationCompleted'));
            if (outputData) addLogMessage(t('output') + ' ' + outputData);

            updateProgress(95, t('searchingFiles'));

            // Find generated files
            const fs = require('fs');
            const path = require('path');

            const modelFolder = path.join(outputPath, model);

            try {
                const songFolders = fs.readdirSync(modelFolder).filter(function (item) {
                    // Filter out hidden files and non-directories
                    if (item.startsWith('.')) return false;
                    const fullPath = path.join(modelFolder, item);
                    return fs.statSync(fullPath).isDirectory();
                });

                if (songFolders.length === 0) {
                    handleSeparationError('Aucun fichier généré');
                    return;
                }

                const songFolder = path.join(modelFolder, songFolders[0]);
                const files = fs.readdirSync(songFolder).filter(function (item) {
                    return !item.startsWith('.');
                });

                // Get original filename without extension
                const originalName = path.basename(selectedClip.path, path.extname(selectedClip.path));
                const is4Stems = elements.separationMode.value === '4stems';

                addLogMessage('📁 Song folder: ' + songFolder);
                addLogMessage('📁 Output path: ' + outputPath);
                addLogMessage('📁 Files found: ' + files.length);

                const resultFiles = [];
                files.forEach(function (file) {
                    const filePath = path.join(songFolder, file);
                    const fileName = file.toLowerCase();
                    const fileExt = path.extname(file);

                    addLogMessage(t('fileFound') + ' ' + file);
                    addLogMessage('   Source: ' + filePath);

                    let newName = null;
                    let fileType = null;

                    if (is4Stems) {
                        // 4 stems mode
                        if (fileName.includes('vocals') && elements.exportVocals4.checked) {
                            const translatedName = t('vocals').charAt(0).toUpperCase() + t('vocals').slice(1);
                            newName = originalName + '_' + translatedName + fileExt;
                            fileType = 'vocals';
                            addLogMessage('   ' + t('type') + ' ' + translatedName);
                        } else if (fileName.includes('drums') && elements.exportDrums.checked) {
                            const translatedName = t('drums').charAt(0).toUpperCase() + t('drums').slice(1);
                            newName = originalName + '_' + translatedName + fileExt;
                            fileType = 'drums';
                            addLogMessage('   ' + t('type') + ' ' + translatedName);
                        } else if (fileName.includes('bass') && elements.exportBass.checked) {
                            const translatedName = t('bass').charAt(0).toUpperCase() + t('bass').slice(1);
                            newName = originalName + '_' + translatedName + fileExt;
                            fileType = 'bass';
                            addLogMessage('   ' + t('type') + ' ' + translatedName);
                        } else if (fileName.includes('other') && elements.exportOther.checked) {
                            const translatedName = t('other').charAt(0).toUpperCase() + t('other').slice(1);
                            newName = originalName + '_' + translatedName + fileExt;
                            fileType = 'other';
                            addLogMessage('   ' + t('type') + ' ' + translatedName);
                        }
                    } else {
                        // 2 stems mode
                        // Check for vocals (but not no_vocals)
                        if (fileName.includes('vocals') && !fileName.includes('no_vocals') && elements.exportVocals.checked) {
                            const translatedName = t('vocals').charAt(0).toUpperCase() + t('vocals').slice(1);
                            newName = originalName + '_' + translatedName + fileExt;
                            fileType = 'vocals';
                            addLogMessage('   ' + t('type') + ' ' + translatedName);
                        }
                        // Check for instrumental/no_vocals
                        else if ((fileName.includes('no_vocals') || fileName.includes('instrumental')) &&
                            elements.exportInstrumental.checked) {
                            const translatedName = t('instrumental').charAt(0).toUpperCase() + t('instrumental').slice(1);
                            newName = originalName + '_' + translatedName + fileExt;
                            fileType = 'instrumental';
                            addLogMessage('   ' + t('type') + ' ' + translatedName);
                        }
                    }

                    if (newName && fileType) {
                        // Get base name and extension
                        const baseName = path.basename(newName, path.extname(newName));
                        const extension = path.extname(newName);

                        // Get unique filename (adds _1, _2, etc. if exists)
                        const uniquePath = getUniqueFilename(outputPath, baseName, extension);
                        const uniqueName = path.basename(uniquePath);

                        addLogMessage('   Target: ' + uniquePath);

                        try {
                            // Check if source file exists
                            if (!fs.existsSync(filePath)) {
                                throw new Error('Source file not found: ' + filePath);
                            }

                            // Check if target directory exists
                            if (!fs.existsSync(outputPath)) {
                                throw new Error('Output directory not found: ' + outputPath);
                            }

                            fs.renameSync(filePath, uniquePath);
                            addLogMessage('   ' + t('fileRenamed') + ' ' + uniqueName);
                            resultFiles.push({
                                path: uniquePath,
                                name: uniqueName,
                                type: fileType
                            });
                        } catch (err) {
                            addLogMessage('   ⚠️ Erreur de renommage: ' + err.message);
                            addLogMessage('   Code: ' + err.code);
                            // Keep original file
                            resultFiles.push({
                                path: filePath,
                                name: file,
                                type: fileType
                            });
                        }
                    } else {
                        addLogMessage('   ' + t('ignored'));
                    }
                });

                addLogMessage('📊 Result files: ' + resultFiles.length);

                // Clean up: remove the model folder if empty
                try {
                    if (fs.readdirSync(songFolder).length === 0) {
                        fs.rmdirSync(songFolder);
                        addLogMessage('🗑️ Cleaned up song folder');
                    }
                    if (fs.readdirSync(modelFolder).length === 0) {
                        fs.rmdirSync(modelFolder);
                        addLogMessage('🗑️ Cleaned up model folder');
                    }
                } catch (err) {
                    addLogMessage('⚠️ Cleanup warning: ' + err.message);
                }

                addLogMessage('✅ Updating progress to 100%');
                updateProgress(100, t('completed'));

                addLogMessage('✅ Calling handleSeparationSuccess');
                handleSeparationSuccess({
                    success: true,
                    files: resultFiles,
                    outputPath: outputPath
                });
            } catch (e) {
                handleSeparationError('Erreur lors de la recherche des fichiers: ' + e.message);
            }
        });
    }

    /**
     * Simulate progress updates
     */
    function simulateProgress() {
        let progress = 0;
        const interval = setInterval(function () {
            progress += Math.random() * 15;
            if (progress >= 95) {
                progress = 95;
                clearInterval(interval);
            }
            updateProgress(progress, t('processingInProgress'));
        }, 1000);
    }

    /**
     * Start timer
     */
    function startTimer() {
        startTime = Date.now();
        if (elements.timeElapsedValue) {
            elements.timeElapsedValue.textContent = '0s';
        }

        if (timerInterval) clearInterval(timerInterval);

        timerInterval = setInterval(function () {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            if (elements.timeElapsedValue) {
                elements.timeElapsedValue.textContent = formatTime(elapsed);
            }
        }, 1000);
    }

    /**
     * Stop timer
     */
    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }


    /**
     * Format seconds to readable time
     */
    function formatTime(seconds) {
        if (seconds < 60) {
            return seconds + 's';
        } else if (seconds < 3600) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return mins + 'm ' + secs + 's';
        } else {
            const hours = Math.floor(seconds / 3600);
            const mins = Math.floor((seconds % 3600) / 60);
            return hours + 'h ' + mins + 'm';
        }
    }

    /**
     * Update progress bar
     */
    function updateProgress(percent, status) {
        elements.progressFill.style.width = percent + '%';
        elements.progressPercent.textContent = Math.round(percent) + '%';
        elements.progressStatus.textContent = status;
    }

    /**
     * Add message to progress log
     */
    function addLogMessage(message) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.textContent = `[${timestamp}] ${message}`;
        elements.progressLog.appendChild(logEntry);
        elements.progressLog.scrollTop = elements.progressLog.scrollHeight;
    }

    /**
     * Handle successful separation
     */
    function handleSeparationSuccess(response) {
        stopTimer();
        updateProgress(100, t('separationCompleted'));
        addLogMessage(t('separationCompleted'));

        separatedFiles = response.files || [];

        // Show results
        elements.resultsSection.style.display = 'block';
        elements.resultsList.innerHTML = '';

        separatedFiles.forEach(function (file) {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';

            // Icon based on file type
            let icon = '🎵';
            if (file.type === 'vocals') icon = '🎤';
            else if (file.type === 'instrumental') icon = '🎸';
            else if (file.type === 'drums') icon = '🥁';
            else if (file.type === 'bass') icon = '🎸';
            else if (file.type === 'other') icon = '🎹';

            resultItem.textContent = `${icon} ${file.name}`;
            elements.resultsList.appendChild(resultItem);
        });

        // Re-enable buttons
        elements.selectBtn.disabled = false;
        elements.separateBtn.disabled = false;

        // Auto-import if enabled
        if (elements.autoImport.checked) {
            addLogMessage(t('autoImportEnabled'));
            importToProject();
        } else {
            // Show import button if auto-import is disabled
            elements.importBtn.style.display = 'block';
        }

        Utils.log('Separation completed successfully');
    }

    /**
     * Handle separation error
     */
    function handleSeparationError(error) {
        stopTimer();
        updateProgress(0, 'Erreur lors de la séparation');
        addLogMessage('❌ Erreur: ' + error);

        Utils.showNotification('Erreur: ' + error, 'error');

        // Re-enable buttons
        elements.selectBtn.disabled = false;
        elements.separateBtn.disabled = false;

        Utils.log('Separation error: ' + error, 'error');
    }

    /**
     * Import separated files back to Premiere Pro project
     */
    function importToProject() {
        if (separatedFiles.length === 0) {
            Utils.showNotification('Aucun fichier à importer.', 'error');
            return;
        }

        elements.importBtn.disabled = true;
        addLogMessage(t('importingFiles'));

        // Escape the JSON string properly for ExtendScript
        const filesJsonStr = JSON.stringify(separatedFiles).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        const originalMediaPath = originalProjectItem ? originalProjectItem.path.replace(/\\/g, '\\\\').replace(/"/g, '\\"') : null;

        csInterface.evalScript(`AudioSeparator_importFiles("${filesJsonStr}", "${originalMediaPath}")`, function (result) {
            try {
                if (!result || result === 'undefined' || result === 'null') {
                    addLogMessage('⚠️ Aucune réponse du serveur ExtendScript');
                    Utils.showNotification('Erreur lors de l\'importation', 'error');
                    elements.importBtn.disabled = false;
                    return;
                }

                const response = JSON.parse(result);
                if (response.success) {
                    const binInfo = response.binName ? ' ' + t('filesImported') + ' "' + response.binName + '"' : '';
                    addLogMessage('✅ ' + response.imported + ' ' + t('filesImported') + binInfo);

                    // Hide import button after successful import
                    elements.importBtn.style.display = 'none';
                } else {
                    addLogMessage('❌ Erreur d\'importation: ' + response.error);
                }
            } catch (e) {
                addLogMessage('❌ Erreur: ' + e.message);
            }
            elements.importBtn.disabled = false;
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

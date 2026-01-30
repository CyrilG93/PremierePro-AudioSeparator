/**
 * ExtendScript for Adobe Premiere Pro
 * Audio Separator - Host-side logic
 */

#target premierepro
#include "json2.js"

/**
 * Find bin by name
 */
function AudioSeparator_findBinByName(item, binName) {
    // Check if this item is a bin with the matching name
    if (item.type === 2 && item.name === binName) { // ProjectItemType.BIN
        return item;
    }

    // Search in children
    if (item.children && item.children.numItems > 0) {
        for (var i = 0; i < item.children.numItems; i++) {
            var found = AudioSeparator_findBinByName(item.children[i], binName);
            if (found) {
                return found;
            }
        }
    }

    return null;
}

/**
 * Find project item by media path
 */
function AudioSeparator_findProjectItemByPath(item, mediaPath) {
    // Check if this item matches
    try {
        if (item.type === 1) { // ProjectItemType.CLIP
            var itemPath = item.getMediaPath();
            if (itemPath === mediaPath) {
                return item;
            }
        }
    } catch (e) {
        // Item doesn't have getMediaPath, skip
    }

    // Search in children
    if (item.children && item.children.numItems > 0) {
        for (var i = 0; i < item.children.numItems; i++) {
            var found = AudioSeparator_findProjectItemByPath(item.children[i], mediaPath);
            if (found) {
                return found;
            }
        }
    }

    return null;
}

/**
 * Check if Python and Demucs are installed
 */
function AudioSeparator_checkPythonEnvironment() {
    try {
        // ExtendScript ne peut pas facilement vérifier les commandes système
        // On retourne simplement true pour permettre l'utilisation
        return JSON.stringify({
            success: true,
            pythonInstalled: true,
            demucsInstalled: true,
            note: "Verification skipped - ExtendScript limitation"
        });
    } catch (e) {
        var errStr = e.toString().replace(/"/g, '\\"');
        return '{"success": false, "error": "' + errStr + '"}';
    }
}

/**
 * Get selected audio clip from timeline
 */
function AudioSeparator_getSelectedAudioClip() {
    try {
        var project = app.project;
        if (!project) {
            return JSON.stringify({
                success: false,
                error: "Aucun projet ouvert"
            });
        }

        var sequence = project.activeSequence;
        if (!sequence) {
            return JSON.stringify({
                success: false,
                error: "Aucune séquence active"
            });
        }

        var audioTracks = sequence.audioTracks;
        var selectedClip = null;

        // Search for selected clip in audio tracks
        for (var i = 0; i < audioTracks.numTracks; i++) {
            var track = audioTracks[i];
            var clips = track.clips;

            for (var j = 0; j < clips.numItems; j++) {
                var clip = clips[j];
                if (clip.isSelected()) {
                    selectedClip = clip;
                    break;
                }
            }
            if (selectedClip) break;
        }

        if (!selectedClip) {
            return JSON.stringify({
                success: false,
                error: "Aucun clip audio sélectionné"
            });
        }

        // Get clip information
        var projectItem = selectedClip.projectItem;
        var mediaPath = "";
        try {
            mediaPath = projectItem.getMediaPath();
        } catch (e) {
            mediaPath = "Unknown (Synthetic)";
        }

        // Get parent bin information - search in project panel
        var parentBinName = "Root";

        // Search for the actual project item in the project panel
        // Use a try-catch for the recursive search to avoid crashes
        try {
            if (mediaPath && mediaPath !== "Unknown (Synthetic)") {
                var actualProjectItem = AudioSeparator_findProjectItemByPath(app.project.rootItem, mediaPath);
                if (actualProjectItem) {
                    // Try to get parent directly
                    if (actualProjectItem.parent) {
                        parentBinName = actualProjectItem.parent.name;
                    }
                    // If parent is null, use treePath to find the parent bin
                    else if (actualProjectItem.treePath) {
                        var pathParts = actualProjectItem.treePath.split("\\");
                        if (pathParts.length >= 3) {
                            var binName = pathParts[pathParts.length - 2];
                            var parentBin = AudioSeparator_findBinByName(app.project.rootItem, binName);
                            if (parentBin) {
                                parentBinName = parentBin.name;
                            }
                        }
                    }
                }
            }
        } catch (e) {
            // Ignore bin search errors
        }

        return JSON.stringify({
            success: true,
            name: selectedClip.name,
            path: mediaPath,
            duration: selectedClip.duration.seconds,
            inPoint: selectedClip.inPoint.seconds,
            outPoint: selectedClip.outPoint.seconds,
            parentBinName: parentBinName
        });

    } catch (e) {
        // Fallback manual JSON creation to ensure we always return something
        var errStr = e.toString().replace(/"/g, '\\"');
        return '{"success": false, "error": "' + errStr + '"}';
    }
}

/**
 * Separate audio using Demucs
 */
function AudioSeparator_separateAudio(params) {
    try {
        var paramsObj = JSON.parse(params);

        // Create output directory
        var outputDir = Folder.selectDialog("Sélectionnez le dossier de sortie");
        if (!outputDir) {
            return JSON.stringify({
                success: false,
                error: "Aucun dossier sélectionné"
            });
        }

        var outputPath = outputDir.fsName;

        // Get script path - assuming it's in the extension folder
        var scriptPath = new File($.fileName).parent.parent.fsName + '/scripts/audio_separator.py';

        // Build parameters
        var model = paramsObj.model || 'htdemucs_ft';
        var inputPath = paramsObj.clipPath;

        // Create a command file that will be executed
        var cmdFilePath = outputPath + '/demucs_command.sh';
        var cmdFile = new File(cmdFilePath);
        cmdFile.open('w');
        cmdFile.writeln('#!/bin/bash');
        cmdFile.writeln('cd "' + outputPath + '"');
        cmdFile.writeln('python3.11 -m demucs --two-stems=vocals -n ' + model + ' --out "' + outputPath + '" "' + inputPath + '" > demucs_output.log 2>&1');
        cmdFile.writeln('echo $? > demucs_exit_code.txt');
        cmdFile.close();

        // Return instruction to user to run the command manually
        return JSON.stringify({
            success: false,
            error: "ExtendScript ne peut pas exécuter de commandes système directement",
            instruction: "Veuillez exécuter cette commande dans le Terminal",
            command: 'bash "' + cmdFilePath + '"',
            outputPath: outputPath,
            model: model,
            needsManualExecution: true
        });

    } catch (e) {
        var errStr = e.toString().replace(/"/g, '\\"');
        return '{"success": false, "error": "' + errStr + '"}';
    }
}

/**
 * Import separated files into Premiere Pro project
 */
function AudioSeparator_importFiles(filesJson, originalMediaPath) {
    try {
        var files = JSON.parse(filesJson);
        var project = app.project;

        if (!project) {
            return JSON.stringify({
                success: false,
                error: "Aucun projet ouvert"
            });
        }

        var originalBin = null;

        // Try to find the original project item by its media path
        if (originalMediaPath && originalMediaPath !== "null" && originalMediaPath !== "undefined") {
            try {
                var originalItem = AudioSeparator_findProjectItemByPath(project.rootItem, originalMediaPath);

                if (originalItem) {
                    // Try to get parent directly
                    if (originalItem.parent) {
                        originalBin = originalItem.parent;
                    }
                    // If parent is null, use treePath to find the parent bin
                    else if (originalItem.treePath) {
                        // Parse treePath: \ProjectName\BinName\FileName
                        var pathParts = originalItem.treePath.split("\\");

                        // If there are at least 3 parts (project, bin, file), get the bin name
                        if (pathParts.length >= 3) {
                            var binName = pathParts[pathParts.length - 2]; // Second to last is the bin

                            // Search for this bin in the project
                            originalBin = AudioSeparator_findBinByName(project.rootItem, binName);
                        }
                    }
                }
            } catch (e) { }
        }

        // If no bin found, use root
        if (!originalBin) {
            originalBin = project.rootItem;
        }

        // Import each file into the same bin as the original
        var importedItems = [];
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var imported = project.importFiles([file.path], true, originalBin, false);

            if (imported) {
                importedItems.push({
                    name: file.name,
                    type: file.type
                });
            }
        }

        return JSON.stringify({
            success: true,
            imported: importedItems.length,
            items: importedItems,
            binName: originalBin.name
        });

    } catch (e) {
        var errStr = e.toString().replace(/"/g, '\\"');
        return '{"success": false, "error": "' + errStr + '"}';
    }
}
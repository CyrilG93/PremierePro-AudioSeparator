/**
 * Utility functions for the Audio Separator extension
 */

const Utils = {
    /**
     * Log message to console with timestamp
     */
    log: function(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const prefix = `[${timestamp}] [${type.toUpperCase()}]`;
        console.log(prefix, message);
    },

    /**
     * Show notification to user
     */
    showNotification: function(message, type = 'info') {
        // Could be enhanced with a toast notification system
        this.log(message, type);
        alert(message);
    },

    /**
     * Format file size
     */
    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    },

    /**
     * Format duration in seconds to MM:SS
     */
    formatDuration: function(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    /**
     * Sanitize filename
     */
    sanitizeFilename: function(filename) {
        return filename.replace(/[^a-z0-9_\-\.]/gi, '_');
    },

    /**
     * Get file extension
     */
    getFileExtension: function(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    },

    /**
     * Remove file extension
     */
    removeExtension: function(filename) {
        return filename.replace(/\.[^/.]+$/, "");
    }
};

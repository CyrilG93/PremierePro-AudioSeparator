/**
 * CSInterface - v11.0.0
 */

var CSInterface = function () { };

CSInterface.prototype.evalScript = function (script, callback) {
    if (callback === null || callback === undefined) {
        callback = function (result) { };
    }
    window.__adobe_cep__.evalScript(script, callback);
};

CSInterface.prototype.getSystemPath = function (pathType) {
    var path = decodeURI(window.__adobe_cep__.getSystemPath(pathType));
    var OSVersion = this.getOSInformation();
    if (OSVersion.indexOf("Windows") >= 0) {
        path = path.replace("file:///", "");
    } else if (OSVersion.indexOf("Mac") >= 0) {
        path = path.replace("file://", "");
    }
    return path;
};

CSInterface.prototype.getOSInformation = function () {
    var userAgent = navigator.userAgent;
    if (navigator.platform === "Win32" || navigator.platform === "Windows") {
        return "Windows" + userAgent.substring(userAgent.indexOf("Windows") + 8, userAgent.indexOf(";", userAgent.indexOf("Windows")));
    } else if (navigator.platform === "MacIntel" || navigator.platform === "Macintosh") {
        return "Mac" + userAgent.substring(userAgent.indexOf("Mac OS X") + 9, userAgent.indexOf(")", userAgent.indexOf("Mac OS X")));
    }
    return "Unknown";
};

CSInterface.prototype.getApplicationID = function () {
    var appId = this.hostEnvironment.appId;
    return appId;
};

CSInterface.prototype.addEventListener = function (type, listener, obj) {
    window.addEventListener(type, listener, obj);
};

CSInterface.prototype.dispatchEvent = function (event) {
    if (typeof event.data === "object") {
        event.data = JSON.stringify(event.data);
    }
    window.__adobe_cep__.dispatchEvent(event);
};

CSInterface.prototype.openURLInDefaultBrowser = function (url) {
    if (typeof cep !== "undefined" && cep.util) {
        cep.util.openURLInDefaultBrowser(url);
    } else if (typeof window.cep !== "undefined" && window.cep.util) {
        window.cep.util.openURLInDefaultBrowser(url);
    }
};

Object.defineProperty(CSInterface.prototype, 'hostEnvironment', {
    get: function () {
        return JSON.parse(window.__adobe_cep__.getHostEnvironment());
    }
});

// System Path types
CSInterface.SystemPath = {
    USER_DATA: "userData",
    COMMON_FILES: "commonFiles",
    MY_DOCUMENTS: "myDocuments",
    APPLICATION: "application",
    EXTENSION: "extension",
    HOST_APPLICATION: "hostApplication"
};

// Event types
var CSEvent = function (type, scope, appId, extensionId) {
    this.type = type;
    this.scope = scope || "GLOBAL";
    this.appId = appId;
    this.extensionId = extensionId;
};

CSEvent.prototype.dispatch = function () {
    window.__adobe_cep__.dispatchEvent(this);
};

// Debug
oldConsole = console;
console = new Object();
console.log = function(log) {
    window.webkit.messageHandlers.consoleLog.postMessage({message: log});
    oldConsole.log(log);
}
console.debug = console.log;
console.info = console.log;
console.warn = console.log;
console.error = console.log;

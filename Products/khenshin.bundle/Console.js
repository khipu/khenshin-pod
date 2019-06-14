// Debug
oldConsole = console;
console = new Object();
console.log = function(log) {
	__js2oc('console#' + log);
    oldConsole.log(log);
}
console.debug = console.log;
console.info = console.log;
console.warn = console.log;
console.error = console.log;

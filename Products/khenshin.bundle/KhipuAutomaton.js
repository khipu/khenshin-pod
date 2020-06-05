var KhipuAutomaton = {};

KhipuAutomaton.params = {};
KhipuAutomaton.paramsReady = false;
KhipuAutomaton.result = null;

KhipuAutomaton.getParam = function(paramName) {
    return KhipuAutomaton.params[paramName];
};

KhipuAutomaton.setParam = function(paramName, paramValue, isInitial) {

    postToObjC = true;
    
    value = "" + paramValue;

    isInitial = typeof isInitial !== 'undefined' ? isInitial : false;
    
    if (isInitial || KhipuAutomaton.params[paramName] == value){
        postToObjC = false;
    }
    
    KhipuAutomaton.params[paramName] = value;
    
    if(postToObjC){
        window.webkit.messageHandlers.setParam.postMessage({name: paramName, value: paramValue});
    }
};


KhipuAutomaton.setExecutionError = function(reasonError, actionCode) {
    window.webkit.messageHandlers.setExecutionError.postMessage({reason: reasonError,
                                                                actionCode: actionCode});
};

KhipuAutomaton.setResultMessage = function(result) {
    sResult = "" + result;
    KhipuAutomaton.result = sResult;
    window.webkit.messageHandlers.setResultMessage.postMessage({message: sResult});
};

KhipuAutomaton.getResultMessage = function(){
    return KhipuAutomaton.result;
};

KhipuAutomaton.openApp = function(appDefinition){
    
    console.log("openApp en KhipuAutomaton");
    
    try{
        window.webkit.messageHandlers.openApp.postMessage({appDefinition: appDefinition});
    }catch(ex){
        console.log("Invalid appDefinition:"+appDefinition);
    }
}

KhipuAutomaton.storeCookie = function(cookieName, protocol, hostname, value){
    window.webkit.messageHandlers.storeCookie.postMessage({cookie: cookieName+'|'+protocol+'|'+hostname+'|'+value});
};

String.prototype.replaceAll = function(searchStr, replaceStr) {
    var str = this;
    
    // no match exists in string?
    if(str.indexOf(searchStr) === -1) {
        // return string
        return str;
    }
    
    // replace and remove first match, and do another recursirve search/replace
    return (str.replace(searchStr, replaceStr)).replaceAll(searchStr, replaceStr);
};

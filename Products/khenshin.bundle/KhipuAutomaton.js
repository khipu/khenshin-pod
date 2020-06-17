var KhipuAutomaton = {};

KhipuAutomaton.params = {};
KhipuAutomaton.paramsReady = false;
KhipuAutomaton.result = null;
KhipuAutomaton.MAX_CHANNEL_LENGTH = 10000;

KhipuAutomaton.getParam = function(paramName) {
    return KhipuAutomaton.params[paramName];
};

KhipuAutomaton.splitString = function(str, size){
    if (str == null) return [];
    str = String(str);
    return size > 0 ? str.match(new RegExp('[^]{1,' + size + '}', 'g')) : [str];
}

KhipuAutomaton.setParam = function(paramName, paramValue, isInitial) {

    postToObjC = true;
    
    value = "" + paramValue;

    isInitial = typeof isInitial !== 'undefined' ? isInitial : false;

//    if ( typeof paramValue === 'string' || paramValue instanceof String ){
//
//        paramValue = paramValue.replaceAll("\n", "%0A");
//        paramValue = paramValue.replaceAll("\r", "%0A");
//    }
    
    if (isInitial || KhipuAutomaton.params[paramName] == value){
        postToObjC = false;
    }
    
    KhipuAutomaton.params[paramName] = value;
    
    if(postToObjC){ // send to ObjC
        if(value.length < KhipuAutomaton.MAX_CHANNEL_LENGTH) {
                __js2oc_priority_message('setParam#'+paramName+'?'+paramValue);
        } else {
            __js2oc_priority_message('removeParam#'+paramName);
            var toSend = KhipuAutomaton.splitString(value, KhipuAutomaton.MAX_CHANNEL_LENGTH);
            for(var i = 0; i < toSend.length; i++) {
                __js2oc_priority_message('appendParam#'+paramName+'?'+toSend[i]);
            }
        }
    }
};

KhipuAutomaton.setExecutionError = function(reasonError, actionCode) { 
    
    postToObjC = true;
    if(postToObjC){ // send to ObjC
        if(actionCode.length < KhipuAutomaton.MAX_CHANNEL_LENGTH) {
            __js2oc_priority_message('setExecutionError#'+reasonError+'?'+actionCode);
        } else {
            __js2oc_priority_message('setExecutionError#'+reasonError+'?'+actionCode.substring(0, KhipuAutomaton.MAX_CHANNEL_LENGTH));
        }
    }
};



KhipuAutomaton.setResultMessage = function(result) {
    
//    if ( typeof result === 'string' || result instanceof String ){
//        result = result.replaceAll("\n", "%0A");
//        result = result.replaceAll("\r", "%0A");
//    }
    sResult = "" + result;
    KhipuAutomaton.result = sResult;
    
    if(sResult.length < KhipuAutomaton.MAX_CHANNEL_LENGTH) {
        __js2oc_priority_message('setResult#'+sResult);
    } else {
        __js2oc_priority_message('removeResult');
        var toSend = KhipuAutomaton.splitString(sResult, KhipuAutomaton.MAX_CHANNEL_LENGTH);
        for(var i = 0; i < toSend.length; i++) {
            __js2oc_priority_message('appendResult#'+toSend[i]);
        }
    }
};

KhipuAutomaton.getResultMessage = function(){
    return KhipuAutomaton.result;
};

KhipuAutomaton.openApp = function(appDefinition){
    
    console.log("openApp en KhipuAutomaton");
    
    try{
        __js2oc_priority_message('openApp#'+JSON.stringify(appDefinition));
    }catch(ex){
        console.log("Invalid appDefinition:"+appDefinition);
    }
}

KhipuAutomaton.storeCookie = function(cookieName, protocol, hostname, value){
    __js2oc_priority_message('storeCookie#'+cookieName+'|'+protocol+'|'+hostname+'|'+value);
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

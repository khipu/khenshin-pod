function js2ocCreateMessenger(message) {
    iframe = document.createElement("IFRAME");
    iframe.setAttribute("style", "display: none");
    document.documentElement.appendChild(iframe);
    iframe.setAttribute("src", document.location.protocol + "//" + document.location.hostname + "/__khenshinioscall__/" + message);
    setTimeout(function(){
               iframe.parentNode.removeChild(iframe);
               }, 1000);
}

function __js2oc(m) {
    js2ocCreateMessenger(m);
}

function __js2oc_priority_message(m){
    js2ocCreateMessenger(m);
}




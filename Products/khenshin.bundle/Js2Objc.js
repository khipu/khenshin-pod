function js2ocCreateMessenger(message) {
    var iframe = document.createElement('IFRAME');
    iframe.setAttribute('style', 'display: none');
    iframe.setAttribute('src', document.location.protocol + '//' + document.location.hostname + '/__khenshinioscall__/' + message);
    iframe.setAttribute('id', 'khenshinioscall' + new Date().getTime() + Math.random());
    document.documentElement.appendChild(iframe);

    setTimeout(function (id) {
               var el = document.getElementById(id);
               el.parentNode.removeChild(el);
    }, 1000, iframe.id);
}

function __js2oc(m) {
    js2ocCreateMessenger(m);
}

function __js2oc_priority_message(m) {
    js2ocCreateMessenger(m);
}

var XHRToolKit = function (method, pURL, params, callbackSuccess, callbackError) {
    var URL = pURL;
    var sendResultFunc = callbackSuccess;
    var XHRObj = null;
    var stringParams = params;

    if (typeof params == 'object') {
        var p = [];
        for (var param in params) {
            if (params.hasOwnProperty(param)) {
                p.push(param + '=' + decodeURIComponent(params[param]));
            }
            stringParams = p.join('&');
        }
    }

    this.sendXHRRequest = function() {
        if (XHRObj)
            XHRObj.destroy();
        XHRObj = new XMLHttpRequest();

        if (XHRObj) {
            XHRObj.onreadystatechange = function () {

                if (XHRObj.readyState == 4) {
                    receiveXHRResponse();
                }
            };

            XHRObj.open(method, URL, true);

            if (method == 'POST') {
                XHRObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                XHRObj.setRequestHeader("Content-length", params.length);
                XHRObj.setRequestHeader("Connection", "close");

                XHRObj.send(stringParams);
            }
            else {
                XHRObj.send(null);
            }
        }
        else {
            LEO.log("XHR Object is NULL");
        }
    }

    var receiveXHRResponse = function(){
        LEO.log('receiveXHRResponse: ' + XHRObj.status);
        if (XHRObj.status == 200) {
            callbackSuccess(JSON.parse(XHRObj.responseText), XHRObj);
        }
        else {
            callbackError(XHRObj);
        }
    }

    this.getResponseXML = function () {
        return XHRObj.responseXML;
    }

    this.getXHRObj = function () {
        return XHRObj;
    }

    this.abortXHRObj = function () {
        if (XHRObj) {
            XHRObj.abort();
        }
    }
}